'use client';

import { useState, useRef } from 'react';
import Object3DDynamic from '@/components/common/Object3DDynamic';

interface TextureSet {
    diffuse: string;
    roughness?: string;
    metalness?: string;
    normal?: string;
}

interface PBRComparisonViewerProps {
    title: string;
    modelUrl: string;
    modelType: 'obj' | 'ply' | 'splat';
    baseTextures: TextureSet;
    pbrTextures: TextureSet;
    viewMode?: 'single' | 'comparison';
    onViewModeChange?: (mode: 'single' | 'comparison') => void;
    showHeader?: boolean;
}

export default function PBRComparisonViewer({
    title,
    modelUrl,
    modelType,
    baseTextures,
    pbrTextures,
    viewMode: viewModeProp,
    onViewModeChange,
    showHeader = true,
}: PBRComparisonViewerProps) {
    const [internalViewMode, setInternalViewMode] = useState<'single' | 'comparison'>('single');
    const viewMode = viewModeProp ?? internalViewMode;
    const setViewMode = onViewModeChange ?? setInternalViewMode;
    const [sliderPos, setSliderPos] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    type OrbitSyncState = {
        position: [number, number, number];
        target: [number, number, number];
        leaderId: string;
    };
    const orbitSyncRef = useRef<OrbitSyncState | null>(null);
    const [lightAngle, setLightAngle] = useState(45);
    const [lightIntensity, setLightIntensity] = useState(2.5);

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!isDragging || !containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
        setSliderPos((x / rect.width) * 100);
    };

    return (
        <div className="flex flex-col gap-6 w-full">
            {/* Header and Controls */}
            {showHeader && (
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent">
                        {title}
                    </h3>

                    {/* Toggle Switch */}
                    <div className="flex items-center bg-zinc-900/80 backdrop-blur-md border border-white/10 rounded-full p-1 shadow-inner">
                        <button
                            type="button"
                            onClick={() => setViewMode('single')}
                            className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-300 ${
                                viewMode === 'single'
                                    ? 'bg-white/10 text-white shadow-sm'
                                    : 'text-zinc-500 hover:text-zinc-300'
                            }`}
                        >
                            Single (Full PBR)
                        </button>
                        <button
                            type="button"
                            onClick={() => setViewMode('comparison')}
                            className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-300 ${
                                viewMode === 'comparison'
                                    ? 'bg-white/10 text-white shadow-sm'
                                    : 'text-zinc-500 hover:text-zinc-300'
                            }`}
                        >
                            Side-by-Side Comparison
                        </button>
                    </div>
                </div>
            )}

            {/* Renderers */}
            {viewMode === 'single' ? (
                <div className="w-full relative">
                    <Object3DDynamic
                        key={`${title}-pbr`}
                        type={modelType}
                        url={modelUrl}
                        textures={pbrTextures}
                        className="w-full h-[400px] lg:h-[600px]"
                        fallbackText={`Loading ${title}...`}
                    />
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    <div
                        ref={containerRef}
                        className="relative w-full h-[400px] lg:h-[600px] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] touch-none group/slider"
                        onPointerUp={() => setIsDragging(false)}
                        onPointerLeave={() => setIsDragging(false)}
                        onPointerMove={handlePointerMove}
                    >
                        {/* Left Side: Base Albedo */}
                        <div
                            className="absolute inset-0 z-0 bg-zinc-950"
                            style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
                        >
                            <Object3DDynamic
                                key={`${title}-base`}
                                type={modelType}
                                url={modelUrl}
                                textures={baseTextures}
                                className="w-full h-full"
                                fallbackText={`Loading Base ${title}...`}
                                interactive={!isDragging}
                                showControls={false}
                                orbitSyncRef={orbitSyncRef}
                                lightAngle={lightAngle}
                                lightIntensity={lightIntensity}
                            />
                            <div className="absolute top-6 left-6 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-semibold tracking-wider text-white">
                                Base Albedo Options
                            </div>
                        </div>

                        {/* Right Side: Full PBR */}
                        <div
                            className="absolute inset-0 z-10 bg-zinc-950"
                            style={{ clipPath: `polygon(${sliderPos}% 0, 100% 0, 100% 100%, ${sliderPos}% 100%)` }}
                        >
                            <Object3DDynamic
                                key={`${title}-pbr-compare`}
                                type={modelType}
                                url={modelUrl}
                                textures={pbrTextures}
                                className="w-full h-full"
                                fallbackText={`Loading PBR ${title}...`}
                                interactive={!isDragging}
                                showControls={false}
                                orbitSyncRef={orbitSyncRef}
                                lightAngle={lightAngle}
                                lightIntensity={lightIntensity}
                            />
                            <div className="absolute top-6 right-6 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-semibold tracking-wider text-white">
                                Full PBR Pipeline
                            </div>
                        </div>

                        {/* Vertical Divider Line with Hitbox */}
                        <div
                            className="absolute top-0 bottom-0 z-20 flex flex-col items-center justify-center -ml-2 w-4 cursor-ew-resize opacity-80 hover:opacity-100 transition-opacity duration-300"
                            style={{ left: `${sliderPos}%` }}
                            onPointerDown={(e) => {
                                setIsDragging(true);
                                e.stopPropagation(); // Prevent OrbitControls from capturing this click
                                (e.target as HTMLElement).setPointerCapture(e.pointerId); // Keep tracking even if cursor drifts off the thin line
                            }}
                            onPointerUp={(e) => {
                                setIsDragging(false);
                                (e.target as HTMLElement).releasePointerCapture(e.pointerId);
                            }}
                        >
                            {/* The visible thin line */}
                            <div className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.8)]" />

                            {/* Draggable Handle Badge */}
                            <div className="relative z-10 w-8 h-8 rounded-full bg-white border-4 border-zinc-900 shadow-xl flex items-center justify-center group-hover/slider:scale-110 transition-transform">
                                <svg className="w-4 h-4 text-zinc-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 9h8M8 15h8" />
                                </svg>
                            </div>
                        </div>

                        {/* Instruction Overlay */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 opacity-100 group-hover/slider:opacity-0 transition-opacity duration-500 pointer-events-none">
                            <span className="text-sm font-medium text-white/80">Drag to Compare</span>
                        </div>
                    </div>

                    {/* Shared lighting controls for comparison - centered below renderer */}
                    <div className="flex justify-center mt-2">
                        <div className="flex flex-col gap-3 px-4 py-3 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 w-full max-w-xs">
                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-medium text-white/70 uppercase tracking-wider">Light Angle</label>
                                <input
                                    type="range"
                                    min="-90"
                                    max="90"
                                    step="1"
                                    value={lightAngle}
                                    onChange={(e) => setLightAngle(parseFloat(e.target.value))}
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
                                    onChange={(e) => setLightIntensity(parseFloat(e.target.value))}
                                    className="w-full accent-blue-500 h-1 bg-white/20 rounded-full appearance-none outline-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
