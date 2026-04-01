import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { useUploadContext } from "@/context/UploadContext";
import ConceptCard from "@/components/ConceptCard";
import GapMatrix from "@/components/GapMatrix";
import CompetitorCard from "@/components/CompetitorCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Search, LayoutDashboard, Database, Info, Sparkles, Wand2, InfoIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

const GeneratePage = () => {
  const { generatedResults, isLoading } = useUploadContext();
  const [activeTab, setActiveTab] = useState("concepts");
  const [showExplanation, setShowExplanation] = useState(true);

  if (!generatedResults && !isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-6 pt-32 text-center">
          <Card className="max-w-md mx-auto p-8 border-dashed border-2">
            <Database className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-display font-bold mb-2">No Intelligence Data</h2>
            <p className="text-muted-foreground mb-6">
              You haven't uploaded a concept or mined for market data yet.
            </p>
            <div className="flex gap-4 justify-center">
              <a href="/upload" className="px-5 py-2 bg-forest text-primary-foreground rounded-lg font-medium">Upload Concept</a>
              <a href="/mine" className="px-5 py-2 border border-border rounded-lg font-medium">Mine Live Data</a>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-sage-light/20 via-transparent to-transparent" />

      <main className="container mx-auto px-4 md:px-6 pt-28 pb-20">
        {/* Header Section */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest/5 text-forest text-xs font-bold tracking-tight uppercase border border-forest/10">
                <Sparkles className="w-3 h-3" /> Synthesis Engine 2.0
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-forest leading-tight">
                Market <span className="text-transparent bg-clip-text bg-gradient-to-r from-forest to-forest-light">Intelligence</span> Report
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl font-body">
                Generated based on live signals harvested from Amazon, Nykaa, and Flipkart.
                Using multi-agent reasoning to identify high-value opportunity gaps.
              </p>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex items-center justify-between mb-8 border-b border-border/60 pb-1">
              <TabsList className="bg-transparent h-auto p-0 gap-8">
                <TabsTrigger
                  value="concepts"
                  className="bg-transparent border-0 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-forest relative h-12 px-0 font-bold text-sm tracking-tight transition-all group"
                >
                  <div className="flex items-center gap-2">
                    <Brain className="w-4 h-4" />
                    <span>Forged Concepts</span>
                  </div>
                  {activeTab === "concepts" && (
                    <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-forest" />
                  )}
                </TabsTrigger>
                <TabsTrigger
                  value="analytics"
                  className="bg-transparent border-0 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-forest relative h-12 px-0 font-bold text-sm tracking-tight transition-all group"
                >
                  <div className="flex items-center gap-2">
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Gap Analysis</span>
                  </div>
                  {activeTab === "analytics" && (
                    <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-forest" />
                  )}
                </TabsTrigger>
                <TabsTrigger
                  value="competitors"
                  className="bg-transparent border-0 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-forest relative h-12 px-0 font-bold text-sm tracking-tight transition-all group"
                >
                  <div className="flex items-center gap-2">
                    <Search className="w-4 h-4" />
                    <span>Direct Competitors</span>
                  </div>
                  {activeTab === "competitors" && (
                    <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-forest" />
                  )}
                </TabsTrigger>
              </TabsList>

              <div className="hidden md:block text-[10px] uppercase font-bold tracking-[0.2em] text-muted-foreground/60">
                Processed: {(generatedResults?.generatedAt) ? new Date(generatedResults.generatedAt).toLocaleDateString() : 'N/A'}
              </div>
            </div>

            <TabsContent value="concepts" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
              {showExplanation && (
                <Alert className="mb-8 border-forest/10 bg-forest/5 text-forest-dark animate-in fade-in slide-in-from-top-2 duration-500">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 h-8 w-8 rounded-full bg-forest/10 flex items-center justify-center text-forest flex-shrink-0">
                      <Wand2 className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <AlertTitle className="text-sm font-bold flex items-center justify-between">
                        The "Forged" Concept Selection
                        <button onClick={() => setShowExplanation(false)} className="text-[10px] uppercase text-forest opacity-60 hover:opacity-100 transition-opacity">Dismiss</button>
                      </AlertTitle>
                      <AlertDescription className="text-xs leading-relaxed opacity-90 pr-12">
                        These products were mathematically designed to maximize market success. We cross-referenced consumer complaints
                        about existing brands against high-velocity trending ingredients to create formulas with
                        proven differentiation.
                      </AlertDescription>
                    </div>
                  </div>
                </Alert>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {isLoading ? (
                  Array(3).fill(0).map((_, i) => (
                    <div key={i} className="h-[500px] bg-muted/20 animate-pulse rounded-3xl" />
                  ))
                ) : (
                  generatedResults?.concepts?.map((concept: any, idx: number) => (
                    <ConceptCard key={idx} concept={concept} index={idx} />
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
              {generatedResults && <GapMatrix values={generatedResults} />}
            </TabsContent>

            <TabsContent value="competitors" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {generatedResults?.competitors?.map((comp: any, idx: number) => (
                  <CompetitorCard key={idx} competitor={comp} />
                ))}
              </div>

              {/* Note on data sources */}
              <div className="mt-12 flex items-center justify-center gap-2 text-[10px] text-muted-foreground uppercase tracking-widest font-medium">
                <Database className="w-3.5 h-3.5" />
                Real-time connection: Amazon in · Nykaa · Flipkart · Google Trends
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default GeneratePage;
