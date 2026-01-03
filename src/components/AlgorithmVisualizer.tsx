import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, FastForward } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  AlgorithmStep,
  AlgorithmType,
  generateIterativeSteps,
  generateRecursiveSteps,
  generateSortSteps,
  generateRandomArray,
} from '@/lib/algorithms';

export const AlgorithmVisualizer = () => {
  const [activeTab, setActiveTab] = useState<AlgorithmType>('iterative');
  const [steps, setSteps] = useState<AlgorithmStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(500);

  const sampleArray = generateRandomArray(10);

  useEffect(() => {
    generateSteps(activeTab);
  }, [activeTab]);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= steps.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [isPlaying, steps.length, speed]);

  const generateSteps = (type: AlgorithmType) => {
    let newSteps: AlgorithmStep[] = [];
    switch (type) {
      case 'iterative':
        newSteps = generateIterativeSteps(sampleArray);
        break;
      case 'recursive':
        newSteps = generateRecursiveSteps(sampleArray);
        break;
      case 'sort':
        newSteps = generateSortSteps(sampleArray);
        break;
    }
    setSteps(newSteps);
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const handleTogglePlay = () => {
    if (currentStep >= steps.length - 1) {
      setCurrentStep(0);
    }
    setIsPlaying(!isPlaying);
  };

  const currentStepData = steps[currentStep];

  return (
    <div className="lab-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Visualisasi Algoritma</h3>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={handleReset}>
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleTogglePlay}>
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setSpeed((s) => Math.max(100, s - 200))}
            disabled={speed <= 100}
          >
            <FastForward className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as AlgorithmType)}>
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="iterative" className="text-xs sm:text-sm">
            <span className="w-2 h-2 rounded-full bg-algo-iterative mr-2" />
            Iteratif
          </TabsTrigger>
          <TabsTrigger value="recursive" className="text-xs sm:text-sm">
            <span className="w-2 h-2 rounded-full bg-algo-recursive mr-2" />
            Rekursif
          </TabsTrigger>
          <TabsTrigger value="sort" className="text-xs sm:text-sm">
            <span className="w-2 h-2 rounded-full bg-algo-sort mr-2" />
            Sorting
          </TabsTrigger>
        </TabsList>

        <div className="min-h-[200px]">
          <TabsContent value="iterative" className="mt-0">
            {currentStepData && (
              <div className="space-y-4">
                <div className="flex gap-1 flex-wrap">
                  {currentStepData.array?.map((val, idx) => (
                    <div
                      key={idx}
                      className={`w-10 h-10 flex items-center justify-center rounded font-mono text-sm border-2 transition-all duration-300 ${
                        idx === currentStepData.currentIndex
                          ? 'bg-algo-iterative text-primary-foreground border-algo-iterative scale-110'
                          : 'bg-secondary border-border'
                      }`}
                    >
                      {val}
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Pointer:</span>
                  <span className="font-mono bg-algo-iterative-light text-algo-iterative px-2 py-1 rounded text-sm">
                    i = {currentStepData.currentIndex === -1 ? 'selesai' : currentStepData.currentIndex}
                  </span>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="recursive" className="mt-0">
            {currentStepData && (
              <div className="space-y-4">
                <div className="flex gap-1 flex-wrap">
                  {currentStepData.array?.map((val, idx) => (
                    <div
                      key={idx}
                      className={`w-10 h-10 flex items-center justify-center rounded font-mono text-sm border-2 transition-all duration-300 ${
                        idx === currentStepData.currentIndex
                          ? 'bg-algo-recursive text-primary-foreground border-algo-recursive scale-110'
                          : 'bg-secondary border-border'
                      }`}
                    >
                      {val}
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <span className="text-sm text-muted-foreground">Call Stack:</span>
                  <div className="flex flex-col-reverse gap-1">
                    {currentStepData.callStack?.length === 0 ? (
                      <div className="text-sm text-muted-foreground italic">Stack kosong</div>
                    ) : (
                      currentStepData.callStack?.map((call, idx) => (
                        <div
                          key={idx}
                          className="font-mono text-xs bg-algo-recursive-light text-algo-recursive px-2 py-1 rounded border border-algo-recursive/30"
                        >
                          {call}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="sort" className="mt-0">
            {currentStepData && (
              <div className="space-y-4">
                <div className="flex gap-1 flex-wrap">
                  {currentStepData.array?.map((val, idx) => (
                    <div
                      key={idx}
                      className="w-10 h-10 flex items-center justify-center rounded font-mono text-sm border-2 bg-algo-sort-light border-algo-sort/30 text-algo-sort transition-all duration-300"
                    >
                      {val}
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Status:</span>
                  <span className="font-mono bg-algo-sort-light text-algo-sort px-2 py-1 rounded text-sm">
                    {currentStep === 0 ? 'Belum diurutkan' : currentStep === 1 ? 'Sedang mengurutkan...' : 'Terurut'}
                  </span>
                </div>
              </div>
            )}
          </TabsContent>
        </div>

        {/* Step Description */}
        <div className="mt-4 p-3 bg-muted rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground">
              Langkah {currentStep + 1} / {steps.length}
            </span>
            <div className="h-1 flex-1 mx-4 bg-secondary rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  activeTab === 'iterative'
                    ? 'bg-algo-iterative'
                    : activeTab === 'recursive'
                    ? 'bg-algo-recursive'
                    : 'bg-algo-sort'
                }`}
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>
          <p className="text-sm font-medium">{currentStepData?.description}</p>
        </div>
      </Tabs>
    </div>
  );
};
