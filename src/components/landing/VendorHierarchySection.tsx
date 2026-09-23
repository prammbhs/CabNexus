import { useState } from 'react';
import { 
  Building2, 
  GitBranch, 
  ChevronRight, 
  ChevronDown, 
  Car, 
  Users, 
  ShieldCheck, 
  Info,
  CheckCircle2
} from 'lucide-react';
import { Badge } from '@/components/common/Badge';
import { VENDOR_TREE_DATA, HierarchyNode } from '@/data/landingData';

export function VendorHierarchySection() {
  const [selectedNode, setSelectedNode] = useState<HierarchyNode>(VENDOR_TREE_DATA);
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    'v-root': true,
    'v-north': true,
    'v-punjab': true,
  });

  const toggleNode = (nodeId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedNodes(prev => ({ ...prev, [nodeId]: !prev[nodeId] }));
  };

  const handleSelectNode = (node: HierarchyNode) => {
    setSelectedNode(node);
  };

  const renderNode = (node: HierarchyNode, depth: number = 0) => {
    const isExpanded = !!expandedNodes[node.id];
    const isSelected = selectedNode.id === node.id;
    const hasChildren = node.children && node.children.length > 0;

    return (
      <div key={node.id} className="space-y-1.5 select-none">
        <div 
          onClick={() => handleSelectNode(node)}
          className={`group flex items-center justify-between p-2.5 rounded-xl border transition-all cursor-pointer ${
            isSelected 
              ? 'bg-primary/10 border-primary text-foreground shadow-xs' 
              : 'bg-card hover:bg-muted/60 border-border/70 text-muted-foreground hover:text-foreground'
          }`}
          style={{ marginLeft: `${depth * 14}px` }}
        >
          <div className="flex items-center gap-2 overflow-hidden">
            {hasChildren ? (
              <button 
                type="button"
                onClick={(e) => toggleNode(node.id, e)}
                className="h-5 w-5 flex items-center justify-center rounded hover:bg-muted text-muted-foreground"
                aria-label="Toggle node"
              >
                {isExpanded ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
              </button>
            ) : (
              <span className="h-5 w-5 flex items-center justify-center text-[10px] text-muted-foreground/60">•</span>
            )}

            <Building2 className={`h-4 w-4 shrink-0 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} />
            
            <div className="truncate flex flex-col">
              <span className="text-xs font-bold truncate text-foreground">{node.name}</span>
              <span className="text-[10px] text-muted-foreground">{node.role} • {node.level}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="hidden sm:inline-flex text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded">
              {node.vehicles} Cabs
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
              {node.complianceRate}
            </span>
          </div>
        </div>

        {hasChildren && isExpanded && (
          <div className="pl-3 border-l-2 border-border/60 ml-3 space-y-1.5 animate-in fade-in-50 duration-150">
            {node.children!.map((child) => renderNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <section id="hierarchy" className="py-16 sm:py-24 border-y border-border/60 bg-muted/10 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <Badge variant="outline" className="text-xs font-semibold px-2.5 py-0.5">
            Architectural Core
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-foreground">
            Built for multi-level fleet organizations.
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Support arbitrary N-level depth from national super vendors down to regional hubs, city franchises, and local sub-contractors.
          </p>
        </div>

        {/* Interactive Layout: Left Tree, Right Detail Card */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Tree Explorer */}
          <div className="lg:col-span-7 rounded-2xl border border-border/80 bg-card p-4 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border/60">
              <div className="flex items-center gap-2">
                <GitBranch className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-bold text-foreground">Interactive Hierarchy Explorer</h3>
              </div>
              <span className="text-[11px] text-muted-foreground font-mono">Click node to inspect</span>
            </div>

            <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
              {renderNode(VENDOR_TREE_DATA)}
            </div>

            <div className="pt-2 text-[11px] text-muted-foreground flex items-center gap-1.5 border-t border-border/60">
              <Info className="h-3.5 w-3.5 text-primary" />
              <span>Hierarchical data scoping automatically limits sub-vendor visibility to descendants.</span>
            </div>
          </div>

          {/* Right Selected Vendor Card & Key Capabilities */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Active Node Detail Card */}
            <div className="rounded-2xl border border-primary/40 bg-gradient-to-br from-card via-card to-primary/5 p-6 shadow-md space-y-5">
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="text-xs font-semibold">
                  {selectedNode.level} Inspector
                </Badge>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  {selectedNode.complianceRate} Compliance
                </span>
              </div>

              <div>
                <h4 className="text-xl font-extrabold text-foreground">{selectedNode.name}</h4>
                <p className="text-xs text-muted-foreground font-medium mt-0.5">{selectedNode.role}</p>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3 rounded-xl bg-muted/40 border border-border/60">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Car className="h-3.5 w-3.5 text-emerald-500" /> Managed Cabs
                  </span>
                  <div className="text-2xl font-black text-foreground mt-1">{selectedNode.vehicles}</div>
                  <span className="text-[10px] text-muted-foreground">Subordinate &amp; Direct</span>
                </div>

                <div className="p-3 rounded-xl bg-muted/40 border border-border/60">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Users className="h-3.5 w-3.5 text-blue-500" /> Active Drivers
                  </span>
                  <div className="text-2xl font-black text-foreground mt-1">{selectedNode.drivers}</div>
                  <span className="text-[10px] text-muted-foreground">Verified &amp; Assigned</span>
                </div>
              </div>

              {/* Action Button inside detail */}
              <div className="pt-2">
                <div className="p-3 rounded-lg bg-background/80 border border-border/60 text-xs space-y-1">
                  <span className="font-semibold text-foreground">Hierarchy Scoping:</span>
                  <p className="text-muted-foreground text-[11px] leading-relaxed">
                    Vendor <strong className="text-foreground">{selectedNode.name}</strong> can only view, onboard, and assign resources inside its permitted subtree.
                  </p>
                </div>
              </div>
            </div>

            {/* Supporting checklist */}
            <div className="rounded-2xl border border-border/80 bg-card p-5 space-y-3">
              <h5 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Organizational Guarantees
              </h5>
              <ul className="space-y-2.5 text-xs sm:text-sm text-muted-foreground">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>N-Level Hierarchy:</strong> Not hardcoded to 3 tiers; scales to any arbitrary operational depth.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Parent-Child Inheritance:</strong> Child nodes dynamically inherit or isolate data scope from parents.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Zero Orphan Nodes:</strong> Relational checks prevent dangling entities during vendor transitions.</span>
                </li>
              </ul>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
