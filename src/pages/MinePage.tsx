import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Globe, ChevronRight, Search, ToggleLeft, ToggleRight } from "lucide-react";
import { useUploadContext } from "@/context/UploadContext";

const categories = [
  {
    id: "skincare",
    label: "Skincare",
    emoji: "✨",
    desc: "Serums, moisturizers, sunscreens, toners, treatments",
  },
  {
    id: "haircare",
    label: "Haircare",
    emoji: "💆",
    desc: "Oils, shampoos, conditioners, scalp treatments, serums",
  },
  {
    id: "supplements",
    label: "Supplements",
    emoji: "💊",
    desc: "Gummies, capsules, powders, nutraceuticals, ayurvedic blends",
  },
];

const sources = [
  { id: "amazon", label: "Amazon Reviews", icon: "🛒", region: "India" },
  { id: "flipkart", label: "Flipkart Reviews", icon: "🏪", region: "India" },
  { id: "nykaa", label: "Nykaa Reviews", icon: "💄", region: "India" },
  { id: "google", label: "Google Trends", icon: "📈", region: "India" },
  { id: "reddit", label: "Reddit Forums", icon: "💬", subtext: "r/IndianSkincareAddicts, r/IndianHairLossRecovery" },
];

const MinePage = () => {
  const navigate = useNavigate();
  const {
    setMineCategory,
    setMineSources,
    setMineKeywords,
    setGeneratedResults,
    setIsLocalFallback,
    connectionError
  } = useUploadContext();

  const [selectedCategory, setSelectedCategory] = useState("skincare");
  const [enabledSources, setEnabledSources] = useState<string[]>(["amazon", "nykaa", "google"]);
  const [url, setUrl] = useState("");
  const [keywords, setKeywords] = useState("");

  const toggleSource = (id: string) => {
    setEnabledSources(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const handleMine = () => {
    // Clear previous results to prevent stale data
    setGeneratedResults(null);
    setIsLocalFallback(false);

    // Save selections to context
    setMineCategory(selectedCategory);
    setMineSources(enabledSources);
    setMineKeywords(keywords);

    const params = new URLSearchParams();
    params.set("category", selectedCategory);
    if (keywords) params.set("keywords", keywords);
    if (url) params.set("url", url);
    params.set("source", "mine");

    // Immediately navigate to loading page, which handles the SSE stream
    navigate(`/loading?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-6 pt-28 pb-16">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-2 text-sm font-body text-muted-foreground mb-4">
              <span className="text-forest font-semibold">Forge</span>
              <ChevronRight className="w-4 h-4" />
              <span>Mine Live Internet Data</span>
            </div>
            <h1 className="font-display text-4xl font-bold text-forest mb-3">Mine Live Data</h1>
            <p className="text-muted-foreground font-body">
              Select your category and data sources. Forge will crawl reviews, trend data, and forum discussions to extract consumer signals.
            </p>
          </div>

          {/* Category selection */}
          <div className="mb-8">
            <h2 className="font-body font-semibold text-forest text-sm uppercase tracking-wide mb-4">Select Category</h2>
            <div className="grid grid-cols-3 gap-4">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`p-6 rounded-2xl border-2 text-left transition-all hover:-translate-y-0.5 ${selectedCategory === cat.id
                    ? "border-forest bg-forest text-primary-foreground shadow-forge"
                    : "border-border bg-card hover:border-sage"
                    }`}
                >
                  <div className="text-3xl mb-3">{cat.emoji}</div>
                  <div className={`font-display font-bold text-xl mb-1 ${selectedCategory === cat.id ? "text-white" : "text-forest"}`}>
                    {cat.label}
                  </div>
                  <div className={`text-xs font-body leading-relaxed ${selectedCategory === cat.id ? "text-white/70" : "text-muted-foreground"}`}>
                    {cat.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Data sources */}
          <div className="mb-8">
            <h2 className="font-body font-semibold text-forest text-sm uppercase tracking-wide mb-4">Data Sources</h2>
            <div className="space-y-3">
              {sources.map(source => {
                const enabled = enabledSources.includes(source.id);
                return (
                  <div
                    key={source.id}
                    className={`flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer ${enabled ? "border-sage bg-sage-light/40" : "border-border bg-card hover:border-muted-foreground/20"
                      }`}
                    onClick={() => toggleSource(source.id)}
                  >
                    <span className="text-2xl">{source.icon}</span>
                    <div className="flex-1">
                      <p className="font-body font-semibold text-sm text-foreground">{source.label}</p>
                      {source.subtext ? (
                        <p className="text-xs text-muted-foreground">{source.subtext}</p>
                      ) : (
                        <p className="text-xs text-muted-foreground">Region: {source.region}</p>
                      )}
                    </div>
                    <div className="flex-shrink-0">
                      {enabled ? (
                        <ToggleRight className="w-6 h-6 text-forest" />
                      ) : (
                        <ToggleLeft className="w-6 h-6 text-muted-foreground/40" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* URL Input */}
          <div className="mb-10">
            <h2 className="font-body font-semibold text-forest text-sm uppercase tracking-wide mb-4">
              Enter Product URL <span className="font-normal text-muted-foreground normal-case italic">(Amazon, Nykaa, or Flipkart)</span>
            </h2>
            <div className="relative">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-forest/40" />
              <input
                type="text"
                value={url}
                onChange={e => setUrl(e.target.value)}
                placeholder="e.g. https://www.amazon.in/dp/B08G8Y8Y8Y..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-surface font-body text-sm placeholder:text-muted-foreground/30 focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest transition-all"
              />
            </div>
            <p className="mt-2 text-[10px] text-muted-foreground font-body">The AI will live-scrape consumer reviews from this URL to forge its intelligence.</p>
          </div>

          {/* Keywords (Optional) */}
          <div className="mb-10 opacity-60">
            <h2 className="font-body font-semibold text-forest text-sm uppercase tracking-wide mb-4">
              Additional Focus Keywords <span className="font-normal text-muted-foreground normal-case">(Optional)</span>
            </h2>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
              <textarea
                value={keywords}
                onChange={e => setKeywords(e.target.value)}
                rows={2}
                placeholder="e.g. skin whitening, anti-acne, dark spots..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-surface font-body text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest transition-all resize-none"
              />
            </div>
          </div>

          {/* Summary pill */}
          <div className="mb-8 flex items-center gap-3 p-4 bg-sage-light border border-sage/30 rounded-xl">
            <Globe className="w-4 h-4 text-forest flex-shrink-0" />
            <p className="text-sm font-body text-forest/80">
              Mining <strong>{enabledSources.length}</strong> source{enabledSources.length !== 1 ? "s" : ""} for{" "}
              <strong className="capitalize">{selectedCategory}</strong> signals across Indian wellness market.
            </p>
          </div>

          {/* Error Message */}
          {connectionError && (
            <div className="mb-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 text-sm font-body">
              {connectionError}
            </div>
          )}

          {/* CTA */}
          <button
            onClick={handleMine}
            disabled={enabledSources.length === 0}
            className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-forest text-primary-foreground font-body font-semibold rounded-xl hover:bg-forest-light transition-all shadow-forge hover:shadow-forge-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            <>
              <Globe className="w-4 h-4" />
              Start Autonomous Research
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MinePage;
