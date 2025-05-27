
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Shield, Zap, CheckCircle, Clock, Play } from 'lucide-react';

interface Countermeasure {
  id: string;
  name: string;
  type: 'firewall' | 'isolation' | 'patch' | 'monitoring';
  status: 'generated' | 'deploying' | 'active' | 'completed';
  effectiveness: number;
  target: string;
  timeToComplete: string;
  description: string;
}

const CountermeasurePanel = () => {
  const [countermeasures, setCountermeasures] = useState<Countermeasure[]>([
    {
      id: '1',
      name: 'Dynamic Firewall Rule',
      type: 'firewall',
      status: 'active',
      effectiveness: 94,
      target: 'Database Server #3',
      timeToComplete: '2m 15s',
      description: 'Block suspicious IP ranges attempting lateral movement'
    },
    {
      id: '2',
      name: 'Network Isolation',
      type: 'isolation',
      status: 'deploying',
      effectiveness: 87,
      target: 'Web Application Gateway',
      timeToComplete: '45s',
      description: 'Isolate compromised segment while maintaining critical services'
    },
    {
      id: '3',
      name: 'Behavioral Monitoring',
      type: 'monitoring',
      status: 'generated',
      effectiveness: 91,
      target: 'File Server Cluster',
      timeToComplete: '3m 30s',
      description: 'Enhanced monitoring for data exfiltration patterns'
    }
  ]);

  const [autoDeployCount, setAutoDeployCount] = useState(47);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountermeasures(prev => prev.map(cm => {
        if (cm.status === 'deploying') {
          return { ...cm, status: 'active' };
        }
        if (cm.status === 'generated' && Math.random() > 0.7) {
          return { ...cm, status: 'deploying' };
        }
        return cm;
      }));
      
      if (Math.random() > 0.8) {
        setAutoDeployCount(prev => prev + 1);
      }
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'generated': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'deploying': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30 animate-pulse';
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'completed': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'firewall': return Shield;
      case 'isolation': return Zap;
      case 'patch': return CheckCircle;
      case 'monitoring': return Clock;
      default: return Shield;
    }
  };

  const deployCountermeasure = (id: string) => {
    setCountermeasures(prev => prev.map(cm => 
      cm.id === id ? { ...cm, status: 'deploying' } : cm
    ));
  };

  return (
    <Card className="bg-black/40 backdrop-blur-sm border-cyan-500/20 p-6 h-96">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Zap className="w-6 h-6 text-cyan-400" />
          <h2 className="text-xl font-bold text-white">AI Strategist</h2>
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
            Auto-Deploy: ON
          </Badge>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-400">Deployed Today</div>
          <div className="text-xl font-bold text-cyan-400">{autoDeployCount}</div>
        </div>
      </div>

      <div className="space-y-3 max-h-64 overflow-y-auto">
        {countermeasures.map((countermeasure) => {
          const Icon = getTypeIcon(countermeasure.type);
          
          return (
            <div 
              key={countermeasure.id}
              className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-3 hover:border-cyan-500/30 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Icon className="w-4 h-4 text-cyan-400" />
                  <h3 className="font-semibold text-white text-sm">{countermeasure.name}</h3>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(countermeasure.status)}>
                    {countermeasure.status.toUpperCase()}
                  </Badge>
                  {countermeasure.status === 'generated' && (
                    <Button 
                      size="sm" 
                      className="h-6 px-2 bg-cyan-600 hover:bg-cyan-700 text-xs"
                      onClick={() => deployCountermeasure(countermeasure.id)}
                    >
                      <Play className="w-3 h-3 mr-1" />
                      Deploy
                    </Button>
                  )}
                </div>
              </div>

              <p className="text-xs text-gray-400 mb-2">{countermeasure.description}</p>

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center space-x-3">
                  <span className="text-gray-400">Target:</span>
                  <span className="text-cyan-400">{countermeasure.target}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-gray-400">ETA:</span>
                  <span className="text-yellow-400">{countermeasure.timeToComplete}</span>
                  <span className="text-gray-400">Effectiveness:</span>
                  <span className="text-green-400 font-mono">{countermeasure.effectiveness}%</span>
                </div>
              </div>

              {countermeasure.status === 'deploying' && (
                <div className="mt-2 bg-gray-800 rounded-full h-1 overflow-hidden">
                  <div className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full animate-pulse" style={{ width: '60%' }}></div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-3 border-t border-gray-700/50">
        <div className="grid grid-cols-3 gap-4 text-center text-xs">
          <div>
            <div className="text-lg font-bold text-green-400">12</div>
            <div className="text-gray-400">Active Defenses</div>
          </div>
          <div>
            <div className="text-lg font-bold text-cyan-400">99.2%</div>
            <div className="text-gray-400">Success Rate</div>
          </div>
          <div>
            <div className="text-lg font-bold text-orange-400">1.8s</div>
            <div className="text-gray-400">Avg Response</div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CountermeasurePanel;
