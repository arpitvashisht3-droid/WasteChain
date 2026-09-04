import React, { useState } from 'react';
import { Flame, Trophy, Award, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, FileText, RefreshCw, AlertCircle } from 'lucide-react';
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';
import Modal from '../components/Modal';
import Loader from '../components/Loader';
import { useChallenges } from '../hooks/useChallenges';
import { useToast } from '../hooks/useToast';

export const Challenges = () => {
  const toast = useToast();
  const { challenges, joinedMap, isLoading, error, joinChallenge, refetch } = useChallenges();
  const [selectedChallengeModal, setSelectedChallengeModal] = useState(null);

  const handleJoin = async (id, title) => {
    try {
      await joinChallenge(id);
      toast.success(`You joined "${title}"! Recycled waste from your scans will now count towards this challenge.`);
    } catch (err) {
      toast.error('Failed to join challenge.');
    }
  };

  if (isLoading) {
    return <Loader size="lg" text="Loading active Eco Challenges & Sprints..." />;
  }

  if (error && challenges.length === 0) {
    return (
      <div className="p-8 text-center max-w-lg mx-auto bg-white rounded-2xl border border-rose-200 shadow-md space-y-4">
        <AlertCircle className="w-12 h-12 text-rose-500 mx-auto" />
        <h3 className="text-lg font-bold text-slate-900">Challenges Unavailable</h3>
        <p className="text-xs text-slate-500">{error}</p>
        <Button variant="primary" icon={RefreshCw} onClick={refetch}>
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in pb-16 max-w-7xl mx-auto">
      {/* Header */}
      <div className="space-y-2 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-100 text-rose-900 rounded-full text-xs font-bold">
          <Flame className="w-3.5 h-3.5" />
          <span>Active Campus Eco-Sprints</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Community Challenges
        </h1>
        <p className="text-slate-500 text-sm">
          Collaborate with students and faculty to hit collective recycling milestones and unlock bonus Green Points.
        </p>
      </div>

      {/* 3 Challenge Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {challenges.map((ch) => {
          const progressPercent = Math.min(100, Math.round((ch.currentProgressKg / ch.targetKg) * 100));
          const isJoined = joinedMap[ch.id];

          return (
            <Card key={ch.id} hover className="flex flex-col border-slate-200">
              <CardHeader className="bg-slate-50 p-5">
                <div className="flex items-center justify-between">
                  <Badge variant="emerald" size="sm">{ch.category}</Badge>
                  <span className="text-[11px] font-bold text-slate-400">{ch.daysLeft || 'Active'}</span>
                </div>
                <CardTitle className="text-lg mt-2">{ch.title}</CardTitle>
                <CardDescription>Target: Recycle {ch.targetKg} {ch.unit || 'kg'}</CardDescription>
              </CardHeader>

              <CardContent className="flex-1 p-5 space-y-4 text-xs">
                {/* Progress Bar */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between font-bold text-slate-700">
                    <span>Progress ({progressPercent}%)</span>
                    <span className="font-extrabold text-slate-900">{ch.currentProgressKg} / {ch.targetKg} kg</span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-green-600 rounded-full transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Reward Callout */}
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/80 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-amber-900">
                    <Award className="w-4 h-4 text-amber-600 flex-shrink-0" />
                    <div>
                      <span className="font-extrabold text-xs block">Reward Bonus</span>
                      <span className="text-[10px] text-amber-700">{ch.badge || 'Eco Badge'}</span>
                    </div>
                  </div>
                  <span className="font-black text-amber-950 text-sm">+{ch.rewardPts} Pts</span>
                </div>
              </CardContent>

              <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex items-center gap-2">
                <Button
                  variant={isJoined ? 'secondary' : 'primary'}
                  size="sm"
                  onClick={() => handleJoin(ch.id, ch.title)}
                  className="w-full shadow-xs"
                >
                  {isJoined ? 'Joined ✓' : 'Join Challenge'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedChallengeModal(ch)}
                  className="w-full"
                >
                  View Challenge
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* CHALLENGE DETAILS MODAL */}
      {selectedChallengeModal && (
        <Modal
          isOpen={!!selectedChallengeModal}
          onClose={() => setSelectedChallengeModal(null)}
          title={selectedChallengeModal.title}
          subtitle={`Campus Sustainability Sprint • ${selectedChallengeModal.daysLeft}`}
          size="md"
        >
          <div className="space-y-4 pt-2 text-xs">
            <p className="text-slate-600 leading-relaxed text-sm">
              {selectedChallengeModal.description}
            </p>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-semibold uppercase">Category</span>
                <Badge variant="emerald">{selectedChallengeModal.category}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-semibold uppercase">Sprint Goal</span>
                <span className="font-extrabold text-slate-900">{selectedChallengeModal.targetKg} kg</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-semibold uppercase">Current Progress</span>
                <span className="font-extrabold text-emerald-700">{selectedChallengeModal.currentProgressKg} kg</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-semibold uppercase">Completion Bonus</span>
                <span className="font-black text-amber-700">+{selectedChallengeModal.rewardPts} Green Points</span>
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              onClick={() => {
                handleJoin(selectedChallengeModal.id, selectedChallengeModal.title);
                setSelectedChallengeModal(null);
              }}
              className="w-full shadow-md"
            >
              {joinedMap[selectedChallengeModal.id] ? 'Already Joined ✓' : 'Confirm & Join Challenge'}
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Challenges;
