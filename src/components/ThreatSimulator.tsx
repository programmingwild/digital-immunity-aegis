
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Play, Pause, RotateCcw, Target, Zap } from 'lucide-react';

const ThreatSimulator = () => {
  const [simulationState, setSimulationState] = useState<'idle' | 'running' | 'completed'>('idle');
  const [selectedThreat, setSelectedThreat] = useState('');
  const [simulationProgress, setSimulationProgress] = useState(0);

  const threatTypes = [
    { value: 'apt', label: 'Advanced Persistent Threat', severity: 'Critical' },
    { value: 'ransomware', label: 'Ransomware Attack', severity: 'High' },
    { value: 'phishing', label: 'Spear Phishing Campaign', severity: 'Medium' },
    { value: 'ddos', label: 'Distributed Denial of Service', severity: 'High' },
    { value: 'insider', label: 'Insider Threat', severity: 'Medium' },
  ];

  const startSimulation = () => {
    if (!selectedThreat) return;
    
    setSimulationState('running');
    setSimulationProgress(0);
    
    const interval = setInterval(() => {
      setSimulationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setSimulationState('completed');
          return 100;
        }
        return prev + Math.random() * 10;
      });
    }, 500);
  };

  const resetSimulation = () => {
    setSimulationState('idle');
    setSimulationProgress(0);
  };

  const getProgressColor = () => {
    if (simulationProgress < 30) return 'bg-yellow-500';
    if (simulationProgress < 70) return 'bg-orange-500';
    return 'bg-green-500';
  };

  return (
    <Card className="bg-black/40 backdrop-blur-sm border-cyan-500/20 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Target className="w-6 h-6 text-cyan-400" />
          <h2 className="text-xl font-bold text-white">Threat Simulation Lab</h2>
          <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
            Sandbox Environment
          </Badge>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-400">Status:</span>
          <Badge className={
            simulationState === 'running' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30 animate-pulse' :
            simulationState === 'completed' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
            'bg-gray-500/20 text-gray-400 border-gray-500/30'
          }>
            {simulationState.toUpperCase()}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Simulation Controls */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">Select Threat Type</label>
            <Select value={selectedThreat} onValueChange={setSelectedThreat}>
              <SelectTrigger className="bg-gray-900/50 border-gray-700 text-white">
                <SelectValue placeholder="Choose threat to simulate..." />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700">
                {threatTypes.map((threat) => (
                  <SelectItem key={threat.value} value={threat.value} className="text-white hover:bg-gray-800">
                    <div className="flex items-center justify-between w-full">
                      <span>{threat.label}</span>
                      <Badge className={
                        threat.severity === 'Critical' ? 'bg-red-500/20 text-red-400 ml-2' :
                        threat.severity === 'High' ? 'bg-orange-500/20 text-orange-400 ml-2' :
                        'bg-yellow-500/20 text-yellow-400 ml-2'
                      }>
                        {threat.severity}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex space-x-2">
            <Button 
              onClick={startSimulation}
              disabled={!selectedThreat || simulationState === 'running'}
              className="flex-1 bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50"
            >
              <Play className="w-4 h-4 mr-2" />
              {simulationState === 'running' ? 'Running...' : 'Start Simulation'}
            </Button>
            <Button 
              onClick={resetSimulation}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-800"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>

          {simulationState === 'running' && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Progress</span>
                <span className="text-cyan-400">{Math.round(simulationProgress)}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className={`${getProgressColor()} h-2 rounded-full transition-all duration-300`}
                  style={{ width: `${simulationProgress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Simulation Results */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-4">
            <h3 className="font-semibold text-white mb-3">Simulation Results</h3>
            
            {simulationState === 'idle' && (
              <div className="text-center py-8 text-gray-400">
                <Target className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>Select a threat type and start simulation to see results</p>
              </div>
            )}

            {simulationState === 'running' && (
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-yellow-400">
                  <Zap className="w-4 h-4 animate-pulse" />
                  <span className="text-sm">Simulating attack vectors...</span>
                </div>
                <div className="flex items-center space-x-2 text-cyan-400">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                  <span className="text-sm">Generating defensive strategies...</span>
                </div>
                <div className="flex items-center space-x-2 text-blue-400">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <span className="text-sm">Testing countermeasure effectiveness...</span>
                </div>
              </div>
            )}

            {simulationState === 'completed' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                    <div className="text-sm text-gray-400">Attack Success Rate</div>
                    <div className="text-2xl font-bold text-green-400">2.3%</div>
                  </div>
                  <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-3">
                    <div className="text-sm text-gray-400">Defense Effectiveness</div>
                    <div className="text-2xl font-bold text-cyan-400">97.7%</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-sm text-green-400">✓ Perimeter defenses held strong</div>
                  <div className="text-sm text-green-400">✓ Lateral movement successfully blocked</div>
                  <div className="text-sm text-green-400">✓ Data exfiltration prevented</div>
                  <div className="text-sm text-yellow-400">⚠ Minor privilege escalation detected and contained</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ThreatSimulator;
