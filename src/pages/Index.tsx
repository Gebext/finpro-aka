import { AlgorithmVisualizer } from "@/components/AlgorithmVisualizer";
import { BenchmarkChart } from "@/components/BenchmarkChart";
import { ControlPanel } from "@/components/ControlPanel";
import { InsightPanel } from "@/components/InsightPanel";
import { ResultsTable } from "@/components/ResultsTable";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  analyzeResults,
  BenchmarkResult,
  Insight,
  runFullBenchmark,
} from "@/lib/algorithms";
import { FlaskConical } from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";

const Index = () => {
  const [maxDataSize, setMaxDataSize] = useState(5000);
  const [iterations, setIterations] = useState(10);
  const [visibleAlgorithms, setVisibleAlgorithms] = useState({
    iterative: true,
    recursive: true,
    sort: true,
  });
  const [results, setResults] = useState<BenchmarkResult[]>([]);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);

  const generateDataSizes = useCallback((max: number): number[] => {
    const sizes: number[] = [];
    const steps = [100, 500, 1000, 2000, 3000, 5000, 7500, 10000, 15000, 20000];
    for (const step of steps) {
      if (step <= max) {
        sizes.push(step);
      }
    }
    if (sizes[sizes.length - 1] !== max && max > 100) {
      sizes.push(max);
    }
    return sizes;
  }, []);

  const handleRunBenchmark = useCallback(() => {
    setIsRunning(true);
    setProgress(0);

    // Use setTimeout to allow UI to update
    setTimeout(() => {
      try {
        const dataSizes = generateDataSizes(maxDataSize);
        const benchmarkResults = runFullBenchmark(
          dataSizes,
          iterations,
          (p) => {
            setProgress(p);
          }
        );

        setResults(benchmarkResults);
        setInsights(analyzeResults(benchmarkResults));
        toast.success("Benchmark selesai!", {
          description: `${dataSizes.length} ukuran dataset diuji dengan ${iterations} iterasi masing-masing.`,
        });
      } catch (error) {
        toast.error("Terjadi kesalahan", {
          description: "Gagal menjalankan benchmark. Silakan coba lagi.",
        });
      } finally {
        setIsRunning(false);
        setProgress(0);
      }
    }, 100);
  }, [maxDataSize, iterations, generateDataSizes]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary text-primary-foreground">
              <FlaskConical className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">
                Algorithm Performance Lab
              </h1>
              <p className="text-sm text-muted-foreground hidden sm:block">
                Eksperimen & Visualisasi Runtime Algoritma
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar - Controls */}
          <div className="lg:col-span-3 space-y-6">
            <ControlPanel
              maxDataSize={maxDataSize}
              setMaxDataSize={setMaxDataSize}
              iterations={iterations}
              setIterations={setIterations}
              visibleAlgorithms={visibleAlgorithms}
              setVisibleAlgorithms={setVisibleAlgorithms}
              onRunBenchmark={handleRunBenchmark}
              isRunning={isRunning}
              progress={progress}
            />
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-9 space-y-6">
            {/* Chart */}
            <BenchmarkChart
              data={results}
              visibleAlgorithms={visibleAlgorithms}
            />

            {/* Two Column Grid for Insights and Visualizer */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InsightPanel insights={insights} />
              <AlgorithmVisualizer />
            </div>

            {/* Results Table */}
            <ResultsTable data={results} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
