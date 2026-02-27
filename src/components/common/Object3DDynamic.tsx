'use client';

import dynamic from 'next/dynamic';

const Object3DDynamic = dynamic(() => import('./Object3DRenderer'), {
    ssr: false,
    loading: () => (
        <div className="relative w-full h-[400px] lg:h-[450px] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center bg-zinc-900/60 backdrop-blur-md text-zinc-300">
            <div className="w-10 h-10 border-4 border-white/20 border-t-white/80 rounded-full animate-spin mb-4 shadow-[0_0_15px_rgba(255,255,255,0.3)]" />
            <span className="text-sm font-medium tracking-wide animate-pulse">Initializing 3D Engine...</span>
        </div>
    )
});

export default Object3DDynamic;
