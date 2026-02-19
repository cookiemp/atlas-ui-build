import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as d3 from "d3";
import { 
  ArrowLeft, Network, Info, Maximize, Plus, Minus, X,
  Filter, Map as MapIcon, BookOpen, Key, MapPin, GitBranch, ExternalLink, BookOpenCheck
} from "lucide-react";
import { knowledgeGraphData } from "@/data/mockData";
import { cn } from "@/lib/utils";
import type { KnowledgeNode } from "@/types/expedition";

const categoryColors = {
  fundamentals: '#60a5fa',
  advanced: '#d4a953',
  practical: '#4ade80',
  theory: '#f472b6',
};

const categoryLabels = {
  fundamentals: 'Fundamentals',
  advanced: 'Advanced',
  practical: 'Practical',
  theory: 'Theory',
};

export default function KnowledgeGraph() {
  const navigate = useNavigate();
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedNode, setSelectedNode] = useState<KnowledgeNode | null>(null);
  const [showLegend, setShowLegend] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [filters, setFilters] = useState({
    fundamentals: true,
    advanced: true,
    practical: true,
    theory: true,
  });

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height]);

    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.3, 3])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
        setZoomLevel(Math.round(event.transform.k * 100));
      });

    svg.call(zoom);

    const g = svg.append("g");

    const filteredNodes = knowledgeGraphData.nodes.filter(
      node => filters[node.category]
    );
    const filteredNodeIds = new Set(filteredNodes.map(n => n.id));
    const filteredLinks = knowledgeGraphData.links.filter(
      link => filteredNodeIds.has(link.source as number) && filteredNodeIds.has(link.target as number)
    );

    const simulation = d3.forceSimulation(filteredNodes as d3.SimulationNodeDatum[])
      .force("link", d3.forceLink(filteredLinks).id((d: any) => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-400))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(45));

    const link = g.append("g")
      .selectAll("line")
      .data(filteredLinks)
      .join("line")
      .attr("class", "graph-link")
      .attr("stroke", (d: any) => d.type === 'prerequisite' ? '#737373' : '#d4a953')
      .attr("stroke-width", 1.5)
      .attr("stroke-dasharray", (d: any) => d.type === 'related' ? '5,5' : null);

    const node = g.append("g")
      .selectAll("g")
      .data(filteredNodes)
      .join("g")
      .attr("class", "node")
      .style("cursor", "pointer")
      .call(d3.drag<any, any>()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

    node.append("circle")
      .attr("r", 20)
      .attr("fill", (d: KnowledgeNode) => categoryColors[d.category])
      .attr("stroke", "hsl(220, 8%, 7%)")
      .attr("stroke-width", 3)
      .attr("class", "node-circle");

    node.append("text")
      .attr("class", "node-label")
      .attr("dy", 35)
      .attr("text-anchor", "middle")
      .text((d: KnowledgeNode) => d.name);

    node.on("click", function(event, d: KnowledgeNode) {
      event.stopPropagation();
      setSelectedNode(d);
    });

    svg.on("click", () => {
      setSelectedNode(null);
    });

    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node.attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

    function dragstarted(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event: any, d: any) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    return () => {
      simulation.stop();
    };
  }, [filters]);

  const handleZoom = (direction: 'in' | 'out') => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    const currentTransform = d3.zoomTransform(svgRef.current);
    const newScale = direction === 'in' 
      ? Math.min(currentTransform.k * 1.3, 3)
      : Math.max(currentTransform.k / 1.3, 0.3);
    
    svg.transition().duration(400).ease(d3.easeCubicOut).call(
      (d3.zoom() as any).transform,
      d3.zoomIdentity.translate(currentTransform.x, currentTransform.y).scale(newScale)
    );
  };

  const toggleFilter = (category: keyof typeof filters) => {
    setFilters(prev => ({ ...prev, [category]: !prev[category] }));
  };

  return (
    <div className="min-h-screen bg-atlas-bg-primary flex flex-col">
      {/* Title Bar — Glass effect */}
      <header className="h-16 bg-atlas-bg-secondary/80 backdrop-blur-md border-b border-atlas-border/60 flex items-center px-6 shrink-0 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="w-9 h-9 rounded-xl bg-atlas-gold flex items-center justify-center">
            <Network className="w-[18px] h-[18px] text-atlas-bg-primary" />
          </div>
          <div className="w-px h-6 bg-atlas-border/40" />
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-atlas-text-secondary hover:text-atlas-text-primary transition-all duration-300 group"
          >
            <ArrowLeft className="w-[18px] h-[18px] group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="font-body text-sm font-medium">Back to Expedition</span>
          </button>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2.5">
          <Network className="w-[18px] h-[18px] text-atlas-gold" />
          <h1 className="font-display font-bold text-atlas-text-primary text-base">The Atlas</h1>
        </div>

        <div className="ml-auto flex items-center gap-3">
          <button 
            onClick={() => setShowLegend(!showLegend)}
            className={cn(
              "w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-300",
              showLegend 
                ? "bg-atlas-gold/8 border-atlas-gold/40 text-atlas-gold"
                : "bg-atlas-bg-tertiary/50 border-atlas-border hover:border-atlas-gold/40 text-atlas-text-secondary"
            )}
            title="Toggle Legend"
          >
            <Info className="w-[18px] h-[18px]" />
          </button>
          <button 
            className="w-10 h-10 rounded-xl bg-atlas-bg-tertiary/50 border border-atlas-border hover:border-atlas-gold/40 flex items-center justify-center transition-all duration-300"
            title="Reset View"
          >
            <Maximize className="w-[18px] h-[18px] text-atlas-text-secondary" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        <main className="flex-1 relative graph-container">
          {/* Filter Controls — Glass panel */}
          <div className="absolute top-5 left-5 z-10 animate-fade-in">
            <div className="glass-panel rounded-xl p-5 shadow-xl">
              <div className="flex items-center gap-2.5 mb-4">
                <Filter className="w-4 h-4 text-atlas-gold" />
                <span className="font-display font-semibold text-atlas-text-primary text-sm">Filters</span>
              </div>
              <div className="space-y-2.5">
                {(Object.keys(filters) as Array<keyof typeof filters>).map((category) => (
                  <label key={category} className="flex items-center gap-2.5 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={filters[category]}
                      onChange={() => toggleFilter(category)}
                      className="w-4 h-4 rounded border-atlas-border bg-atlas-bg-tertiary text-atlas-gold focus:ring-atlas-gold/50 transition-colors"
                    />
                    <span 
                      className="w-2.5 h-2.5 rounded-full transition-transform duration-300 group-hover:scale-125"
                      style={{ backgroundColor: categoryColors[category] }}
                    />
                    <span className="font-body text-sm text-atlas-text-secondary group-hover:text-atlas-text-primary transition-colors duration-300">
                      {categoryLabels[category]}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Legend Panel */}
          {showLegend && (
            <div className="absolute top-5 right-5 z-10 animate-slide-in">
              <div className="glass-panel rounded-xl p-5 shadow-xl w-64">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <MapIcon className="w-4 h-4 text-atlas-gold" />
                    <span className="font-display font-semibold text-atlas-text-primary text-sm">Legend</span>
                  </div>
                  <button 
                    onClick={() => setShowLegend(false)}
                    className="text-atlas-text-muted hover:text-atlas-text-primary transition-colors duration-300"
                  >
                    <X className="w-[18px] h-[18px]" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="font-body text-xs text-atlas-text-muted uppercase tracking-wider mb-2.5">Node Types</p>
                    <div className="space-y-2.5">
                      {Object.entries(categoryLabels).map(([key, label]) => (
                        <div key={key} className="flex items-center gap-2.5">
                          <div 
                            className="w-3 h-3 rounded-full border border-white/15"
                            style={{ backgroundColor: categoryColors[key as keyof typeof categoryColors] }}
                          />
                          <span className="font-body text-xs text-atlas-text-secondary">{label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-atlas-border/40 pt-4">
                    <p className="font-body text-xs text-atlas-text-muted uppercase tracking-wider mb-2.5">Connection Types</p>
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-px bg-atlas-text-muted/40" />
                        <span className="font-body text-xs text-atlas-text-secondary">Prerequisite</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-px bg-atlas-gold/60 border-t border-dashed border-atlas-gold/60" />
                        <span className="font-body text-xs text-atlas-text-secondary">Related</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-atlas-border/40 pt-4">
                    <p className="font-body text-xs text-atlas-text-muted uppercase tracking-wider mb-2.5">Interactions</p>
                    <div className="space-y-2">
                      <p className="font-body text-xs text-atlas-text-muted">Click node to view details</p>
                      <p className="font-body text-xs text-atlas-text-muted">Hover to highlight connections</p>
                      <p className="font-body text-xs text-atlas-text-muted">Drag to pan, scroll to zoom</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Zoom Controls */}
          <div className="absolute bottom-5 left-5 z-10 flex flex-col gap-2">
            <button 
              onClick={() => handleZoom('in')}
              className="w-10 h-10 rounded-xl bg-atlas-bg-tertiary/80 backdrop-blur-sm border border-atlas-border hover:border-atlas-gold/40 hover:bg-atlas-bg-secondary flex items-center justify-center transition-all duration-300 shadow-lg active:scale-[0.95]"
            >
              <Plus className="w-[18px] h-[18px] text-atlas-text-secondary" />
            </button>
            <button 
              onClick={() => handleZoom('out')}
              className="w-10 h-10 rounded-xl bg-atlas-bg-tertiary/80 backdrop-blur-sm border border-atlas-border hover:border-atlas-gold/40 hover:bg-atlas-bg-secondary flex items-center justify-center transition-all duration-300 shadow-lg active:scale-[0.95]"
            >
              <Minus className="w-[18px] h-[18px] text-atlas-text-secondary" />
            </button>
            <div className="w-10 h-10 rounded-xl bg-atlas-bg-tertiary/80 backdrop-blur-sm border border-atlas-border flex items-center justify-center">
              <span className="font-mono text-xs text-atlas-text-muted tabular-nums">{zoomLevel}%</span>
            </div>
          </div>

          {/* Graph Stats */}
          <div className="absolute bottom-5 left-20 z-10">
            <div className="glass-panel rounded-xl px-5 py-2.5 flex items-center gap-5">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-atlas-gold" />
                <span className="font-body text-xs text-atlas-text-secondary">
                  <span className="text-atlas-text-primary font-medium tabular-nums">{knowledgeGraphData.nodes.length}</span> concepts
                </span>
              </div>
              <div className="w-px h-4 bg-atlas-border/40" />
              <div className="flex items-center gap-2">
                <GitBranch className="w-3.5 h-3.5 text-atlas-text-muted" />
                <span className="font-body text-xs text-atlas-text-secondary">
                  <span className="text-atlas-text-primary font-medium tabular-nums">{knowledgeGraphData.links.length}</span> connections
                </span>
              </div>
            </div>
          </div>

          {/* D3 Graph Container */}
          <div ref={containerRef} className="w-full h-full">
            <svg ref={svgRef} className="w-full h-full" />
          </div>
        </main>

        {/* Sidebar - Node Details — Slide in */}
        {selectedNode && (
        <aside className="w-80 bg-atlas-bg-secondary border-l border-atlas-border/60 flex flex-col shrink-0 animate-slide-in">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="p-7 border-b border-atlas-border/50">
                <div className="flex items-start justify-between mb-4">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-atlas-bg-tertiary border border-atlas-border text-xs font-medium">
                    <span 
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: categoryColors[selectedNode.category] }}
                    />
                    <span className="text-atlas-text-secondary">{categoryLabels[selectedNode.category]}</span>
                  </span>
                  <button 
                    onClick={() => setSelectedNode(null)}
                    className="text-atlas-text-muted hover:text-atlas-text-primary transition-colors duration-300"
                  >
                    <X className="w-[18px] h-[18px]" />
                  </button>
                </div>
                <h2 className="font-display font-bold text-xl text-atlas-text-primary leading-tight mb-2">{selectedNode.name}</h2>
                <p className="font-body text-sm text-atlas-text-muted">Found in {selectedNode.waypoints.length} waypoints</p>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-7 space-y-7">
                <section>
                  <h3 className="font-display font-semibold text-atlas-text-primary text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-atlas-gold" />
                    Definition
                  </h3>
                  <p className="font-body text-sm text-atlas-text-secondary">
                    {selectedNode.definition}
                  </p>
                </section>

                <section>
                  <h3 className="font-display font-semibold text-atlas-text-primary text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Key className="w-4 h-4 text-atlas-gold" />
                    Key Points
                  </h3>
                  <ul className="space-y-2.5">
                    {selectedNode.keypoints.map((point, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="text-atlas-gold mt-1.5">•</span>
                        <span className="font-body text-atlas-text-secondary">{point}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h3 className="font-display font-semibold text-atlas-text-primary text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-atlas-gold" />
                    Appears In
                  </h3>
                  <div className="space-y-2.5">
                    {selectedNode.waypoints.map((waypoint, index) => (
                      <div key={index} className="p-4 bg-atlas-bg-tertiary/50 rounded-xl border border-atlas-border/40 hover:border-atlas-gold/25 transition-all duration-300 group cursor-pointer">
                        <div className="flex items-center justify-between">
                          <span className="font-body text-sm text-atlas-text-primary group-hover:text-atlas-gold transition-colors duration-300">{waypoint}</span>
                          <ExternalLink className="w-3.5 h-3.5 text-atlas-text-muted group-hover:text-atlas-gold transition-colors duration-300" />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {selectedNode.references && selectedNode.references.length > 0 && (
                <section>
                  <h3 className="font-display font-semibold text-atlas-text-primary text-sm uppercase tracking-wider mb-3 flex items-center gap-2">
                    <BookOpenCheck className="w-4 h-4 text-atlas-gold" />
                    References
                  </h3>
                  <div className="space-y-2.5">
                    {selectedNode.references.map((ref, index) => (
                      <a key={index} href="#" className="flex items-center gap-2.5 p-4 bg-atlas-bg-tertiary/50 rounded-xl border border-atlas-border/40 hover:border-atlas-gold/25 transition-all duration-300 group">
                        <ExternalLink className="w-3.5 h-3.5 text-atlas-text-muted group-hover:text-atlas-gold transition-colors duration-300 shrink-0" />
                        <span className="font-body text-sm text-atlas-text-secondary group-hover:text-atlas-gold transition-colors duration-300">{ref}</span>
                      </a>
                    ))}
                  </div>
                </section>
                )}
              </div>

              {/* Actions — Primary pops, secondary ghost */}
              <div className="p-5 border-t border-atlas-border/50 space-y-2.5">
                <button className="btn-premium w-full py-3 px-4 rounded-xl bg-atlas-gold hover:bg-atlas-gold-hover text-atlas-bg-primary font-display font-semibold text-sm">
                  Review Concept
                </button>
                <button className="btn-ghost w-full py-3 px-4 rounded-xl bg-atlas-bg-tertiary border border-atlas-border hover:border-atlas-gold/40 text-atlas-text-secondary font-display font-medium text-sm active:scale-[0.98]">
                  Go to Waypoint
                </button>
              </div>
            </div>
        </aside>
        )}
      </div>
    </div>
  );
}
