"use client"

import { useState, useEffect, useRef } from "react";

/* ─── GOOGLE FONTS ─────────────────────────────────────────────────────────── */
const FontLink = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,300&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --milk:       #FDF8F2;
      --cream:      #F5EDE0;
      --sand:       #E8D5BC;
      --sun:        #E8870A;
      --sun-light:  #F5A623;
      --sun-pale:   #FEF3E2;
      --bark:       #5C3D1E;
      --bark-light: #7A5230;
      --leaf:       #2D6A4F;
      --leaf-light: #52B788;
      --sky:        #1E3A5F;
      --mist:       #8B9AB0;
      --text:       #2C1810;
      --text-soft:  #6B4F3A;
      --border:     #E2D0BB;
      --shadow:     rgba(92,61,30,0.10);
    }

    body { background: var(--milk); font-family: 'DM Sans', sans-serif; color: var(--text); }

    .serif { font-family: 'DM Serif Display', serif; }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(18px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes shimmer {
      0%   { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
    @keyframes pulse-glow {
      0%, 100% { box-shadow: 0 0 0 0 rgba(232,135,10,0.3); }
      50%       { box-shadow: 0 0 0 8px rgba(232,135,10,0); }
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    @keyframes checkPop {
      0%   { transform: scale(0); opacity: 0; }
      60%  { transform: scale(1.25); }
      100% { transform: scale(1); opacity: 1; }
    }

    .fade-up { animation: fadeUp 0.45s cubic-bezier(.22,.68,0,1.2) both; }
    .fade-up-2 { animation: fadeUp 0.45s 0.08s cubic-bezier(.22,.68,0,1.2) both; }
    .fade-up-3 { animation: fadeUp 0.45s 0.16s cubic-bezier(.22,.68,0,1.2) both; }
    .fade-up-4 { animation: fadeUp 0.45s 0.24s cubic-bezier(.22,.68,0,1.2) both; }
    .fade-up-5 { animation: fadeUp 0.45s 0.32s cubic-bezier(.22,.68,0,1.2) both; }

    .card-hover {
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      cursor: pointer;
    }
    .card-hover:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 40px var(--shadow) !important;
    }

    input:focus, select:focus, textarea:focus {
      outline: none;
      border-color: var(--sun) !important;
      box-shadow: 0 0 0 3px rgba(232,135,10,0.15);
    }

    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: var(--cream); }
    ::-webkit-scrollbar-thumb { background: var(--sand); border-radius: 3px; }
  `}</style>
);

/* ─── CONSTANTS ────────────────────────────────────────────────────────────── */
const COMPANY = {
  name:        "Nitro Engineering",
  tagline:     "Premium Solar Solutions · Since 2015",
  whatsapp:    "2347036112930",
  email:       "sales@nitroengineering.ng",
  phone:       "+234 801 234 5678",
  salesPerson: "Chukwuemeka (Solar Advisor)",
};

const LOCATIONS = [
  "Lekki Phase 1","Lekki Phase 2","Ajah / Awoyaya","Ikeja GRA","Magodo",
  "Surulere","Victoria Island","Ikoyi","Yaba","Gbagada","Ojodu / Berger",
  "Sangotedo","Port Harcourt GRA","Port Harcourt D-Line","Abuja Maitama",
  "Abuja Gwarinpa","Abuja Wuse 2","Other",
];

const APPLIANCES = [
  { id:"ac",      label:"Air Conditioner",      watts:1500, icon:"❄️",  sub:"1.5–2HP split unit" },
  { id:"fridge",  label:"Refrigerator / Freezer",watts:400, icon:"🧊",  sub:"Deep freezer or upright fridge" },
  { id:"pump",    label:"Water Pump",            watts:1000, icon:"💧",  sub:"1HP borehole or surface pump" },
  { id:"tv",      label:"Television",            watts:150,  icon:"📺",  sub:"32–55 inch LED TV" },
  { id:"lights",  label:"Lighting & Fans",       watts:200,  icon:"💡",  sub:"Full home LED lights + ceiling fans" },
  { id:"laptop",  label:"Laptops & Devices",     watts:120,  icon:"💻",  sub:"Computers, phones, router" },
  { id:"microwave",label:"Microwave / Oven",     watts:900,  icon:"🍳",  sub:"Countertop microwave" },
  { id:"washer",  label:"Washing Machine",       watts:500,  icon:"🫧",  sub:"Front or top loader" },
];

/* Unsplash solar product catalogue */
const PRODUCTS = [
  {
    id:"starter",
    name:"Nitro 2kVA Starter",
    capacity:"2kVA / 1.6kW",
    maxWatts:900,
    price:"₦850,000",
    priceNum:850000,
    badge:"Best for Flats",
    badgeColor:"var(--leaf)",
    img:"https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80",
    features:["2kVA Inverter","200Ah Battery (1 unit)","200W Solar Panel (2 units)","Powers lights, TV, fans, router","~6–8hrs backup"],
    tag:"starter",
  },
  {
    id:"home",
    name:"Nitro 5kVA Home",
    capacity:"5kVA / 4kW",
    maxWatts:3000,
    price:"₦2,200,000",
    priceNum:2200000,
    badge:"Most Popular",
    badgeColor:"var(--sun)",
    img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    features:["5kVA Inverter","200Ah Battery (2 units)","400W Panel (4 units)","Powers 1 AC + full home","~8–10hrs backup"],
    tag:"mid",
  },
  {
    id:"premium",
    name:"Nitro 10kVA Premium",
    capacity:"10kVA / 8kW",
    maxWatts:6000,
    price:"₦4,800,000",
    priceNum:4800000,
    badge:"Full Home",
    badgeColor:"var(--bark)",
    img:"https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600&q=80",
    features:["10kVA Inverter","200Ah Battery (4 units)","400W Panel (8 units)","Powers 2+ ACs + full home","12hrs+ backup"],
    tag:"premium",
  },
  {
    id:"industrial",
    name:"Nitro 20kVA Industrial",
    capacity:"20kVA / 16kW",
    maxWatts:99999,
    price:"₦9,500,000",
    priceNum:9500000,
    badge:"For Offices & Shops",
    badgeColor:"var(--sky)",
    img:"https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=600&q=80",
    features:["20kVA Inverter","200Ah Battery (8 units)","400W Panel (16 units)","Full commercial power","24hrs+ backup"],
    tag:"heavy",
  },
];

function getRecommended(watts) {
  return PRODUCTS.find(p => watts <= p.maxWatts) || PRODUCTS[PRODUCTS.length-1];
}

/* ─── TINY COMPONENTS ──────────────────────────────────────────────────────── */
function SunIcon({ size=24, color="var(--sun)" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  );
}

function WAIcon({ size=20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

function Spinner() {
  return <div style={{ width:20,height:20,border:"2.5px solid rgba(255,255,255,0.3)",borderTopColor:"#fff",borderRadius:"50%",animation:"spin 0.7s linear infinite",display:"inline-block" }}/>;
}

/* ─── STEP PROGRESS BAR ────────────────────────────────────────────────────── */
function ProgressBar({ step, total=3 }) {
  const labels = ["Your Location","Appliances","Your Details"];
  return (
    <div style={{ padding:"0 0 24px" }}>
      <div style={{ display:"flex",alignItems:"center",gap:0 }}>
        {labels.map((label,i) => {
          const n = i+1;
          const done = n < step;
          const active = n === step;
          return (
            <div key={n} style={{ display:"flex",alignItems:"center",flex: i<labels.length-1 ? "1" : "0 0 auto" }}>
              <div style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:6 }}>
                <div style={{
                  width:32, height:32, borderRadius:"50%",
                  background: done ? "var(--sun)" : active ? "var(--bark)" : "var(--cream)",
                  border: `2px solid ${done||active ? "transparent" : "var(--border)"}`,
                  display:"flex",alignItems:"center",justifyContent:"center",
                  color: done||active ? "#fff" : "var(--mist)",
                  fontWeight:700, fontSize:13,
                  transition:"all 0.3s",
                  animation: active ? "pulse-glow 2s ease-in-out infinite" : "none",
                }}>
                  {done ? "✓" : n}
                </div>
                <span style={{ fontSize:11,fontWeight:500,color:active?"var(--bark)":done?"var(--sun)":"var(--mist)",whiteSpace:"nowrap" }}>{label}</span>
              </div>
              {i < labels.length-1 && (
                <div style={{ flex:1,height:2,background:`linear-gradient(to right, ${done?"var(--sun)":"var(--border)"}, ${done&&step>n+1?"var(--sun)":"var(--border)"})`,margin:"0 8px",marginBottom:22,transition:"all 0.4s" }}/>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── PRODUCT CARD ─────────────────────────────────────────────────────────── */
function ProductCard({ product, isRecommended, compact }) {
  if (compact) return (
    <div style={{ display:"flex",gap:14,background:"var(--cream)",borderRadius:16,padding:14,border:`1.5px solid ${isRecommended?"var(--sun)":"var(--border)"}` }}>
      <img src={product.img} alt={product.name} style={{ width:72,height:72,borderRadius:10,objectFit:"cover",flexShrink:0 }}/>
      <div style={{ flex:1,minWidth:0 }}>
        <div style={{ display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:8 }}>
          <div className="serif" style={{ fontSize:16,fontWeight:400,color:"var(--bark)",lineHeight:1.2 }}>{product.name}</div>
          {isRecommended && <span style={{ fontSize:10,fontWeight:700,background:"var(--sun)",color:"#fff",borderRadius:99,padding:"2px 8px",flexShrink:0 }}>MATCH</span>}
        </div>
        <div style={{ fontSize:12,color:"var(--text-soft)",marginTop:3 }}>{product.capacity}</div>
        <div style={{ fontSize:17,fontWeight:700,color:"var(--bark)",marginTop:4 }}>{product.price}</div>
      </div>
    </div>
  );

  return (
    <div style={{
      background:"#fff",borderRadius:20,overflow:"hidden",
      border:`1.5px solid ${isRecommended?"var(--sun)":"var(--border)"}`,
      boxShadow: isRecommended ? "0 8px 32px rgba(232,135,10,0.15)" : "0 2px 12px var(--shadow)",
    }}>
      <div style={{ position:"relative" }}>
        <img src={product.img} alt={product.name} style={{ width:"100%",height:180,objectFit:"cover",display:"block" }}/>
        <div style={{ position:"absolute",top:12,left:12 }}>
          <span style={{ fontSize:11,fontWeight:700,background:product.badgeColor,color:"#fff",borderRadius:99,padding:"4px 10px",letterSpacing:0.5 }}>{product.badge}</span>
        </div>
        {isRecommended && (
          <div style={{ position:"absolute",top:12,right:12 }}>
            <span style={{ fontSize:11,fontWeight:700,background:"var(--sun)",color:"#fff",borderRadius:99,padding:"4px 10px",animation:"pulse-glow 2s ease-in-out infinite" }}>✦ RECOMMENDED</span>
          </div>
        )}
        <div style={{ position:"absolute",bottom:0,left:0,right:0,height:60,background:"linear-gradient(transparent,rgba(0,0,0,0.4))" }}/>
      </div>
      <div style={{ padding:"16px 18px 18px" }}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8 }}>
          <div>
            <div className="serif" style={{ fontSize:19,color:"var(--bark)" }}>{product.name}</div>
            <div style={{ fontSize:12,color:"var(--mist)",marginTop:2 }}>{product.capacity}</div>
          </div>
          <div style={{ textAlign:"right" }}>
            <div style={{ fontSize:20,fontWeight:700,color:"var(--bark)" }}>{product.price}</div>
            <div style={{ fontSize:11,color:"var(--mist)" }}>incl. installation</div>
          </div>
        </div>
        <div style={{ display:"flex",flexDirection:"column",gap:5,marginTop:10 }}>
          {product.features.map(f => (
            <div key={f} style={{ display:"flex",alignItems:"center",gap:8,fontSize:13,color:"var(--text-soft)" }}>
              <span style={{ width:16,height:16,borderRadius:"50%",background:"var(--sun-pale)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:9,color:"var(--sun)",fontWeight:800,flexShrink:0 }}>✓</span>
              {f}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── NOTIFICATION CHANNEL BADGE ───────────────────────────────────────────── */
function ChannelBadge({ icon, label, status, color }) {
  const statusColors = { sent:"var(--leaf)", sending:"var(--sun)", pending:"var(--mist)" };
  return (
    <div style={{ display:"flex",alignItems:"center",gap:10,padding:"12px 14px",background:"var(--cream)",borderRadius:12,border:"1.5px solid var(--border)" }}>
      <span style={{ fontSize:20 }}>{icon}</span>
      <div style={{ flex:1 }}>
        <div style={{ fontWeight:600,fontSize:13,color:"var(--text)" }}>{label}</div>
        <div style={{ fontSize:11,color:statusColors[status]||"var(--mist)",marginTop:1,fontWeight:500 }}>
          {status==="sent"?"✓ Delivered":status==="sending"?"Sending…":"Queued"}
        </div>
      </div>
      <div style={{ width:8,height:8,borderRadius:"50%",background:statusColors[status]||"var(--mist)",animation:status==="sending"?"pulse-glow 1s ease-in-out infinite":"none" }}/>
    </div>
  );
}

/* ─── MAIN APP ─────────────────────────────────────────────────────────────── */
export default function SolarPlatform() {
  const [view, setView]         = useState("catalogue"); // catalogue | quiz | success
  const [step, setStep]         = useState(1);
  const [location, setLocation] = useState("");
  const [selected, setSelected] = useState({});
  const [name, setName]         = useState("");
  const [phone, setPhone]       = useState("");
  const [email, setEmail]       = useState("");
  const [sending, setSending]   = useState(false);
  const [channels, setChannels] = useState({ wa:"pending", email:"pending", sms:"pending" });
  const [quoteId]               = useState(() => "NE-" + Math.random().toString(36).slice(2,7).toUpperCase());
  const topRef = useRef(null);

  const scrollTop = () => topRef.current?.scrollIntoView({ behavior:"smooth" });

  const totalWatts = APPLIANCES.reduce((s,a) => s+(selected[a.id]?a.watts:0), 0);
  const recommended = getRecommended(totalWatts);
  const chosen = APPLIANCES.filter(a => selected[a.id]);

  const toggle = (id) => setSelected(p => ({ ...p, [id]:!p[id] }));

  const canNext1 = location !== "";
  const canNext2 = chosen.length > 0;
  const canSubmit = name.trim() && phone.replace(/\D/g,"").length >= 10;

  /* Simulate 3-channel delivery */
  const handleSubmit = async () => {
    setSending(true);
    scrollTop();

    /* WhatsApp — opens real WA */
    const appList = chosen.map(a=>`• ${a.icon} ${a.label} (${a.watts}W)`).join("\n");
    const msg = [
      `🌞 *SOLAR QUOTE REQUEST — ${quoteId}*`,
      `Hello ${COMPANY.salesPerson}! 👋`,
      ``,
      `A new lead just came in via the website calculator:`,
      ``,
      `👤 *Customer:* ${name}`,
      `📞 *WhatsApp:* ${phone}`,
      `📧 *Email:* ${email||"Not provided"}`,
      `📍 *Location:* ${location}`,
      ``,
      `🔌 *Appliances Requested:*`,
      appList,
      ``,
      `📊 *Total Load:* ~${totalWatts.toLocaleString()} Watts`,
      `📦 *System Match:* ${recommended.name} (${recommended.capacity})`,
      `💰 *Starting Price:* ${recommended.price}`,
      ``,
      `⚡ Please call to schedule a FREE site inspection. Thanks!`,
    ].join("\n");

    const waURL = `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(msg)}`;

    /* Stagger channel updates for UX drama */
    setTimeout(()=>{ window.open(waURL,"_blank"); setChannels(p=>({...p,wa:"sending"})); }, 400);
    setTimeout(()=>setChannels(p=>({...p,wa:"sent"})), 1800);
    setTimeout(()=>setChannels(p=>({...p,email:"sending"})), 2000);
    setTimeout(()=>setChannels(p=>({...p,email:"sent"})), 3200);
    setTimeout(()=>setChannels(p=>({...p,sms:"sending"})), 3400);
    setTimeout(()=>{ setChannels(p=>({...p,sms:"sent"})); setSending(false); setView("success"); }, 4600);
  };

  /* ── CATALOGUE VIEW ── */
  if (view === "catalogue") return (
    <div style={{ minHeight:"100vh",background:"var(--milk)",fontFamily:"'DM Sans', sans-serif" }}>
      <FontLink/>

      {/* NAV */}
      <nav style={{ background:"rgba(253,248,242,0.92)",backdropFilter:"blur(12px)",borderBottom:"1px solid var(--border)",position:"sticky",top:0,zIndex:100,padding:"0 24px" }}>
        <div style={{ maxWidth:1100,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",height:64 }}>
          <div style={{ display:"flex",alignItems:"center",gap:10 }}>
            <div style={{ width:36,height:36,borderRadius:10,background:"linear-gradient(135deg,var(--sun),var(--sun-light))",display:"flex",alignItems:"center",justifyContent:"center" }}>
              <SunIcon size={18} color="#fff"/>
            </div>
            <div>
              <div className="serif" style={{ fontSize:17,color:"var(--bark)",lineHeight:1 }}>{COMPANY.name}</div>
              <div style={{ fontSize:10,color:"var(--mist)",letterSpacing:0.5 }}>{COMPANY.tagline}</div>
            </div>
          </div>
          <button
            onClick={()=>{ setView("quiz"); setStep(1); scrollTop(); }}
            style={{ background:"var(--sun)",color:"#fff",border:"none",borderRadius:12,padding:"10px 22px",fontWeight:700,fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",gap:8,fontFamily:"inherit" }}
          >
            <span>⚡</span> Get Free Quote
          </button>
        </div>
      </nav>

      {/* HERO */}
      <div style={{ maxWidth:1100,margin:"0 auto",padding:"60px 24px 40px" }}>
        <div className="fade-up" style={{ textAlign:"center",marginBottom:52 }}>
          <div style={{ display:"inline-flex",alignItems:"center",gap:8,background:"var(--sun-pale)",border:"1px solid rgba(232,135,10,0.2)",borderRadius:99,padding:"6px 16px",marginBottom:20 }}>
            <SunIcon size={14} color="var(--sun)"/>
            <span style={{ fontSize:12,fontWeight:600,color:"var(--sun)",letterSpacing:0.5 }}>PREMIUM SOLAR SOLUTIONS · MADE FOR NIGERIA</span>
          </div>
          <h1 className="serif" style={{ fontSize:"clamp(32px,5vw,54px)",color:"var(--bark)",lineHeight:1.15,marginBottom:16 }}>
            Never Pay NEPA Bills Again.<br/>
            <em style={{ color:"var(--sun)" }}>Start Today.</em>
          </h1>
          <p style={{ fontSize:16,color:"var(--text-soft)",maxWidth:520,margin:"0 auto 32px",lineHeight:1.7 }}>
            Tell us what you want to power. We'll calculate exactly what you need and send a quote directly to your WhatsApp — in under 60 seconds.
          </p>
          <div style={{ display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap" }}>
            <button
              onClick={()=>{ setView("quiz"); setStep(1); }}
              style={{ background:"var(--bark)",color:"#fff",border:"none",borderRadius:14,padding:"14px 32px",fontWeight:700,fontSize:16,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",gap:10 }}
            >
              <span>⚡</span> Calculate My Solar Needs
            </button>
            <a href={`https://wa.me/${COMPANY.whatsapp}`} target="_blank" rel="noreferrer"
              style={{ background:"#25D366",color:"#fff",border:"none",borderRadius:14,padding:"14px 24px",fontWeight:700,fontSize:16,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",gap:8,textDecoration:"none" }}>
              <WAIcon size={18}/> Chat with Us
            </a>
          </div>
        </div>

        {/* TRUST STRIP */}
        <div className="fade-up-2" style={{ display:"flex",justifyContent:"center",flexWrap:"wrap",gap:24,marginBottom:60 }}>
          {[["🏆","500+ Installs"],["⚡","10yr Warranty"],["🔧","Free Site Survey"],["📍","Lagos & Abuja"]].map(([ic,tx])=>(
            <div key={tx} style={{ display:"flex",alignItems:"center",gap:8,padding:"10px 18px",background:"#fff",borderRadius:12,border:"1px solid var(--border)" }}>
              <span style={{ fontSize:18 }}>{ic}</span>
              <span style={{ fontSize:13,fontWeight:600,color:"var(--text-soft)" }}>{tx}</span>
            </div>
          ))}
        </div>

        {/* PRODUCTS */}
        <div className="fade-up-3">
          <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:24,flexWrap:"wrap",gap:12 }}>
            <div>
              <h2 className="serif" style={{ fontSize:28,color:"var(--bark)",marginBottom:4 }}>Our Solar Systems</h2>
              <p style={{ fontSize:14,color:"var(--text-soft)" }}>Every system includes panels, inverter, batteries & full installation</p>
            </div>
            <button
              onClick={()=>{ setView("quiz"); setStep(1); }}
              style={{ background:"transparent",color:"var(--sun)",border:"2px solid var(--sun)",borderRadius:12,padding:"10px 20px",fontWeight:700,fontSize:13,cursor:"pointer",fontFamily:"inherit" }}
            >
              Not sure which? → Take Quiz
            </button>
          </div>

          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:20 }}>
            {PRODUCTS.map((p,i) => (
              <div key={p.id} className={`fade-up-${i+2} card-hover`}>
                <ProductCard product={p} isRecommended={false}/>
              </div>
            ))}
          </div>
        </div>

        {/* CTA BANNER */}
        <div className="fade-up" style={{ marginTop:60,background:"linear-gradient(135deg,var(--bark) 0%,var(--bark-light) 100%)",borderRadius:24,padding:"40px 36px",display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"space-between",gap:24 }}>
          <div>
            <h3 className="serif" style={{ fontSize:26,color:"#FDF8F2",marginBottom:8 }}>Not sure what size you need?</h3>
            <p style={{ fontSize:14,color:"rgba(253,248,242,0.7)",maxWidth:380,lineHeight:1.6 }}>
              Our 60-second calculator does the hard work. Tell us your appliances — we handle the rest and send you a full quote on WhatsApp.
            </p>
          </div>
          <button
            onClick={()=>{ setView("quiz"); setStep(1); }}
            style={{ background:"var(--sun)",color:"#fff",border:"none",borderRadius:14,padding:"16px 32px",fontWeight:700,fontSize:16,cursor:"pointer",fontFamily:"inherit",whiteSpace:"nowrap",animation:"pulse-glow 2s ease-in-out infinite" }}
          >
            ⚡ Start Free Calculator
          </button>
        </div>

        <footer style={{ marginTop:48,paddingTop:32,borderTop:"1px solid var(--border)",display:"flex",flexWrap:"wrap",justifyContent:"space-between",gap:16 }}>
          <div>
            <div className="serif" style={{ fontSize:15,color:"var(--bark)",marginBottom:4 }}>{COMPANY.name}</div>
            <div style={{ fontSize:12,color:"var(--mist)" }}>{COMPANY.tagline}</div>
          </div>
          <div style={{ display:"flex",gap:16,flexWrap:"wrap" }}>
            {[["📞",COMPANY.phone],["📧",COMPANY.email],["💬","WhatsApp Us"]].map(([ic,tx])=>(
              <div key={tx} style={{ display:"flex",alignItems:"center",gap:6,fontSize:12,color:"var(--text-soft)" }}><span>{ic}</span>{tx}</div>
            ))}
          </div>
        </footer>
      </div>
    </div>
  );

  /* ── SENDING OVERLAY ── */
  if (sending) return (
    <div style={{ minHeight:"100vh",background:"var(--milk)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'DM Sans',sans-serif" }}>
      <FontLink/>
      <div style={{ textAlign:"center",maxWidth:400,padding:40 }}>
        <div style={{ width:80,height:80,borderRadius:"50%",background:"var(--sun-pale)",border:"2px solid var(--sun)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 24px",animation:"pulse-glow 1s ease-in-out infinite" }}>
          <SunIcon size={36} color="var(--sun)"/>
        </div>
        <h2 className="serif" style={{ fontSize:26,color:"var(--bark)",marginBottom:8 }}>Sending Your Quote</h2>
        <p style={{ fontSize:14,color:"var(--text-soft)",marginBottom:32 }}>Delivering to all channels simultaneously…</p>
        <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
          <ChannelBadge icon="💬" label="WhatsApp — Nitro Sales Team" status={channels.wa} />
          <ChannelBadge icon="📧" label={`Email — ${email||COMPANY.email}`} status={channels.email} />
          <ChannelBadge icon="📱" label={`SMS — ${phone}`} status={channels.sms} />
        </div>
      </div>
    </div>
  );

  /* ── SUCCESS VIEW ── */
  if (view === "success") return (
    <div style={{ minHeight:"100vh",background:"var(--milk)",fontFamily:"'DM Sans',sans-serif" }} ref={topRef}>
      <FontLink/>
      <div style={{ maxWidth:600,margin:"0 auto",padding:"40px 20px 60px" }}>

        {/* HERO */}
        <div className="fade-up" style={{ textAlign:"center",marginBottom:36 }}>
          <div style={{ width:88,height:88,borderRadius:"50%",background:"linear-gradient(135deg,var(--leaf),var(--leaf-light))",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 20px",fontSize:36,animation:"checkPop 0.5s ease both" }}>✓</div>
          <h1 className="serif" style={{ fontSize:32,color:"var(--bark)",marginBottom:10 }}>Quote Sent! 🎉</h1>
          <p style={{ fontSize:15,color:"var(--text-soft)",lineHeight:1.6 }}>
            Your quote <strong style={{ color:"var(--bark)" }}>#{quoteId}</strong> has been delivered via 3 channels.<br/>
            The team will contact you within <strong style={{ color:"var(--sun)" }}>2 hours</strong>.
          </p>
        </div>

        {/* CHANNELS */}
        <div className="fade-up-2" style={{ display:"flex",flexDirection:"column",gap:10,marginBottom:28 }}>
          <ChannelBadge icon="💬" label="WhatsApp — Sales team notified with full quote" status="sent"/>
          <ChannelBadge icon="📧" label={`Email — Confirmation sent to ${email||"team inbox"}`} status="sent"/>
          <ChannelBadge icon="📱" label={`SMS — Summary sent to ${phone}`} status="sent"/>
        </div>

        {/* RECOMMENDED PRODUCT */}
        <div className="fade-up-3" style={{ marginBottom:24 }}>
          <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:12 }}>
            <div style={{ width:3,height:20,background:"var(--sun)",borderRadius:99 }}/>
            <span style={{ fontWeight:700,fontSize:14,color:"var(--bark)" }}>Your Recommended System</span>
          </div>
          <ProductCard product={recommended} isRecommended compact/>
        </div>

        {/* LOAD BREAKDOWN */}
        <div className="fade-up-4" style={{ background:"#fff",borderRadius:18,padding:"20px 22px",border:"1px solid var(--border)",marginBottom:24 }}>
          <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:16 }}>
            <div style={{ width:3,height:20,background:"var(--bark)",borderRadius:99 }}/>
            <span style={{ fontWeight:700,fontSize:14,color:"var(--bark)" }}>Load Calculation Breakdown</span>
          </div>
          <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
            {chosen.map(a => (
              <div key={a.id} style={{ display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 0",borderBottom:"1px solid var(--cream)" }}>
                <div style={{ display:"flex",alignItems:"center",gap:10 }}>
                  <span style={{ fontSize:18 }}>{a.icon}</span>
                  <div>
                    <div style={{ fontSize:13,fontWeight:600,color:"var(--text)" }}>{a.label}</div>
                    <div style={{ fontSize:11,color:"var(--mist)" }}>{a.sub}</div>
                  </div>
                </div>
                <div style={{ fontWeight:700,fontSize:14,color:"var(--bark)" }}>{a.watts.toLocaleString()}W</div>
              </div>
            ))}
          </div>
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:14,marginTop:4 }}>
            <span style={{ fontWeight:800,fontSize:14,color:"var(--bark)" }}>Total Load</span>
            <span style={{ fontWeight:800,fontSize:18,color:"var(--sun)" }}>{totalWatts.toLocaleString()} Watts</span>
          </div>
        </div>

        {/* NEXT STEPS */}
        <div className="fade-up-5" style={{ background:"var(--sun-pale)",borderRadius:18,padding:"20px 22px",border:"1px solid rgba(232,135,10,0.2)",marginBottom:28 }}>
          <div style={{ fontWeight:700,fontSize:14,color:"var(--bark)",marginBottom:14 }}>What happens next?</div>
          {[
            ["1","Sales team reviews your quote","Within 2 hours"],
            ["2","Free site inspection booked","Within 48 hours"],
            ["3","Full custom proposal sent","Same day as inspection"],
            ["4","Installation begins","Within 7 working days"],
          ].map(([n,tx,time])=>(
            <div key={n} style={{ display:"flex",gap:12,marginBottom:12,alignItems:"flex-start" }}>
              <div style={{ width:24,height:24,borderRadius:"50%",background:"var(--sun)",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:12,flexShrink:0 }}>{n}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13,fontWeight:600,color:"var(--bark)" }}>{tx}</div>
                <div style={{ fontSize:11,color:"var(--text-soft)" }}>{time}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display:"flex",gap:12,flexWrap:"wrap" }}>
          <a href={`https://wa.me/${COMPANY.whatsapp}`} target="_blank" rel="noreferrer"
            style={{ flex:1,minWidth:160,display:"flex",alignItems:"center",justifyContent:"center",gap:8,background:"#25D366",color:"#fff",borderRadius:14,padding:"14px 20px",fontWeight:700,fontSize:14,textDecoration:"none",fontFamily:"inherit" }}>
            <WAIcon size={16}/> Chat Now
          </a>
          <button onClick={()=>{ setView("catalogue"); setStep(1); setLocation(""); setSelected({}); setName(""); setPhone(""); setEmail(""); setChannels({wa:"pending",email:"pending",sms:"pending"}); }}
            style={{ flex:1,minWidth:160,background:"var(--cream)",color:"var(--bark)",border:"1.5px solid var(--border)",borderRadius:14,padding:"14px 20px",fontWeight:700,fontSize:14,cursor:"pointer",fontFamily:"inherit" }}>
            ← Back to Systems
          </button>
        </div>
      </div>
    </div>
  );

  /* ── QUIZ VIEW ── */
  return (
    <div style={{ minHeight:"100vh",background:"var(--milk)",fontFamily:"'DM Sans',sans-serif" }} ref={topRef}>
      <FontLink/>

      {/* QUIZ NAV */}
      <div style={{ background:"rgba(253,248,242,0.95)",backdropFilter:"blur(12px)",borderBottom:"1px solid var(--border)",padding:"0 20px",position:"sticky",top:0,zIndex:100 }}>
        <div style={{ maxWidth:600,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",height:60 }}>
          <button onClick={()=>setView("catalogue")} style={{ background:"none",border:"none",color:"var(--text-soft)",fontWeight:600,fontSize:13,cursor:"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",gap:6 }}>
            ← All Systems
          </button>
          <div className="serif" style={{ fontSize:15,color:"var(--bark)" }}>Free Solar Calculator</div>
          <div style={{ fontSize:12,color:"var(--mist)",fontWeight:600 }}>Step {step}/3</div>
        </div>
      </div>

      <div style={{ maxWidth:600,margin:"0 auto",padding:"32px 20px 60px" }}>

        {/* LIVE WATTAGE TICKER (visible from step 2) */}
        {step >= 2 && totalWatts > 0 && (
          <div style={{ background:"linear-gradient(135deg,var(--bark),var(--bark-light))",borderRadius:16,padding:"14px 20px",marginBottom:24,display:"flex",justifyContent:"space-between",alignItems:"center" }}>
            <div>
              <div style={{ fontSize:11,color:"rgba(253,248,242,0.6)",fontWeight:600,letterSpacing:0.5 }}>CURRENT LOAD</div>
              <div className="serif" style={{ fontSize:24,color:"#FDF8F2",marginTop:2 }}>{totalWatts.toLocaleString()} W</div>
            </div>
            <div style={{ textAlign:"right" }}>
              <div style={{ fontSize:11,color:"rgba(253,248,242,0.6)",fontWeight:600,letterSpacing:0.5 }}>RECOMMENDED</div>
              <div style={{ fontSize:14,fontWeight:700,color:"var(--sun-light)",marginTop:2 }}>{recommended.name}</div>
              <div style={{ fontSize:12,color:"rgba(253,248,242,0.7)" }}>{recommended.price}</div>
            </div>
          </div>
        )}

        <ProgressBar step={step}/>

        {/* STEP 1 — LOCATION */}
        {step === 1 && (
          <div className="fade-up">
            <div style={{ marginBottom:28 }}>
              <h2 className="serif" style={{ fontSize:26,color:"var(--bark)",marginBottom:8 }}>Where is your property?</h2>
              <p style={{ fontSize:14,color:"var(--text-soft)",lineHeight:1.6 }}>
                We'll confirm our engineers can reach you for the free site inspection.
              </p>
            </div>

            <div style={{ position:"relative",marginBottom:28 }}>
              <span style={{ position:"absolute",left:16,top:"50%",transform:"translateY(-50%)",fontSize:18 }}>📍</span>
              <select
                value={location}
                onChange={e=>setLocation(e.target.value)}
                style={{
                  width:"100%",padding:"15px 16px 15px 48px",borderRadius:14,fontSize:15,
                  border:`2px solid ${location?"var(--sun)":"var(--border)"}`,
                  background:"#fff",color:location?"var(--text)":"var(--mist)",
                  outline:"none",appearance:"none",cursor:"pointer",
                  fontFamily:"inherit",transition:"border 0.2s",
                  backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%235C3D1E' d='M6 8L0 0h12z'/%3E%3C/svg%3E")`,
                  backgroundRepeat:"no-repeat",backgroundPosition:"right 16px center",
                }}
              >
                <option value="">Select your area…</option>
                {LOCATIONS.map(l=><option key={l} value={l}>{l}</option>)}
              </select>
            </div>

            {location && (
              <div className="fade-up" style={{ background:"var(--sun-pale)",borderRadius:14,padding:"14px 18px",marginBottom:28,border:"1px solid rgba(232,135,10,0.2)",display:"flex",gap:12,alignItems:"center" }}>
                <span style={{ fontSize:24 }}>✅</span>
                <div>
                  <div style={{ fontWeight:700,fontSize:13,color:"var(--bark)" }}>Great! We service {location}</div>
                  <div style={{ fontSize:12,color:"var(--text-soft)",marginTop:2 }}>Our engineers are available in your area this week.</div>
                </div>
              </div>
            )}

            {/* PRODUCT PREVIEW */}
            <div style={{ marginBottom:28 }}>
              <div style={{ fontSize:12,fontWeight:700,color:"var(--mist)",letterSpacing:0.8,marginBottom:14,textTransform:"uppercase" }}>Our systems at a glance</div>
              <div style={{ display:"flex",flexDirection:"column",gap:10 }}>
                {PRODUCTS.map(p=>(
                  <div key={p.id} style={{ display:"flex",gap:12,background:"#fff",borderRadius:14,padding:12,border:"1px solid var(--border)",alignItems:"center" }}>
                    <img src={p.img} alt={p.name} style={{ width:56,height:56,borderRadius:10,objectFit:"cover" }}/>
                    <div style={{ flex:1 }}>
                      <div style={{ fontWeight:700,fontSize:13,color:"var(--bark)" }}>{p.name}</div>
                      <div style={{ fontSize:11,color:"var(--mist)",marginTop:2 }}>{p.capacity} · Up to {(p.maxWatts/1000).toFixed(1)}kW load</div>
                    </div>
                    <div style={{ fontSize:14,fontWeight:800,color:"var(--sun)",textAlign:"right" }}>
                      {p.price}
                      <div style={{ fontSize:10,fontWeight:500,color:"var(--mist)" }}>incl. install</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={()=>{ setStep(2); scrollTop(); }}
              disabled={!canNext1}
              style={{ width:"100%",padding:"16px",borderRadius:14,border:"none",background:canNext1?"var(--bark)":"var(--border)",color:canNext1?"#fff":"var(--mist)",fontWeight:700,fontSize:16,cursor:canNext1?"pointer":"not-allowed",fontFamily:"inherit",transition:"all 0.2s" }}
            >
              Continue → Select Appliances
            </button>
          </div>
        )}

        {/* STEP 2 — APPLIANCES */}
        {step === 2 && (
          <div className="fade-up">
            <div style={{ marginBottom:24 }}>
              <h2 className="serif" style={{ fontSize:26,color:"var(--bark)",marginBottom:8 }}>What do you want to power?</h2>
              <p style={{ fontSize:14,color:"var(--text-soft)",lineHeight:1.6 }}>
                Tick everything you need running during NEPA outages. Don't worry about watts — we calculate that automatically.
              </p>
            </div>

            <div style={{ display:"flex",flexDirection:"column",gap:10,marginBottom:24 }}>
              {APPLIANCES.map((a,i) => {
                const checked = !!selected[a.id];
                return (
                  <div
                    key={a.id}
                    onClick={()=>toggle(a.id)}
                    style={{
                      display:"flex",alignItems:"center",gap:14,padding:"14px 16px",borderRadius:14,
                      border:`2px solid ${checked?"var(--sun)":"var(--border)"}`,
                      background:checked?"var(--sun-pale)":"#fff",
                      cursor:"pointer",transition:"all 0.15s",
                      animation:`fadeUp 0.35s ${i*0.05}s both`,
                    }}
                  >
                    <div style={{
                      width:28,height:28,borderRadius:8,flexShrink:0,
                      border:`2px solid ${checked?"var(--sun)":"var(--border)"}`,
                      background:checked?"var(--sun)":"#fff",
                      display:"flex",alignItems:"center",justifyContent:"center",
                      color:"#fff",fontWeight:800,fontSize:14,
                      transition:"all 0.15s",
                      animation:checked?"checkPop 0.25s ease both":"none",
                    }}>
                      {checked && "✓"}
                    </div>
                    <span style={{ fontSize:22,flexShrink:0 }}>{a.icon}</span>
                    <div style={{ flex:1 }}>
                      <div style={{ fontWeight:600,fontSize:14,color:"var(--text)" }}>{a.label}</div>
                      <div style={{ fontSize:12,color:"var(--mist)",marginTop:2 }}>{a.sub}</div>
                    </div>
                    <div style={{ textAlign:"right",flexShrink:0 }}>
                      <div style={{ fontSize:13,fontWeight:700,color:checked?"var(--sun)":"var(--mist)" }}>{a.watts}W</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* LIVE RECOMMENDATION */}
            {chosen.length > 0 && (
              <div className="fade-up" style={{ marginBottom:24 }}>
                <div style={{ fontSize:12,fontWeight:700,color:"var(--mist)",letterSpacing:0.8,textTransform:"uppercase",marginBottom:12 }}>Your Match</div>
                <ProductCard product={recommended} isRecommended compact/>
              </div>
            )}

            <div style={{ display:"flex",gap:10 }}>
              <button onClick={()=>setStep(1)} style={{ flex:"0 0 auto",padding:"15px 20px",borderRadius:14,border:"1.5px solid var(--border)",background:"#fff",color:"var(--text-soft)",fontWeight:600,fontSize:14,cursor:"pointer",fontFamily:"inherit" }}>← Back</button>
              <button
                onClick={()=>{ setStep(3); scrollTop(); }}
                disabled={!canNext2}
                style={{ flex:1,padding:"15px",borderRadius:14,border:"none",background:canNext2?"var(--bark)":"var(--border)",color:canNext2?"#fff":"var(--mist)",fontWeight:700,fontSize:15,cursor:canNext2?"pointer":"not-allowed",fontFamily:"inherit",transition:"all 0.2s" }}
              >
                Continue → Get Your Quote
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 — CONTACT */}
        {step === 3 && (
          <div className="fade-up">
            <div style={{ marginBottom:24 }}>
              <h2 className="serif" style={{ fontSize:26,color:"var(--bark)",marginBottom:8 }}>Almost done!</h2>
              <p style={{ fontSize:14,color:"var(--text-soft)",lineHeight:1.6 }}>
                Enter your details and we'll instantly send your personalised quote to WhatsApp, Email & SMS — all at once.
              </p>
            </div>

            {/* QUOTE PREVIEW CARD */}
            <div style={{ background:"#fff",borderRadius:18,border:"1.5px solid var(--border)",overflow:"hidden",marginBottom:24 }}>
              <div style={{ background:"linear-gradient(135deg,var(--bark),var(--bark-light))",padding:"16px 20px" }}>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center" }}>
                  <div>
                    <div style={{ fontSize:10,color:"rgba(253,248,242,0.6)",fontWeight:600,letterSpacing:0.8 }}>QUOTE REFERENCE</div>
                    <div className="serif" style={{ fontSize:18,color:"#FDF8F2",marginTop:2 }}>#{quoteId}</div>
                  </div>
                  <img src={recommended.img} alt="" style={{ width:60,height:60,borderRadius:10,objectFit:"cover",border:"2px solid rgba(255,255,255,0.2)" }}/>
                </div>
              </div>
              <div style={{ padding:"14px 20px" }}>
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8 }}>
                  <div>
                    <div style={{ fontWeight:700,fontSize:14,color:"var(--bark)" }}>{recommended.name}</div>
                    <div style={{ fontSize:12,color:"var(--mist)",marginTop:2 }}>{chosen.map(a=>a.icon).join(" ")} · {totalWatts.toLocaleString()}W total</div>
                  </div>
                  <div style={{ textAlign:"right" }}>
                    <div style={{ fontWeight:800,fontSize:18,color:"var(--sun)" }}>{recommended.price}</div>
                    <div style={{ fontSize:10,color:"var(--mist)" }}>incl. installation</div>
                  </div>
                </div>
                <div style={{ display:"flex",gap:6,flexWrap:"wrap" }}>
                  {["💬 WhatsApp","📧 Email","📱 SMS"].map(ch=>(
                    <span key={ch} style={{ fontSize:11,fontWeight:600,background:"var(--sun-pale)",color:"var(--sun)",borderRadius:99,padding:"3px 10px" }}>{ch}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* FORM */}
            <div style={{ display:"flex",flexDirection:"column",gap:14,marginBottom:24 }}>
              {[
                { ph:"Your Full Name *",val:name,set:setName,icon:"👤",type:"text" },
                { ph:"WhatsApp Number * (e.g. 08012345678)",val:phone,set:(v)=>setPhone(v.replace(/\D/g,"")),icon:"📱",type:"tel" },
                { ph:"Email Address (optional)",val:email,set:setEmail,icon:"📧",type:"email" },
              ].map(({ ph,val,set,icon,type })=>(
                <div key={ph} style={{ position:"relative" }}>
                  <span style={{ position:"absolute",left:16,top:"50%",transform:"translateY(-50%)",fontSize:16 }}>{icon}</span>
                  <input
                    placeholder={ph}
                    value={val}
                    onChange={e=>set(e.target.value)}
                    type={type}
                    style={{
                      width:"100%",padding:"15px 16px 15px 48px",borderRadius:14,fontSize:15,
                      border:`2px solid ${val?"var(--sun)":"var(--border)"}`,
                      background:"#fff",color:"var(--text)",outline:"none",
                      fontFamily:"inherit",transition:"border 0.2s",
                    }}
                  />
                </div>
              ))}
            </div>

            <div style={{ display:"flex",gap:10,marginBottom:16 }}>
              <button onClick={()=>setStep(2)} style={{ flex:"0 0 auto",padding:"15px 20px",borderRadius:14,border:"1.5px solid var(--border)",background:"#fff",color:"var(--text-soft)",fontWeight:600,fontSize:14,cursor:"pointer",fontFamily:"inherit" }}>← Back</button>
              <button
                onClick={handleSubmit}
                disabled={!canSubmit}
                style={{
                  flex:1,padding:"15px",borderRadius:14,border:"none",
                  background:canSubmit?"#25D366":"var(--border)",
                  color:canSubmit?"#fff":"var(--mist)",
                  fontWeight:700,fontSize:15,cursor:canSubmit?"pointer":"not-allowed",
                  fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",gap:10,
                  transition:"all 0.2s",animation:canSubmit?"pulse-glow 2s ease-in-out infinite":"none",
                }}
              >
                <WAIcon size={18}/>
                Send My Quote — Free
              </button>
            </div>
            <p style={{ textAlign:"center",fontSize:12,color:"var(--mist)" }}>
              🔒 Your details are shared only with {COMPANY.name} · No spam, ever.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}