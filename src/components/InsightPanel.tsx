import { Insight } from '@/lib/algorithms';
import { Lightbulb, AlertTriangle, Info, CheckCircle2 } from 'lucide-react';

interface InsightPanelProps {
  insights: Insight[];
}

export const InsightPanel = ({ insights }: InsightPanelProps) => {
  const getIcon = (type: Insight['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="h-5 w-5 text-algo-iterative" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-algo-sort" />;
      case 'info':
        return <Info className="h-5 w-5 text-lab-accent" />;
    }
  };

  const getBgClass = (type: Insight['type']) => {
    switch (type) {
      case 'success':
        return 'bg-algo-iterative-light border-algo-iterative/30';
      case 'warning':
        return 'bg-algo-sort-light border-algo-sort/30';
      case 'info':
        return 'bg-secondary border-border';
    }
  };

  if (insights.length === 0) {
    return (
      <div className="lab-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="h-5 w-5 text-lab-accent" />
          <h3 className="text-lg font-semibold">Analisis Otomatis</h3>
        </div>
        <div className="insight-panel p-4 text-center text-muted-foreground">
          <p>Jalankan benchmark untuk melihat insight otomatis</p>
        </div>
      </div>
    );
  }

  return (
    <div className="lab-card p-6">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="h-5 w-5 text-lab-accent" />
        <h3 className="text-lg font-semibold">Analisis Otomatis</h3>
      </div>
      
      <div className="space-y-3">
        {insights.map((insight, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border animate-slide-up ${getBgClass(insight.type)}`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5">{getIcon(insight.type)}</div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">{insight.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {insight.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
