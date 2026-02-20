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
        return "bg-atlas-success/8 text-atlas-success border-atlas-success/15 difficulty-easy";
      case 'medium':
        return "bg-atlas-warning/8 text-atlas-warning border-atlas-warning/15 difficulty-medium";
      case 'hard':
        return "bg-atlas-error/8 text-atlas-error border-atlas-error/15 difficulty-hard";
    }
  };

  return (
    <div className={cn(
      "premium-card p-6",
      isUpcoming ? "opacity-70" : ""
    )}>
      <div className="flex items-start justify-between mb-5">
        <div className="flex-1 min-w-0">
          <h3 className="font-display font-semibold text-lg text-atlas-text-primary truncate">
            {checkpoint.title}
          </h3>
          <p className="text-sm text-atlas-text-secondary mt-1.5 flex items-center gap-2">
            <Map className="w-4 h-4 text-atlas-text-muted" />
            {checkpoint.expeditionTitle}
          </p>
        </div>
        <span className={cn(
          "px-3 py-1 rounded-full text-xs font-medium border",
          getDifficultyStyles(checkpoint.difficulty)
        )}>
          {checkpoint.difficulty.charAt(0).toUpperCase() + checkpoint.difficulty.slice(1)}
        </span>
      </div>

      {isUpcoming && checkpoint.dueDate ? (
        <div className="flex items-center gap-3 mb-5 p-4 bg-atlas-bg-tertiary/40 rounded-xl">
          <Clock className="w-4 h-4 text-atlas-gold" />
          <div>
            <div className="text-sm font-medium text-atlas-text-primary">Due {checkpoint.dueDate}</div>
            <div className="text-xs text-atlas-text-muted mt-0.5">Feb 14, 2026</div>
          </div>
        </div>
      ) : (
        <>
          <div className="space-y-3 mb-6">
            <div className="flex items-center justify-between text-sm">
              <span className="text-atlas-text-muted">Last reviewed</span>
              <span className="text-atlas-text-secondary tabular-nums">{checkpoint.lastReviewed}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-atlas-text-muted">Interval</span>
              <span className="text-atlas-text-secondary">{checkpoint.currentInterval} → {checkpoint.nextInterval}</span>
            </div>
          </div>

          <div className="mb-5">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-atlas-text-muted">Retention Strength</span>
              <span className="text-atlas-gold font-medium tabular-nums">{checkpoint.retentionStrength}%</span>
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
            className="w-full flex items-center justify-center gap-2 bg-atlas-bg-tertiary hover:bg-atlas-gold hover:text-atlas-bg-primary border border-atlas-border hover:border-atlas-gold text-atlas-text-primary font-medium py-3 rounded-xl transition-all duration-300 active:scale-[0.98]"
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
        {/* Header Section — Bold, clear hierarchy */}
        <div className="px-10 pt-10 pb-8 border-b border-atlas-border/50">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-start justify-between animate-fade-in">
              <div>
                <h1 className="font-display font-bold text-3xl text-atlas-text-primary mb-3">Memory Checkpoints</h1>
                <p className="text-atlas-text-secondary max-w-2xl text-base">
                  Spaced repetition reviews are scheduled to maximize long-term retention. 
                  Complete checkpoints when due to strengthen neural pathways and prevent forgetting.
                </p>
              </div>
              {/* Stats — Whitespace separation */}
              <div className="flex gap-8">
                {[
                  { value: dueCheckpoints.length, label: "Due Today", color: "text-atlas-gold" },
                  { value: upcomingCheckpoints.length, label: "Upcoming", color: "text-atlas-text-secondary" },
                  { value: 89, label: "Completed", color: "text-atlas-success" },
                ].map((stat, i, arr) => (
                  <div key={stat.label} className="flex items-center gap-6">
                    <div className="text-center">
                      <div className={cn("text-3xl font-display font-bold tabular-nums", stat.color)}>{stat.value}</div>
                      <div className="text-xs text-atlas-text-muted uppercase tracking-wider mt-1">{stat.label}</div>
                    </div>
                    {i < arr.length - 1 && <div className="w-px h-10 bg-atlas-border/40" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Filter & Controls Bar */}
        <div className="px-10 py-5 bg-atlas-bg-secondary/30 border-b border-atlas-border/50">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              {[
                { el: "select", value: filter, onChange: (v: string) => setFilter(v), options: [
                  { value: "all", label: "All Checkpoints" },
                  { value: "due", label: "Due Today" },
                  { value: "easy", label: "Easy Difficulty" },
                  { value: "medium", label: "Medium Difficulty" },
                  { value: "hard", label: "Hard Difficulty" },
                ]},
                { el: "select", value: sort, onChange: (v: string) => setSort(v), options: [
                  { value: "date-asc", label: "Due Date (Earliest)" },
                  { value: "date-desc", label: "Due Date (Latest)" },
                  { value: "difficulty", label: "Difficulty Level" },
                  { value: "expedition", label: "Expedition" },
                ]},
              ].map((sel, i) => (
                <div key={i} className="relative">
                  <select 
                    value={sel.value}
                    onChange={(e) => sel.onChange(e.target.value)}
                    className="appearance-none bg-atlas-bg-tertiary border border-atlas-border rounded-xl px-4 py-2.5 pr-10 text-sm text-atlas-text-primary focus:outline-none focus:border-atlas-gold transition-all duration-300 cursor-pointer"
                  >
                    {sel.options.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-atlas-text-muted pointer-events-none" />
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-atlas-text-secondary hover:text-atlas-gold hover:bg-atlas-bg-tertiary transition-all duration-300">
                <Calendar className="w-4 h-4" />
                <span>Timeline View</span>
              </button>
              <div className="flex bg-atlas-bg-tertiary rounded-xl p-1">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    "p-2 rounded-lg transition-all duration-300",
                    viewMode === 'grid' ? "bg-atlas-bg-secondary text-atlas-gold" : "text-atlas-text-muted hover:text-atlas-text-primary"
                  )}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={cn(
                    "p-2 rounded-lg transition-all duration-300",
                    viewMode === 'list' ? "bg-atlas-bg-secondary text-atlas-gold" : "text-atlas-text-muted hover:text-atlas-text-primary"
                  )}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area — Generous spacing */}
        <div className="px-10 py-10">
          <div className="max-w-7xl mx-auto">
            {/* Due Today Section */}
            <section className="mb-12">
              <div className="flex items-center gap-4 mb-7">
                <div className="w-11 h-11 rounded-xl bg-atlas-gold/8 flex items-center justify-center">
                  <AlarmClock className="w-5 h-5 text-atlas-gold" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-xl text-atlas-text-primary">Due Today</h2>
                  <p className="text-sm text-atlas-text-muted mt-0.5">Complete these checkpoints to maintain your learning streak</p>
                </div>
                <div className="ml-auto">
                  <button 
                    onClick={() => navigate('/quiz')}
                    className="btn-premium flex items-center gap-2 bg-atlas-gold hover:bg-atlas-gold-hover text-atlas-bg-primary font-semibold px-6 py-3 rounded-xl"
                  >
                    <Play className="w-4 h-4" />
                    Start All ({dueCheckpoints.length})
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {dueCheckpoints.map((checkpoint, i) => (
                  <div key={checkpoint.id} className="animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
                    <CheckpointCard checkpoint={checkpoint} />
                  </div>
                ))}
              </div>
            </section>

            {/* Upcoming Section */}
            <section>
              <div className="flex items-center gap-4 mb-7">
                <div className="w-11 h-11 rounded-xl bg-atlas-bg-tertiary flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-atlas-text-secondary" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-xl text-atlas-text-primary">Upcoming</h2>
                  <p className="text-sm text-atlas-text-muted mt-0.5">Scheduled reviews for the next 7 days</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {upcomingCheckpoints.map((checkpoint, i) => (
                  <div key={checkpoint.id} className="animate-fade-in" style={{ animationDelay: `${(i + 3) * 80}ms` }}>
                    <CheckpointCard checkpoint={checkpoint} isUpcoming />
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center">
                <button className="inline-flex items-center gap-2 text-atlas-text-secondary hover:text-atlas-gold transition-colors duration-300 text-sm active:scale-[0.98]">
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
