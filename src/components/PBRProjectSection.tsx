'use client';

import { useState } from 'react';
import PBRComparisonViewer from './common/PBRComparisonViewer';

type TextureSet = {
    diffuse: string;
    roughness?: string;
    metalness?: string;
    normal?: string;
};

type PBRModelConfig = {
    id: string;
    title: string;
    modelUrl: string;
    modelType: 'obj' | 'ply' | 'splat';
    baseTextures: TextureSet;
    pbrTextures: TextureSet;
};

// Models currently available under public/models
const PBR_MODELS: PBRModelConfig[] = [
    {
        id: 'bucket',
        title: 'Wooden Bucket',
        modelUrl: '/models/bucket/mesh.obj',
        modelType: 'obj',
        baseTextures: {
            diffuse: '/models/bucket/material_StyleID/bucket-StyleID_diffuse.png',
        },
        pbrTextures: {
            diffuse: '/models/bucket/material_StyleID/bucket-StyleID_diffuse.png',
            roughness: '/models/bucket/material_StyleID/bucket-StyleID_roughness.png',
            metalness: '/models/bucket/material_StyleID/bucket-StyleID_metallic.png',
            normal: '/models/bucket/material_StyleID/bucket-StyleID_normal.png',
        },
    },
    {
        id: 'seated-lion',
        title: 'Stone Seated Lion',
        modelUrl: '/models/seatedLion/seatedLion.obj',
        modelType: 'obj',
        baseTextures: {
            diffuse: '/models/seatedLion/material_StyleID/seatedLion-StyleID_diffuse.png',
        },
        pbrTextures: {
            diffuse: '/models/seatedLion/material_StyleID/seatedLion-StyleID_diffuse.png',
            roughness: '/models/seatedLion/material_StyleID/seatedLion-StyleID_roughness.png',
            metalness: '/models/seatedLion/material_StyleID/seatedLion-StyleID_metallic.png',
            normal: '/models/seatedLion/material_StyleID/seatedLion-StyleID_normal.png',
        },
    },
    {
        id: 'waterwell',
        title: 'Stone Water Well',
        modelUrl: '/models/waterWell/waterWell.obj',
        modelType: 'obj',
        baseTextures: {
            diffuse: '/models/waterWell/material_StyleID/waterWell-StyleID_diffuse.png',
        },
        pbrTextures: {
            diffuse: '/models/waterWell/material_StyleID/waterWell-StyleID_diffuse.png',
            roughness: '/models/waterWell/material_StyleID/waterWell-StyleID_roughness.png',
            metalness: '/models/waterWell/material_StyleID/waterWell-StyleID_metallic.png',
            normal: '/models/waterWell/material_StyleID/waterWell-StyleID_normal.png',
        },
    },
    {
        id: 'suitcase',
        title: 'Vintage Suitcase',
        modelUrl: '/models/suitcase/mesh.obj',
        modelType: 'obj',
        baseTextures: {
            diffuse: '/models/suitcase/material_StyleID/suitcase-StyleID_diffuse.png',
        },
        pbrTextures: {
            diffuse: '/models/suitcase/material_StyleID/suitcase-StyleID_diffuse.png',
            roughness: '/models/suitcase/material_StyleID/suitcase-StyleID_roughness.png',
            metalness: '/models/suitcase/material_StyleID/suitcase-StyleID_metallic.png',
            normal: '/models/suitcase/material_StyleID/suitcase-StyleID_normal.png',
        },
    },
];

export default function PBRProjectSection() {
    const [activeModelId, setActiveModelId] = useState<string>(PBR_MODELS[0]?.id ?? '');
    const [viewMode, setViewMode] = useState<'single' | 'comparison'>('comparison');

    const activeModel = PBR_MODELS.find((m) => m.id === activeModelId) ?? PBR_MODELS[0];

    return (
        <div className="flex flex-col gap-8 w-full">
            {/* Model selector */}
            <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4">
                {/* Left: name */}
                <div className="min-w-0">
                    <div className="text-sm font-semibold text-zinc-400 uppercase tracking-[0.18em]">Results</div>
                    <div className="text-2xl md:text-3xl font-bold text-white truncate">{activeModel?.title}</div>
                </div>

                {/* Middle: mode toggle */}
                <div className="md:justify-self-center">
                    <div className="inline-flex items-center bg-zinc-900/80 backdrop-blur-md border border-white/10 rounded-full p-1 shadow-inner">
                        <button
                            type="button"
                            onClick={() => setViewMode('single')}
                            className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-300 ${
                                viewMode === 'single'
                                    ? 'bg-white/10 text-white shadow-sm'
                                    : 'text-zinc-500 hover:text-zinc-300'
                            }`}
                        >
                            Single
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

                {/* Right: selector */}
                <div className="w-full md:w-auto md:justify-self-end">
                    <label className="sr-only" htmlFor="pbr-model-select">
                        Choose model
                    </label>
                    <div className="relative">
                        <select
                            id="pbr-model-select"
                            value={activeModelId}
                            onChange={(e) => setActiveModelId(e.target.value)}
                            className="appearance-none w-full md:w-[280px] px-4 py-2.5 pr-10 rounded-2xl bg-zinc-900/60 backdrop-blur-md border border-white/10 text-zinc-100 text-sm font-medium shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500/60"
                        >
                            {PBR_MODELS.map((model) => (
                                <option key={model.id} value={model.id} className="bg-zinc-950">
                                    {model.title}
                                </option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-zinc-400">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Renderer */}
            {activeModel && (
                <PBRComparisonViewer
                    title={activeModel.title}
                    modelUrl={activeModel.modelUrl}
                    modelType={activeModel.modelType}
                    baseTextures={activeModel.baseTextures}
                    pbrTextures={activeModel.pbrTextures}
                    viewMode={viewMode}
                    onViewModeChange={setViewMode}
                    showHeader={false}
                />
            )}
        </div>
    );
}

