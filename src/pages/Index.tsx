
import React from 'react';
import ThreatPredictionDashboard from '../components/ThreatPredictionDashboard';
import NetworkTopology from '../components/NetworkTopology';
import CountermeasurePanel from '../components/CountermeasurePanel';
import AIModelMetrics from '../components/AIModelMetrics';
import ThreatSimulator from '../components/ThreatSimulator';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-cyan-500/20 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-lg">Æ</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                AEGIS
              </h1>
              <p className="text-xs text-cyan-300">Autonomous Predictive Cyber-Defense System</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-400">ACTIVE</span>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-400">System Status</div>
              <div className="text-sm font-medium text-cyan-400">Operational</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard */}
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Top Row - Threat Prediction and AI Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ThreatPredictionDashboard />
          </div>
          <div>
            <AIModelMetrics />
          </div>
        </div>

        {/* Middle Row - Network Topology and Countermeasures */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <NetworkTopology />
          <CountermeasurePanel />
        </div>

        {/* Bottom Row - Threat Simulator */}
        <ThreatSimulator />
      </div>
    </div>
  );
};

export default Index;
