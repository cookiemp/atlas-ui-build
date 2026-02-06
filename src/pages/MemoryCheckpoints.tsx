import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  AlarmClock, Calendar, Brain, Map, Clock, ChevronDown,
  Play, LayoutGrid, List 
} from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { mockMemoryCheckpoints, mockUpcomingCheckpoints } from "@/data/mockData";
import { cn } from "@/lib/utils";
import type { MemoryCheckpoint } from "@/types/expedition";

function CheckpointCard({ checkpoint, isUpcoming = false }: { checkpoint: MemoryCheckpoint; isUpcoming?: boolean }) {
  const navigate = useNavigate();
  
  const getDifficultyStyles = (difficulty: MemoryCheckpoint['difficulty']) => {
    switch (difficulty) {
      case 'easy':
        return "bg-atlas-success/10 text-atlas-success border-atlas-success/20 difficulty-easy";
      case 'medium':
        return "bg-atlas-warning/10 text-atlas-warning border-atlas-warning/20 difficulty-medium";
      case 'hard':
        return "bg-atlas-error/10 text-atlas-error border-atlas-error/20 difficulty-hard";
    }
  };

  return (
    <div className={cn(
      "checkpoint-card bg-atlas-bg-secondary border border-atlas-border rounded-xl p-5 cursor-pointer group",
      isUpcoming ? "opacity-75 hover:opacity-100 bg-atlas-bg-secondary/50" : "hover:border-atlas-gold/50"
    )}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-semibold text-lg text-atlas-text-primary truncate group-hover:text-atlas-gold transition-colors">
            {checkpoint.title}
          </h3>
          <p className="text-sm text-atlas-text-secondary mt-1 flex items-center gap-2">
            <Map className="w-4 h-4 text-atlas-text-muted" />
            {checkpoint.expeditionTitle}
          </p>
        </div>
        <span className={cn(
          "px-2.5 py-1 rounded-full text-xs font-medium border",
          getDifficultyStyles(checkpoint.difficulty)
        )}>
          {checkpoint.difficulty.charAt(0).toUpperCase() + checkpoint.difficulty.slice(1)}
        </span>
      </div>

      {isUpcoming && checkpoint.dueDate ? (
        <div className="flex items-center gap-3 mb-4 p-3 bg-atlas-bg-tertiary/50 rounded-lg">
          <Clock className="w-4 h-4 text-atlas-gold" />
          <div>
            <div className="text-sm font-medium text-atlas-text-primary">Due {checkpoint.dueDate}</div>
            <div className="text-xs text-atlas-text-muted">Feb 14, 2026</div>
          </div>
        </div>
      ) : (
        <>
          <div className="space-y-3 mb-5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-atlas-text-muted">Last reviewed</span>
              <span className="text-atlas-text-secondary">{checkpoint.lastReviewed}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-atlas-text-muted">Interval</span>
              <span className="text-atlas-text-secondary">{checkpoint.currentInterval} → {checkpoint.nextInterval}</span>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-atlas-text-muted">Retention Strength</span>
              <span className="text-atlas-gold font-medium">{checkpoint.retentionStrength}%</span>
            </div>
            <div className="h-2 bg-atlas-bg-tertiary rounded-full overflow-hidden">
              <div 
                className="animate-progress-fill h-full bg-gradient-to-r from-atlas-gold to-atlas-gold-hover rounded-full"
                style={{ width: `${checkpoint.retentionStrength}%` }}
              />
            </div>
          </div>

          <button
            onClick={() => navigate('/quiz')}
            className="w-full flex items-center justify-center gap-2 bg-atlas-bg-tertiary hover:bg-atlas-gold hover:text-atlas-bg-primary border border-atlas-border hover:border-atlas-gold text-atlas-text-primary font-medium py-2.5 rounded-lg transition-all"
          >
            <Brain className="w-4 h-4" />
            Start Review
          </button>
        </>
      )}

      {isUpcoming && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-atlas-text-muted">Last review: {checkpoint.lastReviewed}</span>
          <span className={cn(
            "font-medium",
            checkpoint.retentionStrength > 80 ? "text-atlas-success" : 
            checkpoint.retentionStrength > 60 ? "text-atlas-warning" : "text-atlas-text-muted"
          )}>
            {checkpoint.retentionStrength > 80 ? "Excellent retention" : 
             checkpoint.retentionStrength > 60 ? "Strong retention" : "Needs attention"}
          </span>
        </div>
      )}
    </div>
  );
}

export default function MemoryCheckpoints() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('date-asc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const dueCheckpoints = mockMemoryCheckpoints;
  const upcomingCheckpoints = mockUpcomingCheckpoints;

  return (
    <AppLayout headerProps={{ showBack: true, backLabel: "Back", backTo: "/" }}>
      <main className="flex-1 overflow-auto">
        {/* Header Section */}
        <div className="px-8 pt-8 pb-6 border-b border-atlas-border">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="font-display font-bold text-3xl text-atlas-text-primary mb-2">Memory Checkpoints</h1>
                <p className="text-atlas-text-secondary max-w-2xl text-base leading-relaxed">
                  Spaced repetition reviews are scheduled to maximize long-term retention. 
                  Complete checkpoints when due to strengthen neural pathways and prevent forgetting.
                </p>
              </div>
              {/* Stats Summary */}
              <div className="flex gap-6">
                <div className="text-center">
                  <div className="text-3xl font-display font-bold text-atlas-gold">{dueCheckpoints.length}</div>
                  <div className="text-xs text-atlas-text-muted uppercase tracking-wider mt-1">Due Today</div>
                </div>
                <div className="w-px bg-atlas-border" />
                <div className="text-center">
                  <div className="text-3xl font-display font-bold text-atlas-text-secondary">{upcomingCheckpoints.length}</div>
                  <div className="text-xs text-atlas-text-muted uppercase tracking-wider mt-1">Upcoming</div>
                </div>
                <div className="w-px bg-atlas-border" />
                <div className="text-center">
                  <div className="text-3xl font-display font-bold text-atlas-success">89</div>
                  <div className="text-xs text-atlas-text-muted uppercase tracking-wider mt-1">Completed</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter & Controls Bar */}
        <div className="px-8 py-4 bg-atlas-bg-secondary/50 border-b border-atlas-border">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Filter Dropdown */}
              <div className="relative">
                <select 
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="appearance-none bg-atlas-bg-tertiary border border-atlas-border rounded-lg px-4 py-2 pr-10 text-sm text-atlas-text-primary focus:outline-none focus:border-atlas-gold transition-colors cursor-pointer"
                >
                  <option value="all">All Checkpoints</option>
                  <option value="due">Due Today</option>
                  <option value="easy">Easy Difficulty</option>
                  <option value="medium">Medium Difficulty</option>
                  <option value="hard">Hard Difficulty</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-atlas-text-muted pointer-events-none" />
              </div>
              {/* Sort Dropdown */}
              <div className="relative">
                <select 
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="appearance-none bg-atlas-bg-tertiary border border-atlas-border rounded-lg px-4 py-2 pr-10 text-sm text-atlas-text-primary focus:outline-none focus:border-atlas-gold transition-colors cursor-pointer"
                >
                  <option value="date-asc">Due Date (Earliest)</option>
                  <option value="date-desc">Due Date (Latest)</option>
                  <option value="difficulty">Difficulty Level</option>
                  <option value="expedition">Expedition</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-atlas-text-muted pointer-events-none" />
              </div>
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-atlas-text-secondary hover:text-atlas-gold hover:bg-atlas-bg-tertiary transition-all">
                <Calendar className="w-4 h-4" />
                <span>Timeline View</span>
              </button>
              <div className="flex bg-atlas-bg-tertiary rounded-lg p-1">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    "p-2 rounded-md transition-colors",
                    viewMode === 'grid' ? "bg-atlas-bg-secondary text-atlas-gold" : "text-atlas-text-muted hover:text-atlas-text-primary"
                  )}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={cn(
                    "p-2 rounded-md transition-colors",
                    viewMode === 'list' ? "bg-atlas-bg-secondary text-atlas-gold" : "text-atlas-text-muted hover:text-atlas-text-primary"
                  )}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="px-8 py-8">
          <div className="max-w-7xl mx-auto">
            {/* Due Today Section */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-atlas-gold/10 flex items-center justify-center">
                  <AlarmClock className="w-5 h-5 text-atlas-gold" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-xl text-atlas-text-primary">Due Today</h2>
                  <p className="text-sm text-atlas-text-muted">Complete these checkpoints to maintain your learning streak</p>
                </div>
                <div className="ml-auto">
                  <button 
                    onClick={() => navigate('/quiz')}
                    className="flex items-center gap-2 bg-atlas-gold hover:bg-atlas-gold-hover text-atlas-bg-primary font-semibold px-5 py-2.5 rounded-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Play className="w-4 h-4" />
                    Start All ({dueCheckpoints.length})
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {dueCheckpoints.map((checkpoint) => (
                  <CheckpointCard key={checkpoint.id} checkpoint={checkpoint} />
                ))}
              </div>
            </section>

            {/* Upcoming Section */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-atlas-bg-tertiary flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-atlas-text-secondary" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-xl text-atlas-text-primary">Upcoming</h2>
                  <p className="text-sm text-atlas-text-muted">Scheduled reviews for the next 7 days</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {upcomingCheckpoints.map((checkpoint) => (
                  <CheckpointCard key={checkpoint.id} checkpoint={checkpoint} isUpcoming />
                ))}
              </div>

              {/* Load More Button */}
              <div className="mt-6 text-center">
                <button className="inline-flex items-center gap-2 text-atlas-text-secondary hover:text-atlas-gold transition-colors text-sm">
                  <ChevronDown className="w-4 h-4" />
                  Show 9 more upcoming checkpoints
                </button>
              </div>
            </section>
          </div>
        </div>
      </main>
    </AppLayout>
  );
}
