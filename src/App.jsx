import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Weight, Package, ShoppingCart, Settings, Camera, 
  AlertTriangle, Activity, Menu, Bell, Cpu, Truck, History, FileText, 
  Users, TrendingUp, Plus, Search, CheckCircle2, Clock, Printer, 
  ChevronDown, DollarSign, UserPlus, Mail, ShieldCheck, Globe, 
  Database, Link, ChevronRight, LogOut, Zap, Box, CreditCard, User, 
  Key, Shield, Smartphone, ChevronLeft, ArrowRight, Download, Share2, 
  Phone, MapPin, Star, Sparkles, Loader2, BrainCircuit
} from 'lucide-react';

// --- GLOBAL UI HELPERS (DIDEFINISIKAN SEKALI DI LUAR APP) ---

const MenuSection = ({ title, isExpanded, color = "text-slate-300" }) => (
  isExpanded ? (
    <div className={`pt-10 pb-4 px-5 text-[9px] font-black uppercase tracking-[0.4em] ${color} opacity-80 flex items-center gap-3`}>
      {title}
      <div className="flex-1 h-px bg-slate-50"></div>
    </div>
  ) : <div className="h-10" />
);

const NavItem = ({ icon, label, active = false, isExpanded, onClick, highlight = false }) => (
  <button 
    onClick={onClick}
    className={`
      w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-500 group relative overflow-hidden
      ${active ? 'bg-blue-600 text-white shadow-2xl shadow-blue-500/40 translate-x-2' : 'text-slate-400 hover:bg-blue-50/50 hover:text-blue-600'}
      ${highlight && !active ? 'border-2 border-blue-50 bg-blue-50/20 text-blue-700 font-black' : ''}
      ${!isExpanded ? 'justify-center px-0' : ''}
    `}
  >
    <div className={`${active ? 'scale-110 drop-shadow-xl rotate-0' : 'opacity-60 group-hover:opacity-100 group-hover:scale-110 group-hover:rotate-3'} transition-all duration-500`}>{icon}</div>
    {isExpanded && <span className={`text-[11px] uppercase tracking-[0.2em] ${active ? 'font-black' : 'font-bold'}`}>{label}</span>}
    {active && <div className="absolute right-0 top-1/4 bottom-1/4 w-1 bg-white rounded-l-full"></div>}
  </button>
);

const StatCard = ({ title, value, icon, trend, color }) => {
  const colors = {
    blue: "bg-blue-600 shadow-blue-500/20",
    green: "bg-green-500 shadow-green-500/20",
    red: "bg-red-500 shadow-red-500/20",
    purple: "bg-purple-600 shadow-purple-500/20"
  };
  return (
    <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-700 group cursor-default relative overflow-hidden text-left">
      <div className="flex justify-between items-start mb-8 relative z-10">
        <div className={`p-4 rounded-2xl transition-all duration-700 text-white shadow-xl group-hover:rotate-12 ${colors[color]}`}>{icon}</div>
        <div className={`text-[10px] font-black px-3 py-1.5 rounded-xl ${color === 'red' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
          {trend}
        </div>
      </div>
      <div className="relative z-10">
         <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">{title}</p>
         <h3 className="text-3xl font-black mt-2 text-slate-900 tracking-tighter">{value}</h3>
      </div>
    </div>
  );
};

const FinanceRow = ({ label, value, trend, isPositive }) => (
  <div className="flex justify-between items-center group cursor-default text-left">
    <div>
      <p className="text-slate-800 font-black text-sm group-hover:text-blue-600 transition-colors">{label}</p>
      <p className={`text-[10px] font-bold ${isPositive ? 'text-green-500' : 'text-red-500'} mt-1`}>{trend} vs bulan lalu</p>
    </div>
    <p className="font-mono font-black text-slate-800 text-lg">{value}</p>
  </div>
);

const FilterBtn = ({ label, active = false }) => (
  <button className={`px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all border-2 ${active ? 'bg-slate-900 text-white border-slate-900 shadow-lg' : 'bg-white text-slate-400 border-slate-100 hover:border-blue-200 hover:text-blue-600'}`}>
    {label}
  </button>
);

const CustomerStat = ({ title, value, subtitle }) => (
  <div className="bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-700 group overflow-hidden relative text-left">
    <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] mb-3">{title}</p>
    <h3 className="text-5xl font-black text-slate-900 group-hover:text-blue-600 transition-colors tracking-tighter">{value}</h3>
    <p className="text-[11px] font-bold text-green-600 mt-6 flex items-center gap-2">
       <div className="w-2 h-2 bg-green-500 rounded-full shadow-sm shadow-green-200"></div> {subtitle}
    </p>
    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/20 rounded-full blur-[60px] -mr-16 -mt-16 group-hover:scale-125 transition-transform"></div>
  </div>
);

const ToggleSwitch = ({ label, description, defaultChecked = false, onToggle }) => {
  const [checked, setChecked] = useState(defaultChecked);
  const handleToggle = () => {
    const nextValue = !checked;
    setChecked(nextValue);
    if (onToggle) onToggle(nextValue);
  };
  return (
    <div className="flex justify-between items-center p-6 bg-slate-50/50 rounded-[2.5rem] border border-slate-100 hover:border-blue-300 hover:bg-white transition-all duration-500 group cursor-pointer text-left" onClick={handleToggle}>
       <div className="flex-1 pr-6">
          <span className="font-black text-slate-800 text-sm block tracking-tight group-hover:text-blue-600 transition-colors">{label}</span>
          <span className="text-[11px] text-slate-400 font-bold block mt-1 uppercase tracking-widest">{description}</span>
       </div>
       <button className={`w-14 h-8 rounded-full p-1 transition-all duration-700 relative shadow-inner ${checked ? 'bg-blue-600' : 'bg-slate-300'}`}>
         <div className={`w-6 h-6 bg-white rounded-full shadow-xl transform transition-all duration-500 flex items-center justify-center ${checked ? 'translate-x-6 rotate-180' : 'translate-x-0'}`}>
            <div className={`w-1 h-2 rounded-full ${checked ? 'bg-blue-600' : 'bg-slate-200'}`}></div>
         </div>
       </button>
    </div>
  );
};

const InputGroup = ({ label, value }) => (
  <div className="space-y-3 group text-left">
     <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] px-2 group-focus-within:text-blue-600 transition-colors">{label}</label>
     <input type="text" defaultValue={value} className="w-full p-5 bg-slate-50/50 border-2 border-slate-100 rounded-[1.5rem] focus:outline-none focus:border-blue-600 focus:bg-white font-black text-slate-800 text-sm transition-all shadow-sm" />
  </div>
);

const SettingsNavItem = ({ icon, label, active = false }) => (
  <button className={`w-full flex items-center gap-4 p-5 rounded-[2rem] text-[10px] font-black transition-all uppercase tracking-[0.2em] border-2 ${active ? 'bg-blue-600 text-white border-blue-600 shadow-2xl shadow-blue-500/20 translate-x-3' : 'bg-white text-slate-400 border-transparent hover:bg-slate-50 hover:text-slate-600'}`}>
    {icon} {label}
  </button>
);

const ProfileLink = ({ icon, label, description }) => (
  <button className="w-full flex items-center gap-5 p-5 bg-slate-50 border border-slate-100 rounded-[2rem] hover:bg-white hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 transition-all group text-left">
     <div className="p-3 bg-white rounded-2xl border border-slate-100 text-slate-400 group-hover:text-blue-600 group-hover:bg-blue-50 transition-all shadow-sm">{icon}</div>
     <div className="flex-1">
        <p className="font-black text-sm text-slate-800 tracking-tight">{label}</p>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{description}</p>
     </div>
     <ChevronRight size={18} className="ml-auto text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
  </button>
);

const ActivityItem = ({ title, time, device, icon }) => (
  <div className="flex gap-8 relative group text-left">
     <div className="absolute left-[27px] top-14 bottom-[-40px] w-0.5 bg-slate-50 group-last:hidden"></div>
     <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center relative z-10 shadow-sm group-hover:scale-110 group-hover:border-blue-100 transition-all group-hover:shadow-lg">
        {icon}
     </div>
     <div className="flex-1 pb-10 border-b border-slate-50">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-2">
           <h4 className="font-black text-slate-800 tracking-tight text-lg">{title}</h4>
           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-lg border border-slate-100">{time}</span>
        </div>
        <p className="text-xs text-slate-400 font-bold flex items-center gap-2 uppercase tracking-widest"><Smartphone size={12}/> {device}</p>
     </div>
  </div>
);

// --- COMPONENT: AI RESULT MODAL ---
const AiResultModal = ({ show, loading, response, onClose }) => {
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden border border-blue-100 flex flex-col max-h-[80vh]">
        <div className="p-8 bg-gradient-to-r from-blue-600 to-indigo-700 text-white flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-2.5 rounded-2xl backdrop-blur-md border border-white/20">
              <Sparkles size={20} className="animate-pulse text-white" />
            </div>
            <div className="text-left">
              <h3 className="font-black uppercase tracking-[0.2em] text-[11px] opacity-80 text-white/80">Analisa Sistem</h3>
              <p className="font-black text-lg tracking-tight text-white leading-none mt-1 text-white">Fimosa AI Insight ✨</p>
            </div>
          </div>
          <button onClick={onClose} className="hover:bg-white/20 p-3 rounded-2xl transition-colors text-white">
            <LogOut size={20} className="rotate-180" />
          </button>
        </div>
        <div className="p-10 overflow-y-auto custom-scrollbar flex-1 bg-slate-50/30 text-left text-slate-800">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 gap-6">
              <div className="relative">
                 <Loader2 className="w-16 h-16 text-blue-600 animate-spin" />
                 <BrainCircuit className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-400 w-6 h-6 animate-pulse" />
              </div>
              <p className="font-black text-slate-500 animate-pulse tracking-widest uppercase text-[10px]">Processing via Gemini AI...</p>
            </div>
          ) : (
            <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed font-bold text-sm">
              {response && typeof response === 'string' ? (
                response.split('\n').map((line, i) => <p key={i} className="mb-5">{line}</p>)
              ) : (
                <p>Gagal memuat analisis AI.</p>
              )}
            </div>
          )}
        </div>
        <div className="p-8 border-t border-slate-100 bg-white flex justify-end gap-4">
           <button onClick={onClose} className="px-8 py-3 rounded-xl font-black text-slate-400 hover:text-slate-600 text-[10px] uppercase tracking-widest transition-all">Tutup</button>
        </div>
      </div>
    </div>
  );
};

// --- CORE APP COMPONENT ---

export default function App() {
  // Global States
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [currentView, setCurrentView] = useState('dashboard'); 
  const [selectedDetail, setSelectedDetail] = useState(null); 
  
  // AI States
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState(null);
  const [showAiModal, setShowAiModal] = useState(false);

  // IoT Simulation States
  const [liveWeight, setLiveWeight] = useState(0.00);
  const [isStable, setIsStable] = useState(true);

  // IoT Simulation Logic
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        setIsStable(false);
        const fluctuation = (Math.random() * 0.4 - 0.2);
        setLiveWeight(prev => {
          const newWeight = prev === 0 ? 15.50 : (prev < 2 ? 15.50 : prev + fluctuation);
          return parseFloat(newWeight.toFixed(2));
        });
        setTimeout(() => setIsStable(true), 1500);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Gemini API Action
  const callGemini = async (prompt) => {
    const apiKey = ""; 
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
    
    setAiLoading(true);
    setAiResponse(null);
    setShowAiModal(true);

    const payload = {
      contents: [{ parts: [{ text: prompt }] }],
      systemInstruction: { parts: [{ text: "Anda adalah pakar Analis Bisnis ERP untuk Fimosa Technology Indonesia. Berikan saran yang cerdas, profesional, dan dalam bahasa Indonesia." }] }
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      setAiResponse(data.candidates?.[0]?.content?.parts?.[0]?.text);
    } catch (error) {
      setAiResponse("Maaf, terjadi gangguan koneksi ke AI. Silakan coba lagi.");
    } finally {
      setAiLoading(false);
    }
  };

  const navigateTo = (view, detail = null) => {
    setCurrentView(view);
    setSelectedDetail(detail);
    window.scrollTo(0, 0);
  };

  // --- INTERNAL SUB-VIEWS ---

  const DashboardView = () => (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard title="Total Pendapatan" value="Rp 128.450k" icon={<TrendingUp size={24}/>} trend="+15.2%" color="blue" />
        <StatCard title="Paket Terkirim" value="1.240" icon={<Truck size={24}/>} trend="+8.4%" color="green" />
        <StatCard title="Item Kritis" value="14 SKU" icon={<Package size={24}/>} trend="Perlu Reorder" color="red" />
        <StatCard title="Node IoT Aktif" value="12 Unit" icon={<Zap size={24}/>} trend="Optimal" color="purple" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm text-left">
           <h3 className="font-bold text-xl text-slate-800 tracking-tight mb-8">Status Timbangan Live</h3>
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex justify-between items-center hover:bg-white hover:shadow-lg transition-all cursor-pointer" onClick={() => navigateTo('iot')}>
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 font-black shadow-sm">#01</div>
                    <p className="font-bold text-sm text-slate-800">Hub Jakarta</p>
                 </div>
                 <div className="text-right">
                    <p className="text-2xl font-mono font-black text-slate-900">{liveWeight.toFixed(2)}</p>
                    <p className="text-[9px] text-slate-400 font-bold uppercase">KG</p>
                 </div>
              </div>
           </div>
        </div>
        <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white flex flex-col justify-between shadow-xl relative overflow-hidden text-left">
           <div className="relative z-10">
              <h3 className="font-black text-xl mb-4 text-white">Smart Audit AI ✨</h3>
              <p className="text-slate-400 text-sm opacity-80 leading-relaxed">Analisis 3 transaksi anomali berat pagi ini secara otomatis.</p>
           </div>
           <button onClick={() => callGemini("Menganalisa data anomali timbangan pagi ini: Ada selisih 1.5kg di 3 invoice berbeda dari Hub Jakarta. Apa langkah mitigasi terbaik bagi warehouse manager?")} className="bg-blue-600 w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest relative z-10 shadow-lg active:scale-95 transition-all">Mulai Analisa AI</button>
           <Activity className="absolute bottom-[-20px] right-[-20px] w-48 h-48 opacity-5 text-white" />
        </div>
      </div>
    </div>
  );

  const SalesView = () => (
    <div className="space-y-8 animate-in slide-in-from-bottom-6 duration-700 text-left">
      <div className="flex justify-between items-center">
        <div>
           <h2 className="text-3xl font-black text-slate-800 tracking-tight">Sales & Invoicing</h2>
           <p className="text-slate-400 text-sm font-medium">Monitoring validasi transaksi melalui integrasi IoT Terminal Hub.</p>
        </div>
        <button className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl flex items-center gap-2 active:scale-95 transition-transform"><Plus size={16}/> Order Baru</button>
      </div>
      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm font-medium text-slate-700">
          <thead>
            <tr className="bg-slate-50 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] border-b border-slate-100">
              <th className="px-10 py-6">ID Invoice</th>
              <th className="px-10 py-6">Customer</th>
              <th className="px-10 py-6 text-center">IoT Weight</th>
              <th className="px-10 py-6 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {[
              { id: 'FIM-90211', client: 'Sentra Grosir Jakarta', weight: '12.45', total: 'Rp 1.450k', status: 'Verified' },
              { id: 'FIM-90212', client: 'Toko Berkah Online', weight: '2.10', total: 'Rp 450k', status: 'Pending' }
            ].map((inv, i) => (
              <tr key={i} className="hover:bg-blue-50/20 transition-all cursor-pointer group" onClick={() => navigateTo('invoice_detail', inv)}>
                <td className="px-10 py-6 font-mono font-black text-blue-600">{inv.id}</td>
                <td className="px-10 py-6 font-bold text-slate-800">{inv.client}</td>
                <td className="px-10 py-6 text-center font-mono font-black text-slate-700">{inv.weight} kg</td>
                <td className="px-10 py-6 text-right">
                   <button className="p-2.5 text-slate-300 group-hover:text-blue-600 bg-white rounded-xl group-hover:shadow-md transition-all"><ChevronRight size={20}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const InventoryView = () => (
    <div className="space-y-10 animate-in slide-in-from-bottom-8 duration-700 text-left">
      <h2 className="text-3xl font-black text-slate-800 tracking-tight">Inventory Master</h2>
      <div className="bg-white rounded-[3rem] border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm font-medium text-slate-700">
          <thead>
            <tr className="bg-slate-50 text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] border-b border-slate-100">
              <th className="px-10 py-8">SKU ID</th>
              <th className="px-10 py-8">Produk</th>
              <th className="px-10 py-8">Stok</th>
              <th className="px-10 py-8">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr className="hover:bg-slate-50">
              <td className="px-10 py-6 font-mono font-black text-slate-400">SKU-001</td>
              <td className="px-10 py-6 font-bold text-slate-800">Bubuk Kopi Arabika 1kg</td>
              <td className="px-10 py-6 font-black text-slate-900">45.0 kg</td>
              <td className="px-10 py-6 text-green-600 font-black uppercase text-[10px]">Optimal</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  const FinanceView = () => (
    <div className="space-y-10 animate-in slide-in-from-bottom-8 duration-700 text-left">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm">
           <h3 className="font-black text-xl text-slate-800 mb-8 tracking-tight">Keuangan Terpadu</h3>
           <div className="space-y-6">
              <FinanceRow label="Pendapatan Bruto" value="Rp 840.500.000" trend="+12%" isPositive />
              <FinanceRow label="Beban Operasional" value="Rp 420.250.000" trend="-5%" isPositive={false} />
              <div className="pt-8 border-t border-dashed border-slate-200">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Profit Bersih (Estimasi)</p>
                <h2 className="text-4xl font-black text-blue-600 tracking-tighter">Rp 420.250.000</h2>
              </div>
           </div>
        </div>
      </div>
    </div>
  );

  const CRMView = () => (
    <div className="space-y-10 animate-in slide-in-from-bottom-8 duration-700 text-left">
      <h2 className="text-3xl font-black text-slate-800 tracking-tight uppercase">Reseller Relations</h2>
      <div className="bg-white rounded-[3rem] border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm font-medium text-slate-700">
          <thead>
            <tr className="bg-slate-50 text-[10px] uppercase font-black text-slate-400 tracking-[0.2em] border-b border-slate-100">
              <th className="px-10 py-8">Partner Profile</th>
              <th className="px-10 py-8">Tipe</th>
              <th className="px-10 py-8 text-right">Detail</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {[
              { name: 'Sentra Grosir Jakarta', type: 'Platinum', location: 'Jakarta Utara' },
              { name: 'Toko Berkah Nusantara', type: 'Gold', location: 'Tangerang Kota' }
            ].map((c, i) => (
              <tr key={i} className="hover:bg-blue-50/40 transition-all cursor-pointer group" onClick={() => navigateTo('crm_detail', c)}>
                <td className="px-10 py-6 font-bold text-slate-800">{c.name}</td>
                <td className="px-10 py-6">
                   <span className="text-[10px] font-black px-4 py-1.5 rounded-full uppercase bg-blue-50 text-blue-600 border border-blue-100">{c.type}</span>
                </td>
                <td className="px-10 py-6 text-right">
                   <button className="p-2.5 text-slate-300 group-hover:text-blue-600 transition-all"><ChevronRight size={20}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const CRMDetailView = () => (
    <div className="space-y-10 animate-in slide-in-from-right-10 duration-700 text-left">
      <button onClick={() => navigateTo('crm')} className="flex items-center gap-3 text-slate-400 hover:text-blue-600 font-black uppercase tracking-widest text-[10px] transition-all group">
        <ChevronLeft size={16} /> Kembali ke CRM Master
      </button>
      <div className="bg-white p-12 rounded-[4rem] border border-slate-200 shadow-sm">
        <h2 className="text-4xl font-black text-slate-900 tracking-tighter">{selectedDetail?.name}</h2>
        <p className="text-blue-600 font-black uppercase tracking-widest text-[10px] mt-2 tracking-[0.2em]">{selectedDetail?.type} Partner • {selectedDetail?.location}</p>
        <button onClick={() => callGemini(`Buat pesan apresiasi profesional untuk ${selectedDetail?.name} atas pencapaian target bulan ini.`)} className="mt-10 bg-blue-600 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl flex items-center justify-center gap-3 active:scale-95 transition-all">Drafting Apresiasi AI ✨</button>
      </div>
    </div>
  );

  const InvoiceDetailView = () => (
    <div className="space-y-10 animate-in slide-in-from-right-10 duration-700 text-left">
      <button onClick={() => navigateTo('sales')} className="flex items-center gap-3 text-slate-400 hover:text-blue-600 font-black uppercase tracking-widest text-[10px] transition-all group">
        <ChevronLeft size={16} /> Kembali ke Invoicing Master
      </button>
      <div className="bg-white p-12 rounded-[4rem] border border-slate-200 shadow-sm relative overflow-hidden">
         <div className="flex justify-between items-start mb-12">
            <div>
               <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Invoice {selectedDetail?.id}</h2>
               <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-2 opacity-60">Terbit: 13 Jan 2026 • 10:45 WIB</p>
            </div>
            <span className="px-6 py-2 bg-green-100 text-green-700 rounded-full font-black text-[10px] uppercase tracking-widest border border-green-200 flex items-center gap-2 shadow-sm"><CheckCircle2 size={12}/> Hardware Verified</span>
         </div>
         <div className="border-t border-slate-100 pt-10 flex justify-between items-end">
            <div>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total IoT Weight</p>
               <h2 className="text-5xl font-mono font-black text-blue-600 tracking-tighter">{selectedDetail?.weight} kg</h2>
            </div>
            <button className="px-10 py-5 bg-blue-600 text-white rounded-[2.5rem] font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-blue-700 shadow-2xl active:scale-95 transition-all"><Printer size={18}/> Print Legal Document</button>
         </div>
      </div>
    </div>
  );

  const IoTView = () => (
    <div className="space-y-10 animate-in fade-in slide-in-from-right-8 duration-700">
      <div className="bg-white rounded-[4rem] border border-slate-200 overflow-hidden shadow-2xl shadow-slate-200/50">
        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/40 text-left">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-3 rounded-2xl shadow-lg shadow-blue-200"><Weight className="text-white" size={24} /></div>
            <div>
               <h2 className="font-black text-sm text-slate-800 uppercase tracking-tight text-slate-800">Terminal Timbangan v4.0</h2>
               <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Node Utama: Jakarta Hub Node-01</p>
            </div>
          </div>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] font-mono">GATEWAY: 192.168.1.104</span>
        </div>
        <div className="p-32 flex flex-col items-center justify-center bg-gradient-to-br from-white via-white to-blue-50/30">
          <div className={`text-[12rem] font-mono font-black tabular-nums transition-all duration-500 relative z-10 ${isStable ? 'text-slate-900' : 'text-blue-600 scale-105 filter blur-[1px]'}`}>
            {liveWeight.toFixed(2)} <span className="text-4xl text-slate-300 font-sans font-black tracking-widest">KG</span>
          </div>
          <div className="mt-20 flex gap-6 w-full max-w-xl relative z-10">
            <button className="flex-1 bg-slate-900 text-white py-6 rounded-[2.5rem] font-black hover:bg-slate-800 transition-all shadow-xl active:scale-95 text-xs tracking-widest uppercase">Set Tare</button>
            <button className="flex-2 bg-blue-600 text-white py-6 px-16 rounded-[2.5rem] font-black hover:bg-blue-700 transition-all shadow-2xl active:scale-95 text-xs tracking-widest uppercase flex items-center justify-center gap-3"><Box size={18}/> Verify & Lock</button>
          </div>
        </div>
      </div>
    </div>
  );

  const ProfileView = () => (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700 text-left">
      <div className="bg-white p-12 rounded-[4rem] border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center gap-12 relative z-10">
           <div className="w-40 h-40 rounded-[3rem] bg-blue-600 p-1.5 shadow-2xl relative group overflow-hidden ring-8 ring-blue-50">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Fimosa&backgroundColor=b6e3f4" className="w-full h-full object-cover rounded-[2.8rem] bg-white transition-transform duration-700 group-hover:scale-110" alt="profile" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer text-white"><Camera size={24} /></div>
           </div>
           <div className="text-center md:text-left flex-1">
              <h2 className="text-5xl font-black text-slate-900 tracking-tighter text-slate-900 leading-none">Administrator</h2>
              <p className="text-blue-600 font-black uppercase tracking-[0.4em] text-xs mt-4">Chief Hub Architect • Enterprise Access</p>
              <div className="flex flex-wrap gap-3 mt-8 justify-center md:justify-start">
                 <span className="px-5 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2 shadow-sm"><Globe size={14}/> HQ Jakarta</span>
                 <span className="px-5 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2 shadow-sm"><ShieldCheck size={14} className="text-green-500"/> Verified Corporate</span>
              </div>
           </div>
           <button className="md:ml-auto px-10 py-5 bg-slate-900 text-white rounded-[2.5rem] font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl active:scale-95">Edit Profil</button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
         <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm">
            <h3 className="font-black text-sm uppercase tracking-[0.2em] text-slate-800 mb-10 flex items-center gap-3"><History size={20} className="text-blue-600"/> Audit Log Aktivitas</h3>
            <div className="space-y-10">
               <ActivityItem title="Login Berhasil" time="Hari ini, 08:30 WIB" device="MacBook Pro • Chrome" icon={<CheckCircle2 className="text-green-500"/>} />
               <ActivityItem title="Modifikasi Konfigurasi IoT" time="Kemarin, 14:20 WIB" device="iPhone 15 Pro" icon={<Settings className="text-amber-500"/>} />
            </div>
         </div>
         <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-sm h-fit">
            <h3 className="font-black text-sm uppercase tracking-[0.2em] text-slate-800 mb-8 flex items-center gap-3"><Key size={20} className="text-blue-600"/> Security Center</h3>
            <div className="space-y-5">
               <ProfileLink icon={<Shield size={20}/>} label="Ubah Master Password" description="Keamanan level AES-256" />
               <ProfileLink icon={<Smartphone size={20}/>} label="Two-Factor Auth (MFA)" description="Status: Aktif & Terlindungi" />
            </div>
         </div>
      </div>
    </div>
  );

  const SettingsView = () => (
    <div className="space-y-10 animate-in slide-in-from-bottom-8 duration-700 text-left">
      <div className="flex flex-col gap-2">
         <h2 className="text-3xl font-black text-slate-800 tracking-tight text-slate-800 leading-none">Konfigurasi ERP</h2>
         <p className="text-sm text-slate-400 font-medium">Kustomisasi parameter sistem dan integrasi cloud hub.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        <div className="lg:col-span-1 space-y-3">
           <SettingsNavItem icon={<Globe size={18}/>} label="Profil Bisnis" active />
           <SettingsNavItem icon={<Cpu size={18}/>} label="IoT Gateway" />
           <SettingsNavItem icon={<Link size={18}/>} label="Omnichannel API" />
        </div>
        <div className="lg:col-span-3 bg-white rounded-[3.5rem] border border-slate-200 shadow-sm p-12 space-y-12">
           <div>
              <h3 className="text-xl font-black mb-8 text-slate-800 flex items-center gap-3"><div className="w-2.5 h-8 bg-blue-600 rounded-full"></div> Identitas Badan Usaha</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <InputGroup label="Nama Resmi PT" value="PT. Fimosa Technology Indonesia" />
                 <InputGroup label="Nomor Pajak (NPWP)" value="01.234.567.8-901.000" />
                 <InputGroup label="Official Billing Email" value="finance@fimosa.id" />
                 <InputGroup label="Helpdesk Support" value="+62 21 5566 7788" />
              </div>
           </div>
           <div className="pt-10 border-t border-slate-100">
              <h3 className="text-xl font-black mb-8 text-slate-800 flex items-center gap-3"><div className="w-2.5 h-8 bg-blue-600 rounded-full"></div> Otomasi & Parameter</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <ToggleSwitch label="PPN Otomatis (11%)" description="Terapkan pajak otomatis pada setiap invoice baru." defaultChecked />
                 <ToggleSwitch label="Validasi Berat Wajib" description="Cegah pembuatan invoice tanpa data timbangan aktif." defaultChecked />
                 <ToggleSwitch label="AI Fraud Detection" description="Alert otomatis jika selisih berat terdeteksi." defaultChecked />
              </div>
           </div>
           <div className="pt-10 flex justify-end">
              <button className="px-12 py-4 bg-blue-600 text-white rounded-[2rem] font-black hover:bg-blue-700 shadow-2xl active:scale-95 transition-all text-[10px] tracking-widest uppercase">Simpan Konfigurasi</button>
           </div>
        </div>
      </div>
    </div>
  );

  // --- RENDER LOGIC ---

  const renderContent = () => {
    switch(currentView) {
      case 'dashboard': return <DashboardView />;
      case 'sales': return <SalesView />;
      case 'inventory': return <InventoryView />;
      case 'finance': return <FinanceView />;
      case 'iot': return <IoTView />;
      case 'crm': return <CRMView />;
      case 'crm_detail': return <CRMDetailView />;
      case 'invoice_detail': return <InvoiceDetailView />;
      case 'profile': return <ProfileView />;
      case 'settings': return <SettingsView />;
      default: return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans text-slate-900 overflow-hidden selection:bg-blue-600 selection:text-white">
      {/* Sidebar Navigation */}
      <aside className={`${isSidebarOpen ? 'w-80' : 'w-24'} bg-white border-r border-slate-200 transition-all duration-700 flex flex-col z-50 shadow-2xl relative`}>
        <div className="p-10 flex items-center gap-5 border-b border-slate-50 relative overflow-hidden group">
          <div className="bg-blue-600 p-3 rounded-2xl shadow-2xl shadow-blue-500/40 z-10 hover:rotate-12 transition-transform cursor-pointer" onClick={() => navigateTo('dashboard')}>
            <LayoutDashboard className="text-white w-7 h-7" />
          </div>
          {isSidebarOpen && (
            <div className="flex flex-col animate-in fade-in slide-in-from-left-4 duration-700">
              <span className="font-black text-2xl tracking-tighter text-slate-900 leading-none">FIMOSA</span>
              <span className="text-[10px] font-black text-blue-500 tracking-[0.4em] mt-2 uppercase">ENTERPRISE</span>
            </div>
          )}
        </div>
        <nav className="flex-1 p-6 space-y-2 overflow-y-auto custom-scrollbar">
          <MenuSection title="Hub Pusat" isExpanded={isSidebarOpen} />
          <NavItem icon={<LayoutDashboard size={22} />} label="Overview Dashboard" active={currentView === 'dashboard'} onClick={() => navigateTo('dashboard')} isExpanded={isSidebarOpen} />
          <MenuSection title="Modul Bisnis" isExpanded={isSidebarOpen} />
          <NavItem icon={<ShoppingCart size={22} />} label="Sales & Invoicing" active={currentView.includes('sales') || currentView.includes('invoice')} onClick={() => navigateTo('sales')} isExpanded={isSidebarOpen} />
          <NavItem icon={<Package size={22} />} label="Inventory Master" active={currentView === 'inventory'} onClick={() => navigateTo('inventory')} isExpanded={isSidebarOpen} />
          <NavItem icon={<DollarSign size={22} />} label="Keuangan & Pajak" active={currentView === 'finance'} onClick={() => navigateTo('finance')} isExpanded={isSidebarOpen} />
          <MenuSection title="Inovasi IoT" isExpanded={isSidebarOpen} color="text-blue-600" />
          <NavItem icon={<Activity size={22} />} label="Terminal IoT Hub" active={currentView === 'iot'} onClick={() => navigateTo('iot')} isExpanded={isSidebarOpen} highlight />
          <NavItem icon={<Users size={22} />} label="CRM & Partner" active={currentView.includes('crm')} onClick={() => navigateTo('crm')} isExpanded={isSidebarOpen} />
          <MenuSection title="Sistem Core" isExpanded={isSidebarOpen} />
          <NavItem icon={<Settings size={22} />} label="Konfigurasi ERP" active={currentView === 'settings'} onClick={() => navigateTo('settings')} isExpanded={isSidebarOpen} />
        </nav>
        <div className="p-8 border-t border-slate-50 text-left">
          <button className={`w-full flex items-center gap-4 p-4 rounded-2xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all font-black group ${!isSidebarOpen && 'justify-center'}`}>
             <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
             {isSidebarOpen && <span className="text-[11px] uppercase tracking-widest">Logout Session</span>}
          </button>
        </div>
      </aside>

      {/* Experience Layer */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <AiResultModal show={showAiModal} loading={aiLoading} response={aiResponse} onClose={() => setShowAiModal(false)} />
        <header className="h-28 bg-white/70 backdrop-blur-2xl border-b border-slate-200/50 flex items-center justify-between px-12 z-40 transition-all duration-500">
          <div className="flex items-center gap-8 text-left">
            <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-4 bg-white hover:bg-slate-50 text-slate-600 rounded-2xl transition-all border border-slate-200 shadow-sm active:scale-95 group">
              <Menu size={22} className="group-hover:rotate-90 transition-transform duration-500" />
            </button>
            <div className="hidden lg:flex flex-col">
               <div className="flex items-center gap-3 text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">
                  <p>Fimosa Hub Hub</p>
                  <div className="w-1 h-1 bg-slate-200 rounded-full"></div>
                  <p className="text-blue-500 uppercase">{currentView.replace('_', ' ')}</p>
               </div>
               <h1 className="text-2xl font-black text-slate-900 tracking-tighter mt-1 flex items-center gap-3 text-slate-900 leading-none">Control Hub <BrainCircuit size={20} className="text-blue-500 animate-pulse" /></h1>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative group">
               <button className="p-4 bg-white text-slate-500 hover:bg-blue-50 hover:text-blue-600 rounded-2xl transition-all border border-slate-200 shadow-sm relative overflow-hidden active:scale-95"><Bell size={22} /><span className="absolute top-3.5 right-3.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-bounce shadow-md"></span></button>
            </div>
            <div className="flex items-center gap-5 ml-4 group cursor-pointer bg-white p-2.5 pr-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-2xl hover:border-blue-200 transition-all duration-500 ring-1 ring-slate-100" onClick={() => navigateTo('profile')}>
               <div className="w-12 h-12 bg-slate-100 rounded-[1.3rem] overflow-hidden border-2 border-white shadow-inner transform group-hover:scale-105 transition-transform duration-500 relative">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Fimosa&backgroundColor=b6e3f4`} alt="avatar" />
               </div>
               <div className="flex flex-col text-left">
                  <p className="text-sm font-black text-slate-900 leading-none text-slate-900 tracking-tight">Super Admin</p>
                  <p className="text-[10px] text-slate-400 font-bold mt-1.5 uppercase tracking-widest tracking-tighter">Master Hub Access</p>
               </div>
            </div>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-12 custom-scrollbar pb-32 bg-[#F8FAFC]">
          <div className="max-w-7xl mx-auto">{renderContent()}</div>
        </div>
        <div className="absolute bottom-10 right-10 flex gap-4 z-50 animate-in slide-in-from-bottom-4 duration-1000">
           <div className="px-5 py-3 bg-slate-900/90 backdrop-blur-md text-white rounded-full text-[10px] font-black flex items-center gap-3 shadow-2xl border border-white/10 uppercase tracking-widest"><Sparkles size={14} className="text-blue-400 animate-pulse" />Intelligence Active: v4.21</div>
        </div>
      </main>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@700&display=swap');
        body { font-family: 'Plus Jakarta Sans', sans-serif; background-color: #F8FAFC; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 20px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #CBD5E1; }
        .prose p { margin-bottom: 1.25em; }
      `}</style>
    </div>
  );
}