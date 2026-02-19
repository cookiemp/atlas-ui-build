import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, Settings, Play, Pause, Volume2, Maximize,
  ChevronLeft, ChevronRight, CheckCircle, MapPin,
  BookOpen, Compass, Key, Code2, AlertCircle, Send
} from "lucide-react";
import { cn } from "@/lib/utils";
import { mockFieldGuide } from "@/data/mockData";

type TabType = 'field-guide' | 'compass-ai';

export default function VideoPlayer() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('field-guide');
  const [isPlaying, setIsPlaying] = useState(true);
  const [chatInput, setChatInput] = useState("");

  const chatMessages = [
    {
      type: 'ai',
      content: "Hello! I'm Compass, your AI learning assistant. I can answer questions about this video, explain concepts in different ways, or provide additional examples. What would you like to know about useState?",
    },
    {
      type: 'user',
      content: "What's the difference between passing a value vs a function to useState?",
    },
    {
      type: 'ai',
      content: "Great question! When you pass a **value** directly to useState, it's evaluated on every render.\n\nWhen you pass a **function** (lazy initialization), React only calls it during the initial render, which can improve performance for expensive calculations.\n\nFor updates, always use the functional form when the new state depends on the previous value.",
    },
  ];

  return (
    <div className="min-h-screen bg-atlas-bg-primary text-atlas-text-primary flex flex-col">
      {/* Title Bar — Sticky, glass effect */}
      <div className="h-12 bg-atlas-bg-secondary/80 backdrop-blur-md border-b border-atlas-border/60 flex items-center justify-between px-5 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-atlas-text-secondary hover:text-atlas-gold transition-all duration-300 group"
          >
            <ArrowLeft className="w-[18px] h-[18px] group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="text-sm font-medium">Expedition</span>
          </button>
          <div className="w-px h-4 bg-atlas-border/40" />
          <span className="text-sm text-atlas-text-muted">React Fundamentals</span>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/settings')}
            className="p-2 text-atlas-text-secondary hover:text-atlas-gold rounded-lg hover:bg-atlas-bg-tertiary/50 transition-all duration-300"
          >
            <Settings className="w-[18px] h-[18px]" />
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* LEFT: Video Player */}
        <div className="lg:col-span-5 flex flex-col bg-atlas-bg-primary border-r border-atlas-border/60">
          {/* Video Container */}
          <div className="relative bg-black aspect-video lg:aspect-auto lg:flex-1 flex items-center justify-center group">
            <div className="absolute inset-0 bg-gradient-to-br from-atlas-bg-secondary to-atlas-bg-primary flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-atlas-gold/8 border border-atlas-gold/25 flex items-center justify-center mb-4 mx-auto">
                  <Play className="w-8 h-8 text-atlas-gold ml-1" />
                </div>
                <p className="text-atlas-text-secondary text-sm">YouTube Video Embed</p>
              </div>
            </div>

            {/* Pause Overlay */}
            {!isPlaying && (
              <div 
                onClick={() => setIsPlaying(true)}
                className="pause-overlay absolute inset-0 flex items-center justify-center cursor-pointer animate-fade-in"
              >
                <button className="btn-premium w-20 h-20 rounded-full bg-atlas-gold hover:bg-atlas-gold-hover flex items-center justify-center">
                  <Play className="w-8 h-8 text-atlas-bg-primary ml-1" />
                </button>
              </div>
            )}

            {/* Video Controls Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
              {/* Progress Bar */}
              <div className="w-full h-1 bg-white/15 rounded-full mb-3 cursor-pointer overflow-hidden group/progress hover:h-1.5 transition-all">
                <div className="progress-bar-gradient h-full w-1/3 rounded-full relative" />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="text-white hover:text-atlas-gold transition-colors duration-300 hover:scale-110 active:scale-95"
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </button>
                  <div className="flex items-center gap-2 text-sm text-white/80 tabular-nums">
                    <span>12:45</span>
                    <span className="text-white/30">/</span>
                    <span className="text-white/30">45:30</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button className="text-white/70 hover:text-white transition-colors duration-300">
                    <Volume2 className="w-[18px] h-[18px]" />
                  </button>
                  <button className="text-white/70 hover:text-white transition-colors duration-300">
                    <Maximize className="w-[18px] h-[18px]" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Video Info — 1.5x padding */}
          <div className="p-6 border-t border-atlas-border/60 bg-atlas-bg-primary">
            <div className="flex items-start justify-between gap-4 mb-2">
              <h2 className="font-display font-bold text-lg text-atlas-text-primary leading-tight">
                3. Understanding useState and Component State
              </h2>
              <span className="text-xs text-atlas-text-muted bg-atlas-bg-tertiary px-2.5 py-1 rounded-lg flex-shrink-0 tabular-nums">
                Waypoint 3/12
              </span>
            </div>
            <p className="text-sm text-atlas-text-secondary">
              Learn how to manage component-level state using the useState hook, including initialization patterns and state update batching.
            </p>
          </div>
        </div>

        {/* CENTER: Navigation */}
        <div className="lg:col-span-2 bg-atlas-bg-secondary border-r border-atlas-border/60 flex flex-col">
          {/* Waypoint Info */}
          <div className="p-6 border-b border-atlas-border/60">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-xl bg-atlas-gold/8 border border-atlas-gold/20 flex items-center justify-center">
                <MapPin className="w-4 h-4 text-atlas-gold" />
              </div>
              <span className="text-xs text-atlas-text-muted uppercase tracking-wider">Current</span>
            </div>
            <h3 className="font-display font-bold text-atlas-text-primary mb-1">useState Deep Dive</h3>
            <p className="text-xs text-atlas-text-secondary">Duration: 45:30</p>
          </div>

          {/* Description */}
          <div className="p-6 border-b border-atlas-border/60 flex-1 overflow-auto">
            <h4 className="text-xs text-atlas-text-muted uppercase tracking-wider mb-3">About this Waypoint</h4>
            <p className="text-sm text-atlas-text-secondary">
              This video covers the fundamentals of React's useState hook, including proper initialization patterns, the rules of hooks, and common pitfalls when managing component state.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {["Hooks", "State", "Beginner"].map(tag => (
                <span key={tag} className="text-xs bg-atlas-bg-tertiary text-atlas-text-secondary px-2.5 py-1 rounded-lg">{tag}</span>
              ))}
            </div>
          </div>

          {/* Navigation Actions — Clear hierarchy */}
          <div className="p-6 space-y-3">
            <button className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-atlas-bg-tertiary hover:bg-atlas-border text-atlas-text-secondary hover:text-atlas-text-primary rounded-xl transition-all duration-300 text-sm font-medium active:scale-[0.98]">
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>

            <button className="btn-premium w-full flex items-center justify-center gap-2 py-3 px-4 bg-atlas-gold hover:bg-atlas-gold-hover text-atlas-bg-primary rounded-xl text-sm font-bold">
              <CheckCircle className="w-4 h-4" />
              Mark Complete
            </button>

            <button className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-atlas-bg-tertiary hover:bg-atlas-border text-atlas-text-secondary hover:text-atlas-text-primary rounded-xl transition-all duration-300 text-sm font-medium active:scale-[0.98]">
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* RIGHT: Tabs */}
        <div className="lg:col-span-5 bg-atlas-bg-primary flex flex-col">
          {/* Tab Headers */}
          <div className="flex border-b border-atlas-border/60 bg-atlas-bg-secondary/60 backdrop-blur-sm">
            <button
              onClick={() => setActiveTab('field-guide')}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-4 px-6 text-sm font-medium border-b-2 transition-all duration-300",
                activeTab === 'field-guide'
                  ? "border-atlas-gold text-atlas-gold"
                  : "border-transparent text-atlas-text-secondary hover:text-atlas-text-primary"
              )}
            >
              <BookOpen className="w-[18px] h-[18px]" />
              Field Guide
            </button>
            <button
              onClick={() => setActiveTab('compass-ai')}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 py-4 px-6 text-sm font-medium border-b-2 transition-all duration-300",
                activeTab === 'compass-ai'
                  ? "border-atlas-gold text-atlas-gold"
                  : "border-transparent text-atlas-text-secondary hover:text-atlas-text-primary"
              )}
            >
              <Compass className="w-[18px] h-[18px]" />
              Compass AI
            </button>
          </div>

          {/* Tab Content: Field Guide */}
          {activeTab === 'field-guide' && (
            <div className="flex-1 overflow-auto p-7 animate-fade-in">
              <div className="mb-7">
                <h3 className="font-display font-bold text-atlas-text-primary mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-atlas-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <path d="M14 2v6h6" />
                    <path d="M16 13H8" />
                    <path d="M16 17H8" />
                  </svg>
                  Summary
                </h3>
                <p className="text-sm text-atlas-text-secondary">
                  {mockFieldGuide.summary}
                </p>
              </div>

              <div className="mb-7">
                <h3 className="font-display font-bold text-atlas-text-primary mb-3 flex items-center gap-2">
                  <Key className="w-5 h-5 text-atlas-gold" />
                  Key Concepts
                </h3>
                <ul className="space-y-3">
                  {mockFieldGuide.keyConcepts.map((concept) => (
                    <li key={concept.id} className="flex items-start gap-3 text-sm">
                      <span className="w-6 h-6 rounded-lg bg-atlas-gold/8 border border-atlas-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-atlas-gold text-xs font-bold">{concept.id}</span>
                      </span>
                      <span className="text-atlas-text-secondary">{concept.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-7">
                <h3 className="font-display font-bold text-atlas-text-primary mb-3 flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-atlas-gold" />
                  Code Example
                </h3>
                <div className="code-block rounded-xl p-5 overflow-x-auto">
                  <pre className="text-xs text-atlas-text-secondary leading-relaxed font-mono">
                    <code>{mockFieldGuide.codeExample?.code}</code>
                  </pre>
                </div>
              </div>

              {mockFieldGuide.importantNote && (
                <div className="bg-atlas-gold/4 border border-atlas-gold/15 rounded-xl p-5">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-[18px] h-[18px] text-atlas-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-atlas-text-primary text-sm mb-1">{mockFieldGuide.importantNote.title}</h4>
                      <p className="text-sm text-atlas-text-secondary">{mockFieldGuide.importantNote.content}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tab Content: Compass AI */}
          {activeTab === 'compass-ai' && (
            <div className="flex-1 flex flex-col animate-fade-in">
              <div className="flex-1 overflow-auto p-7 space-y-5">
                {chatMessages.map((msg, index) => (
                  <div key={index} className={cn(
                    "flex gap-3",
                    msg.type === 'user' && "justify-end"
                  )}>
                    {msg.type === 'ai' && (
                      <div className="w-9 h-9 rounded-full bg-atlas-gold/8 border border-atlas-gold/20 flex items-center justify-center flex-shrink-0">
                        <Compass className="w-4 h-4 text-atlas-gold" />
                      </div>
                    )}
                    <div className={cn(
                      "rounded-2xl px-5 py-3.5 max-w-[85%]",
                      msg.type === 'ai' 
                        ? "chat-bubble-ai rounded-tl-sm"
                        : "chat-bubble-user rounded-tr-sm"
                    )}>
                      <p className="text-sm text-atlas-text-secondary">{msg.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-5 border-t border-atlas-border/60 bg-atlas-bg-secondary/60">
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Ask Compass about this video..."
                      className="input-glow w-full bg-atlas-bg-tertiary border border-atlas-border rounded-xl px-5 py-3.5 text-sm text-atlas-text-primary placeholder-atlas-text-muted focus:outline-none transition-all duration-300"
                    />
                  </div>
                  <button className="btn-premium w-12 h-12 bg-atlas-gold hover:bg-atlas-gold-hover rounded-xl flex items-center justify-center flex-shrink-0">
                    <Send className="w-[18px] h-[18px] text-atlas-bg-primary" />
                  </button>
                </div>
                <p className="text-xs text-atlas-text-muted mt-2.5 text-center">
                  Compass AI may produce inaccurate information. Always verify important concepts.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
