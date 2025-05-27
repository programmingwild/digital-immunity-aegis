
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Server, Wifi, Shield, AlertCircle } from 'lucide-react';

interface NetworkNode {
  id: string;
  type: 'server' | 'router' | 'endpoint' | 'firewall';
  name: string;
  status: 'secure' | 'warning' | 'threat' | 'protected';
  x: number;
  y: number;
  connections: string[];
}

const NetworkTopology = () => {
  const [nodes] = useState<NetworkNode[]>([
    { id: '1', type: 'firewall', name: 'Perimeter Firewall', status: 'protected', x: 50, y: 50, connections: ['2', '3'] },
    { id: '2', type: 'server', name: 'Web Server', status: 'warning', x: 150, y: 100, connections: ['4', '5'] },
    { id: '3', type: 'server', name: 'Database Server', status: 'threat', x: 150, y: 200, connections: ['6'] },
    { id: '4', type: 'endpoint', name: 'Admin Workstation', status: 'secure', x: 250, y: 80, connections: [] },
    { id: '5', type: 'router', name: 'Internal Router', status: 'secure', x: 250, y: 140, connections: ['6', '7'] },
    { id: '6', type: 'server', name: 'File Server', status: 'warning', x: 350, y: 160, connections: [] },
    { id: '7', type: 'endpoint', name: 'User Endpoints', status: 'secure', x: 350, y: 220, connections: [] },
  ]);

  const [animationTick, setAnimationTick] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimationTick(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'server': return Server;
      case 'router': return Wifi;
      case 'firewall': return Shield;
      case 'endpoint': return AlertCircle;
      default: return Server;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'secure': return 'text-green-400 border-green-400/50 bg-green-400/10';
      case 'warning': return 'text-yellow-400 border-yellow-400/50 bg-yellow-400/10';
      case 'threat': return 'text-red-400 border-red-400/50 bg-red-400/10 animate-pulse';
      case 'protected': return 'text-cyan-400 border-cyan-400/50 bg-cyan-400/10';
      default: return 'text-gray-400 border-gray-400/50 bg-gray-400/10';
    }
  };

  const getConnectionColor = (fromStatus: string, toStatus: string) => {
    if (fromStatus === 'threat' || toStatus === 'threat') return 'stroke-red-400/60';
    if (fromStatus === 'warning' || toStatus === 'warning') return 'stroke-yellow-400/60';
    return 'stroke-cyan-400/30';
  };

  return (
    <Card className="bg-black/40 backdrop-blur-sm border-cyan-500/20 p-6 h-96">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Wifi className="w-6 h-6 text-cyan-400" />
          <h2 className="text-xl font-bold text-white">Network Topology</h2>
        </div>
        <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 animate-pulse">
          2 Threats Detected
        </Badge>
      </div>

      <div className="relative h-64 bg-gray-900/30 rounded-lg border border-gray-700/50 overflow-hidden">
        {/* Connection Lines */}
        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
          {nodes.map(node => 
            node.connections.map(connectionId => {
              const connectedNode = nodes.find(n => n.id === connectionId);
              if (!connectedNode) return null;
              
              return (
                <line
                  key={`${node.id}-${connectionId}`}
                  x1={node.x}
                  y1={node.y}
                  x2={connectedNode.x}
                  y2={connectedNode.y}
                  className={getConnectionColor(node.status, connectedNode.status)}
                  strokeWidth="2"
                  strokeDasharray={node.status === 'threat' || connectedNode.status === 'threat' ? "5,5" : "none"}
                />
              );
            })
          )}
        </svg>

        {/* Nodes */}
        {nodes.map(node => {
          const Icon = getNodeIcon(node.type);
          return (
            <div
              key={node.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${getStatusColor(node.status)} border-2 rounded-lg p-2 backdrop-blur-sm`}
              style={{ 
                left: node.x, 
                top: node.y,
                zIndex: 2,
                animation: node.status === 'threat' ? 'pulse 1s infinite' : 'none'
              }}
            >
              <Icon className="w-6 h-6" />
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-white whitespace-nowrap">
                {node.name}
              </div>
            </div>
          );
        })}

        {/* Threat Pulse Animation */}
        {nodes.filter(n => n.status === 'threat').map(node => (
          <div
            key={`pulse-${node.id}`}
            className="absolute border-2 border-red-400/30 rounded-full animate-ping"
            style={{
              left: node.x - 20,
              top: node.y - 20,
              width: 40,
              height: 40,
              zIndex: 0
            }}
          />
        ))}
      </div>

      <div className="mt-4 grid grid-cols-4 gap-2 text-xs">
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          <span className="text-gray-400">Secure</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
          <span className="text-gray-400">Warning</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
          <span className="text-gray-400">Threat</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
          <span className="text-gray-400">Protected</span>
        </div>
      </div>
    </Card>
  );
};

export default NetworkTopology;
