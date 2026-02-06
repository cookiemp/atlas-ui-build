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
    // In real app, this would create the expedition
    console.log("Creating expedition:", { playlistUrl, name });
    // Add a new mock expedition
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
        <div className="flex-1 flex flex-col">
          {/* Header Section */}
          <div className="px-8 py-8 md:px-12 lg:px-16">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="font-display font-bold text-3xl md:text-4xl text-atlas-text-primary tracking-tight">
                  Your Expeditions
                </h1>
                <p className="text-atlas-text-secondary mt-1.5 text-base">
                  Transform YouTube playlists into structured learning journeys
                </p>
              </div>

              {/* CTA Button */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="group flex items-center gap-3 bg-atlas-gold hover:bg-atlas-gold-hover text-atlas-bg-primary font-semibold px-6 py-3 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-atlas-gold/20 hover:-translate-y-0.5"
              >
                <Plus className="w-5 h-5" />
                <span>Start New Expedition</span>
              </button>
            </div>
          </div>

          {/* Content Container */}
          <div className="flex-1 px-8 md:px-12 lg:px-16 pb-8">
            {/* Expedition Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {expeditions.map((expedition) => (
                <ExpeditionCard
                  key={expedition.id}
                  expedition={expedition}
                  onClick={() => navigate(`/expedition/${expedition.id}`)}
                  onDelete={() => handleDeleteExpedition(expedition.id)}
                />
              ))}
            </div>

            {/* Info Section */}
            <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
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
