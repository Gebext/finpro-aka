import { Play, Settings2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { getConfidenceLevel } from '@/lib/algorithms';

interface ControlPanelProps {
  maxDataSize: number;
  setMaxDataSize: (size: number) => void;
  iterations: number;
  setIterations: (iterations: number) => void;
  visibleAlgorithms: {
    iterative: boolean;
    recursive: boolean;
    sort: boolean;
  };
  setVisibleAlgorithms: (algos: { iterative: boolean; recursive: boolean; sort: boolean }) => void;
  onRunBenchmark: () => void;
  isRunning: boolean;
  progress: number;
}

export const ControlPanel = ({
  maxDataSize,
  setMaxDataSize,
  iterations,
  setIterations,
  visibleAlgorithms,
  setVisibleAlgorithms,
  onRunBenchmark,
  isRunning,
  progress,
}: ControlPanelProps) => {
  const confidence = getConfidenceLevel(iterations);

  const confidenceColors = {
    low: 'text-destructive',
    medium: 'text-algo-sort',
    high: 'text-algo-iterative',
  };

  return (
    <div className="lab-card p-6 space-y-6">
      <div className="flex items-center gap-2 text-lg font-semibold">
        <Settings2 className="h-5 w-5 text-lab-accent" />
        <span>Kontrol Eksperimen</span>
      </div>

      {/* Dataset Size Slider */}
      <div className="control-section space-y-3">
        <div className="flex justify-between items-center">
          <Label className="text-sm font-medium">Ukuran Dataset Maksimum</Label>
          <span className="font-mono text-sm bg-secondary px-2 py-1 rounded">
            {maxDataSize.toLocaleString()}
          </span>
        </div>
        <Slider
          value={[maxDataSize]}
          onValueChange={([val]) => setMaxDataSize(val)}
          min={100}
          max={20000}
          step={100}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>100</span>
          <span>20,000</span>
        </div>
      </div>

      {/* Iterations Control */}
      <div className="control-section space-y-3">
        <div className="flex justify-between items-center">
          <Label className="text-sm font-medium">Jumlah Iterasi</Label>
          <div className="flex items-center gap-2">
            <span className={`text-xs font-medium ${confidenceColors[confidence.level]}`}>
              Kepercayaan: {confidence.label}
            </span>
          </div>
        </div>
        <Select value={iterations.toString()} onValueChange={(val) => setIterations(parseInt(val))}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5 iterasi (cepat)</SelectItem>
            <SelectItem value="10">10 iterasi</SelectItem>
            <SelectItem value="20">20 iterasi</SelectItem>
            <SelectItem value="50">50 iterasi (akurat)</SelectItem>
            <SelectItem value="100">100 iterasi (sangat akurat)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Algorithm Toggles */}
      <div className="control-section space-y-3">
        <Label className="text-sm font-medium">Tampilkan Algoritma</Label>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Checkbox
              id="iterative"
              checked={visibleAlgorithms.iterative}
              onCheckedChange={(checked) =>
                setVisibleAlgorithms({ ...visibleAlgorithms, iterative: !!checked })
              }
            />
            <Label htmlFor="iterative" className="flex items-center gap-2 cursor-pointer">
              <span className="w-3 h-3 rounded-full bg-algo-iterative" />
              <span>Iteratif (O(n))</span>
            </Label>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox
              id="recursive"
              checked={visibleAlgorithms.recursive}
              onCheckedChange={(checked) =>
                setVisibleAlgorithms({ ...visibleAlgorithms, recursive: !!checked })
              }
            />
            <Label htmlFor="recursive" className="flex items-center gap-2 cursor-pointer">
              <span className="w-3 h-3 rounded-full bg-algo-recursive" />
              <span>Rekursif (O(n))</span>
            </Label>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox
              id="sort"
              checked={visibleAlgorithms.sort}
              onCheckedChange={(checked) =>
                setVisibleAlgorithms({ ...visibleAlgorithms, sort: !!checked })
              }
            />
            <Label htmlFor="sort" className="flex items-center gap-2 cursor-pointer">
              <span className="w-3 h-3 rounded-full bg-algo-sort" />
              <span>JS Sort (O(n log n))</span>
            </Label>
          </div>
        </div>
      </div>

      {/* Run Button */}
      <Button
        onClick={onRunBenchmark}
        disabled={isRunning}
        className="w-full h-12 text-base font-semibold relative overflow-hidden"
        size="lg"
      >
        {isRunning ? (
          <>
            <div
              className="absolute left-0 top-0 h-full bg-primary-foreground/20 transition-all"
              style={{ width: `${progress}%` }}
            />
            <span className="relative">Menjalankan... {progress.toFixed(0)}%</span>
          </>
        ) : (
          <>
            <Play className="h-5 w-5 mr-2" />
            Jalankan Benchmark
          </>
        )}
      </Button>
    </div>
  );
};
