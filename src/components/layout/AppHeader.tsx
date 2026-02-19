import { Compass, ArrowLeft, Settings } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

interface AppHeaderProps {
  showBack?: boolean;
  backLabel?: string;
  backTo?: string;
  title?: string;
  subtitle?: string;
}

export function AppHeader({ showBack = true, backLabel = "Back", backTo, title, subtitle }: AppHeaderProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const isSettingsPage = location.pathname === "/settings";
  const isHome = location.pathname === "/";

  const handleBack = () => {
    if (backTo) {
      navigate(backTo);
    } else {
      navigate(-1);
    }
  };

  return (
    <header className="h-16 bg-atlas-bg-secondary/80 backdrop-blur-md border-b border-atlas-border flex items-center justify-between px-8 select-none sticky top-0 z-50">
      {/* Left: Logo and Navigation */}
      <div className="flex items-center gap-6">
        {/* Logo */}
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => navigate("/")}
        >
          <div className="w-9 h-9 rounded-xl bg-atlas-gold flex items-center justify-center transition-all duration-300 group-hover:shadow-lg group-hover:shadow-atlas-gold/20">
            <Compass className="w-[18px] h-[18px] text-atlas-bg-primary" />
          </div>
          <span className="font-display font-bold text-lg text-atlas-text-primary">
            AtlasED
          </span>
        </div>
        
        {/* Divider — whitespace grouping */}
        <div className="w-px h-6 bg-atlas-border/60" />
        
        {/* Back Button or Title */}
        {title ? (
          <div className="flex items-center gap-2">
            <span className="text-sm text-atlas-text-muted">{subtitle}</span>
            {subtitle && <span className="text-atlas-text-muted/40">·</span>}
            <span className="text-sm font-medium text-atlas-text-secondary">{title}</span>
          </div>
        ) : showBack && !isHome ? (
          <button
            onClick={handleBack}
            className={cn(
              "flex items-center gap-2 text-atlas-text-secondary hover:text-atlas-text-primary transition-all duration-300 group/back",
              isHome && "opacity-30 cursor-not-allowed pointer-events-none"
            )}
            disabled={isHome}
          >
            <ArrowLeft className="w-[18px] h-[18px] group-hover/back:-translate-x-1 transition-transform duration-300" />
            <span className="text-sm font-medium">{backLabel}</span>
          </button>
        ) : null}
      </div>
      
      {/* Right: Settings */}
      <div>
        <button
          onClick={() => navigate("/settings")}
          className={cn(
            "flex items-center gap-2.5 text-atlas-text-secondary hover:text-atlas-text-primary transition-all duration-300 group px-4 py-2 rounded-xl",
            isSettingsPage 
              ? "bg-atlas-gold/10 text-atlas-gold" 
              : "hover:bg-atlas-bg-tertiary/60"
          )}
        >
          <Settings className={cn(
            "w-[18px] h-[18px] transition-transform duration-500",
            !isSettingsPage && "group-hover:rotate-90"
          )} />
          <span className="text-sm font-medium">Settings</span>
        </button>
      </div>
    </header>
  );
}
