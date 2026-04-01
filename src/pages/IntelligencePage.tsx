import { useLocation, useParams, useNavigate } from "react-router-dom";
import { getCompetitiveIntelligence } from "@/utils/intelligenceEngine";
import { ArrowLeft, Cpu, Lightbulb, TrendingUp, Globe, ExternalLink, Bot } from "lucide-react";

export default function IntelligencePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  // Retrieve concept from React Router state, or gracefully degrade
  const concept = location.state?.concept;

  if (!concept) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center font-body p-6">
        <h2 className="text-xl font-bold text-forest mb-4">Intelligence Data Unavailable</h2>
        <p className="text-muted-foreground mb-6">Could not load the competitive intelligence profile for Concept #{id}.</p>
        <button onClick={() => navigate("/")} className="px-6 py-2 bg-sage text-forest font-bold rounded-lg hover:bg-sage/80 transition-colors">
          Return to Dashboard
        </button>
      </div>
    );
  }

  // Dynamic AI-Generated Competitive Intelligence
  const aiData = concept?.competitiveIntelligence || {
    key_differentiation: "Strategic analysis in progress...",
    white_space: "Identifying market gap...",
    pricing_benchmark: { low: "N/A", mid: "N/A", premium: "N/A" },
    competitors: []
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6 md:p-10 font-body animate-fade-in">
      <div className="max-w-[1400px] mx-auto space-y-8">
        
        {/* Navigation & Header */}
        <div>
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-sage hover:text-forest transition-colors font-semibold mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Mission Results
          </button>
          
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 border-b border-border pb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 bg-forest text-primary-foreground text-xs font-bold rounded-full uppercase tracking-wider">
                  {concept.category}
                </span>
                <span className="flex items-center gap-1.5 text-xs font-bold text-sage">
                  <Bot className="w-4 h-4" /> AI Generated Intelligence
                </span>
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-forest">{concept.name}</h1>
              <p className="text-muted-foreground italic mt-1">"{concept.tagline}"</p>
            </div>
            
            <div className="flex gap-2">
              {concept.tags?.map((tag: string) => (
                <span key={tag} className="px-2.5 py-1 bg-surface border border-border text-muted-foreground text-xs rounded shadow-sm">
                  {tag}
                </span>
              )) || <span className="text-xs text-muted-foreground">Strategic Intent Defined</span>}
            </div>
          </div>
        </div>

        {/* AI Strategic Insights */}
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:border-sage transition-all relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-forest/5 rounded-bl-[100px] -mr-6 -mt-6 transition-transform duration-500 group-hover:scale-110" />
            <div className="flex items-center gap-3 mb-4 relative">
              <div className="p-2 bg-surface rounded-lg shadow-sm">
                <Cpu className="w-5 h-5 text-forest" />
              </div>
              <h4 className="font-body font-bold text-forest text-sm uppercase tracking-wider">Key Differentiation</h4>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed relative">
              {aiData.differentiation || aiData.key_differentiation || "Unique formulation edge synthesized from Indian market signals."}
            </p>
          </div>
          
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:border-sage transition-all relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 rounded-bl-[100px] -mr-6 -mt-6 transition-transform duration-500 group-hover:scale-110" />
            <div className="flex items-center gap-3 mb-4 relative">
              <div className="p-2 bg-surface rounded-lg shadow-sm">
                <Lightbulb className="w-5 h-5 text-forest" />
              </div>
              <h4 className="font-body font-bold text-forest text-sm uppercase tracking-wider">White Space Insight</h4>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed relative">
              {aiData.whiteSpace || aiData.white_space || "Strategic market gap identified in the current competitive landscape."}
            </p>
          </div>
          
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:border-sage transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2 bg-surface rounded-lg shadow-sm">
                  <TrendingUp className="w-5 h-5 text-forest" />
                </div>
                <h4 className="font-body font-bold text-forest text-sm uppercase tracking-wider">Target Pricing Benchmark</h4>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-forest"></div>Premium Cluster</span>
                  <span className="font-bold text-forest text-base">{aiData.pricing?.premium || aiData.pricing_benchmark?.premium || "TBD"}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-sage"></div>Mid-Market Core</span>
                  <span className="font-bold text-forest text-base">{aiData.pricing?.mid || aiData.pricing_benchmark?.mid || "TBD"}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-border"></div>Budget Tier</span>
                  <span className="font-bold text-forest text-base">{aiData.pricing?.low || aiData.pricing_benchmark?.low || "TBD"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full Width Data Table */}
        <div className="bg-card border border-border rounded-xl shadow-md overflow-hidden">
          <div className="p-5 border-b border-border bg-surface flex items-center gap-2">
            <Globe className="w-5 h-5 text-forest" />
            <h3 className="font-body font-bold text-forest text-base">Indian D2C Market Leaders (Competitive Set)</h3>
          </div>
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse min-w-[1200px]">
              <thead>
                <tr className="bg-surface/50 border-b border-border text-xs font-bold text-forest uppercase tracking-wider">
                  <th className="py-4 px-5">Brand</th>
                  <th className="py-4 px-5">Product Name</th>
                  <th className="py-4 px-4 w-24">Price</th>
                  <th className="py-4 px-5 w-64">Key Ingredients</th>
                  <th className="py-4 px-5 w-64">Competitive Claims</th>
                  <th className="py-4 px-4">Platform</th>
                </tr>
              </thead>
              <tbody>
                {(aiData.topCompetitors || aiData.competitors || []).map((comp: any, i: number) => (
                  <tr key={i} className="border-b border-border last:border-0 hover:bg-surface transition-colors cursor-default group">
                    <td className="py-4 px-5 font-bold text-forest whitespace-nowrap text-sm">{comp.brand}</td>
                    <td className="py-4 px-5 text-muted-foreground font-medium text-sm">{comp.product || comp.product_name}</td>
                    <td className="py-4 px-4 text-forest font-bold whitespace-nowrap">{comp.price}</td>
                    <td className="py-4 px-5 text-muted-foreground">
                      <div className="flex flex-wrap gap-1.5">
                        {(comp.keyIngredients || comp.key_ingredients || []).map((ing: string) => (
                          <span key={ing} className="bg-surface border border-border px-2 py-0.5 rounded shadow-sm text-xs font-semibold text-forest">
                            {ing}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-5 text-muted-foreground text-xs leading-relaxed font-medium">
                      {comp.keyClaims || (comp.claims ? comp.claims.join(" • ") : "No claims listed.")}
                    </td>
                    <td className="py-4 px-4 text-muted-foreground whitespace-nowrap text-xs font-bold uppercase tracking-wider">{comp.platform}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
