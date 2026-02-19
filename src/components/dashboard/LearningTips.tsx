import { Lightbulb, Repeat, MessageCircle, BookOpen, Sparkles } from "lucide-react";

const tips = [
  {
    id: 1,
    icon: Repeat,
    title: "Spaced Repetition",
    description: "Complete memory checkpoints when they appear to maximize long-term retention.",
  },
  {
    id: 2,
    icon: MessageCircle,
    title: "Ask Compass AI",
    description: "Stuck on a concept? Ask Compass for explanations tailored to your level.",
  },
  {
    id: 3,
    icon: BookOpen,
    title: "Read Field Guides",
    description: "Field Guides summarize key concepts for quick review before checkpoints.",
  },
];

export function LearningTips() {
  return (
    <div className="premium-card p-7">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-atlas-gold/8 border border-atlas-gold/15 flex items-center justify-center">
          <Lightbulb className="w-5 h-5 text-atlas-gold" />
        </div>
        <div>
          <h3 className="font-display font-semibold text-atlas-text-primary text-base">Learning Tips</h3>
          <p className="text-xs text-atlas-text-muted mt-0.5">Make the most of AtlasED</p>
        </div>
      </div>

      <div className="space-y-3">
        {tips.map((tip) => (
          <div 
            key={tip.id}
            className="p-4 rounded-xl bg-atlas-bg-tertiary/40 hover:bg-atlas-bg-tertiary/70 transition-all duration-300 group cursor-pointer hover:translate-x-1"
          >
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-atlas-gold/8 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-atlas-gold/15 transition-colors duration-300">
                <tip.icon className="w-3.5 h-3.5 text-atlas-gold" />
              </div>
              <div>
                <h4 className="text-sm font-medium text-atlas-text-primary mb-1 group-hover:text-atlas-gold transition-colors duration-300">
                  {tip.title}
                </h4>
                <p className="text-xs text-atlas-text-secondary leading-relaxed">
                  {tip.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pro Tip Banner */}
      <div className="mt-5 p-4 rounded-xl bg-atlas-gold/5 border border-atlas-gold/15">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-atlas-gold" />
          <span className="text-xs font-medium text-atlas-gold">Pro Tip</span>
        </div>
        <p className="text-xs text-atlas-text-secondary mt-2 leading-relaxed">
          Keep a personal notebook to jot down insights while watching videos.
        </p>
      </div>
    </div>
  );
}
