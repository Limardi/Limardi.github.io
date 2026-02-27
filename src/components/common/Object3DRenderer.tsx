import React, { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Splat, Center, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';

type OrbitSyncState = {
    position: [number, number, number];
    target: [number, number, number];
    leaderId: string;
};

interface Object3DRendererProps {
    url: string;
    type: 'splat' | 'ply' | 'obj';
    mtlUrl?: string; // Optional for OBJ files
    textures?: { // Optional explicit PBR texture mapping
        diffuse: string;
        roughness?: string;
        metalness?: string;
        normal?: string;
    };
    className?: string; // Additional classes for the container
    fallbackText?: string; // Text to show while loading
    eventRootRef?: React.RefObject<HTMLElement | null>;
    interactive?: boolean; // If false, disable user input (but keep auto-rotate)
    showControls?: boolean; // Show lighting panel + "drag to rotate" hint
    orbitSyncRef?: React.MutableRefObject<OrbitSyncState | null>; // Keeps left/right camera in lockstep
    lightAngle?: number; // Optional external light angle for shared control
    lightIntensity?: number; // Optional external light intensity for shared control
    onLightAngleChange?: (value: number) => void;
    onLightIntensityChange?: (value: number) => void;
}

function SyncedOrbitControls({
    autoRotate,
    autoRotateSpeed,
    enabled,
    minDistance,
    maxDistance,
    domElement,
    orbitSyncRef,
}: {
    autoRotate: boolean;
    autoRotateSpeed: number;
    enabled: boolean;
    minDistance: number;
    maxDistance: number;
    domElement?: HTMLElement;
    orbitSyncRef?: React.MutableRefObject<OrbitSyncState | null>;
}) {
    const { camera } = useThree();
    const controlsRef = useRef<OrbitControlsImpl | null>(null);
    const localIdRef = useRef(`orbit_${Math.random().toString(36).slice(2)}`);
    const isDraggingRef = useRef(false);

    useFrame(() => {
        const ctrl = controlsRef.current;
        if (!ctrl || !orbitSyncRef) return;
        const cam = camera as THREE.PerspectiveCamera;

        const isLeader = !orbitSyncRef.current || orbitSyncRef.current.leaderId === localIdRef.current;

        if (isLeader) {
            ctrl.autoRotate = autoRotate;
            ctrl.autoRotateSpeed = autoRotateSpeed;

            orbitSyncRef.current = {
                position: [cam.position.x, cam.position.y, cam.position.z],
                target: [ctrl.target.x, ctrl.target.y, ctrl.target.z],
                leaderId: localIdRef.current,
            };
        } else {
            ctrl.autoRotate = false;

            const state = orbitSyncRef.current!;
            if (!isDraggingRef.current) {
                cam.position.set(state.position[0], state.position[1], state.position[2]);
                ctrl.target.set(state.target[0], state.target[1], state.target[2]);
                ctrl.update();
            }
        }
    });

    return (
        <OrbitControls
            ref={controlsRef}
            makeDefault
            autoRotate={false}
            autoRotateSpeed={autoRotateSpeed}
            enablePan={false}
            enableRotate={enabled}
            enableZoom={enabled}
            minDistance={minDistance}
            maxDistance={maxDistance}
            domElement={domElement}
            onStart={() => {
                isDraggingRef.current = true;
                if (orbitSyncRef) {
                    const prev = orbitSyncRef.current;
                    if (prev) prev.leaderId = localIdRef.current;
                }
            }}
            onEnd={() => {
                isDraggingRef.current = false;
            }}
        />
    );
}

// Fallback HTML Loader to match Apple glassmorphism aesthetic
const FallbackLoader = ({ text }: { text: string }) => {
    return (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950/80 backdrop-blur-xl z-50 transition-opacity duration-500">
            <div className="w-12 h-12 border-4 border-white/10 border-t-white/80 rounded-full animate-spin mb-4" />
            <p className="text-white/60 font-medium tracking-wide text-sm">{text}</p>
        </div>
    );
};

// Component to handle native PLY file loading in Three.js
const PLYModel = ({ url, onLoad }: { url: string, onLoad?: () => void }) => {
    const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null);

    useEffect(() => {
        const loader = new PLYLoader();
        loader.load(url, (geo) => {
            geo.computeVertexNormals();
            geo.computeBoundingBox();
            if (geo.boundingBox) {
                const size = new THREE.Vector3();
                geo.boundingBox.getSize(size);
                const maxDim = Math.max(size.x, size.y, size.z);
                if (maxDim > 0) geo.scale(3 / maxDim, 3 / maxDim, 3 / maxDim);
            }
            setGeometry(geo);
            if (onLoad) onLoad();
        });
    }, [url, onLoad]);

    if (!geometry) return null;

    return (
        <Center>
            <mesh geometry={geometry}>
                <meshStandardMaterial
                    color="#9050e0"
                    roughness={0.4}
                    metalness={0.6}
                    side={THREE.DoubleSide}
                />
            </mesh>
        </Center>
    );
};

// A helper wrapper to apply explicit textures reliably without React 18 Suspense
const TexturedOBJ = ({ object, textures }: { object: THREE.Group, textures?: Object3DRendererProps['textures'] }) => {
    useEffect(() => {
        if (!textures || !textures.diffuse) return;

        const textureLoader = new THREE.TextureLoader();

        const diffuseMap = textureLoader.load(textures.diffuse);
        diffuseMap.colorSpace = THREE.SRGBColorSpace;

        const newMat = new THREE.MeshStandardMaterial({
            map: diffuseMap,
            ...(textures.roughness ? { roughnessMap: textureLoader.load(textures.roughness), roughness: 1.0 } : {}),
            ...(textures.metalness ? { metalnessMap: textureLoader.load(textures.metalness), metalness: 1.0 } : {}),
            ...(textures.normal ? { normalMap: textureLoader.load(textures.normal) } : {}),
            side: THREE.DoubleSide,
            color: new THREE.Color(0xffffff)
        });

        object.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.material = newMat;
            }
        });
    }, [object, textures]);

    return <primitive object={object} />;
};

// Component to handle native OBJ file loading
const OBJModel = ({ url, mtlUrl, textures, onLoad }: { url: string; mtlUrl?: string; textures?: Object3DRendererProps['textures']; onLoad?: () => void }) => {
    const [object, setObject] = useState<THREE.Group | null>(null);

    useEffect(() => {
        if (mtlUrl) {
            const mtlLoader = new MTLLoader();
            mtlLoader.load(mtlUrl, (materials) => {
                materials.preload();
                // Ensure all materials are DoubleSide so it's impossible to look at "invisible" backfaces
                for (const materialName in materials.materials) {
                    const mat = materials.materials[materialName];
                    mat.side = THREE.DoubleSide;
                    // Forcing opacity because many exporters output Tr 1.0 (fully transparent)!
                    mat.transparent = false;
                    mat.opacity = 1.0;
                    mat.depthWrite = true;
                    // Boost the base color so the texture isn't modulated darkly
                    if ('color' in mat) {
                        (mat as THREE.MeshPhongMaterial | THREE.MeshLambertMaterial).color.setHex(0xffffff);
                    }
                }

                const objLoader = new OBJLoader();
                objLoader.setMaterials(materials);
                const basePath = url.substring(0, url.lastIndexOf('/') + 1);
                mtlLoader.setPath(basePath);

                objLoader.load(url, (obj) => {
                    const box = new THREE.Box3().setFromObject(obj);
                    const center = box.getCenter(new THREE.Vector3());
                    obj.position.sub(center);

                    const size = box.getSize(new THREE.Vector3());
                    const maxDim = Math.max(size.x, size.y, size.z);
                    const scale = 3 / maxDim;
                    obj.scale.setScalar(scale);

                    setObject(obj);
                    if (onLoad) onLoad();
                });
            });
        } else {
            const objLoader = new OBJLoader();
            objLoader.load(url, (obj) => {
                const box = new THREE.Box3().setFromObject(obj);
                const center = box.getCenter(new THREE.Vector3());
                obj.position.sub(center);

                const size = box.getSize(new THREE.Vector3());
                const maxDim = Math.max(size.x, size.y, size.z);
                const scale = 3 / maxDim;
                obj.scale.setScalar(scale);

                setObject(obj);
                if (onLoad) onLoad();
            });
        }
    }, [url, mtlUrl, onLoad]);

    if (!object) return null;

    return (
        <Center>
            {textures && textures.diffuse ? (
                <Suspense fallback={null}>
                    <TexturedOBJ object={object} textures={textures} />
                </Suspense>
            ) : (
                <primitive object={object} />
            )}
        </Center>
    );
};

export default function Object3DRenderer({
    url,
    type,
    mtlUrl,
    textures,
    className = '',
    fallbackText,
    eventRootRef,
    interactive = true,
    showControls = true,
    orbitSyncRef,
    lightAngle: lightAngleProp,
    lightIntensity: lightIntensityProp,
    onLightAngleChange,
    onLightIntensityChange,
}: Object3DRendererProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [internalLightAngle, setInternalLightAngle] = useState(45);
    const [internalLightIntensity, setInternalLightIntensity] = useState(2.5);
    const [isAdjustingUI, setIsAdjustingUI] = useState(false);

    const lightAngle = lightAngleProp ?? internalLightAngle;
    const lightIntensity = lightIntensityProp ?? internalLightIntensity;

    const handleLoad = useCallback(() => setIsLoading(false), []);

    useEffect(() => {
        if (type === 'splat') {
            setIsLoading(false);
        }
    }, [type]);

    return (
        <div className={`relative isolate rounded-[2.5rem] overflow-hidden bg-zinc-950/50 border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] group ${className} min-h-[300px]`}>

            {isLoading && <FallbackLoader text={fallbackText || 'Loading 3D Asset...'} />}

            {/* Lighting Controls Panel */}
            {showControls && (
                <div
                    className="absolute inset-x-0 bottom-4 z-20 flex justify-center pointer-events-none"
                >
                    <div
                        className="flex flex-col gap-3 px-4 py-3 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-full max-w-xs pointer-events-auto"
                    onPointerDown={(e) => {
                        setIsAdjustingUI(true);
                        e.stopPropagation();
                    }}
                    onPointerUp={(e) => {
                        setIsAdjustingUI(false);
                        e.stopPropagation();
                    }}
                    onPointerCancel={(e) => {
                        setIsAdjustingUI(false);
                        e.stopPropagation();
                    }}
                    onPointerLeave={() => setIsAdjustingUI(false)}
                    onWheel={(e) => e.stopPropagation()}
                >
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-medium text-white/70 uppercase tracking-wider">Light Angle</label>
                        <input
                            type="range"
                            min="-90"
                            max="90"
                            step="1"
                            value={lightAngle}
                            onChange={(e) => {
                                const v = parseFloat(e.target.value);
                                if (onLightAngleChange) {
                                    onLightAngleChange(v);
                                } else {
                                    setInternalLightAngle(v);
                                }
                            }}
                            className="w-full accent-blue-500 h-1 bg-white/20 rounded-full appearance-none outline-none"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-medium text-white/70 uppercase tracking-wider">Light Intensity</label>
                        <input
                            type="range"
                            min="0"
                            max="50"
                            step="0.5"
                            value={lightIntensity}
                            onChange={(e) => {
                                const v = parseFloat(e.target.value);
                                if (onLightIntensityChange) {
                                    onLightIntensityChange(v);
                                } else {
                                    setInternalLightIntensity(v);
                                }
                            }}
                            className="w-full accent-blue-500 h-1 bg-white/20 rounded-full appearance-none outline-none"
                        />
                    </div>
                    </div>
                </div>
            )}

            {/* Interactive Badge */}
            {showControls && interactive && (
                <div className="absolute bottom-4 right-4 z-10 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex items-center gap-2">
                    <svg className="w-4 h-4 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                    </svg>
                    <span className="text-xs font-medium text-white/70">Drag to rotate</span>
                </div>
            )}

            <div className="absolute inset-0 z-0 pointer-events-auto">
                <Suspense fallback={null}>
                    <Canvas
                        shadows
                        dpr={[1, 2]}
                        camera={{ position: [0, 0, 5], fov: 45 }}
                        style={{ pointerEvents: interactive ? 'auto' : 'none' }}
                    >
                        {/* Strong PBR Lighting Setup */}
                        <ambientLight intensity={0.4} />

                        {/* Key Light (Dynamic) */}
                        <directionalLight
                            position={[Math.sin((lightAngle * Math.PI) / 180) * 10, 5, Math.cos((lightAngle * Math.PI) / 180) * 10]}
                            intensity={lightIntensity}
                            castShadow
                            shadow-mapSize={[1024, 1024]}
                        />

                        {/* Fill Light (Soft cool light to counter the key light) */}
                        <directionalLight
                            position={[-5, 3, -5]}
                            intensity={1.0}
                            color="#aaccff"
                        />

                        {/* Rim Light (Highlights the metallic edges) */}
                        <pointLight
                            position={[0, -2, -5]}
                            intensity={3.0}
                            color="#ffddaa"
                        />

                        <Environment preset="studio" blur={0.8} />

                        {orbitSyncRef ? (
                            <SyncedOrbitControls
                                autoRotate={!isLoading}
                                autoRotateSpeed={1.5}
                                enabled={interactive && !isAdjustingUI}
                                minDistance={2}
                                maxDistance={10}
                                domElement={eventRootRef?.current || undefined}
                                orbitSyncRef={orbitSyncRef}
                            />
                        ) : (
                            <OrbitControls
                                makeDefault
                                autoRotate={!isLoading}
                                autoRotateSpeed={1.5}
                                enablePan={false}
                                enableRotate={interactive && !isAdjustingUI}
                                enableZoom={interactive && !isAdjustingUI}
                                minDistance={2}
                                maxDistance={10}
                            />
                        )}

                        {type === 'splat' ? (
                            <Center>
                                <Splat src={url} position={[0, 0, 0]} />
                            </Center>
                        ) : type === 'obj' ? (
                            <OBJModel url={url} mtlUrl={mtlUrl} textures={textures} onLoad={handleLoad} />
                        ) : (
                            <PLYModel url={url} onLoad={handleLoad} />
                        )}
                    </Canvas>
                </Suspense>
            </div>
        </div>
    );
}
