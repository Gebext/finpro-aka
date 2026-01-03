import { BenchmarkResult } from '@/lib/algorithms';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { TableIcon } from 'lucide-react';

interface ResultsTableProps {
  data: BenchmarkResult[];
}

export const ResultsTable = ({ data }: ResultsTableProps) => {
  if (data.length === 0) {
    return null;
  }

  const getFastestClass = (row: BenchmarkResult, algo: 'iterative' | 'recursive' | 'sort') => {
    const min = Math.min(row.iterative, row.recursive, row.sort);
    if (row[algo] === min) {
      return 'text-algo-iterative font-semibold';
    }
    return '';
  };

  return (
    <div className="lab-card p-6">
      <div className="flex items-center gap-2 mb-4">
        <TableIcon className="h-5 w-5 text-lab-accent" />
        <h3 className="text-lg font-semibold">Tabel Hasil</h3>
      </div>
      
      <div className="rounded-lg border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-semibold">Dataset (n)</TableHead>
              <TableHead className="font-semibold">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-algo-iterative" />
                  Iteratif
                </div>
              </TableHead>
              <TableHead className="font-semibold">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-algo-recursive" />
                  Rekursif
                </div>
              </TableHead>
              <TableHead className="font-semibold">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-algo-sort" />
                  JS Sort
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index} className="hover:bg-muted/30 transition-colors">
                <TableCell className="font-mono">{row.dataSize.toLocaleString()}</TableCell>
                <TableCell className={`font-mono ${getFastestClass(row, 'iterative')}`}>
                  {row.iterative.toFixed(4)} ms
                </TableCell>
                <TableCell className={`font-mono ${getFastestClass(row, 'recursive')}`}>
                  {row.recursive.toFixed(4)} ms
                </TableCell>
                <TableCell className={`font-mono ${getFastestClass(row, 'sort')}`}>
                  {row.sort.toFixed(4)} ms
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
