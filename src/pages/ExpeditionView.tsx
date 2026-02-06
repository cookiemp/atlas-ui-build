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
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-atlas-success/10 text-atlas-success text-xs font-medium rounded-full">
            <CheckCircle className="w-3.5 h-3.5" />
            Completed
          </span>
        );
      case 'in-progress':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-atlas-info/10 text-atlas-info text-xs font-medium rounded-full">
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
      <div className="max-w-7xl mx-auto px-8 py-8 w-full">
        {/* Expedition Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-atlas-gold text-sm font-medium tracking-wide uppercase">Expedition</span>
                <span className="text-atlas-text-muted">•</span>
                <span className="text-atlas-text-secondary text-sm">Frontend Development</span>
              </div>
              <h1 className="font-display font-bold text-4xl text-atlas-text-primary tracking-tight mb-3">
                React Fundamentals
              </h1>
              <p className="text-atlas-text-secondary text-base max-w-2xl leading-relaxed">
                Master the core concepts of React including components, props, state, hooks, and modern patterns. Build a solid foundation for modern web development.
              </p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-atlas-bg-tertiary hover:bg-atlas-border border border-atlas-border rounded-lg text-atlas-text-secondary hover:text-atlas-text-primary transition-all duration-200">
              <MoreVertical className="w-[18px] h-[18px]" />
            </button>
          </div>

          {/* Meta Info & Progress */}
          <div className="bg-atlas-bg-secondary border border-atlas-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-atlas-bg-tertiary flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-atlas-gold" />
                  </div>
                  <div>
                    <p className="text-atlas-text-muted text-xs uppercase tracking-wider font-medium">Waypoints</p>
                    <p className="text-atlas-text-primary font-display font-bold text-lg">{waypoints.length}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-atlas-bg-tertiary flex items-center justify-center">
                    <Clock className="w-5 h-5 text-atlas-info" />
                  </div>
                  <div>
                    <p className="text-atlas-text-muted text-xs uppercase tracking-wider font-medium">Est. Time</p>
                    <p className="text-atlas-text-primary font-display font-bold text-lg">8h 45m</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-atlas-bg-tertiary flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-atlas-success" />
                  </div>
                  <div>
                    <p className="text-atlas-text-muted text-xs uppercase tracking-wider font-medium">Started</p>
                    <p className="text-atlas-text-primary font-display font-bold text-lg">Jan 15</p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-atlas-gold font-display font-bold text-3xl">{progress}%</p>
                <p className="text-atlas-text-muted text-sm">Complete</p>
              </div>
            </div>
            {/* Progress Bar */}
            <div className="relative">
              <div className="h-2 bg-atlas-bg-tertiary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-atlas-gold to-atlas-gold-hover rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between mt-2 text-xs text-atlas-text-muted">
                <span>{completedCount} of {waypoints.length} waypoints charted</span>
                <span>Last active: 2 hours ago</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters & Sort */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            {(['all', 'in-progress', 'completed', 'not-started'] as FilterType[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "px-4 py-2 font-medium text-sm rounded-lg transition-all",
                  filter === f
                    ? "bg-atlas-gold text-atlas-bg-primary"
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
              className="bg-atlas-bg-secondary border border-atlas-border text-atlas-text-primary text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-atlas-gold transition-colors cursor-pointer"
            >
              <option value="order">Default Order</option>
              <option value="date">Last Completed</option>
              <option value="duration">Duration</option>
              <option value="status">Status</option>
            </select>
          </div>
        </div>

        {/* Waypoints List */}
        <div className="bg-atlas-bg-secondary border border-atlas-border rounded-xl overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-atlas-bg-tertiary border-b border-atlas-border text-atlas-text-muted text-xs uppercase tracking-wider font-medium">
            <div className="col-span-5">Waypoint</div>
            <div className="col-span-1 text-center">Duration</div>
            <div className="col-span-2 text-center">Status</div>
            <div className="col-span-2 text-center">Field Guide</div>
            <div className="col-span-1 text-center">Quiz</div>
            <div className="col-span-1 text-right">Last Viewed</div>
          </div>

          {/* Waypoint Rows */}
          <div className="divide-y divide-atlas-border">
            {filteredWaypoints.map((waypoint) => (
              <div
                key={waypoint.id}
                onClick={() => navigate(`/player/${waypoint.id}`)}
                className={cn(
                  "waypoint-row grid grid-cols-12 gap-4 px-6 py-4 items-center cursor-pointer group",
                  waypoint.status === 'in-progress' && "bg-atlas-bg-tertiary/30 border-l-2 border-atlas-gold",
                  waypoint.status === 'not-started' && "opacity-75"
                )}
              >
                <div className="col-span-5 flex items-center gap-4">
                  <div className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                    waypoint.status === 'completed' && "bg-atlas-success/10",
                    waypoint.status === 'in-progress' && "bg-atlas-info/10",
                    waypoint.status === 'not-started' && "bg-atlas-bg-tertiary border border-atlas-border"
                  )}>
                    {getStatusIcon(waypoint.status)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-atlas-text-primary font-medium truncate group-hover:text-atlas-gold transition-colors">
                      {waypoint.title}
                    </p>
                    <p className="text-atlas-text-muted text-sm truncate">{waypoint.description}</p>
                  </div>
                  {waypoint.status === 'in-progress' && (
                    <span className="px-2 py-0.5 bg-atlas-gold text-atlas-bg-primary text-xs font-bold rounded">CURRENT</span>
                  )}
                </div>
                <div className="col-span-1 text-center text-atlas-text-secondary text-sm">{waypoint.duration}</div>
                <div className="col-span-2 flex justify-center">{getStatusBadge(waypoint.status)}</div>
                <div className="col-span-2 flex justify-center">
                  {waypoint.hasFieldGuide ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-atlas-gold/10 text-atlas-gold text-xs font-medium rounded-full">
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
                <div className="col-span-1 text-right text-atlas-text-secondary text-sm">
                  {waypoint.lastViewed || "—"}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Info */}
        <div className="mt-6 flex items-center justify-between text-atlas-text-muted text-sm">
          <p>Showing {filteredWaypoints.length} of {waypoints.length} waypoints</p>
          <button className="flex items-center gap-2 hover:text-atlas-text-primary transition-colors">
            <ChevronDown className="w-[18px] h-[18px]" />
            Load remaining waypoints
          </button>
        </div>
      </div>
    </AppLayout>
  );
}
