
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, TrendingUp, Activity, Cpu } from 'lucide-react';

interface ModelMetric {
  name: string;
  type: 'oracle' | 'strategist' | 'innovator';
  accuracy: number;
  confidence: number;
  throughput: number;
  status: 'training' | 'active' | 'optimizing';
}

const AIModelMetrics = () => {
  const [models, setModels] = useState<ModelMetric[]>([
    {
      name: 'Threat Oracle LSTM',
      type: 'oracle',
      accuracy: 98.7,
      confidence: 94.2,
      throughput: 2847,
      status: 'active'
    },
    {
      name: 'Defense Strategist GAN',
      type: 'strategist',
      accuracy: 96.3,
      confidence: 91.8,
      throughput: 1924,
      status: 'active'
    },
    {
      name: 'Adaptive Innovator RL',
      type: 'innovator',
      accuracy: 94.1,
      confidence: 88.6,
      throughput: 3156,
      status: 'training'
    }
  ]);

  const [systemLoad, setSystemLoad] = useState(67);

  useEffect(() => {
    const timer = setInterval(() => {
      setModels(prev => prev.map(model => ({
        ...model,
        accuracy: Math.max(90, Math.min(99.9, model.accuracy + (Math.random() - 0.5) * 0.2)),
        confidence: Math.max(85, Math.min(99, model.confidence + (Math.random() - 0.5) * 0.5)),
        throughput: Math.max(1000, Math.min(5000, model.throughput + (Math.random() - 0.5) * 100))
      })));
      
      setSystemLoad(Math.max(50, Math.min(90, systemLoad + (Math.random() - 0.5) * 5)));
    }, 2000);

    return () => clearInterval(timer);
  }, [systemLoad]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'oracle': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'strategist': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'innovator': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'training': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30 animate-pulse';
      case 'optimizing': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <Card className="bg-black/40 backdrop-blur-sm border-cyan-500/20 p-6 h-96">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Brain className="w-6 h-6 text-cyan-400" />
          <h2 className="text-xl font-bold text-white">AI Models</h2>
        </div>
        <div className="flex items-center space-x-2">
          <Cpu className="w-4 h-4 text-cyan-400" />
          <span className="text-sm text-gray-400">Load: {Math.round(systemLoad)}%</span>
        </div>
      </div>

      <div className="space-y-4 max-h-64 overflow-y-auto">
        {models.map((model, index) => (
          <div 
            key={index}
            className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-3"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-white text-sm">{model.name}</h3>
              <div className="flex items-center space-x-2">
                <Badge className={getTypeColor(model.type)}>
                  {model.type.toUpperCase()}
                </Badge>
                <Badge className={getStatusColor(model.status)}>
                  {model.status.toUpperCase()}
                </Badge>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">Accuracy</span>
                <span className="text-green-400 font-mono">{model.accuracy.toFixed(1)}%</span>
              </div>
              <Progress 
                value={model.accuracy} 
                className="h-1 bg-gray-700"
              />

              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">Confidence</span>
                <span className="text-blue-400 font-mono">{model.confidence.toFixed(1)}%</span>
              </div>
              <Progress 
                value={model.confidence} 
                className="h-1 bg-gray-700"
              />

              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-400">Throughput</span>
                <span className="text-cyan-400 font-mono">{Math.round(model.throughput)}/s</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-gray-700/50">
        <div className="grid grid-cols-2 gap-4 text-center text-xs">
          <div>
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Activity className="w-3 h-3 text-cyan-400" />
              <span className="text-gray-400">Neural Activity</span>
            </div>
            <div className="text-lg font-bold text-cyan-400">High</div>
          </div>
          <div>
            <div className="flex items-center justify-center space-x-1 mb-1">
              <TrendingUp className="w-3 h-3 text-green-400" />
              <span className="text-gray-400">Performance</span>
            </div>
            <div className="text-lg font-bold text-green-400">Optimal</div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AIModelMetrics;
