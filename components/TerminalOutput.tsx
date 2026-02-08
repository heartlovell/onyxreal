
import React from 'react';
import { LogEntry } from '../types';

interface TerminalOutputProps {
  logs: LogEntry[];
}

const TerminalOutput: React.FC<TerminalOutputProps> = ({ logs }) => {
  return (
    <div className="space-y-2 mb-4 font-mono text-sm">
      {logs.map((log, index) => (
        <div key={index} className="animate-in fade-in duration-300">
          <span className="text-white/30 mr-2 text-[10px]">{log.timestamp}</span>
          <span className={`
            ${log.type === 'command' ? 'text-blue-400' : ''}
            ${log.type === 'system' ? 'text-emerald-400' : ''}
            ${log.type === 'ai' ? 'text-purple-400' : ''}
            ${log.type === 'error' ? 'text-red-400' : ''}
          `}>
            {log.type === 'command' && '> '}
            {log.type === 'system' && '[SYSTEM] '}
            {log.type === 'ai' && '[INTELLIGENCE] '}
            {log.type === 'error' && '[FATAL] '}
            {log.content}
          </span>
        </div>
      ))}
    </div>
  );
};

export default TerminalOutput;
