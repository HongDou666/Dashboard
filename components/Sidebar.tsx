
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface SidebarProps {
  position: 'left' | 'right';
}

const Sidebar: React.FC<SidebarProps> = ({ position }) => {
  const [data, setData] = useState(
    Array.from({ length: 12 }, (_, i) => ({ name: i, value: 400 + Math.random() * 200 }))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => {
        const newData = [...prev.slice(1), { name: prev[prev.length-1].name + 1, value: 300 + Math.random() * 400 }];
        return newData;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-8 h-full">
      <div className="glass-panel p-8 rounded-3xl flex flex-col relative group">
        <div className="flex justify-between items-start mb-10">
          <div>
            <h3 className="text-[11px] font-orbitron text-blue-400 tracking-[0.3em] font-bold uppercase mb-2">
              {position === 'left' ? 'Spectral_Analysis' : 'Node_Propagation'}
            </h3>
            <div className="flex gap-1">
              <div className="h-1 w-6 bg-blue-500/40 rounded-full"></div>
              <div className="h-1 w-1 bg-blue-500/20 rounded-full"></div>
            </div>
          </div>
          <span className="text-[9px] font-mono text-slate-500 opacity-50">#00FF{position === 'left' ? 'A' : 'B'}</span>
        </div>
        
        <div className="flex-1 min-h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id={`grad-${position}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0ea5e9" stopOpacity={0.2}/>
                  <stop offset="100%" stopColor="#0ea5e9" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Tooltip content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-slate-900/90 border border-blue-500/20 px-3 py-1 rounded-full backdrop-blur-md">
                      <p className="text-[10px] font-mono text-blue-400">{payload[0].value.toFixed(2)}</p>
                    </div>
                  );
                }
                return null;
              }} />
              <Area 
                type="stepAfter" 
                dataKey="value" 
                stroke="#0ea5e9" 
                strokeWidth={1} 
                fill={`url(#grad-${position})`}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-6 flex justify-between items-center text-[10px] font-mono opacity-30">
          <span>TX_READY</span>
          <span className="animate-pulse">● ● ●</span>
        </div>
      </div>

      <div className="glass-panel p-8 flex-1 rounded-3xl overflow-hidden flex flex-col">
        <h3 className="text-[10px] font-orbitron text-slate-500 tracking-[0.4em] mb-8 uppercase">
          Live_Event_Nexus
        </h3>
        <div className="flex-1 overflow-y-auto custom-scrollbar space-y-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex gap-5 items-start opacity-70 hover:opacity-100 transition-opacity cursor-crosshair">
              <div className="w-1 h-8 bg-blue-500/10 rounded-full relative overflow-hidden">
                <div className="absolute top-0 w-full bg-blue-400 animate-[moveDown_3s_infinite]" style={{ height: '30%', animationDelay: `${i*0.5}s` }}></div>
              </div>
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="text-[9px] font-mono text-blue-500/60 tracking-tighter">00:0{i}:FB</span>
                  <span className="text-[8px] text-slate-600 font-mono">OK</span>
                </div>
                <p className="text-[10px] text-slate-400 leading-relaxed">
                  Quantum handshake verified with sector {7+i}G.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes moveDown {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(330%); }
        }
      `}</style>
    </div>
  );
};

export default Sidebar;
