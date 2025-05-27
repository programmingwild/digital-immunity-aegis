
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, Shield, TrendingUp, Eye } from 'lucide-react';

interface ThreatPrediction {
  id: string;
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  probability: number;
  timeToImpact: string;
  targetAsset: string;
  description: string;
}

const ThreatPredictionDashboard = () => {
  const [threats, setThreats] = useState<ThreatPrediction[]>([
    {
      id: '1',
      type: 'Lateral Movement',
      severity: 'high',
      probability: 87,
      timeToImpact: '2h 15m',
      targetAsset: 'Database Server #3',
      description: 'Anomalous authentication patterns detected suggesting credential stuffing attack preparation'
    },
    {
      id: '2',
      type: 'Data Exfiltration',
      severity: 'medium',
      probability: 73,
      timeToImpact: '4h 32m',
      targetAsset: 'File Server Cluster',
      description: 'Unusual data access patterns correlating with known APT group TTPs'
    },
    {
      id: '3',
      type: 'Zero-Day Exploit',
      severity: 'critical',
      probability: 95,
      timeToImpact: '1h 08m',
      targetAsset: 'Web Application Gateway',
      description: 'Novel payload signatures matching theoretical exploit vectors'
    }
  ]);

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      // Simulate threat probability changes
      setThreats(prev => prev.map(threat => ({
        ...threat,
        probability: Math.max(60, Math.min(99, threat.probability + (Math.random() - 0.5) * 2))
      })));
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'high': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getProbabilityColor = (probability: number) => {
    if (probability >= 90) return 'bg-red-500';
    if (probability >= 70) return 'bg-orange-500';
    if (probability >= 50) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <Card className="bg-black/40 backdrop-blur-sm border-cyan-500/20 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Eye className="w-6 h-6 text-cyan-400" />
          <h2 className="text-xl font-bold text-white">Threat Oracle</h2>
          <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
            Predictive Engine
          </Badge>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-400">Last Scan</div>
          <div className="text-sm font-mono text-cyan-400">
            {currentTime.toLocaleTimeString()}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {threats.map((threat) => (
          <div 
            key={threat.id} 
            className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-4 hover:border-cyan-500/30 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-5 h-5 text-orange-400 animate-pulse" />
                <div>
                  <h3 className="font-semibold text-white">{threat.type}</h3>
                  <p className="text-sm text-gray-400">{threat.targetAsset}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className={getSeverityColor(threat.severity)}>
                  {threat.severity.toUpperCase()}
                </Badge>
                <div className="text-right">
                  <div className="text-xs text-gray-400">ETA</div>
                  <div className="text-sm font-mono text-red-400">{threat.timeToImpact}</div>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-300 mb-3">{threat.description}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-gray-400">Probability</span>
              </div>
              <div className="flex items-center space-x-3">
                <Progress 
                  value={threat.probability} 
                  className="w-24 h-2 bg-gray-700"
                  style={{
                    background: 'rgb(55 65 81)',
                  }}
                />
                <span className={`text-sm font-mono font-bold ${
                  threat.probability >= 90 ? 'text-red-400' :
                  threat.probability >= 70 ? 'text-orange-400' :
                  threat.probability >= 50 ? 'text-yellow-400' : 'text-green-400'
                }`}>
                  {Math.round(threat.probability)}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-700/50">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-cyan-400">247</div>
            <div className="text-xs text-gray-400">Patterns Analyzed</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-400">98.7%</div>
            <div className="text-xs text-gray-400">Prediction Accuracy</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-400">3</div>
            <div className="text-xs text-gray-400">Active Threats</div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ThreatPredictionDashboard;
