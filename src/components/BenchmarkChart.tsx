import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { BenchmarkResult } from '@/lib/algorithms';
import { BarChart3 } from 'lucide-react';

interface BenchmarkChartProps {
  data: BenchmarkResult[];
  visibleAlgorithms: {
    iterative: boolean;
    recursive: boolean;
    sort: boolean;
  };
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
    dataKey: string;
  }>;
  label?: number;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (!active || !payload || payload.length === 0) return null;

  const sortedPayload = [...payload].sort((a, b) => a.value - b.value);
  const fastest = sortedPayload[0];
  const slowest = sortedPayload[sortedPayload.length - 1];
  
  const getAlgorithmLabel = (key: string) => {
    switch (key) {
      case 'iterative': return 'Iteratif';
      case 'recursive': return 'Rekursif';
      case 'sort': return 'JS Sort';
      default: return key;
    }
  };

  return (
    <div className="bg-popover border border-border rounded-lg shadow-lg p-4 min-w-[280px] animate-fade-in">
      <div className="font-semibold text-foreground mb-3 pb-2 border-b border-border">
        Dataset: <span className="font-mono">{label?.toLocaleString()}</span> elemen
      </div>
      
      <div className="space-y-2">
        {sortedPayload.map((entry, index) => (
          <div key={entry.dataKey} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span 
                className="w-2.5 h-2.5 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm">{getAlgorithmLabel(entry.dataKey)}</span>
              {index === 0 && (
                <span className="text-xs bg-algo-iterative/20 text-algo-iterative px-1.5 py-0.5 rounded font-medium">
                  Tercepat
                </span>
              )}
            </div>
            <span className="font-mono text-sm">
              {entry.value.toFixed(3)} ms
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const BenchmarkChart = ({ data, visibleAlgorithms }: BenchmarkChartProps) => {
  if (data.length === 0) {
    return (
      <div className="lab-card p-6 h-[400px] flex flex-col items-center justify-center text-muted-foreground">
        <BarChart3 className="h-12 w-12 mb-4 opacity-50" />
        <p className="text-lg font-medium">Belum ada data benchmark</p>
        <p className="text-sm">Klik "Jalankan Benchmark" untuk memulai</p>
      </div>
    );
  }

  return (
    <div className="lab-card p-6">
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 className="h-5 w-5 text-lab-accent" />
        <h3 className="text-lg font-semibold">Grafik Runtime</h3>
      </div>
      
      <div className="h-[350px] bg-chart-bg rounded-lg p-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="hsl(var(--chart-grid))"
              vertical={false}
            />
            <XAxis 
              dataKey="dataSize" 
              tickFormatter={(val) => val >= 1000 ? `${val/1000}k` : val}
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              tickFormatter={(val) => `${val}ms`}
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              width={60}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
              formatter={(value) => {
                const labels: Record<string, string> = {
                  iterative: 'Iteratif O(n)',
                  recursive: 'Rekursif O(n)',
                  sort: 'JS Sort O(n log n)',
                };
                return <span className="text-sm">{labels[value] || value}</span>;
              }}
            />
            {visibleAlgorithms.iterative && (
              <Line
                type="monotone"
                dataKey="iterative"
                stroke="hsl(var(--algo-iterative))"
                strokeWidth={2.5}
                dot={{ fill: 'hsl(var(--algo-iterative))', strokeWidth: 0, r: 4 }}
                activeDot={{ r: 6, stroke: 'hsl(var(--algo-iterative))', strokeWidth: 2, fill: 'hsl(var(--background))' }}
              />
            )}
            {visibleAlgorithms.recursive && (
              <Line
                type="monotone"
                dataKey="recursive"
                stroke="hsl(var(--algo-recursive))"
                strokeWidth={2.5}
                dot={{ fill: 'hsl(var(--algo-recursive))', strokeWidth: 0, r: 4 }}
                activeDot={{ r: 6, stroke: 'hsl(var(--algo-recursive))', strokeWidth: 2, fill: 'hsl(var(--background))' }}
              />
            )}
            {visibleAlgorithms.sort && (
              <Line
                type="monotone"
                dataKey="sort"
                stroke="hsl(var(--algo-sort))"
                strokeWidth={2.5}
                dot={{ fill: 'hsl(var(--algo-sort))', strokeWidth: 0, r: 4 }}
                activeDot={{ r: 6, stroke: 'hsl(var(--algo-sort))', strokeWidth: 2, fill: 'hsl(var(--background))' }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
