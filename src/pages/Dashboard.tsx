import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { ExpeditionCard } from "@/components/dashboard/ExpeditionCard";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { LearningTips } from "@/components/dashboard/LearningTips";
import { NewExpeditionModal } from "@/components/modals/NewExpeditionModal";
import { mockExpeditions, mockActivities } from "@/data/mockData";

export default function Dashboard() {
  const navigate = useNavigate();
  const [expeditions, setExpeditions] = useState(mockExpeditions);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateExpedition = (playlistUrl: string, name?: string) => {
    console.log("Creating expedition:", { playlistUrl, name });
    const newExpedition = {
      id: String(expeditions.length + 1),
      title: name || "New Expedition",
      thumbnailGradient: "from-indigo-900/40 to-blue-900/20",
      waypoints: 10,
      completedWaypoints: 0,
      progress: 0,
      isNew: true,
    };
    setExpeditions([newExpedition, ...expeditions]);
  };

  const handleDeleteExpedition = (id: string) => {
    setExpeditions(expeditions.filter(e => e.id !== id));
  };

  const isEmpty = expeditions.length === 0;

  return (
    <AppLayout showFooter={true}>
      {isEmpty ? (
        <EmptyState onCreateExpedition={() => setIsModalOpen(true)} />
      ) : (
        <div className="flex-1 flex flex-col animate-fade-in">
          {/* Header Section — Radical whitespace (1.5x padding) */}
          <div className="px-10 py-10 md:px-14 lg:px-20">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div>
                <h1 className="font-display font-bold text-3xl md:text-4xl text-atlas-text-primary">
                  Your Expeditions
                </h1>
                <p className="text-atlas-text-secondary mt-2 text-base">
                  Transform YouTube playlists into structured learning journeys
                </p>
              </div>

              {/* Primary CTA — Must "pop" with glow */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="btn-premium group flex items-center gap-3 bg-atlas-gold hover:bg-atlas-gold-hover text-atlas-bg-primary font-semibold px-7 py-3.5 rounded-xl"
              >
                <Plus className="w-5 h-5" />
                <span>Start New Expedition</span>
              </button>
            </div>
          </div>

          {/* Content Container — Generous spacing */}
          <div className="flex-1 px-10 md:px-14 lg:px-20 pb-10">
            {/* Expedition Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
              {expeditions.map((expedition, i) => (
                <div key={expedition.id} className="animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
                  <ExpeditionCard
                    expedition={expedition}
                    onClick={() => navigate(`/expedition/${expedition.id}`)}
                    onDelete={() => handleDeleteExpedition(expedition.id)}
                  />
                </div>
              ))}
            </div>

            {/* Info Section — Whitespace separation, no borders between sections */}
            <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-7">
              <RecentActivity activities={mockActivities} />
              <LearningTips />
            </div>
          </div>
        </div>
      )}

      <NewExpeditionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateExpedition}
      />
    </AppLayout>
  );
}
