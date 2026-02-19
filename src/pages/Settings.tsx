import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Key, Eye, EyeOff, Check, AlertCircle, SlidersHorizontal, 
  Play, Shield, Download, Trash2, FileText, ChevronRight 
} from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { cn } from "@/lib/utils";

export default function Settings() {
  const navigate = useNavigate();
  const [apiKey, setApiKey] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);
  const [validationState, setValidationState] = useState<'idle' | 'success' | 'error'>('idle');
  const [isValidating, setIsValidating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState("1");

  const [preferences, setPreferences] = useState({
    autoGenerateFieldGuides: true,
    showComprehensionQuizzes: true,
    enableSpacedRepetition: true,
    darkMode: true,
  });

  const handleValidate = () => {
    if (!apiKey) { setValidationState('error'); return; }
    setIsValidating(true);
    setTimeout(() => {
      setIsValidating(false);
      setValidationState(apiKey.startsWith('AI') ? 'success' : 'error');
    }, 1500);
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1000);
  };

  const togglePreference = (key: keyof typeof preferences) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <AppLayout headerProps={{ showBack: true, backLabel: "Back", backTo: "/" }}>
      <main className="max-w-4xl mx-auto px-10 py-12 w-full animate-fade-in">
        {/* Page Header — Bold, singular focus */}
        <div className="mb-12">
          <h1 className="font-display font-bold text-3xl mb-3 text-atlas-text-primary">Settings</h1>
          <p className="text-atlas-text-secondary text-base">Configure your AtlasED experience and learning preferences</p>
        </div>

        <form className="space-y-7" onSubmit={(e) => e.preventDefault()}>
          {/* API Configuration — Premium card */}
          <section className="premium-card overflow-hidden">
            <div className="px-7 py-6 border-b border-atlas-border/50">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-atlas-gold/8 flex items-center justify-center">
                  <Key className="w-5 h-5 text-atlas-gold" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-lg text-atlas-text-primary">API Configuration</h2>
                  <p className="text-atlas-text-muted text-sm mt-0.5">Connect to Gemini AI for enhanced learning features</p>
                </div>
              </div>
            </div>
            <div className="p-7 space-y-5">
              <div>
                <label className="block text-atlas-text-secondary text-sm uppercase tracking-wide font-medium mb-3">
                  Gemini API Key
                </label>
                <div className="relative">
                  <input
                    type={showApiKey ? "text" : "password"}
                    value={apiKey}
                    onChange={(e) => { setApiKey(e.target.value); setValidationState('idle'); }}
                    placeholder="Enter your Gemini API key"
                    className="input-glow w-full bg-atlas-bg-tertiary border border-atlas-border rounded-xl px-5 py-4 pr-24 text-atlas-text-primary placeholder-atlas-text-muted focus:outline-none transition-all duration-300 font-mono text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="absolute right-14 top-1/2 -translate-y-1/2 p-2 text-atlas-text-muted hover:text-atlas-text-primary transition-colors duration-300"
                  >
                    {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <button
                    type="button"
                    onClick={handleValidate}
                    disabled={isValidating}
                    className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-atlas-bg-secondary border border-atlas-border rounded-lg text-xs font-medium text-atlas-text-secondary hover:text-atlas-gold hover:border-atlas-gold/50 transition-all duration-300 disabled:opacity-50 active:scale-[0.98]"
                  >
                    {isValidating ? "Validating..." : "Validate"}
                  </button>
                </div>
                <p className="text-atlas-text-muted text-xs mt-2.5">
                  Your API key is stored locally and never shared.{" "}
                  <a href="#" className="text-atlas-gold hover:underline transition-colors">Learn more</a>
                </p>

                {validationState === 'success' && (
                  <div className="mt-4 flex items-center gap-2 text-atlas-success text-sm animate-fade-in">
                    <Check className="w-4 h-4" />
                    <span>API key validated successfully</span>
                  </div>
                )}
                {validationState === 'error' && (
                  <div className="mt-4 flex items-center gap-2 text-atlas-error text-sm animate-fade-in">
                    <AlertCircle className="w-4 h-4" />
                    <span>Invalid API key. Please check and try again.</span>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Learning Preferences */}
          <section className="premium-card overflow-hidden">
            <div className="px-7 py-6 border-b border-atlas-border/50">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-atlas-gold/8 flex items-center justify-center">
                  <SlidersHorizontal className="w-5 h-5 text-atlas-gold" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-lg text-atlas-text-primary">Learning Preferences</h2>
                  <p className="text-atlas-text-muted text-sm mt-0.5">Customize how AtlasED enhances your learning</p>
                </div>
              </div>
            </div>
            <div className="p-7 space-y-1">
              {[
                { key: 'autoGenerateFieldGuides' as const, title: "Auto-generate Field Guides", desc: "Automatically create comprehensive notes from video content" },
                { key: 'showComprehensionQuizzes' as const, title: "Show Comprehension Quizzes", desc: "Pause videos to test understanding at key moments" },
                { key: 'enableSpacedRepetition' as const, title: "Enable Spaced Repetition", desc: "Schedule Memory Checkpoints for optimal retention" },
                { key: 'darkMode' as const, title: "Dark Mode", desc: "Use dark theme throughout the application" },
              ].map((item, index, arr) => (
                <div key={item.key}>
                  <div className="flex items-center justify-between py-4">
                    <div>
                      <h3 className="font-medium text-atlas-text-primary">{item.title}</h3>
                      <p className="text-atlas-text-muted text-sm mt-1">{item.desc}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => togglePreference(item.key)}
                      className={cn(
                        "relative inline-flex h-7 w-12 items-center rounded-full transition-all duration-300",
                        preferences[item.key] ? "bg-atlas-gold" : "bg-atlas-bg-tertiary border border-atlas-border"
                      )}
                    >
                      <span
                        className={cn(
                          "inline-block h-5 w-5 transform rounded-full transition-all duration-300",
                          preferences[item.key] 
                            ? "translate-x-[24px] bg-atlas-text-primary shadow-sm" 
                            : "translate-x-[3px] bg-atlas-text-secondary"
                        )}
                      />
                    </button>
                  </div>
                  {index < arr.length - 1 && <div className="h-px bg-atlas-border/40" />}
                </div>
              ))}
            </div>
          </section>

          {/* Playback Speed */}
          <section className="premium-card overflow-hidden">
            <div className="px-7 py-6 border-b border-atlas-border/50">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-atlas-gold/8 flex items-center justify-center">
                  <Play className="w-5 h-5 text-atlas-gold" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-lg text-atlas-text-primary">Default Playback Speed</h2>
                  <p className="text-atlas-text-muted text-sm mt-0.5">Set your preferred video playback speed</p>
                </div>
              </div>
            </div>
            <div className="p-7">
              <div className="grid grid-cols-4 gap-4">
                {["0.75", "1", "1.25", "1.5"].map((speed) => (
                  <button
                    key={speed}
                    type="button"
                    onClick={() => setPlaybackSpeed(speed)}
                    className={cn(
                      "flex flex-col items-center justify-center py-5 px-4 rounded-xl transition-all duration-300 active:scale-[0.97]",
                      playbackSpeed === speed
                        ? "bg-atlas-gold/10 border border-atlas-gold shadow-lg shadow-atlas-gold/10"
                        : "bg-atlas-bg-tertiary border border-atlas-border hover:border-atlas-text-muted"
                    )}
                  >
                    <span className="font-display font-bold text-xl text-atlas-text-primary tabular-nums">{speed}x</span>
                    <div className={cn(
                      "w-2 h-2 rounded-full bg-atlas-gold mt-3 transition-all duration-300",
                      playbackSpeed === speed ? "opacity-100 scale-100" : "opacity-0 scale-0"
                    )} />
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Data & Privacy */}
          <section className="premium-card overflow-hidden">
            <div className="px-7 py-6 border-b border-atlas-border/50">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-atlas-gold/8 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-atlas-gold" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-lg text-atlas-text-primary">Data & Privacy</h2>
                  <p className="text-atlas-text-muted text-sm mt-0.5">Manage your learning data and privacy settings</p>
                </div>
              </div>
            </div>
            <div className="p-7 space-y-4">
              {[
                { icon: Download, title: "Export Learning Data", desc: "Download all your expeditions, notes, and progress" },
                { icon: Trash2, title: "Clear Cache", desc: "Remove temporary files and cached video data" },
              ].map((item) => (
                <button
                  key={item.title}
                  type="button"
                  className="w-full flex items-center justify-between p-5 bg-atlas-bg-tertiary/50 border border-atlas-border rounded-xl hover:border-atlas-gold/30 transition-all duration-300 group active:scale-[0.99]"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-atlas-bg-secondary flex items-center justify-center group-hover:bg-atlas-gold/8 transition-colors duration-300">
                      <item.icon className="w-5 h-5 text-atlas-text-secondary group-hover:text-atlas-gold transition-colors duration-300" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-medium text-atlas-text-primary">{item.title}</h3>
                      <p className="text-atlas-text-muted text-sm mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-atlas-text-muted group-hover:text-atlas-gold group-hover:translate-x-1 transition-all duration-300" />
                </button>
              ))}

              <a href="#" className="flex items-center justify-center gap-2 py-4 text-atlas-text-secondary hover:text-atlas-gold transition-colors duration-300 text-sm">
                <FileText className="w-4 h-4" />
                <span>View Privacy Policy</span>
              </a>
            </div>
          </section>

          {/* Action Buttons — Primary CTA pops, secondary is ghost */}
          <div className="flex items-center justify-end gap-4 pt-6">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="btn-ghost px-7 py-3 rounded-xl border border-atlas-border text-atlas-text-secondary font-medium hover:text-atlas-text-primary hover:border-atlas-text-muted active:scale-[0.98]"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSave}
              disabled={isSaving}
              className="btn-premium px-7 py-3 rounded-xl bg-atlas-gold text-atlas-bg-primary font-display font-bold hover:bg-atlas-gold-hover flex items-center gap-2 disabled:opacity-50"
            >
              <Check className="w-4 h-4" />
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-atlas-border/40">
          <div className="flex items-center justify-between text-atlas-text-muted text-sm">
            <p className="font-mono">AtlasED v1.0.0</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-atlas-gold transition-colors duration-300">Documentation</a>
              <a href="#" className="hover:text-atlas-gold transition-colors duration-300">Support</a>
              <a href="#" className="hover:text-atlas-gold transition-colors duration-300">GitHub</a>
            </div>
          </div>
        </footer>
      </main>
    </AppLayout>
  );
}
