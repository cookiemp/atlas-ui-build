import { useState } from "react";
import { X, Link, Type, Compass, Info, XCircle, RefreshCw, ArrowRight, Play } from "lucide-react";
import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface NewExpeditionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (playlistUrl: string, name?: string) => void;
}

type ModalState = 'initial' | 'loading' | 'error' | 'preview';

const sampleThumbnails = [
  { color: "from-red-500/20 to-orange-500/20", title: "Introduction" },
  { color: "from-blue-500/20 to-cyan-500/20", title: "Getting Started" },
  { color: "from-green-500/20 to-emerald-500/20", title: "Core Concepts" },
  { color: "from-purple-500/20 to-pink-500/20", title: "Advanced Topics" },
  { color: "from-yellow-500/20 to-amber-500/20", title: "Best Practices" },
  { color: "from-indigo-500/20 to-violet-500/20", title: "Implementation" },
  { color: "from-rose-500/20 to-red-500/20", title: "Troubleshooting" },
  { color: "from-teal-500/20 to-cyan-500/20", title: "Conclusion" },
];

export function NewExpeditionModal({ isOpen, onClose, onSubmit }: NewExpeditionModalProps) {
  const [playlistUrl, setPlaylistUrl] = useState("");
  const [expeditionName, setExpeditionName] = useState("");
  const [state, setState] = useState<ModalState>("initial");
  const [videoCount] = useState(12);

  const handleUrlChange = (value: string) => {
    setPlaylistUrl(value);
    if (value && state === 'error') setState('initial');
  };

  const clearUrl = () => { setPlaylistUrl(""); setState("initial"); };

  const handleCreate = () => {
    if (!playlistUrl.trim()) return;
    setState("loading");
    setTimeout(() => {
      setState(playlistUrl.includes("youtube") || playlistUrl.includes("youtu.be") ? "preview" : "error");
    }, 1500);
  };

  const handleSubmit = () => {
    onSubmit(playlistUrl, expeditionName || undefined);
    onClose();
    setPlaylistUrl(""); setExpeditionName(""); setState("initial");
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogOverlay className="bg-black/60 backdrop-blur-md" />
      <DialogContent className="animate-modal-enter max-w-2xl p-0 bg-atlas-bg-secondary border-atlas-border rounded-2xl overflow-hidden">
        {/* Header — Singular focus */}
        <div className="px-9 pt-9 pb-7 border-b border-atlas-border/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-atlas-gold/8 flex items-center justify-center">
                <Compass className="w-5 h-5 text-atlas-gold" />
              </div>
              <div>
                <h2 className="font-display text-xl font-bold text-atlas-text-primary">Add New Expedition</h2>
                <p className="text-sm text-atlas-text-muted mt-1">Transform a YouTube playlist into a structured learning journey</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-atlas-text-muted hover:text-atlas-text-primary hover:bg-atlas-bg-tertiary transition-all duration-300"
            >
              <X className="w-[18px] h-[18px]" />
            </button>
          </div>
        </div>

        {/* Body — Generous padding */}
        <div className="px-9 py-7">
          {/* YouTube URL Input */}
          <div className="space-y-2.5 mb-6">
            <label className="block text-sm font-medium text-atlas-text-secondary">
              YouTube Playlist URL <span className="text-atlas-gold">*</span>
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-atlas-text-muted">
                <Link className="w-[18px] h-[18px]" />
              </div>
              <input
                type="text"
                value={playlistUrl}
                onChange={(e) => handleUrlChange(e.target.value)}
                placeholder="Paste playlist URL"
                className="input-glow w-full bg-atlas-bg-tertiary border border-atlas-border rounded-xl pl-11 pr-10 py-4 text-atlas-text-primary placeholder-atlas-text-muted focus:outline-none transition-all duration-300"
              />
              {playlistUrl && (
                <button 
                  onClick={clearUrl}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-atlas-text-muted hover:text-atlas-text-primary transition-colors duration-300"
                >
                  <XCircle className="w-[18px] h-[18px]" />
                </button>
              )}
            </div>
            <p className="text-xs text-atlas-text-muted flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5" />
              Supports: youtube.com/playlist?list=..., youtu.be/..., and YouTube Music playlists
            </p>
          </div>

          {/* Name Input */}
          <div className="space-y-2.5 mb-7">
            <label className="block text-sm font-medium text-atlas-text-secondary">
              Expedition Name <span className="text-atlas-text-muted font-normal">(optional)</span>
            </label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-atlas-text-muted">
                <Type className="w-[18px] h-[18px]" />
              </div>
              <input
                type="text"
                value={expeditionName}
                onChange={(e) => setExpeditionName(e.target.value)}
                placeholder="Leave blank to use playlist title"
                className="input-glow w-full bg-atlas-bg-tertiary border border-atlas-border rounded-xl pl-11 pr-4 py-4 text-atlas-text-primary placeholder-atlas-text-muted focus:outline-none transition-all duration-300"
              />
            </div>
          </div>

          {/* Loading State — Celebratory spinner */}
          {state === "loading" && (
            <div className="py-10 animate-fade-in">
              <div className="flex flex-col items-center justify-center">
                <div className="relative w-14 h-14 mb-5">
                  <div className="absolute inset-0 rounded-full border-2 border-atlas-bg-tertiary" />
                  <div className="absolute inset-0 rounded-full border-2 border-atlas-gold border-t-transparent animate-spin-slow" />
                </div>
                <p className="text-atlas-text-primary font-medium mb-1">Fetching playlist...</p>
                <p className="text-sm text-atlas-text-muted">Retrieving video information</p>
              </div>
            </div>
          )}

          {/* Error State — Semantic red */}
          {state === "error" && (
            <div className="mb-7 animate-fade-in">
              <div className="bg-atlas-error/5 border border-atlas-error/15 rounded-xl p-5">
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-atlas-error/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <XCircle className="w-4 h-4 text-atlas-error" />
                  </div>
                  <div className="flex-1">
                    <p className="text-atlas-text-primary font-medium mb-1">Unable to fetch playlist</p>
                    <p className="text-sm text-atlas-error/70 mb-4">The playlist URL appears to be invalid or the playlist is private.</p>
                    <button
                      onClick={() => setState("initial")}
                      className="inline-flex items-center gap-2 text-sm font-medium text-atlas-error hover:text-atlas-error/80 transition-colors duration-300"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      Try again
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Preview Grid */}
          {state === "preview" && (
            <div className="animate-fade-in">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-atlas-text-secondary">
                  Videos found <span className="text-atlas-text-primary ml-1 tabular-nums">({videoCount})</span>
                </h3>
                <span className="text-xs text-atlas-text-muted">Preview</span>
              </div>

              <div className="bg-atlas-bg-tertiary/50 rounded-xl p-5 border border-atlas-border">
                <div className="grid grid-cols-4 gap-3">
                  {sampleThumbnails.map((thumb, index) => (
                    <div
                      key={index}
                      className={cn(
                        "aspect-video rounded-xl bg-gradient-to-br border border-atlas-border overflow-hidden cursor-pointer relative group animate-fade-in",
                        thumb.color
                      )}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Play className="w-6 h-6 text-white/25 group-hover:text-white/60 group-hover:scale-110 transition-all duration-300" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                        <p className="text-[10px] text-white/80 truncate">{thumb.title} {index + 1}</p>
                      </div>
                      <div className="absolute top-2 right-2 w-5 h-5 rounded-md bg-black/50 flex items-center justify-center text-[10px] text-white/80 font-medium tabular-nums">
                        {index + 1}
                      </div>
                    </div>
                  ))}
                </div>

                {videoCount > 8 && (
                  <div className="mt-4 pt-4 border-t border-atlas-border/50 text-center">
                    <span className="text-sm text-atlas-text-muted">And {videoCount - 8} more videos</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer — Primary CTA pops, secondary ghost */}
        <div className="px-9 py-6 border-t border-atlas-border/50 bg-atlas-bg-secondary">
          <div className="flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="btn-ghost px-6 py-3 rounded-xl text-atlas-text-secondary font-medium hover:text-atlas-text-primary active:scale-[0.98]"
            >
              Cancel
            </button>
            {state === "preview" ? (
              <button
                onClick={handleSubmit}
                className="btn-premium px-7 py-3 rounded-xl bg-atlas-gold text-atlas-bg-primary font-semibold hover:bg-atlas-gold-hover flex items-center gap-2"
              >
                <span>Create Expedition</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleCreate}
                disabled={!playlistUrl.trim() || state === 'loading'}
                className="btn-premium px-7 py-3 rounded-xl bg-atlas-gold text-atlas-bg-primary font-semibold hover:bg-atlas-gold-hover disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-atlas-gold disabled:hover:shadow-none disabled:hover:translate-y-0 flex items-center gap-2"
              >
                <span>Fetch Playlist</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
