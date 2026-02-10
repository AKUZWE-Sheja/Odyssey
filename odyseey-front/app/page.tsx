'use client';
import { useEffect, useState } from 'react';
// Corrected imports using exact Lucide exports found in react-icons
import { 
  LuLayoutDashboard, 
  LuTheater, 
  LuPalette, 
  LuMic, 
  LuLightbulb, 
  LuUsers, 
  LuChartBar, 
  LuSettings,
  LuActivity, 
  LuZap, 
  LuHeart, 
  LuClock,
  LuDrama,
  LuPanelTop,
  LuSlidersHorizontal, // Fixed: This is the correct export name
  LuWrench,
  LuUtensils,
  LuMegaphone
} from "react-icons/lu";

export default function OdysseyTheaterPro() {
  const [data, setData] = useState<any>(null);

  const handleAction = async (action: 'start' | 'stop') => {
    try {
      const response = await fetch(`http://localhost:3000/theatre/${action}`, {
        method: 'POST', // Critical: This must match your @Post decorator
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        console.log(`Successfully triggered ${action} cue`);
        // Immediately fetch new data so the UI updates without waiting 2 seconds
        const res = await fetch('http://localhost:3000/theatre/dashboard');
        setData(await res.json());
      }
    } catch (error) {
      console.error(`Error triggering ${action}:`, error);
    }
  };
  
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        // Fetching telemetry from your NestJS Gateway
        const res = await fetch('http://localhost:3000/theatre/dashboard');
        const result = await res.json();
        setData(result);
      } catch (e) { console.error("Connection interrupted"); }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  if (!data) return (
    <div className="bg-white h-screen flex items-center justify-center">
      <div className="text-lg text-gray-600 animate-pulse flex items-center gap-2 font-mono uppercase tracking-widest">
        <LuActivity className="animate-spin" /> Initializing Odyssey Hub...
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Static Sidebar - Theater vibe */}
      <aside className="fixed left-0 top-0 h-screen w-64 border-r border-gray-200 bg-white p-6">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg shadow-yellow-900/10">
            <LuDrama className="text-white text-xl" />
          </div>
          <div className="text-gray-900 font-bold text-xl tracking-tighter italic">ODYSSEY</div>
        </div>
        
        <nav className="space-y-1 mb-8">
          <NavItem icon={<LuLayoutDashboard />} label="Dashboard" active />
          <NavItem icon={<LuTheater />} label="Stage Control" />
          <NavItem icon={<LuPalette />} label="Scenery" />
          <NavItem icon={<LuMic />} label="Audio" />
          <NavItem icon={<LuLightbulb />} label="Lighting" />
          <NavItem icon={<LuUsers />} label="Cast & Crew" />
          <NavItem icon={<LuChartBar />} label="Analytics" />
          <NavItem icon={<LuSettings />} label="Settings" />
        </nav>
        
        <div className="mt-auto">
          <div className="p-4 bg-amber-50 rounded-lg border border-amber-100 shadow-sm">
            <p className="text-sm font-medium text-gray-900 mb-2 flex items-center gap-2">
              <LuPanelTop className="text-amber-600" /> Curtain Status
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-600 font-mono uppercase tracking-wider">{data.curtainSpeed}</span>
              <div className={`w-3 h-3 rounded-full ${data.curtainSpeed === 'READY' ? 'bg-green-500' : 'bg-amber-500 animate-pulse'}`}></div>
            </div>
          </div>
        </div>
      </aside>

      <main className="ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8 flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Stage Manager&apos;s Console</h1>
              <p className="text-gray-600 flex items-center gap-2">
                <LuActivity className="text-orange-500" /> Live theatre production
              </p>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <StatCard title="System Health" value={`${data.systemHealth}%`} progress={data.systemHealth} color="bg-amber-500" icon={<LuHeart />} />
            <StatCard title="Audio Levels" value={`${data.audioGain} dB`} progress={75} color="bg-amber-500" icon={<LuSlidersHorizontal />} />
            <StatCard
              title="Curtain Status" 
              value={
                  data.curtainSpeed === 'READY' ? 'Ready' : 
                  data.curtainSpeed === 'OPEN' ? 'Moving' : 
                  'Locked'
                } 
                progress={data.curtainSpeed === 'READY' ? 100 : 50} 
                color= 'bg-amber-500'
                icon={<LuPanelTop />} 
              />
            <StatCard title="Scenery Load" value={`${data.sceneryLoad}%`} progress={data.sceneryLoad} color="bg-amber-500" icon={<LuPalette />} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <LuTheater className="text-yellow-600" /> Stage Performance
                </h2>
                <div className="space-y-4">
                  {data.activeNodes.map((node: any, i: number) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center shadow-inner" style={{ background: `linear-gradient(135deg, ${node.hue}, ${node.hue}88)` }}>
                          <span className="text-white text-lg">{node.status === 'Online' ? <LuLightbulb /> : <LuWrench />}</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{node.name}</p>
                          <p className="text-sm text-gray-500">Hardware Node {i + 1}</p>
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-tighter ${node.status === 'Online' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {node.status}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2"><LuClock className="text-amber-500" /> Production Schedule</h2>
                <div className="space-y-4">
                  <ScheduleItem title="Morning Rehearsal" time="08:30" icon={<LuUsers />} color="bg-blue-50 text-gray-600" />
                  <ScheduleItem title="Technical Check" time="10:30" icon={<LuWrench />} color="bg-purple-50 text-gray-600" />
                  <ScheduleItem title="Lunch Break" time="12:00" icon={<LuUtensils />} color="bg-gray-50 text-gray-600" />
                </div>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-orange-100 rounded-xl border border-amber-100 p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2"><LuMegaphone className="text-amber-600" /> Quick Actions</h2>
              <div className="space-y-3">
                <button 
                  onClick={() => handleAction('start')}
                  className="w-full py-3 bg-white rounded-lg border border-gray-200 text-gray-900 font-bold text-sm shadow-sm hover:shadow-md transition-all active:scale-95"
                >
                  Start Cue
                </button>
                
                <button 
                  onClick={() => handleAction('stop')}
                  className="w-full py-3 bg-amber-500 rounded-lg text-white font-bold text-sm shadow-md hover:bg-amber-600 transition-all active:scale-95"
                >
                  Emergency Stop
                </button>
              </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active = false }: any) {
  return (
    <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${active ? 'bg-amber-50 text-amber-700 font-bold border border-amber-100 shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}>
      <span className="text-xl">{icon}</span>
      <span className="text-sm uppercase tracking-wider">{label}</span>
    </button>
  );
}

function StatCard({ title, value, progress, color, icon }: any) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-all group">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{title}</p>
          <h3 className="text-2xl font-black text-gray-900">{value}</h3>
        </div>
        <div className="text-2xl text-gray-300 group-hover:text-gray-900 transition-colors">{icon}</div>
      </div>
      <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full ${color} transition-all duration-1000`} style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
}

function ScheduleItem({ title, time, icon, color }: any) {
  return (
    <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-all cursor-default group">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl shadow-sm ${color}`}>{icon}</div>
      <div>
        <p className="font-bold text-gray-900 text-sm group-hover:text-amber-600 transition-colors">{title}</p>
        <p className="text-xs text-gray-400">{time}</p>
      </div>
    </div>
  );
}