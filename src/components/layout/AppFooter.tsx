import { Database } from "lucide-react";

export function AppFooter() {
  return (
    <footer className="h-11 bg-atlas-bg-secondary/60 backdrop-blur-sm border-t border-atlas-border/60 flex items-center justify-between px-8 text-xs text-atlas-text-muted">
      <div className="flex items-center gap-5">
        <span className="font-mono">AtlasED v0.1.0</span>
        <span className="w-1 h-1 rounded-full bg-atlas-border" />
        <span className="flex items-center gap-1.5">
          <Database className="w-3.5 h-3.5" />
          Local Storage
        </span>
      </div>
      <div className="flex items-center gap-5">
        <button className="hover:text-atlas-gold transition-colors duration-300">Help</button>
        <button className="hover:text-atlas-gold transition-colors duration-300">Feedback</button>
      </div>
    </footer>
  );
}
