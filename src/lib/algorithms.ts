// Algorithm implementations for benchmarking

export type AlgorithmType = 'iterative' | 'recursive' | 'sort';

export interface BenchmarkResult {
  dataSize: number;
  iterative: number;
  recursive: number;
  sort: number;
}

export interface AlgorithmStep {
  type: AlgorithmType;
  step: number;
  description: string;
  currentIndex?: number;
  array?: number[];
  callStack?: string[];
}

// Generate random array
export const generateRandomArray = (size: number): number[] => {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 10000));
};

// Iterative sum - O(n)
export const iterativeSum = (arr: number[]): number => {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
};

// Recursive sum - O(n)
export const recursiveSum = (arr: number[], index: number = 0): number => {
  if (index >= arr.length) return 0;
  return arr[index] + recursiveSum(arr, index + 1);
};

// JavaScript native sort
export const nativeSort = (arr: number[]): number[] => {
  return [...arr].sort((a, b) => a - b);
};

// Benchmark a single algorithm
const benchmarkAlgorithm = (
  fn: () => void,
  iterations: number
): number => {
  const times: number[] = [];
  
  for (let i = 0; i < iterations; i++) {
    const start = performance.now();
    fn();
    const end = performance.now();
    times.push(end - start);
  }
  
  // Return average time
  return times.reduce((a, b) => a + b, 0) / times.length;
};

// Run full benchmark
export const runBenchmark = (
  dataSize: number,
  iterations: number
): BenchmarkResult => {
  const arr = generateRandomArray(dataSize);
  
  const iterativeTime = benchmarkAlgorithm(() => iterativeSum(arr), iterations);
  
  // For recursive, limit to smaller sizes to avoid stack overflow
  const safeRecursiveSize = Math.min(dataSize, 5000);
  const recursiveArr = arr.slice(0, safeRecursiveSize);
  const recursiveTime = dataSize <= 5000 
    ? benchmarkAlgorithm(() => recursiveSum(recursiveArr), iterations)
    : benchmarkAlgorithm(() => recursiveSum(recursiveArr), iterations) * (dataSize / safeRecursiveSize);
  
  const sortTime = benchmarkAlgorithm(() => nativeSort(arr), iterations);
  
  return {
    dataSize,
    iterative: parseFloat(iterativeTime.toFixed(4)),
    recursive: parseFloat(recursiveTime.toFixed(4)),
    sort: parseFloat(sortTime.toFixed(4)),
  };
};

// Run benchmark across multiple data sizes
export const runFullBenchmark = (
  dataSizes: number[],
  iterations: number,
  onProgress?: (progress: number) => void
): BenchmarkResult[] => {
  const results: BenchmarkResult[] = [];
  
  dataSizes.forEach((size, index) => {
    results.push(runBenchmark(size, iterations));
    onProgress?.((index + 1) / dataSizes.length * 100);
  });
  
  return results;
};

// Generate visualization steps for iterative algorithm
export const generateIterativeSteps = (arr: number[]): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  const displayArr = arr.slice(0, 10); // Limit for visualization
  
  steps.push({
    type: 'iterative',
    step: 0,
    description: 'Mulai iterasi dari index 0',
    currentIndex: 0,
    array: displayArr,
  });
  
  for (let i = 0; i < displayArr.length; i++) {
    steps.push({
      type: 'iterative',
      step: i + 1,
      description: `Akses elemen pada index ${i}, nilai = ${displayArr[i]}`,
      currentIndex: i,
      array: displayArr,
    });
  }
  
  steps.push({
    type: 'iterative',
    step: displayArr.length + 1,
    description: 'Iterasi selesai - semua elemen telah diproses',
    currentIndex: -1,
    array: displayArr,
  });
  
  return steps;
};

// Generate visualization steps for recursive algorithm
export const generateRecursiveSteps = (arr: number[]): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  const displayArr = arr.slice(0, 6); // Limit for visualization
  const callStack: string[] = [];
  
  steps.push({
    type: 'recursive',
    step: 0,
    description: 'Panggil fungsi rekursif dengan index 0',
    currentIndex: 0,
    array: displayArr,
    callStack: [...callStack],
  });
  
  for (let i = 0; i < displayArr.length; i++) {
    callStack.push(`sum(arr, ${i})`);
    steps.push({
      type: 'recursive',
      step: i * 2 + 1,
      description: `Push ke call stack: sum(arr, ${i})`,
      currentIndex: i,
      array: displayArr,
      callStack: [...callStack],
    });
  }
  
  for (let i = displayArr.length - 1; i >= 0; i--) {
    steps.push({
      type: 'recursive',
      step: displayArr.length + (displayArr.length - i),
      description: `Pop dari call stack: return ${displayArr[i]}`,
      currentIndex: i,
      array: displayArr,
      callStack: [...callStack],
    });
    callStack.pop();
  }
  
  steps.push({
    type: 'recursive',
    step: displayArr.length * 2 + 1,
    description: 'Rekursi selesai - call stack kosong',
    currentIndex: -1,
    array: displayArr,
    callStack: [],
  });
  
  return steps;
};

// Generate visualization steps for sorting
export const generateSortSteps = (arr: number[]): AlgorithmStep[] => {
  const steps: AlgorithmStep[] = [];
  const displayArr = arr.slice(0, 8);
  
  steps.push({
    type: 'sort',
    step: 0,
    description: 'Array sebelum sorting',
    array: [...displayArr],
  });
  
  steps.push({
    type: 'sort',
    step: 1,
    description: 'Memanggil Array.prototype.sort()',
    array: [...displayArr],
  });
  
  steps.push({
    type: 'sort',
    step: 2,
    description: 'Array setelah sorting (O(n log n))',
    array: [...displayArr].sort((a, b) => a - b),
  });
  
  return steps;
};

// Analyze results and generate insights
export interface Insight {
  title: string;
  description: string;
  type: 'success' | 'warning' | 'info';
}

export const analyzeResults = (results: BenchmarkResult[]): Insight[] => {
  const insights: Insight[] = [];
  
  if (results.length === 0) return insights;
  
  // Find fastest algorithm overall
  const totals = {
    iterative: results.reduce((sum, r) => sum + r.iterative, 0),
    recursive: results.reduce((sum, r) => sum + r.recursive, 0),
    sort: results.reduce((sum, r) => sum + r.sort, 0),
  };
  
  const fastest = Object.entries(totals).reduce((a, b) => a[1] < b[1] ? a : b)[0];
  const fastestLabel = fastest === 'iterative' ? 'Iteratif' : fastest === 'recursive' ? 'Rekursif' : 'JS Sort';
  
  insights.push({
    title: `${fastestLabel} adalah yang tercepat secara keseluruhan`,
    description: `Berdasarkan total runtime di semua ukuran dataset, algoritma ${fastestLabel.toLowerCase()} menunjukkan performa terbaik.`,
    type: 'success',
  });
  
  // Analyze large dataset performance
  const largeResults = results.filter(r => r.dataSize >= 5000);
  if (largeResults.length > 0) {
    const avgIterative = largeResults.reduce((sum, r) => sum + r.iterative, 0) / largeResults.length;
    const avgSort = largeResults.reduce((sum, r) => sum + r.sort, 0) / largeResults.length;
    
    if (avgSort > avgIterative * 2) {
      insights.push({
        title: 'JS Sort melambat pada dataset besar',
        description: `Sorting bawaan JavaScript mengalami peningkatan runtime signifikan setelah n > 5000, konsisten dengan kompleksitas O(n log n) dibanding O(n) untuk iteratif.`,
        type: 'warning',
      });
    }
  }
  
  // Check iterative stability
  const iterativeTimes = results.map(r => r.iterative);
  const iterativeGrowth = iterativeTimes[iterativeTimes.length - 1] / iterativeTimes[0];
  const expectedGrowth = results[results.length - 1].dataSize / results[0].dataSize;
  
  if (iterativeGrowth <= expectedGrowth * 1.5) {
    insights.push({
      title: 'Algoritma iteratif menunjukkan pertumbuhan linear',
      description: `Rasio pertumbuhan runtime (${iterativeGrowth.toFixed(1)}x) mendekati rasio pertumbuhan data (${expectedGrowth.toFixed(1)}x), mengkonfirmasi kompleksitas O(n).`,
      type: 'info',
    });
  }
  
  // Recursive warning for large datasets
  if (results.some(r => r.dataSize > 5000)) {
    insights.push({
      title: 'Rekursif terbatas oleh call stack',
      description: `Untuk dataset > 5000 elemen, pendekatan rekursif berisiko stack overflow. Estimasi runtime diproyeksikan berdasarkan sampel yang lebih kecil.`,
      type: 'warning',
    });
  }
  
  return insights;
};

// Get confidence level based on iterations
export const getConfidenceLevel = (iterations: number): { level: 'low' | 'medium' | 'high'; label: string } => {
  if (iterations >= 50) return { level: 'high', label: 'Tinggi' };
  if (iterations >= 20) return { level: 'medium', label: 'Sedang' };
  return { level: 'low', label: 'Rendah' };
};
