import { Compass, MapPin, ArrowRight } from "lucide-react";

interface EmptyStateProps {
  onCreateExpedition: () => void;
}

export function EmptyState({ onCreateExpedition }: EmptyStateProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-10 py-20 animate-fade-in">
      {/* Singular Focus: One dominant visual element */}
      <div className="relative mb-10">
        <div className="w-52 h-52 rounded-3xl bg-atlas-bg-secondary border border-atlas-border/60 map-pattern flex items-center justify-center">
          <div className="w-22 h-22 rounded-2xl bg-atlas-gold/10 border border-atlas-gold/25 flex items-center justify-center glow-gold animate-pulse-glow">
            <Compass className="w-11 h-11 text-atlas-gold" />
          </div>
        </div>
        {/* Floating accent */}
        <div className="absolute -top-3 -right-3 w-11 h-11 rounded-xl bg-atlas-bg-tertiary border border-atlas-border/60 flex items-center justify-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <MapPin className="w-5 h-5 text-atlas-text-muted" />
        </div>
      </div>

      {/* Singular Focus: ONE headline */}
      <h2 className="font-display font-bold text-3xl text-atlas-text-primary mb-4 text-center">
        No Expeditions Yet
      </h2>
      <p className="text-atlas-text-secondary text-center max-w-lg mb-10 text-base">
        Transform any YouTube playlist into a structured learning journey. Add waypoints, 
        track your progress, and master new topics efficiently.
      </p>

      {/* ONE primary CTA — Premium glow */}
      <button
        onClick={onCreateExpedition}
        className="btn-premium group flex items-center gap-3 bg-atlas-gold hover:bg-atlas-gold-hover text-atlas-bg-primary font-semibold px-9 py-4 rounded-xl text-base"
      >
        <span>Start Your First Expedition</span>
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
      </button>

      {/* Tips — Generous spacing, whitespace separation */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl">
        {[
          { num: "1", text: "Paste a YouTube playlist URL" },
          { num: "2", text: "Videos become waypoints on your map" },
          { num: "3", text: "Learn with AI guides and quizzes" },
        ].map((tip, i) => (
          <div key={tip.num} className="text-center p-5 animate-fade-in" style={{ animationDelay: `${(i + 1) * 100}ms` }}>
            <div className="w-11 h-11 rounded-xl bg-atlas-gold/8 border border-atlas-gold/15 flex items-center justify-center mx-auto mb-4">
              <span className="text-atlas-gold font-display font-bold text-lg">{tip.num}</span>
            </div>
            <p className="text-sm text-atlas-text-muted">{tip.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
