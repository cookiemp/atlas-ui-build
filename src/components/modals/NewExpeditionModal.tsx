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
    if (value && state === 'error') {
      setState('initial');
    }
  };

  const clearUrl = () => {
    setPlaylistUrl("");
    setState("initial");
  };

  const handleCreate = () => {
    if (!playlistUrl.trim()) return;
    
    // Simulate loading
    setState("loading");
    
    setTimeout(() => {
      // Simulate success - in real app, this would validate the URL
      if (playlistUrl.includes("youtube") || playlistUrl.includes("youtu.be")) {
        setState("preview");
      } else {
        setState("error");
      }
    }, 1500);
  };

  const handleSubmit = () => {
    onSubmit(playlistUrl, expeditionName || undefined);
    onClose();
    // Reset state
    setPlaylistUrl("");
    setExpeditionName("");
    setState("initial");
  };

  const retry = () => {
    setState("initial");
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogOverlay className="bg-black/60 backdrop-blur-sm" />
      <DialogContent className="animate-modal-enter max-w-2xl p-0 bg-atlas-bg-secondary border-atlas-border rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="px-8 pt-8 pb-6 border-b border-atlas-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-atlas-gold/10 flex items-center justify-center">
                <Compass className="w-5 h-5 text-atlas-gold" />
              </div>
              <div>
                <h2 className="font-display text-xl font-bold text-atlas-text-primary">Add New Expedition</h2>
                <p className="text-sm text-atlas-text-muted mt-0.5">Transform a YouTube playlist into a structured learning journey</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-atlas-text-muted hover:text-atlas-text-primary hover:bg-atlas-bg-tertiary transition-all duration-200"
            >
              <X className="w-[18px] h-[18px]" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="px-8 py-6">
          {/* YouTube URL Input */}
          <div className="space-y-2 mb-5">
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
                className="input-glow w-full bg-atlas-bg-tertiary border border-atlas-border rounded-xl pl-11 pr-10 py-3.5 text-atlas-text-primary placeholder-atlas-text-muted focus:outline-none focus:border-atlas-gold/50 transition-all duration-200"
              />
              {playlistUrl && (
                <button 
                  onClick={clearUrl}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-atlas-text-muted hover:text-atlas-text-primary"
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

          {/* Expedition Name Input */}
          <div className="space-y-2 mb-6">
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
                className="input-glow w-full bg-atlas-bg-tertiary border border-atlas-border rounded-xl pl-11 pr-4 py-3.5 text-atlas-text-primary placeholder-atlas-text-muted focus:outline-none focus:border-atlas-gold/50 transition-all duration-200"
              />
            </div>
          </div>

          {/* Loading State */}
          {state === "loading" && (
            <div className="py-8">
              <div className="flex flex-col items-center justify-center">
                <div className="relative w-12 h-12 mb-4">
                  <div className="absolute inset-0 rounded-full border-2 border-atlas-bg-tertiary" />
                  <div className="absolute inset-0 rounded-full border-2 border-atlas-gold border-t-transparent animate-spin-slow" />
                </div>
                <p className="text-atlas-text-primary font-medium mb-1">Fetching playlist...</p>
                <p className="text-sm text-atlas-text-muted">Retrieving video information</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {state === "error" && (
            <div className="mb-6">
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <XCircle className="w-4 h-4 text-red-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-atlas-text-primary font-medium mb-1">Unable to fetch playlist</p>
                    <p className="text-sm text-red-400/80 mb-3">The playlist URL appears to be invalid or the playlist is private.</p>
                    <button
                      onClick={retry}
                      className="inline-flex items-center gap-2 text-sm font-medium text-red-400 hover:text-red-300 transition-colors"
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
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-atlas-text-secondary">
                  Videos found <span className="text-atlas-text-primary ml-1">({videoCount})</span>
                </h3>
                <span className="text-xs text-atlas-text-muted">Preview</span>
              </div>

              <div className="bg-atlas-bg-tertiary rounded-xl p-4 border border-atlas-border">
                <div className="grid grid-cols-4 gap-3">
                  {sampleThumbnails.map((thumb, index) => (
                    <div
                      key={index}
                      className={cn(
                        "aspect-video rounded-lg bg-gradient-to-br border border-atlas-border overflow-hidden cursor-pointer relative group animate-fade-in",
                        thumb.color
                      )}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Play className="w-6 h-6 text-white/30 group-hover:text-white/60 transition-colors" />
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                        <p className="text-[10px] text-white/80 truncate">{thumb.title} {index + 1}</p>
                      </div>
                      <div className="absolute top-2 right-2 w-5 h-5 rounded bg-black/50 flex items-center justify-center text-[10px] text-white/80 font-medium">
                        {index + 1}
                      </div>
                    </div>
                  ))}
                </div>

                {videoCount > 8 && (
                  <div className="mt-3 pt-3 border-t border-atlas-border text-center">
                    <span className="text-sm text-atlas-text-muted">And {videoCount - 8} more videos</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-8 py-5 border-t border-atlas-border bg-atlas-bg-secondary">
          <div className="flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-atlas-text-secondary font-medium hover:text-atlas-text-primary hover:bg-atlas-bg-tertiary transition-all duration-200"
            >
              Cancel
            </button>
            {state === "preview" ? (
              <button
                onClick={handleSubmit}
                className="px-6 py-2.5 rounded-xl bg-atlas-gold text-atlas-bg-primary font-semibold hover:bg-atlas-gold-hover transition-all duration-200 flex items-center gap-2"
              >
                <span>Create Expedition</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleCreate}
                disabled={!playlistUrl.trim() || state === 'loading'}
                className="px-6 py-2.5 rounded-xl bg-atlas-gold text-atlas-bg-primary font-semibold hover:bg-atlas-gold-hover disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-atlas-gold transition-all duration-200 flex items-center gap-2"
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
