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
    if (!apiKey) {
      setValidationState('error');
      return;
    }
    
    setIsValidating(true);
    setTimeout(() => {
      setIsValidating(false);
      if (apiKey.startsWith('AI')) {
        setValidationState('success');
      } else {
        setValidationState('error');
      }
    }, 1500);
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
    }, 1000);
  };

  const togglePreference = (key: keyof typeof preferences) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <AppLayout 
      headerProps={{ showBack: true, backLabel: "Back", backTo: "/" }}
    >
      <main className="max-w-4xl mx-auto px-8 py-10 w-full">
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="font-display font-bold text-3xl tracking-tight mb-2 text-atlas-text-primary">Settings</h1>
          <p className="text-atlas-text-secondary text-base">Configure your AtlasED experience and learning preferences</p>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          {/* API Configuration */}
          <section className="bg-atlas-bg-secondary rounded-xl border border-atlas-border overflow-hidden">
            <div className="px-6 py-5 border-b border-atlas-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-atlas-gold/10 flex items-center justify-center">
                  <Key className="w-5 h-5 text-atlas-gold" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-lg text-atlas-text-primary">API Configuration</h2>
                  <p className="text-atlas-text-muted text-sm">Connect to Gemini AI for enhanced learning features</p>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-atlas-text-secondary text-sm uppercase tracking-wide font-medium mb-3">
                  Gemini API Key
                </label>
                <div className="relative">
                  <input
                    type={showApiKey ? "text" : "password"}
                    value={apiKey}
                    onChange={(e) => {
                      setApiKey(e.target.value);
                      setValidationState('idle');
                    }}
                    placeholder="Enter your Gemini API key"
                    className="w-full bg-atlas-bg-tertiary border border-atlas-border rounded-xl px-4 py-3.5 pr-24 text-atlas-text-primary placeholder-atlas-text-muted focus:outline-none focus:border-atlas-gold/50 input-glow transition-all duration-200 font-mono text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="absolute right-14 top-1/2 -translate-y-1/2 p-2 text-atlas-text-muted hover:text-atlas-text-primary transition-colors"
                  >
                    {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <button
                    type="button"
                    onClick={handleValidate}
                    disabled={isValidating}
                    className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-atlas-bg-secondary border border-atlas-border rounded-lg text-xs font-medium text-atlas-text-secondary hover:text-atlas-gold hover:border-atlas-gold/50 transition-all duration-200 disabled:opacity-50"
                  >
                    {isValidating ? "Validating..." : "Validate"}
                  </button>
                </div>
                <p className="text-atlas-text-muted text-xs mt-2">
                  Your API key is stored locally and never shared.{" "}
                  <a href="#" className="text-atlas-gold hover:underline">Learn more</a>
                </p>

                {/* Validation States */}
                {validationState === 'success' && (
                  <div className="mt-3 flex items-center gap-2 text-atlas-success text-sm">
                    <Check className="w-4 h-4" />
                    <span>API key validated successfully</span>
                  </div>
                )}
                {validationState === 'error' && (
                  <div className="mt-3 flex items-center gap-2 text-atlas-error text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>Invalid API key. Please check and try again.</span>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Learning Preferences */}
          <section className="bg-atlas-bg-secondary rounded-xl border border-atlas-border overflow-hidden">
            <div className="px-6 py-5 border-b border-atlas-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-atlas-gold/10 flex items-center justify-center">
                  <SlidersHorizontal className="w-5 h-5 text-atlas-gold" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-lg text-atlas-text-primary">Learning Preferences</h2>
                  <p className="text-atlas-text-muted text-sm">Customize how AtlasED enhances your learning</p>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-4">
              {/* Toggle Items */}
              {[
                { key: 'autoGenerateFieldGuides' as const, title: "Auto-generate Field Guides", desc: "Automatically create comprehensive notes from video content" },
                { key: 'showComprehensionQuizzes' as const, title: "Show Comprehension Quizzes", desc: "Pause videos to test understanding at key moments" },
                { key: 'enableSpacedRepetition' as const, title: "Enable Spaced Repetition", desc: "Schedule Memory Checkpoints for optimal retention" },
                { key: 'darkMode' as const, title: "Dark Mode", desc: "Use dark theme throughout the application" },
              ].map((item, index, arr) => (
                <div key={item.key}>
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <h3 className="font-medium text-atlas-text-primary">{item.title}</h3>
                      <p className="text-atlas-text-muted text-sm mt-0.5">{item.desc}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => togglePreference(item.key)}
                      className={cn(
                        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                        preferences[item.key] ? "bg-atlas-gold" : "bg-atlas-bg-tertiary border border-atlas-border"
                      )}
                    >
                      <span
                        className={cn(
                          "inline-block h-5 w-5 transform rounded-full transition-transform",
                          preferences[item.key] 
                            ? "translate-x-[22px] bg-atlas-text-primary" 
                            : "translate-x-[2px] bg-atlas-text-secondary"
                        )}
                      />
                    </button>
                  </div>
                  {index < arr.length - 1 && <div className="h-px bg-atlas-border" />}
                </div>
              ))}
            </div>
          </section>

          {/* Playback Speed */}
          <section className="bg-atlas-bg-secondary rounded-xl border border-atlas-border overflow-hidden">
            <div className="px-6 py-5 border-b border-atlas-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-atlas-gold/10 flex items-center justify-center">
                  <Play className="w-5 h-5 text-atlas-gold" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-lg text-atlas-text-primary">Default Playback Speed</h2>
                  <p className="text-atlas-text-muted text-sm">Set your preferred video playback speed</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-4 gap-3">
                {["0.75", "1", "1.25", "1.5"].map((speed) => (
                  <button
                    key={speed}
                    type="button"
                    onClick={() => setPlaybackSpeed(speed)}
                    className={cn(
                      "flex flex-col items-center justify-center py-4 px-4 rounded-xl transition-all duration-200",
                      playbackSpeed === speed
                        ? "bg-atlas-gold/10 border border-atlas-gold"
                        : "bg-atlas-bg-tertiary border border-atlas-border hover:border-atlas-text-muted"
                    )}
                  >
                    <span className="font-display font-bold text-lg text-atlas-text-primary">{speed}x</span>
                    <div className={cn(
                      "w-2 h-2 rounded-full bg-atlas-gold mt-2 transition-opacity duration-200",
                      playbackSpeed === speed ? "opacity-100" : "opacity-0"
                    )} />
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Data & Privacy */}
          <section className="bg-atlas-bg-secondary rounded-xl border border-atlas-border overflow-hidden">
            <div className="px-6 py-5 border-b border-atlas-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-atlas-gold/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-atlas-gold" />
                </div>
                <div>
                  <h2 className="font-display font-bold text-lg text-atlas-text-primary">Data & Privacy</h2>
                  <p className="text-atlas-text-muted text-sm">Manage your learning data and privacy settings</p>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <button
                type="button"
                className="w-full flex items-center justify-between p-4 bg-atlas-bg-tertiary border border-atlas-border rounded-xl hover:border-atlas-gold/50 hover:bg-atlas-bg-tertiary/80 transition-all duration-200 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-atlas-bg-secondary flex items-center justify-center group-hover:bg-atlas-gold/10 transition-colors">
                    <Download className="w-5 h-5 text-atlas-text-secondary group-hover:text-atlas-gold transition-colors" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium text-atlas-text-primary">Export Learning Data</h3>
                    <p className="text-atlas-text-muted text-sm">Download all your expeditions, notes, and progress</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-atlas-text-muted" />
              </button>

              <button
                type="button"
                className="w-full flex items-center justify-between p-4 bg-atlas-bg-tertiary border border-atlas-border rounded-xl hover:border-atlas-gold/50 hover:bg-atlas-bg-tertiary/80 transition-all duration-200 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-atlas-bg-secondary flex items-center justify-center group-hover:bg-atlas-gold/10 transition-colors">
                    <Trash2 className="w-5 h-5 text-atlas-text-secondary group-hover:text-atlas-gold transition-colors" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium text-atlas-text-primary">Clear Cache</h3>
                    <p className="text-atlas-text-muted text-sm">Remove temporary files and cached video data</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-atlas-text-muted" />
              </button>

              <a href="#" className="flex items-center justify-center gap-2 py-3 text-atlas-text-secondary hover:text-atlas-gold transition-colors text-sm">
                <FileText className="w-4 h-4" />
                <span>View Privacy Policy</span>
              </a>
            </div>
          </section>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-2.5 rounded-lg border border-atlas-border text-atlas-text-secondary font-medium hover:text-atlas-text-primary hover:border-atlas-text-muted transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSave}
              disabled={isSaving}
              className="px-6 py-2.5 rounded-lg bg-atlas-gold text-atlas-bg-primary font-display font-bold hover:bg-atlas-gold-hover transition-all duration-200 flex items-center gap-2 disabled:opacity-50"
            >
              <Check className="w-4 h-4" />
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-atlas-border">
          <div className="flex items-center justify-between text-atlas-text-muted text-sm">
            <p>AtlasED v1.0.0</p>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-atlas-gold transition-colors">Documentation</a>
              <a href="#" className="hover:text-atlas-gold transition-colors">Support</a>
              <a href="#" className="hover:text-atlas-gold transition-colors">GitHub</a>
            </div>
          </div>
        </footer>
      </main>
    </AppLayout>
  );
}
