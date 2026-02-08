
import { useState, useEffect, useRef, useCallback } from 'react';
import { LogEntry, SystemState, ViewType } from './types';
import { NAVIGATION, ASCII_LOGO, CORE_PURPOSE } from './constants';
import TerminalOutput from './components/TerminalOutput';
import StatusBar from './components/StatusBar';
import { getSystemIntelligence } from './services/geminiService';

const App: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [state, setState] = useState<SystemState>(SystemState.BOOTING);
  const [view, setView] = useState<ViewType>('dashboard');
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const addLog = useCallback((content: string, type: LogEntry['type'] = 'system') => {
    const newLog: LogEntry = {
      content,
      type,
      timestamp: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };
    setLogs(prev => [...prev, newLog]);
  }, []);

  useEffect(() => {
    const bootSequence = [
      { msg: 'ONYX_CORE INITIALIZING...', delay: 400 },
      { msg: 'INTEGRATING DIAGNOSTIC_ENGINE... [OK]', delay: 800 },
      { msg: 'CALIBRATING GROWTH_METRICS... [10X READY]', delay: 1200 },
      { msg: 'ONYX SYSTEMS v5.0.1 - SECURE SHELL READY.', delay: 1600 },
      { msg: "Welcome to Onyx. Use 'help' to see system commands.", delay: 1900 },
    ];

    bootSequence.forEach((step, i) => {
      setTimeout(() => {
        addLog(step.msg, 'system');
        if (i === bootSequence.length - 1) setState(SystemState.READY);
      }, step.delay);
    });
  }, [addLog]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  const handleCommand = async (cmd: string) => {
    const cleanCmd = cmd.trim().toLowerCase();
    if (!cleanCmd) return;

    addLog(cmd, 'command');
    setInputValue('');

    if (cleanCmd === 'clear') {
      setLogs([]);
      return;
    }

    if (cleanCmd === 'dashboard' || cleanCmd === 'exit' || cleanCmd === 'home') {
      setView('dashboard');
      addLog('Returning to main dashboard...', 'system');
      return;
    }

    if (cleanCmd === 'help') {
      addLog('ONYX OPERATIONAL COMMANDS:', 'system');
      NAVIGATION.forEach(n => addLog(`  - ${n.command}: ${n.description}`, 'system'));
      addLog('  - dashboard: Return to main view', 'system');
      addLog('  - query [prompt]: Consult Onyx Intelligence', 'system');
      return;
    }

    if (cleanCmd.includes('admin') || cleanCmd.includes('contact') || cleanCmd.includes('onyx_admin')) {
      addLog('--- SECURE CONTACT CHANNEL ---', 'system');
      addLog('OPERATOR: Cristian Acevedo', 'system');
      addLog('DIRECT LINE: 651-717-5556', 'system');
      addLog('SECURE MAIL: cristian007@acevedoonyx.net', 'system');
      return;
    }

    if (cleanCmd.startsWith('query ') || cleanCmd.startsWith('ask ')) {
      const prompt = cleanCmd.replace(/^(query|ask)\s+/, '');
      setState(SystemState.PROCESSING);
      addLog(`Querying Onyx Intelligence for: "${prompt}"...`, 'system');
      const response = await getSystemIntelligence(prompt);
      addLog(response, 'ai');
      setState(SystemState.READY);
      return;
    }

    const matchedNav = NAVIGATION.find(n => n.command.toLowerCase() === cleanCmd);
    if (matchedNav) {
      if (matchedNav.view) setView(matchedNav.view);
      addLog(`Executing protocol for ${matchedNav.label}...`, 'system');
      
      setTimeout(async () => {
        const response = await getSystemIntelligence(`Deep dive into Onyx ${matchedNav.label} capabilities. Focus on solving deep system issues, high-reliability I.T., and building web platforms that drive 10x customer conversion.`);
        addLog(response, 'ai');
      }, 800);
      return;
    }

    addLog(`CMD_ERR: '${cleanCmd}' is not recognized. Check 'help'.`, 'error');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (state === SystemState.PROCESSING) return;
    handleCommand(inputValue);
  };

  const renderRightContent = () => {
    switch (view) {
      case 'it-work':
        return (
          <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-right duration-500">
            <div className="p-8 border border-emerald-500/30 bg-black/40 rounded-lg backdrop-blur-sm relative overflow-hidden group min-h-[500px]">
              <div className="absolute top-0 right-0 p-4 opacity-10 font-mono text-xs select-none">ONYX_CORE_DIAG</div>
              <h2 className="text-4xl font-bold text-emerald-500 mb-4 tracking-tighter uppercase">IT Problem Solving</h2>
              <p className="text-white/80 text-sm leading-relaxed mb-6 font-mono">
                When your system fails, your revenue stops. Most IT firms just "reboot." Onyx performs surgical forensics to find the root cause—whether it's kernel instability, network micro-stutters, or silent tech debt. We solve the problems other guys call "unfixable."
              </p>
              <div className="space-y-4">
                <div className="flex gap-4 items-start p-4 border border-white/5 bg-white/5 rounded hover:bg-white/10 transition-colors">
                  <span className="text-emerald-500 font-bold">[01]</span>
                  <div>
                    <h3 className="text-white font-bold text-sm uppercase">Diagnostic Mastery</h3>
                    <p className="text-white/40 text-xs">We analyze data flows and system logs to identify exactly where your performance is leaking.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start p-4 border border-white/5 bg-white/5 rounded hover:bg-white/10 transition-colors">
                  <span className="text-emerald-500 font-bold">[02]</span>
                  <div>
                    <h3 className="text-white font-bold text-sm uppercase">Infrastructure Stability</h3>
                    <p className="text-white/40 text-xs">Transforming chaotic setups into high-availability environments with 99.9% uptime.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start p-4 border border-white/5 bg-white/5 rounded hover:bg-white/10 transition-colors">
                  <span className="text-emerald-500 font-bold">[03]</span>
                  <div>
                    <h3 className="text-white font-bold text-sm uppercase">Ghost-in-the-Machine Fixes</h3>
                    <p className="text-white/40 text-xs">Intermittent crashes? Slow network? We dive into the deep stack to optimize the core.</p>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setView('dashboard')}
                className="mt-8 text-[10px] text-emerald-500 uppercase tracking-[0.3em] hover:text-white transition-colors"
              >
                [ ESC TO DASHBOARD ]
              </button>
            </div>
          </div>
        );
      case 'web-dev':
        return (
          <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-right duration-500">
            <div className="p-8 border border-blue-500/30 bg-black/40 rounded-lg backdrop-blur-sm relative overflow-hidden min-h-[500px]">
              <h2 className="text-4xl font-bold text-blue-400 mb-4 tracking-tighter uppercase">Web Engineering</h2>
              <p className="text-white/80 text-sm leading-relaxed mb-6 font-mono">
                A website isn't just a design—it's your best salesperson. If your site is slow, confusing, or non-existent, you are throwing away leads. Onyx builds customer magnets optimized for 10x engagement.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-white/5 bg-white/5 rounded hover:bg-blue-500/10 transition-colors">
                  <h3 className="text-blue-400 font-bold text-sm mb-1 uppercase tracking-tighter">Every Click Should Lead Somewhere</h3>
                  <p className="text-white/30 text-[10px]">We use behavioral data to create sites that convert.</p>
                </div>
                <div className="p-4 border border-white/5 bg-white/5 rounded hover:bg-blue-500/10 transition-colors">
                  <h3 className="text-blue-400 font-bold text-sm mb-1 uppercase tracking-tighter">Outdated Websites Lose Customers</h3>
                  <p className="text-white/30 text-[10px]">We build modern, high-performance sites that inspire trust and drive action.</p>
                </div>
                <div className="col-span-full p-6 border border-blue-500/20 bg-blue-500/5 rounded text-center">
                  <div className="text-4xl font-bold text-white mb-1">Results You Can Measure</div>
                  <div className="text-[10px] text-blue-400 uppercase tracking-[0.5em] font-bold">Digital Growth Engine</div>
                </div>
              </div>
              <button 
                onClick={() => setView('dashboard')}
                className="mt-8 text-[10px] text-blue-400 uppercase tracking-[0.3em] hover:text-white transition-colors"
              >
                [ ESC_TO_DASHBOARD ]
              </button>
            </div>
          </div>
        );
      case 'security':
        return (
          <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-right duration-500">
            <div className="p-8 border border-red-500/30 bg-black/40 rounded-lg backdrop-blur-sm relative overflow-hidden min-h-[500px]">
              <h2 className="text-4xl font-bold text-red-500 mb-4 tracking-tighter uppercase">Security Protocols</h2>
              <p className="text-white/80 text-sm leading-relaxed mb-6 font-mono">
                Offensive security audits to ensure your business remains bulletproof. We break your system so no one else can.
              </p>
              <div className="space-y-4">
                <div className="p-4 border border-red-500/10 bg-red-500/5 rounded">
                  <h3 className="text-red-500 font-bold text-sm mb-1 uppercase">Pentesting & Patching</h3>
                  <p className="text-white/40 text-xs">Immediate identification and resolution of loopholes before they become disasters.</p>
                </div>
                <div className="p-6 border border-white/10 bg-white/5 rounded">
                  <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-3">Direct Secure Channel</h3>
                  <div className="font-mono text-xs space-y-2">
                    <p className="text-white/60">EMAIL: <span className="text-red-400">cristian007@acevedoonyx.net</span></p>
                    <p className="text-white/60">PHONE: <span className="text-red-400">651-717-5556</span></p>
                    <p className="text-white/40 italic mt-2">Operator: Cristian Acevedo</p>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setView('dashboard')}
                className="mt-8 text-[10px] text-red-500 uppercase tracking-[0.3em] hover:text-white transition-colors"
              >
                [ ESC_TO_DASHBOARD ]
              </button>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex flex-col gap-6 animate-in fade-in duration-500">
            {/* Mission / Quote Bar */}
            <div className="p-6 bg-emerald-500/10 border-l-4 border-emerald-500 rounded-r-lg">
              <h2 className="text-white font-mono text-lg font-bold leading-tight">
                "The business you need isn't the one that just works — it's the one that <span className="text-emerald-500 underline decoration-2 underline-offset-4">scales and stays secure.</span>"
              </h2>
              <p className="text-white/40 text-[10px] uppercase tracking-widest mt-2 font-mono">— Onyx Strategic Intelligence</p>
            </div>

            <div className="relative aspect-video overflow-hidden rounded-lg border border-white/10 group bg-black shadow-2xl">
               <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
               <img 
                 src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200" 
                 alt="Onyx Server Infrastructure"
                 className="object-cover w-full h-full grayscale opacity-70 group-hover:opacity-90 transition-all duration-1000"
               />
               <div className="absolute bottom-6 left-6 z-20">
                 <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-white mb-2 leading-tight uppercase">
                   Problems <span className="text-emerald-500">Solved.</span> <br/>
                   Convert more visitors <span className="text-emerald-500">into revenue.</span>
                 </h2>
                 <p className="text-white/50 max-w-sm text-xs leading-relaxed font-mono uppercase tracking-wider">
                   Engineering excellence in cybersecurity, IT forensics, and high-conversion web growth.
                 </p>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div 
                 className="p-5 border border-white/5 bg-white/5 rounded-lg hover:border-emerald-500/40 transition-all cursor-pointer group" 
                 onClick={() => handleCommand('sysctl --solve-problems')}
               >
                  <div className="text-[9px] text-emerald-500 font-bold uppercase mb-2">SYSTEM_INTEGRITY</div>
                  <div className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors">IT & Problem Solving</div>
                  <p className="text-[10px] text-white/40 mt-2">Stabilizing complex environments and solving "unfixable" tech debt.</p>
               </div>
               <div 
                 className="p-5 border border-white/5 bg-white/5 rounded-lg hover:border-blue-500/40 transition-all cursor-pointer group" 
                 onClick={() => handleCommand('deploy customer_magnet')}
               >
                  <div className="text-[9px] text-blue-400 font-bold uppercase mb-2">GROWTH_ENGINE</div>
                  <div className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors">Web Dev & 10x ROI</div>
                  <p className="text-[10px] text-white/40 mt-2">Conversion-first websites that turn traffic into revenue.</p>
               </div>
            </div>

            <div className="p-6 border border-emerald-500/20 bg-emerald-500/5 rounded-lg border-l-4">
               <h3 className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Secure Command Center
               </h3>
               <div className="flex flex-col gap-2 font-mono text-sm text-white/70">
                  <div className="flex justify-between border-b border-white/5 pb-1">
                     <span className="text-white/30 italic uppercase text-[10px]">Operator</span>
                     <span className="font-bold text-white">Cristian Acevedo</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1">
                     <span className="text-white/30 italic uppercase text-[10px]">Comms</span>
                     <span className="text-emerald-400">651-717-5556</span>
                  </div>
                  <div className="flex justify-between">
                     <span className="text-white/30 italic uppercase text-[10px]">Secure Email</span>
                     <span className="text-white/90 text-[11px] font-bold">cristian007@acevedoonyx.net</span>
                  </div>
               </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-4 md:p-8 selection:bg-emerald-500/30">
      <header className="flex flex-col md:flex-row justify-between items-start mb-12 animate-in slide-in-from-top duration-700">
        <div className="mb-8 md:mb-0 cursor-pointer" onClick={() => setView('dashboard')}>
          <pre className="text-[8px] md:text-[10px] leading-tight text-emerald-500 opacity-90 select-none">
            {ASCII_LOGO}
          </pre>
          <p className="mt-4 text-white/50 text-[10px] tracking-[0.4em] uppercase font-bold">
            {CORE_PURPOSE}
          </p>
        </div>
        
        <nav className="flex flex-wrap gap-4 md:gap-8">
          <button
            onClick={() => setView('dashboard')}
            className={`text-xs uppercase tracking-widest transition-colors border-b pb-1 ${
              view === 'dashboard' ? 'text-emerald-400 border-emerald-400' : 'text-white/60 border-transparent hover:text-emerald-400'
            }`}
          >
            Home
          </button>
          {NAVIGATION.map((item) => (
            <button
              key={item.label}
              onClick={() => handleCommand(item.command)}
              className={`text-xs uppercase tracking-widest transition-colors border-b pb-1 ${
                view === item.view ? 'text-emerald-400 border-emerald-400' : 'text-white/60 border-transparent hover:text-emerald-400'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button 
            className="px-4 py-1.5 border border-emerald-500 text-emerald-500 text-[10px] uppercase tracking-tighter hover:bg-emerald-500 hover:text-black transition-all"
            onClick={() => handleCommand('finger onyx_admin')}
          >
            Deploy
          </button>
        </nav>
      </header>

      <main className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12 items-stretch">
        <div className="flex flex-col border border-white/10 bg-black/60 backdrop-blur-md rounded-lg overflow-hidden relative shadow-2xl shadow-emerald-500/5">
          <div className="bg-white/5 px-4 py-2 border-b border-white/10 flex items-center justify-between">
            <div className="flex gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/30" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/30" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/30" />
            </div>
            <span className="text-[9px] text-white/30 font-mono tracking-tighter uppercase">
              {view === 'dashboard' ? 'ONYX_ROOT_ACCESS' : `ONYX_${view.toUpperCase()}_MODE`}
            </span>
          </div>

          <div 
            ref={scrollRef}
            className="flex-grow p-6 overflow-y-auto max-h-[550px] scroll-smooth"
            onClick={() => inputRef.current?.focus()}
          >
            <TerminalOutput logs={logs} />
            
            {state !== SystemState.BOOTING && (
              <form onSubmit={handleSubmit} className="flex items-center gap-2 group mt-2">
                <span className="text-emerald-500 font-bold shrink-0 animate-pulse">{'>'}</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  disabled={state === SystemState.PROCESSING}
                  className="bg-transparent border-none outline-none text-emerald-400 w-full font-mono text-sm caret-emerald-500 disabled:opacity-50"
                  autoFocus
                  spellCheck={false}
                  placeholder={state === SystemState.PROCESSING ? "ANALYZING PACKETS..." : "onyx@admin:~$"}
                />
              </form>
            )}
          </div>
        </div>

        <div className="relative min-h-[400px]">
          {renderRightContent()}
        </div>
      </main>

      <section className="mt-auto py-12 border-t border-white/10">
        <div className="flex flex-wrap justify-around items-center opacity-20 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-1000 gap-8 px-4 font-mono text-[10px] tracking-[0.6em] text-white">
           <span>DIAGNOSED</span>
           <span>RESOLVED</span>
           <span>ENCRYPTED</span>
           <span>SCALED</span>
           <span>MONETIZED</span>
        </div>
      </section>

      <StatusBar />
    </div>
  );
};

export default App;
