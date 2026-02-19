import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  MapPin, Clock, Calendar, MoreVertical, 
  CheckCircle, PlayCircle, Circle, FileText, Lock, Loader2, ChevronDown
} from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { mockWaypoints } from "@/data/mockData";
import { cn } from "@/lib/utils";
import type { Waypoint } from "@/types/expedition";

type FilterType = 'all' | 'in-progress' | 'completed' | 'not-started';

export default function ExpeditionView() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<FilterType>('all');
  const [sortBy, setSortBy] = useState('order');
  const waypoints = mockWaypoints;

  const filteredWaypoints = waypoints.filter(w => {
    if (filter === 'all') return true;
    return w.status === filter;
  });

  const completedCount = waypoints.filter(w => w.status === 'completed').length;
  const progress = Math.round((completedCount / waypoints.length) * 100);

  const getStatusIcon = (status: Waypoint['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-atlas-success" />;
      case 'in-progress':
        return <PlayCircle className="w-5 h-5 text-atlas-info" />;
      default:
        return <Circle className="w-5 h-5 text-atlas-text-muted" />;
    }
  };

  const getStatusBadge = (status: Waypoint['status']) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-atlas-success/8 text-atlas-success text-xs font-medium rounded-full">
            <CheckCircle className="w-3.5 h-3.5" />
            Completed
          </span>
        );
      case 'in-progress':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-atlas-info/8 text-atlas-info text-xs font-medium rounded-full">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            In Progress
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-atlas-bg-tertiary text-atlas-text-muted text-xs font-medium rounded-full border border-atlas-border">
            <Circle className="w-3.5 h-3.5" />
            Not Started
          </span>
        );
    }
  };

  return (
    <AppLayout 
      headerProps={{ 
        showBack: true, 
        backLabel: "Back",
        backTo: "/" 
      }}
    >
      <div className="max-w-7xl mx-auto px-10 py-10 w-full animate-fade-in">
        {/* Expedition Header — Generous whitespace */}
        <div className="mb-10">
          <div className="flex items-start justify-between mb-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-atlas-gold text-sm font-medium tracking-wide uppercase">Expedition</span>
                <span className="text-atlas-text-muted/40">·</span>
                <span className="text-atlas-text-secondary text-sm">Frontend Development</span>
              </div>
              <h1 className="font-display font-bold text-4xl text-atlas-text-primary mb-4">
                React Fundamentals
              </h1>
              <p className="text-atlas-text-secondary text-base max-w-2xl">
                Master the core concepts of React including components, props, state, hooks, and modern patterns. Build a solid foundation for modern web development.
              </p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-atlas-bg-tertiary hover:bg-atlas-border border border-atlas-border rounded-xl text-atlas-text-secondary hover:text-atlas-text-primary transition-all duration-300 active:scale-[0.98]">
              <MoreVertical className="w-[18px] h-[18px]" />
            </button>
          </div>

          {/* Meta Info & Progress — Premium card */}
          <div className="premium-card p-7">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-10">
                {[
                  { icon: MapPin, color: "text-atlas-gold", label: "Waypoints", value: waypoints.length },
                  { icon: Clock, color: "text-atlas-info", label: "Est. Time", value: "8h 45m" },
                  { icon: Calendar, color: "text-atlas-success", label: "Started", value: "Jan 15" },
                ].map((stat) => (
                  <div key={stat.label} className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-atlas-bg-tertiary flex items-center justify-center">
                      <stat.icon className={cn("w-5 h-5", stat.color)} />
                    </div>
                    <div>
                      <p className="text-atlas-text-muted text-xs uppercase tracking-wider font-medium">{stat.label}</p>
                      <p className="text-atlas-text-primary font-display font-bold text-lg">{stat.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-right">
                <p className="text-atlas-gold font-display font-bold text-3xl tabular-nums">{progress}%</p>
                <p className="text-atlas-text-muted text-sm">Complete</p>
              </div>
            </div>
            {/* Progress Bar */}
            <div className="relative">
              <div className="h-2 bg-atlas-bg-tertiary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-atlas-gold to-atlas-gold-hover rounded-full animate-progress-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between mt-3 text-xs text-atlas-text-muted">
                <span>{completedCount} of {waypoints.length} waypoints charted</span>
                <span>Last active: 2 hours ago</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters & Sort — Clean, minimal */}
        <div className="flex items-center justify-between mb-7">
          <div className="flex items-center gap-3">
            {(['all', 'in-progress', 'completed', 'not-started'] as FilterType[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "px-4 py-2.5 font-medium text-sm rounded-xl transition-all duration-300 active:scale-[0.98]",
                  filter === f
                    ? "bg-atlas-gold text-atlas-bg-primary shadow-lg shadow-atlas-gold/15"
                    : "bg-atlas-bg-secondary border border-atlas-border text-atlas-text-secondary hover:bg-atlas-bg-tertiary hover:text-atlas-text-primary"
                )}
              >
                {f === 'all' ? 'All Waypoints' : f.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-atlas-text-muted text-sm">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-atlas-bg-secondary border border-atlas-border text-atlas-text-primary text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-atlas-gold transition-all duration-300 cursor-pointer"
            >
              <option value="order">Default Order</option>
              <option value="date">Last Completed</option>
              <option value="duration">Duration</option>
              <option value="status">Status</option>
            </select>
          </div>
        </div>

        {/* Waypoints List — Premium card container */}
        <div className="premium-card overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-7 py-4 bg-atlas-bg-tertiary/50 text-atlas-text-muted text-xs uppercase tracking-wider font-medium">
            <div className="col-span-5">Waypoint</div>
            <div className="col-span-1 text-center">Duration</div>
            <div className="col-span-2 text-center">Status</div>
            <div className="col-span-2 text-center">Field Guide</div>
            <div className="col-span-1 text-center">Quiz</div>
            <div className="col-span-1 text-right">Last Viewed</div>
          </div>

          {/* Waypoint Rows */}
          <div className="divide-y divide-atlas-border/50">
            {filteredWaypoints.map((waypoint) => (
              <div
                key={waypoint.id}
                onClick={() => navigate(`/player/${waypoint.id}`)}
                className={cn(
                  "waypoint-row grid grid-cols-12 gap-4 px-7 py-5 items-center cursor-pointer group",
                  waypoint.status === 'in-progress' && "bg-atlas-bg-tertiary/20 border-l-2 border-atlas-gold",
                  waypoint.status === 'not-started' && "opacity-70"
                )}
              >
                <div className="col-span-5 flex items-center gap-4">
                  <div className={cn(
                    "w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300",
                    waypoint.status === 'completed' && "bg-atlas-success/8",
                    waypoint.status === 'in-progress' && "bg-atlas-info/8",
                    waypoint.status === 'not-started' && "bg-atlas-bg-tertiary border border-atlas-border"
                  )}>
                    {getStatusIcon(waypoint.status)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-atlas-text-primary font-medium truncate group-hover:text-atlas-gold transition-colors duration-300">
                      {waypoint.title}
                    </p>
                    <p className="text-atlas-text-muted text-sm truncate">{waypoint.description}</p>
                  </div>
                  {waypoint.status === 'in-progress' && (
                    <span className="px-2.5 py-0.5 bg-atlas-gold text-atlas-bg-primary text-xs font-bold rounded-md">CURRENT</span>
                  )}
                </div>
                <div className="col-span-1 text-center text-atlas-text-secondary text-sm tabular-nums">{waypoint.duration}</div>
                <div className="col-span-2 flex justify-center">{getStatusBadge(waypoint.status)}</div>
                <div className="col-span-2 flex justify-center">
                  {waypoint.hasFieldGuide ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-atlas-gold/8 text-atlas-gold text-xs font-medium rounded-full">
                      <FileText className="w-3.5 h-3.5" />
                      Charted
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-atlas-bg-tertiary text-atlas-text-muted text-xs font-medium rounded-full border border-atlas-border">
                      <FileText className="w-3.5 h-3.5" />
                      Not Charted
                    </span>
                  )}
                </div>
                <div className="col-span-1 flex justify-center">
                  {waypoint.quizCompleted ? (
                    <CheckCircle className="w-5 h-5 text-atlas-success" />
                  ) : (
                    <Lock className="w-5 h-5 text-atlas-text-muted" />
                  )}
                </div>
                <div className="col-span-1 text-right text-atlas-text-secondary text-sm tabular-nums">
                  {waypoint.lastViewed || "—"}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Info */}
        <div className="mt-7 flex items-center justify-between text-atlas-text-muted text-sm">
          <p>Showing {filteredWaypoints.length} of {waypoints.length} waypoints</p>
          <button className="flex items-center gap-2 hover:text-atlas-text-primary transition-colors duration-300 active:scale-[0.98]">
            <ChevronDown className="w-[18px] h-[18px]" />
            Load remaining waypoints
          </button>
        </div>
      </div>
    </AppLayout>
  );
}
