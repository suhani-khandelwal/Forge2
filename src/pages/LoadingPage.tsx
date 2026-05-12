import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useUploadContext } from "@/context/UploadContext";
import { getApiUrl } from "@/lib/api";

const initialSteps = [
  { id: 0, label: "Checking intelligence archive...", status: "pending" },
  { id: 1, label: "Harvesting live market signals...", status: "pending" },
  { id: 2, label: "Synthesizing product intelligence...", status: "pending" },
  { id: 3, label: "Validating concept architecture...", status: "pending" },
  { id: 4, label: "Intelligence report ready", status: "pending" },
];

const MoleculeOrb = ({ size, x, y, delay, color }: { size: number; x: string; y: string; delay: number; color: string }) => (
  <div
    className="absolute rounded-full opacity-20 blur-2xl animate-pulse"
    style={{ width: size, height: size, left: x, top: y, background: color, animationDelay: `${delay}s`, animationDuration: `${3 + delay}s` }}
  />
);

const Flask = ({ hue, delay, label }: { hue: string; delay: number; label: string }) => {
  return (
    <div className="flex flex-col items-center gap-2" style={{ animationDelay: `${delay}s` }}>
      <div className="relative animate-float" style={{ animationDelay: `${delay}s` }}>
        <svg width="52" height="72" viewBox="0 0 52 72" fill="none">
          <path d="M19 4 L19 28 L4 55 Q0 68 13 70 L39 70 Q52 68 48 55 L33 28 L33 4 Z" fill={`${hue}18`} stroke={hue} strokeWidth="1.5" />
          <path d="M7 53 Q2 65 13 68 L39 68 Q50 65 45 53 Z" fill={`${hue}55`} />
          <path d="M11 56 Q18 52 26 56" stroke={`${hue}99`} strokeWidth="1" strokeLinecap="round" />
          <circle cx="18" cy="60" r="2.5" fill={`${hue}80`} className="animate-bounce" style={{ animationDelay: `${delay + 0.2}s`, animationDuration: "1.4s" }} />
          <circle cx="30" cy="55" r="1.8" fill={`${hue}80`} className="animate-bounce" style={{ animationDelay: `${delay + 0.6}s`, animationDuration: "1.8s" }} />
          <circle cx="38" cy="62" r="2" fill={`${hue}80`} className="animate-bounce" style={{ animationDelay: `${delay + 0.9}s`, animationDuration: "2s" }} />
          <rect x="19" y="2" width="14" height="5" rx="2.5" fill={hue} opacity="0.7" />
          <rect x="21" y="0" width="10" height="3" rx="1.5" fill={hue} />
          <circle cx="23" cy="58" r="1" fill="white" opacity="0.6" />
        </svg>
        <div className="absolute inset-0 rounded-full opacity-30 blur-md animate-pulse" style={{ background: hue, animationDelay: `${delay}s` }} />
      </div>
      <span className="text-xs font-body font-semibold opacity-60 tracking-widest uppercase" style={{ color: hue }}>{label}</span>
    </div>
  );
};

const ConnectorLine = () => (
  <div className="flex items-center pb-8 opacity-30">
    <div className="w-8 h-px bg-gradient-to-r from-transparent via-sage to-transparent" />
  </div>
);

const LoadingPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const source = searchParams.get("source") || "upload";
  const category = searchParams.get("category") || "";
  const keywords = searchParams.get("keywords") || "";
  const urlParam = searchParams.get("url") || "";
  
  const [currentStep, setCurrentStep] = useState(-1);
  const [progress, setProgress] = useState(0);
  const [steps, setSteps] = useState(initialSteps);
  const { setGeneratedResults, setConnectionError } = useUploadContext();

  useEffect(() => {
    if (source !== "mine") {
      return; 
    }

    const qs = new URLSearchParams();
    if (category) qs.set("category", category);
    if (keywords) qs.set("keywords", keywords);
    if (urlParam) qs.set("url", urlParam);

    const sseUrl = getApiUrl(`api/generate-stream?${qs.toString()}`);
    const eventSource = new EventSource(sseUrl);

    eventSource.addEventListener("step", (e) => {
      const { id, label } = JSON.parse(e.data);
      setCurrentStep(id);
      
      setSteps(prev => {
        const newSteps = [...prev];
        if (!newSteps.find(s => s.id === id)) {
          newSteps.push({ id, label, status: "active" });
        } else {
          newSteps[id] = { ...newSteps[id], label, status: "active" };
        }
        for (let i = 0; i < id; i++) {
          if (newSteps[i]) newSteps[i].status = "done";
        }
        return newSteps;
      });
      
      setProgress(Math.min(((id + 1) / 5) * 100, 100));
    });

    eventSource.addEventListener("complete", (e) => {
      const results = JSON.parse(e.data);
      setGeneratedResults(results);
      setProgress(100);
      eventSource.close();
      setTimeout(() => navigate(`/results?source=${source}`), 1000);
    });

    eventSource.addEventListener("error", (e: any) => {
      console.error("SSE Error:", e);
      eventSource.close();
      let errMessage = "Intelligence engine failed to connect. Please retry.";
      if (e.data) {
        try {
          const parsed = JSON.parse(e.data);
          if (parsed.message) errMessage = parsed.message;
        } catch(err){}
      }
      setConnectionError(errMessage);
      navigate("/mine");
    });

    return () => eventSource.close();
  }, [category, keywords, urlParam, source, navigate, setConnectionError, setGeneratedResults]);

  useEffect(() => {
    if (source === "upload") {
       let p = 0;
       const intv = setInterval(() => {
         p += 5;
         setProgress(p);
         setCurrentStep(Math.floor(p / 20));
         if (p >= 100) {
           clearInterval(intv);
           setTimeout(() => navigate("/results?source=upload"), 500);
         }
       }, 200);
       return () => clearInterval(intv);
    }
  }, [source, navigate]);

  return (
    <div className="min-h-screen bg-hero flex flex-col items-center justify-center relative overflow-hidden">
      <MoleculeOrb size={400} x="-10%" y="-10%" delay={0} color="hsl(142 71% 45%)" />
      <MoleculeOrb size={300} x="70%" y="60%" delay={1} color="hsl(100 18% 61%)" />
      <MoleculeOrb size={250} x="40%" y="80%" delay={2} color="hsl(158 50% 40%)" />
      <MoleculeOrb size={200} x="80%" y="5%" delay={0.5} color="hsl(100 30% 55%)" />

      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle, hsl(100 18% 61%) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

      <div className="relative z-10 max-w-lg w-full mx-auto px-6 text-center">
        <div className="mb-10">
          <div className="font-display font-bold text-4xl text-white tracking-[0.3em] mb-2">FORGE</div>
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-sage opacity-60" />
            <div className="w-1.5 h-1.5 rounded-full bg-sage" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-sage opacity-60" />
          </div>
        </div>

        <div className="flex items-end justify-center gap-2 mb-10">
          <Flask hue="hsl(100, 18%, 61%)" delay={0} label="Extract" />
          <ConnectorLine />
          <Flask hue="hsl(158, 60%, 50%)" delay={0.5} label="Analyse" />
          <ConnectorLine />
          <Flask hue="hsl(142, 71%, 45%)" delay={1} label="Forge" />
          <ConnectorLine />
          <Flask hue="hsl(100, 30%, 55%)" delay={1.5} label="Validate" />
        </div>

        <h2 className="font-display text-3xl font-bold text-white mb-2">
          Forging Innovation from Raw Data
        </h2>
        <p className="text-white/50 font-body text-sm mb-8">
          {source === "mine" ? "Mining live internet signals across platforms" : "Processing your uploaded datasets"}
        </p>

        <div className="relative bg-white/10 rounded-full h-2.5 mb-8 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{ width: `${progress}%`, background: "linear-gradient(90deg, hsl(100 18% 61%), hsl(142 71% 45%), hsl(158 60% 50%))" }}
          />
          <div className="absolute top-0 bottom-0 w-16 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" style={{ left: `${Math.max(0, progress - 8)}%` }} />
        </div>

        <div className="space-y-2.5 text-left bg-white/5 rounded-2xl p-5 border border-white/10">
          {steps.map((step, i) => {
             const isDone = i < currentStep;
             const isCurrent = i === currentStep;
             return (
               <div key={i} className={`flex items-center gap-3 transition-all duration-500 ${isDone || isCurrent ? "opacity-100" : "opacity-25"}`}>
                 <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${isDone ? "bg-sage shadow-[0_0_10px_hsl(100_18%_61%/0.6)]" : isCurrent ? "bg-white/10 ring-2 ring-sage ring-offset-1 ring-offset-transparent" : "bg-white/10"}`}>
                   {isDone ? (
                     <svg className="w-3 h-3 text-forest" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                     </svg>
                   ) : isCurrent ? (
                     <div className="w-2 h-2 rounded-full bg-sage animate-pulse" />
                   ) : null}
                 </div>
                 <span className={`font-body text-sm flex-1 ${isDone || isCurrent ? "text-white" : "text-white/30"}`}>
                   {step.label}
                 </span>
                 {isCurrent && (
                   <div className="flex gap-1">
                     {[...Array(3)].map((_, j) => (
                       <div key={j} className="w-1.5 h-1.5 rounded-full bg-sage animate-bounce" style={{ animationDelay: `${j * 0.15}s` }} />
                     ))}
                   </div>
                 )}
                 {isDone && <span className="text-sage text-xs font-body font-semibold">Done</span>}
               </div>
             );
          })}
        </div>

        <div className="mt-6 text-white/30 font-body text-xs tracking-widest">
          {Math.round(progress)}% COMPLETE
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
