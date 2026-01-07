
import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="w-full px-12 py-8 flex justify-between items-center bg-gradient-to-b from-black/40 to-transparent">
      <div className="flex items-center gap-6">
        <div className="relative">
           <div className="w-12 h-[1px] bg-blue-500/50 absolute -left-14 top-1/2"></div>
           <h1 className="text-3xl font-orbitron font-bold tracking-[0.4em] text-white">
            NEBULA<span className="text-blue-500 font-light opacity-80">OS</span>
           </h1>
        </div>
        <div className="h-4 w-[1px] bg-slate-800"></div>
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <span className="text-[10px] font-orbitron tracking-widest text-slate-400">SYS_RELAY_ON</span>
        </div>
      </div>

      <div className="flex gap-16 items-center">
        <div className="text-right">
          <p className="text-[20px] font-orbitron text-white leading-none mb-1 tracking-widest">
            {time.toLocaleTimeString([], { hour12: false })}
          </p>
          <p className="text-[9px] font-orbitron text-blue-500/60 uppercase tracking-[0.3em]">
            Stardate_{time.getFullYear()}.{time.getMonth()+1}
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
