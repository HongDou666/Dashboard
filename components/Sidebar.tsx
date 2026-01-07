
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface SidebarProps {
  position: 'left' | 'right';
}

const Sidebar: React.FC<SidebarProps> = ({ position }) => {
  const [data, setData] = useState([
    { name: 'T1', value: 400 },
    { name: 'T2', value: 300 },
    { name: 'T3', value: 600 },
    { name: 'T4', value: 800 },
    { name: 'T5', value: 500 },
    { name: 'T6', value: 900 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => prev.map(d => ({
        ...d,
        value: Math.max(100, d.value + (Math.random() - 0.5) * 40)
      })));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="glass-panel p-6 flex-1 rounded-2xl flex flex-col">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-xs font-orbitron text-blue-400 tracking-[0.2em] font-bold">
              {position === 'left' ? 'REALTIME_TRAFFIC' : 'SYSTEM_RESOURCES'}
            </h3>
            <div className="h-[2px] w-8 bg-blue-500 mt-2"></div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-orbitron text-blue-500/40">NODE_01</span>
            <span className="text-[10px] text-green-500 font-bold tracking-widest uppercase">Active</span>
          </div>
        </div>
        
        <div className="flex-1 min-h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            {position === 'left' ? (
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.3}/>
                    <stop offset="100%" stopColor="#38bdf8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" hide />
                <Tooltip 
                  contentStyle={{ background: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '12px' }}
                  cursor={{ stroke: 'rgba(56, 189, 248, 0.2)' }}
                />
                <Area type="stepAfter" dataKey="value" stroke="#38bdf8" strokeWidth={1.5} fill="url(#areaGradient)" />
              </AreaChart>
            ) : (
              <BarChart data={data}>
                <Bar dataKey="value" fill="rgba(56, 189, 248, 0.4)" radius={[2, 2, 0, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      <div className="glass-panel p-6 h-[250px] rounded-2xl">
        <h3 className="text-[10px] font-orbitron text-slate-500 tracking-[0.3em] mb-6 uppercase">
          Neural_Log_Stream
        </h3>
        <div className="space-y-5 overflow-y-auto h-full pr-2 pb-10">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="group">
              <div className="flex gap-4 items-start">
                <span className="text-[9px] font-mono text-blue-500 opacity-50">0{i}:00</span>
                <div className="flex-1">
                  <p className="text-[10px] text-slate-300 font-medium tracking-wide">
                    Segment_{i*12}_optimization complete.
                  </p>
                  <div className="h-[1px] w-full bg-blue-500/10 mt-2"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
