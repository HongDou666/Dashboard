
import React, { useState, useEffect, Suspense } from 'react';
import Scene from './components/Scene';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import StatsOverlay from './components/StatsOverlay';
import Chatbot from './components/Chatbot';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-slate-950">
      {/* 3D Background Layer */}
      <div className="absolute inset-0 z-0">
        <Scene />
      </div>

      {/* UI Overlay Layers */}
      <div className="relative z-10 w-full h-full pointer-events-none flex flex-col">
        <Header />
        
        <div className="flex flex-1 p-6 gap-6">
          <div className="w-1/4 flex flex-col gap-6 pointer-events-auto">
            <Sidebar position="left" />
          </div>
          
          <div className="flex-1 flex flex-col justify-end items-center pb-12">
             <StatsOverlay />
          </div>
          
          <div className="w-1/4 flex flex-col gap-6 pointer-events-auto">
            <Sidebar position="right" />
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 right-6 z-20 pointer-events-auto">
        <Chatbot />
      </div>

      {/* Loading Screen */}
      {loading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950">
          <div className="w-24 h-24 border-t-4 border-blue-500 border-solid rounded-full animate-spin mb-4"></div>
          <p className="text-blue-400 font-orbitron tracking-widest animate-pulse">INITIALIZING NEBULA ENGINE...</p>
        </div>
      )}
    </div>
  );
};

export default App;
