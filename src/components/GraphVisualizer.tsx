'use client';

import React, { useState, useCallback, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { AlertTriangle, Scale, Eye, EyeOff, ZoomIn, Info, ChevronDown, MapPin, Link2, Building2 } from 'lucide-react';
import type { CityData, CityNode, CityAnomaly } from '@/lib/cityData';

const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[560px] flex items-center justify-center text-zinc-500 bg-zinc-950">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-zinc-700 border-t-violet-500 rounded-full animate-spin"></div>
        <div className="text-sm">Loading institutional influence graph...</div>
      </div>
    </div>
  ),
});

const GROUP_COLORS: Record<string, string> = {
  council: '#3b82f6',
  developer: '#ef4444',
  zoning: '#8b5cf6',
  lobby: '#f59e0b',
  tenant: '#10b981',
  agency: '#06b6d4',
  property: '#f97316',
  shell: '#dc2626',
};

const GROUP_LABELS: Record<string, string> = {
  council: 'Council Members',
  developer: 'Developers / LLCs',
  zoning: 'Zoning Actions',
  lobby: 'Lobbyists / PACs',
  tenant: 'Tenant Orgs',
  agency: 'Government Agencies',
  property: 'Properties',
  shell: 'Shell Companies',
};

interface GraphVisualizerProps {
  cityData: CityData;
}

const GraphVisualizer: React.FC<GraphVisualizerProps> = ({ cityData }) => {
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [selectedAnomaly, setSelectedAnomaly] = useState<CityAnomaly | null>(null);
  const [visibleGroups, setVisibleGroups] = useState<Set<string>>(new Set(Object.keys(GROUP_COLORS)));
  const [showAnomalyOverlay, setShowAnomalyOverlay] = useState(true);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const filteredGraphData = useMemo(() => {
    const filteredNodes = cityData.nodes.filter(n => visibleGroups.has(n.group));
    const nodeIds = new Set(filteredNodes.map(n => n.id));
    const filteredLinks = cityData.links.filter(
      l => nodeIds.has(l.source) && nodeIds.has(l.target)
    );
    return { nodes: filteredNodes, links: filteredLinks };
  }, [cityData, visibleGroups]);

  const anomalyNodeIds = useMemo(() => {
    const ids = new Set<string>();
    if (showAnomalyOverlay) {
      cityData.anomalies.forEach(a => a.relatedNodes.forEach(n => ids.add(n)));
    }
    return ids;
  }, [cityData.anomalies, showAnomalyOverlay]);

  const toggleGroup = (group: string) => {
    setVisibleGroups(prev => {
      const next = new Set(prev);
      if (next.has(group)) next.delete(group);
      else next.add(group);
      return next;
    });
  };

  const nodeColor = useCallback((node: any) => {
    return GROUP_COLORS[node.group] || '#64748b';
  }, []);

  const getNodeConnections = useCallback((nodeId: string) => {
    return cityData.links.filter(l => l.source === nodeId || l.target === nodeId);
  }, [cityData.links]);

  const groupCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    cityData.nodes.forEach(n => {
      counts[n.group] = (counts[n.group] || 0) + 1;
    });
    return counts;
  }, [cityData.nodes]);

  return (
    <div className="w-full flex flex-col bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-zinc-800 bg-zinc-900">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-violet-500/10 flex items-center justify-center">
              <Scale className="w-5 h-5 text-violet-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                {cityData.name}, {cityData.state} — Institutional Graph
              </h3>
              <p className="text-xs text-zinc-500">{cityData.councilName} • Mayor {cityData.mayor} • Neo4j-powered anomaly detection • SDG 16</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {cityData.anomalies.filter(a => a.severity === 'critical' || a.severity === 'high').slice(0, 2).map((a, i) => (
              <button
                key={i}
                onClick={() => setSelectedAnomaly(selectedAnomaly?.id === a.id ? null : a)}
                className={`px-3 py-1.5 text-[10px] rounded-full flex items-center gap-1.5 border transition-all cursor-pointer
                  ${selectedAnomaly?.id === a.id
                    ? 'bg-red-500/30 text-red-300 border-red-500/60'
                    : 'bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20'
                  }`}
              >
                <AlertTriangle className="w-3 h-3" />
                {a.type}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-2 mt-4 flex-wrap">
          <span className="text-[10px] uppercase tracking-widest text-zinc-500 mr-2">FILTER:</span>
          {Object.entries(GROUP_LABELS).map(([key, label]) => {
            const count = groupCounts[key] || 0;
            if (count === 0) return null;
            const active = visibleGroups.has(key);
            return (
              <button
                key={key}
                onClick={() => toggleGroup(key)}
                className={`px-3 py-1 text-[10px] rounded-full flex items-center gap-1.5 border transition-all
                  ${active
                    ? 'border-white/20 text-white'
                    : 'border-zinc-700 text-zinc-600 opacity-50'
                  }`}
                style={{ backgroundColor: active ? GROUP_COLORS[key] + '20' : 'transparent' }}
              >
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: active ? GROUP_COLORS[key] : '#52525b' }}></div>
                {label} ({count})
              </button>
            );
          })}
          <div className="ml-auto">
            <button
              onClick={() => setShowAnomalyOverlay(!showAnomalyOverlay)}
              className={`px-3 py-1 text-[10px] rounded-full flex items-center gap-1.5 border transition-all
                ${showAnomalyOverlay ? 'bg-red-500/10 text-red-400 border-red-500/30' : 'text-zinc-500 border-zinc-700'}`}
            >
              {showAnomalyOverlay ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
              ANOMALY GLOW
            </button>
          </div>
        </div>
      </div>

      {/* Graph Canvas */}
      <div className="relative" style={{ height: '560px' }}>
        <ForceGraph2D
          graphData={filteredGraphData}
          nodeLabel={(node: any) => `${node.label}\n${node.description || ''}`}
          nodeColor={nodeColor}
          nodeRelSize={4}
          linkWidth={(link: any) => Math.sqrt(link.value) / 2.5 + 0.5}
          linkColor={(link: any) => {
            if (link.type === 'complaint') return '#dc2626';
            if (link.type === 'funding') return '#f59e0b';
            if (link.type === 'exemption') return '#8b5cf6';
            if (link.type === 'ownership') return '#ef4444';
            return '#1e293b';
          }}
          linkDirectionalArrowLength={3.5}
          linkDirectionalArrowRelPos={1}
          onNodeClick={(node: any) => setSelectedNode(node)}
          onNodeHover={(node: any) => setHoveredNode(node ? node.id : null)}
          cooldownTicks={150}
          width={780}
          height={560}
          backgroundColor="#09090b"
          nodeCanvasObject={(node: any, ctx: any, globalScale: number) => {
            const isAnomaly = anomalyNodeIds.has(node.id);
            const isHovered = hoveredNode === node.id;
            const isSelected = selectedNode?.id === node.id;
            const isFlagged = node.flagged;
            const radius = Math.sqrt(node.value) * 0.55 + 2;

            // Anomaly glow ring
            if (isAnomaly && showAnomalyOverlay) {
              ctx.beginPath();
              ctx.arc(node.x, node.y, radius + 6, 0, 2 * Math.PI);
              ctx.strokeStyle = 'rgba(239, 68, 68, 0.4)';
              ctx.lineWidth = 2;
              ctx.setLineDash([3, 3]);
              ctx.stroke();
              ctx.setLineDash([]);
            }

            // Selection ring
            if (isSelected) {
              ctx.beginPath();
              ctx.arc(node.x, node.y, radius + 4, 0, 2 * Math.PI);
              ctx.strokeStyle = '#ffffff';
              ctx.lineWidth = 2;
              ctx.stroke();
            }

            // Shadow/glow
            if (isFlagged || isHovered) {
              ctx.shadowColor = GROUP_COLORS[node.group] || '#fff';
              ctx.shadowBlur = isHovered ? 20 : 12;
            }

            // Node circle
            ctx.beginPath();
            ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI);
            ctx.fillStyle = GROUP_COLORS[node.group] || '#64748b';
            ctx.fill();
            ctx.shadowBlur = 0;

            // Label
            const fontSize = Math.max(10 / globalScale, 2.5);
            ctx.font = `${isFlagged ? 'bold ' : ''}${fontSize}px Inter, system-ui, sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            ctx.fillStyle = isHovered || isSelected ? '#ffffff' : '#94a3b8';

            const label = node.label;
            const maxLen = globalScale > 1.5 ? 30 : 18;
            const displayLabel = label.length > maxLen ? label.substring(0, maxLen - 2) + '…' : label;
            ctx.fillText(displayLabel, node.x, node.y + radius + 3);

            // District tag for council members
            if (node.district && globalScale > 1.2) {
              ctx.font = `${fontSize * 0.75}px Inter, system-ui, sans-serif`;
              ctx.fillStyle = '#64748b';
              ctx.fillText(node.district + ' District', node.x, node.y + radius + 3 + fontSize + 2);
            }
          }}
        />

        {/* Zoom hint */}
        <div className="absolute bottom-3 left-3 text-[10px] text-zinc-600 flex items-center gap-1.5">
          <ZoomIn className="w-3 h-3" /> Scroll to zoom • Click node for details
        </div>
      </div>

      {/* Anomaly Detail Panel */}
      {selectedAnomaly && (
        <div className="border-t border-red-900/40 bg-red-950/30 p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className={`px-2 py-0.5 text-[10px] rounded-full font-semibold uppercase
                  ${selectedAnomaly.severity === 'critical' ? 'bg-red-500 text-white' :
                    selectedAnomaly.severity === 'high' ? 'bg-red-500/30 text-red-300' :
                    'bg-amber-500/20 text-amber-400'}`}
                >
                  {selectedAnomaly.severity}
                </div>
                <div className="text-xs font-medium text-red-400">{selectedAnomaly.type}</div>
                {selectedAnomaly.centrality && (
                  <div className="text-[10px] text-zinc-500 font-mono">CENTRALITY: {selectedAnomaly.centrality.toFixed(2)}</div>
                )}
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed max-w-3xl">{selectedAnomaly.description}</p>
              <div className="flex items-center gap-2 mt-3">
                <Link2 className="w-3 h-3 text-zinc-500" />
                {selectedAnomaly.relatedNodes.map(nid => {
                  const node = cityData.nodes.find(n => n.id === nid);
                  return (
                    <span key={nid} className="text-[10px] px-2 py-0.5 bg-zinc-800 text-zinc-400 rounded-full border border-zinc-700">
                      {node?.label || nid}
                    </span>
                  );
                })}
              </div>
            </div>
            <button onClick={() => setSelectedAnomaly(null)} className="text-xs px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-full text-zinc-400 shrink-0 ml-4">
              DISMISS
            </button>
          </div>
        </div>
      )}

      {/* Stats + Node Detail */}
      <div className="p-6 bg-zinc-900 border-t border-zinc-800">
        <div className="grid grid-cols-5 gap-4 text-center mb-4">
          <div>
            <div className="text-blue-400 font-mono text-lg font-semibold">{groupCounts['council'] || 0}</div>
            <div className="text-zinc-500 text-[10px] tracking-widest">COUNCIL</div>
          </div>
          <div>
            <div className="text-red-400 font-mono text-lg font-semibold">{(groupCounts['developer'] || 0) + (groupCounts['shell'] || 0)}</div>
            <div className="text-zinc-500 text-[10px] tracking-widest">DEVELOPERS</div>
          </div>
          <div>
            <div className="text-violet-400 font-mono text-lg font-semibold">{cityData.links.length}</div>
            <div className="text-zinc-500 text-[10px] tracking-widest">CONNECTIONS</div>
          </div>
          <div>
            <div className="text-emerald-400 font-mono text-lg font-semibold">{groupCounts['tenant'] || 0}</div>
            <div className="text-zinc-500 text-[10px] tracking-widest">TENANT ORGS</div>
          </div>
          <div>
            <div className="text-amber-400 font-mono text-lg font-semibold">{cityData.anomalies.length}</div>
            <div className="text-zinc-500 text-[10px] tracking-widest">ANOMALIES</div>
          </div>
        </div>

        {selectedNode && (
          <div className="p-5 bg-zinc-950 border border-zinc-700 rounded-2xl">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: GROUP_COLORS[selectedNode.group] }}></div>
                  <div className="font-mono text-[10px] uppercase tracking-wider" style={{ color: GROUP_COLORS[selectedNode.group] }}>
                    {GROUP_LABELS[selectedNode.group] || selectedNode.group}
                  </div>
                  {selectedNode.district && (
                    <div className="text-[10px] text-zinc-500 bg-zinc-800 px-2 py-0.5 rounded-full">{selectedNode.district} District</div>
                  )}
                  {selectedNode.flagged && (
                    <div className="text-[10px] text-red-400 bg-red-500/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <AlertTriangle className="w-2.5 h-2.5" /> FLAGGED
                    </div>
                  )}
                </div>
                <div className="font-semibold text-white text-lg">{selectedNode.label}</div>
                {selectedNode.description && (
                  <div className="text-sm text-zinc-400 mt-2 leading-relaxed max-w-xl">{selectedNode.description}</div>
                )}

                {/* Connections */}
                <div className="mt-4">
                  <div className="text-[10px] text-zinc-500 uppercase tracking-widest mb-2">CONNECTIONS ({getNodeConnections(selectedNode.id).length})</div>
                  <div className="flex flex-wrap gap-1.5">
                    {getNodeConnections(selectedNode.id).map((link, i) => {
                      const otherId = link.source === selectedNode.id ? link.target : link.source;
                      const otherNode = cityData.nodes.find(n => n.id === otherId);
                      return (
                        <div key={i} className="text-[10px] px-2 py-1 bg-zinc-800 rounded-lg border border-zinc-700 flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: GROUP_COLORS[otherNode?.group || ''] || '#64748b' }}></div>
                          {otherNode?.label || otherId}
                          {link.label && <span className="text-zinc-600 ml-1">• {link.label}</span>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedNode(null)}
                className="text-xs px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-full text-zinc-400 shrink-0"
              >
                CLOSE
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GraphVisualizer;
