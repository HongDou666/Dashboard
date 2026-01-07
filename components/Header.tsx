
import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="w-full px-16 py-10 flex justify-between items-start pointer-events-none">
      <div className="flex flex-col gap-1 pointer-events-auto">
        <h1 className="text-4xl font-orbitron font-bold tracking-[0.6em] text-white flex items-center gap-4">
          NEBULA <span className="text-blue-500/80 font-light text-2xl tracking-[0.2em]">OS_X</span>
        </h1>
        <div className="flex items-center gap-4 mt-2">
          <div className="h-[1px] w-24 bg-gradient-to-r from-blue-500/80 to-transparent"></div>
          <span className="text-[10px] font-mono tracking-[0.4em] text-blue-400 opacity-60 uppercase">Quantum_Surveillance_Interface</span>
        </div>
      </div>

      <div className="flex flex-col items-end pointer-events-auto">
        <div className="text-right">
          <p className="text-3xl font-orbitron font-bold text-white tracking-widest glow-text">
            {time.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </p>
          <div className="flex items-center justify-end gap-3 mt-1 opacity-40">
            <span className="text-[10px] font-mono tracking-widest">STARDATE_{time.getFullYear()}.0{time.getMonth()+1}</span>
            <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
            <span className="text-[10px] font-mono tracking-widest uppercase">Node_Primary</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
