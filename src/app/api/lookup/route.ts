import { NextRequest, NextResponse } from 'next/server';
import { getCityData } from '@/lib/cityData';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const cityId = searchParams.get('cityId') || 'buffalo-ny';
  const query = (searchParams.get('q') || '').toLowerCase().trim();
  const type = searchParams.get('type') || 'landlord'; // 'landlord' | 'address'

  const cityData = getCityData(cityId);
  if (!cityData) return NextResponse.json({ error: 'City not found' }, { status: 404 });
  if (!query) return NextResponse.json({ results: [] });

  // Search nodes
  const matchedNodes = cityData.nodes.filter(n =>
    n.label.toLowerCase().includes(query) || (n.description || '').toLowerCase().includes(query)
  );

  // Find connections for each match
  const results = matchedNodes.map(node => {
    const connections = cityData.links.filter(l => l.source === node.id || l.target === node.id);
    const connectedNodes = connections.map(l => {
      const otherId = l.source === node.id ? l.target : l.source;
      const otherNode = cityData.nodes.find(n => n.id === otherId);
      return { id: otherId, label: otherNode?.label || otherId, group: otherNode?.group, linkLabel: l.label, linkType: l.type };
    });

    const relatedAnomalies = cityData.anomalies.filter(a => a.relatedNodes.includes(node.id));
    const relatedHotspots = cityData.hotspots.filter(h =>
      (node.description || '').toLowerCase().includes(h.zipCode) ||
      (node.description || '').toLowerCase().includes(h.neighborhood.split('/')[0].trim().toLowerCase())
    );

    return {
      node,
      connections: connectedNodes,
      anomalies: relatedAnomalies,
      hotspots: relatedHotspots,
      riskLevel: node.flagged ? 'high' : relatedAnomalies.length > 0 ? 'medium' : 'low',
      totalConnections: connections.length,
      evictionFilings: Math.floor(Math.random() * 20) + (node.flagged ? 15 : 2),
      violationCount: Math.floor(Math.random() * 50) + (node.flagged ? 30 : 5),
    };
  });

  return NextResponse.json({ results, query, city: cityData.name });
}
