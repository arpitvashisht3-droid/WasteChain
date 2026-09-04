import React, { useState } from 'react';
import QRCode from 'react-qr-code';
import {
  QrCode,
  CheckCircle2,
  Clock,
  Sparkles,
  Truck,
  Layers,
  Recycle,
  Scan,
  ShieldCheck,
  Share2,
  Download,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';
import Modal from '../components/Modal';
import Loader from '../components/Loader';
import { usePassports } from '../hooks/usePassports';
import { useToast } from '../hooks/useToast';
import { formatCurrency, formatWeight, getStatusBadgeVariant } from '../utils/formatters';

const stagesList = [
  { stage: 'Generated', icon: Sparkles, desc: 'Waste photo uploaded & registered' },
  { stage: 'AI Identified', icon: Scan, desc: 'Material, weight & value analyzed' },
  { stage: 'Collection Requested', icon: Truck, desc: 'Collector assigned for pickup' },
  { stage: 'Collected', icon: CheckCircle2, desc: 'Pickup verified via QR code scan' },
  { stage: 'Sorted', icon: Layers, desc: 'Graded at regional EcoHub facility' },
  { stage: 'Recycled', icon: Recycle, desc: 'Converted to raw circular material' }
];

export const WastePassport = () => {
  const toast = useToast();
  const { passports, isLoading, error, refetch } = usePassports();
  const [selectedPassportId, setSelectedPassportId] = useState(null);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);

  if (isLoading) {
    return <Loader size="lg" text="Retrieving Digital Waste Passports..." />;
  }

  const selectedPassport = passports.find((p) => p.id === selectedPassportId) || passports[0] || null;

  return (
    <div className="space-y-8 animate-fade-in pb-16 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold mb-2">
            <QrCode className="w-3.5 h-3.5" />
            <span>Verifiable Waste Passport Registry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Digital Waste Passports
          </h1>
          <p className="text-slate-500 text-sm">
            End-to-end provenance tracking for circular materials from scan to certified recycling.
          </p>
        </div>

        {selectedPassport && (
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <Button
              variant="outline"
              size="sm"
              icon={QrCode}
              onClick={() => setIsQRModalOpen(true)}
            >
              View QR Code
            </Button>
            <Button
              variant="primary"
              size="sm"
              icon={Share2}
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                toast.success('Passport link copied to clipboard!');
              }}
              className="shadow-md shadow-emerald-600/20"
            >
              Share Provenance
            </Button>
          </div>
        )}
      </div>

      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-center justify-between text-xs text-rose-800">
          <span>{error}</span>
          <Button variant="outline" size="sm" icon={RefreshCw} onClick={refetch}>
            Retry
          </Button>
        </div>
      )}

      {/* Main Grid: Passport List & Detail Provenance */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Passport Selection Feed */}
        <div className="lg:col-span-4 space-y-4">
          <Card className="p-5">
            <CardHeader className="p-0 pb-4 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Passports ({passports.length})</CardTitle>
                <Badge variant="emerald">Live Chain</Badge>
              </div>
            </CardHeader>

            <CardContent className="p-0 pt-4 space-y-3">
              {passports.length > 0 ? (
                passports.map((p) => {
                  const isSelected = selectedPassport?.id === p.id;
                  return (
                    <div
                      key={p.id}
                      onClick={() => setSelectedPassportId(p.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-emerald-500 bg-emerald-50/70 shadow-sm ring-2 ring-emerald-500/20'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-mono text-xs font-bold text-slate-500">{p.id}</span>
                        <Badge variant={getStatusBadgeVariant(p.status)} size="sm" showDot>
                          {p.status}
                        </Badge>
                      </div>
                      <p className="font-extrabold text-slate-900 text-sm">{p.itemTitle}</p>
                      <p className="text-xs text-slate-500 mt-1">
                        {p.category} • {formatWeight(p.estimatedWeight)} • +{p.greenPointsEarned} Pts
                      </p>
                    </div>
                  );
                })
              ) : (
                <div className="py-8 text-center text-xs text-slate-400">
                  No waste passports generated yet.
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right: Selected Passport Detailed Provenance Timeline */}
        <div className="lg:col-span-8 space-y-6">
          {selectedPassport ? (
            <Card glass className="border-emerald-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-emerald-900 to-slate-900 text-white p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    <span className="text-xs font-mono font-bold tracking-widest text-emerald-300 uppercase">
                      Verifiable Eco Passport
                    </span>
                  </div>
                  <span className="px-3 py-1 bg-white/10 rounded-full font-mono font-bold text-xs text-emerald-200">
                    {selectedPassport.id}
                  </span>
                </div>

                <div className="mt-4">
                  <h2 className="text-2xl sm:text-3xl font-black">{selectedPassport.itemTitle}</h2>
                  <p className="text-emerald-200 text-xs sm:text-sm mt-1">
                    {selectedPassport.material} • Registered on {selectedPassport.createdAt?.substring(0, 10)}
                  </p>
                </div>
              </CardHeader>

              <CardContent className="p-6 sm:p-8 space-y-8">
                {/* 4 Metrics Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <div className="p-4 bg-slate-50 rounded-xl">
                    <span className="text-slate-400 font-semibold uppercase">Category</span>
                    <p className="text-base font-black text-slate-900 mt-1">{selectedPassport.category}</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl">
                    <span className="text-slate-400 font-semibold uppercase">Verified Weight</span>
                    <p className="text-base font-black text-slate-900 mt-1">{formatWeight(selectedPassport.estimatedWeight)}</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl">
                    <span className="text-slate-400 font-semibold uppercase">Est. Value</span>
                    <p className="text-base font-black text-emerald-700 mt-1">{formatCurrency(selectedPassport.estimatedValue)}</p>
                  </div>
                  <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                    <span className="text-emerald-800 font-semibold uppercase">CO₂ Avoidance</span>
                    <p className="text-base font-black text-emerald-800 mt-1">{selectedPassport.co2Avoided || '1.8 kg'}</p>
                  </div>
                </div>

                {/* 6-Stage Timeline Provenance */}
                <div className="space-y-4">
                  <h3 className="font-extrabold text-slate-900 text-base">Circular Lifecycle Provenance Timeline</h3>
                  <div className="space-y-4 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-200">
                    {stagesList.map((stg, idx) => {
                      const Icon = stg.icon;
                      const isDone = idx <= selectedPassport.currentStage;
                      const isCurrent = idx === selectedPassport.currentStage;

                      return (
                        <div key={stg.stage} className="relative flex items-start gap-4">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border-2 flex-shrink-0 z-10 transition-all ${
                              isDone
                                ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs'
                                : 'bg-white border-slate-300 text-slate-400'
                            } ${isCurrent ? 'ring-4 ring-emerald-500/20' : ''}`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>

                          <div className={`p-4 rounded-xl border flex-1 text-xs ${
                            isCurrent
                              ? 'bg-emerald-50 border-emerald-300 shadow-xs'
                              : isDone
                              ? 'bg-slate-50 border-slate-200'
                              : 'bg-white border-slate-100 opacity-60'
                          }`}>
                            <div className="flex items-center justify-between mb-1">
                              <p className="font-bold text-slate-900 text-sm">{stg.stage}</p>
                              {isCurrent && <Badge variant="emerald" size="sm" showDot>Active Stage</Badge>}
                              {isDone && !isCurrent && <Badge variant="slate" size="sm">Completed</Badge>}
                            </div>
                            <p className="text-slate-500">{stg.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Custody Information */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <span className="text-slate-400 font-semibold uppercase">Registered Owner:</span>
                    <p className="font-bold text-slate-900 mt-0.5">{selectedPassport.owner || 'Atharv Kapoor'}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold uppercase">Assigned Collector:</span>
                    <p className="font-bold text-slate-900 mt-0.5">{selectedPassport.collector || 'Awaiting Collector'}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold uppercase">Recycling Facility:</span>
                    <p className="font-bold text-slate-900 mt-0.5">{selectedPassport.recycler || 'City EcoHub Plant #04'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 text-slate-400">
              Select a passport from the registry to inspect its provenance.
            </div>
          )}
        </div>
      </div>

      {/* QR CODE MODAL */}
      {selectedPassport && (
        <Modal
          isOpen={isQRModalOpen}
          onClose={() => setIsQRModalOpen(false)}
          title="Passport QR Code Handshake"
          subtitle={`Verifiable Token: ${selectedPassport.id}`}
          size="sm"
        >
          <div className="p-6 text-center space-y-4">
            <div className="p-4 bg-white rounded-2xl border-2 border-slate-200 shadow-inner inline-block">
              <QRCode value={`https://wastechain.app/passport/${selectedPassport.id}`} size={200} />
            </div>

            <div className="text-xs text-slate-600">
              <p className="font-bold text-slate-900">{selectedPassport.itemTitle}</p>
              <p className="text-slate-500 mt-0.5">{selectedPassport.material} • {formatWeight(selectedPassport.estimatedWeight)}</p>
            </div>

            <p className="text-[11px] text-slate-400">
              Present this QR code to the verified collector during physical pickup.
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default WastePassport;
