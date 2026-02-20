import { Play, MapPin, CheckCircle2, Trash2, Brain } from "lucide-react";
import type { Expedition } from "@/types/expedition";
import { cn } from "@/lib/utils";

interface ExpeditionCardProps {
  expedition: Expedition;
  onClick?: () => void;
  onDelete?: () => void;
}

export function ExpeditionCard({ expedition, onClick, onDelete }: ExpeditionCardProps) {
  return (
    <div 
      onClick={onClick}
      className="premium-card premium-card-interactive group relative overflow-hidden cursor-pointer"
    >
      {/* Delete Button — Appears on hover with smooth fade */}
      {onDelete && (
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-xl bg-atlas-bg-primary/80 backdrop-blur-sm border border-atlas-border flex items-center justify-center text-atlas-text-muted hover:text-atlas-error hover:border-atlas-error/50 opacity-0 group-hover:opacity-100 transition-all duration-300"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      )}

      {/* Memory Checkpoint Badge */}
      {expedition.hasMemoryCheckpoint && (
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-atlas-gold/12 border border-atlas-gold/25 backdrop-blur-sm">
          <Brain className="w-3 h-3 text-atlas-gold" />
          <span className="text-xs font-medium text-atlas-gold">Memory Checkpoint Due</span>
        </div>
      )}

      {/* New Badge */}
      {expedition.isNew && (
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-atlas-bg-tertiary/90 border border-atlas-border backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-medium text-atlas-text-secondary">New</span>
        </div>
      )}

      {/* Thumbnail Area */}
      <div className={cn(
        "aspect-video relative overflow-hidden bg-gradient-to-br",
        expedition.thumbnailGradient
      )}>
        <div className="absolute inset-0 bg-atlas-bg-tertiary/20" />
        <div 
          className="absolute inset-0 opacity-15" 
          style={{ 
            backgroundImage: "radial-gradient(circle at 2px 2px, rgba(212,169,83,0.25) 1px, transparent 0)", 
            backgroundSize: "24px 24px" 
          }} 
        />
        {/* Play icon — Scales in on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400">
          <div className="w-14 h-14 rounded-full bg-atlas-gold/90 flex items-center justify-center shadow-lg shadow-atlas-gold/25 scale-90 group-hover:scale-100 transition-transform duration-400">
            <Play className="w-5 h-5 text-atlas-bg-primary ml-0.5" fill="currentColor" />
          </div>
        </div>
      </div>

      {/* Card Content — 1.5x padding */}
      <div className="p-5">
        {/* Title */}
        <h3 className="font-display font-semibold text-atlas-text-primary text-base mb-4 line-clamp-1 group-hover:text-atlas-gold transition-colors duration-300">
          {expedition.title}
        </h3>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-atlas-text-muted">Progress</span>
            <span className={cn(
              "font-medium tabular-nums",
              expedition.progress > 0 ? "text-atlas-gold" : "text-atlas-text-muted"
            )}>
              {expedition.progress}%
            </span>
          </div>
          <div className="h-1.5 bg-atlas-bg-tertiary rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-atlas-gold to-atlas-gold-hover rounded-full transition-all duration-700"
              style={{ width: `${expedition.progress}%` }}
            />
          </div>
        </div>

        {/* Meta Info — Whitespace separation */}
        <div className="flex items-center justify-between text-xs text-atlas-text-muted">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" />
            <span>{expedition.waypoints} waypoints</span>
          </div>
          <div className="flex items-center gap-1.5">
            {expedition.completedWaypoints > 0 ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-atlas-gold" />
                <span>{expedition.completedWaypoints} completed</span>
              </>
            ) : (
              <>
                <span className="w-3.5 h-3.5 border border-current rounded-full" />
                <span>Not started</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
