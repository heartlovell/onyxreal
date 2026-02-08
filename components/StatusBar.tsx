
import React, { useState, useEffect } from 'react';
import { SYSTEM_NAME } from '../constants';

const StatusBar: React.FC = () => {
  const [uptime, setUptime] = useState(0);
  const [memUsage, setMemUsage] = useState(14.2);

  useEffect(() => {
    const timer = setInterval(() => {
      setUptime(prev => prev + 1);
      setMemUsage(prev => {
        const delta = (Math.random() - 0.5) * 0.1;
        return parseFloat((prev + delta).toFixed(1));
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#0a0a0a] border-t border-white/10 px-4 py-1 flex justify-between items-center text-[10px] uppercase tracking-widest text-white/40 z-50">
      <div className="flex gap-4">
        <span>{SYSTEM_NAME}</span>
        <span className="text-emerald-500 font-bold">STATUS: STABLE</span>
      </div>
      <div className="flex gap-6">
        <span>MEM: {memUsage}GB / 32GB</span>
        <span>UPTIME: {formatTime(uptime)}</span>
        <span className="hidden md:inline">LOC: 40.7128° N, 74.0060° W</span>
      </div>
    </div>
  );
};

export default StatusBar;
