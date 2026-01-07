
import React from 'react';

const StatsOverlay: React.FC = () => {
  const stats = [
    { label: 'FLUX_RATE', value: '741.0', unit: 'P/s', color: 'text-blue-400' },
    { label: 'COHERENCE', value: '0.999', unit: 'PHI', color: 'text-white' },
    { label: 'ENTROPY', value: '14.2', unit: 'dB', color: 'text-blue-500' },
  ];

  return (
    <div className="flex gap-24 pointer-events-auto items-center">
      {stats.map((stat, idx) => (
        <div key={idx} className="flex flex-col items-start group relative">
          {/* 背景光晕 */}
          <div className="absolute -inset-4 bg-blue-500/5 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
          
          <p className="text-[10px] font-orbitron tracking-[0.5em] text-slate-600 mb-4 group-hover:text-blue-400 transition-colors">
            {stat.label}
          </p>
          <div className="flex items-baseline gap-2">
            <span className={`text-5xl font-orbitron font-bold tracking-tighter ${stat.color} transition-all`}>
              {stat.value}
            </span>
            <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">{stat.unit}</span>
          </div>
          
          <div className="mt-6 flex gap-1 items-end h-4">
            {Array.from({ length: 12 }).map((_, b) => (
              <div 
                key={b} 
                className="w-[2px] bg-blue-500/20 rounded-full transition-all duration-500 group-hover:bg-blue-400/40"
                style={{ 
                  height: `${20 + Math.random() * 80}%`,
                  transitionDelay: `${b * 50}ms`
                }}
              ></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsOverlay;
