
import React from 'react';

const StatsOverlay: React.FC = () => {
  const stats = [
    { label: 'BANDWIDTH', value: '412.5', unit: 'GB/s' },
    { label: 'LATENCY', value: '0.002', unit: 'ms' },
    { label: 'NODES', value: '48,192', unit: 'pts' },
  ];

  return (
    <div className="flex gap-12 pointer-events-auto items-end pb-4">
      {stats.map((stat, idx) => (
        <div key={idx} className="flex flex-col items-center group">
          <p className="text-[9px] font-orbitron tracking-[0.4em] text-slate-500 mb-2 group-hover:text-blue-500 transition-colors">
            {stat.label}
          </p>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-orbitron font-bold text-white tracking-tighter">
              {stat.value}
            </span>
            <span className="text-[9px] font-orbitron text-blue-500/60">{stat.unit}</span>
          </div>
          <div className="mt-4 flex gap-1 h-1">
            {[1, 2, 3, 4, 5].map(b => (
              <div 
                key={b} 
                className={`w-4 h-full rounded-full transition-all duration-700 ${
                  Math.random() > 0.3 ? 'bg-blue-500/40' : 'bg-slate-800'
                }`}
              ></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsOverlay;
