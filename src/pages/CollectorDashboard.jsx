import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Truck,
  PackageCheck,
  DollarSign,
  CheckCircle2,
  Navigation,
  MapPin,
  Clock,
  ShieldCheck,
  QrCode,
  ArrowRight,
  AlertTriangle,
  Flame,
  Check,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import Card, { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';
import Modal from '../components/Modal';
import Loader from '../components/Loader';
import { useCollectorDashboard } from '../hooks/useCollectorDashboard';
import { useToast } from '../hooks/useToast';

export const CollectorDashboard = () => {
  const toast = useToast();
  const {
    stats,
    nearbyRequests,
    activeTask,
    isLoading,
    error,
    acceptRequest,
    updateTaskStatus,
    setActiveTask,
    refetch
  } = useCollectorDashboard();

  const [selectedDetails, setSelectedDetails] = useState(null);

  const handleAcceptPickup = async (req) => {
    try {
      await acceptRequest(req.id);
      toast.success(`Pickup request ${req.id} accepted! Added to active pickup route.`);
    } catch (err) {
      toast.error('Failed to accept pickup.');
    }
  };

  const handleAdvanceStatus = async () => {
    if (!activeTask) return;
    const stages = ['Accepted', 'On the way', 'Collected', 'Verified'];
    const currentIndex = stages.indexOf(activeTask.status || 'Accepted');
    if (currentIndex < stages.length - 1) {
      const nextStatus = stages[currentIndex + 1];
      try {
        await updateTaskStatus(activeTask.id, nextStatus);
        toast.success(`Status updated to "${nextStatus}"`);
      } catch (err) {
        toast.error('Failed to update task status.');
      }
    }
  };

  if (isLoading) {
    return <Loader size="lg" text="Loading Collector Dashboard & Nearby Pickups..." />;
  }

  const priorityBadges = {
    Urgent: 'rose',
    High: 'amber',
    Normal: 'emerald'
  };

  return (
    <div className="space-y-8 animate-fade-in pb-16 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>EcoCollector Operational Console</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Collector Dashboard
          </h1>
          <p className="text-slate-500 text-sm">
            Manage route dispatches, accept nearby collection requests, and perform QR verification handshakes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link to="/collector/scan">
            <Button variant="primary" icon={QrCode} className="shadow-md shadow-emerald-600/20">
              Scan QR Code
            </Button>
          </Link>
          <Link to="/collector/route">
            <Button variant="outline" icon={Navigation}>
              Route Map
            </Button>
          </Link>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-center justify-between text-xs text-rose-800">
          <span>{error}</span>
          <Button variant="outline" size="sm" icon={RefreshCw} onClick={refetch}>
            Retry
          </Button>
        </div>
      )}

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card hover className="p-5 border-emerald-100 bg-gradient-to-br from-emerald-50/40 to-white">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-emerald-900 uppercase">Today's Pickups</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
              <Truck className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-slate-900">{stats?.todayPickups ?? 5} Pickups</h3>
          <p className="text-xs text-slate-500 mt-1">3 Completed • 2 In Progress</p>
        </Card>

        <Card hover className="p-5 border-blue-100 bg-gradient-to-br from-blue-50/40 to-white">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-blue-900 uppercase">Total kg Collected</span>
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center">
              <PackageCheck className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-slate-900">{stats?.totalKgCollected ?? 184} kg</h3>
          <p className="text-xs text-slate-500 mt-1">Directly delivered to EcoHub</p>
        </Card>

        <Card hover className="p-5 border-amber-100 bg-gradient-to-br from-amber-50/40 to-white">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-amber-900 uppercase">Verified Earnings</span>
            <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-slate-900">₹{stats?.earnings?.toLocaleString() ?? '1,450'}</h3>
          <p className="text-xs text-slate-500 mt-1">Auto-credited to collector wallet</p>
        </Card>

        <Card hover className="p-5 border-indigo-100 bg-gradient-to-br from-indigo-50/40 to-white">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-indigo-900 uppercase">Completed Requests</span>
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-slate-900">{stats?.completedRequests ?? 28} Total</h3>
          <p className="text-xs text-slate-500 mt-1">100% QR verified handshakes</p>
        </Card>
      </div>

      {/* Active Task Progress Stepper */}
      {activeTask && (
        <Card glass className="border-emerald-200 shadow-md">
          <CardHeader className="bg-emerald-50 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="emerald" showDot>Active Pickup Task</Badge>
                <span className="text-xs font-mono font-bold text-emerald-800">{activeTask.id}</span>
              </div>
              <CardTitle className="text-lg mt-1">{activeTask.title || activeTask.type || `${activeTask.category} Pickup`}</CardTitle>
              <CardDescription>{activeTask.location} • Qty: {activeTask.weight || activeTask.quantity}</CardDescription>
            </div>

            <div className="flex items-center gap-2">
              <Link to="/collector/scan">
                <Button variant="primary" size="sm" icon={QrCode}>
                  Scan to Verify
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={handleAdvanceStatus}>
                Advance Status →
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 relative">
              {['Accepted', 'On the way', 'Collected', 'Verified'].map((stage, idx) => {
                const stages = ['Accepted', 'On the way', 'Collected', 'Verified'];
                const currentIdx = stages.indexOf(activeTask.status || 'Accepted');
                const isPassed = idx <= currentIdx;
                const isCurrent = idx === currentIdx;

                return (
                  <div key={stage} className="flex-1 flex items-center gap-3 w-full sm:w-auto">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border-2 transition-all ${
                        isPassed
                          ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs'
                          : 'bg-white border-slate-300 text-slate-400'
                      } ${isCurrent ? 'ring-4 ring-emerald-500/20' : ''}`}
                    >
                      {isPassed ? <Check className="w-4 h-4 stroke-[3]" /> : idx + 1}
                    </div>
                    <div>
                      <p className={`text-xs font-bold ${isPassed ? 'text-slate-900' : 'text-slate-400'}`}>{stage}</p>
                      {isCurrent && <span className="text-[10px] text-emerald-600 font-bold">In Progress</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Nearby Pickup Requests Feed */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Nearby Collection Requests</h2>
            <p className="text-xs text-slate-500">Pickups awaiting acceptance within your assigned campus zone</p>
          </div>
          <Badge variant="emerald">{nearbyRequests.length} Available</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nearbyRequests.map((req) => (
            <Card key={req.id} hover className="flex flex-col">
              <CardHeader className="bg-slate-50 p-5">
                <div className="flex items-center justify-between">
                  <Badge variant={priorityBadges[req.priority] || 'emerald'} size="sm">
                    {req.priority || 'Normal'} Priority
                  </Badge>
                  <span className="text-xs font-bold text-emerald-700">₹{req.estimatedValue}</span>
                </div>
                <CardTitle className="mt-2 text-base">{req.title || req.type || `${req.category} Waste`}</CardTitle>
                <CardDescription className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  <span className="truncate">{req.location}</span>
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-1 p-5 space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-2 p-2.5 bg-slate-50 rounded-xl">
                  <div>
                    <span className="text-slate-400 font-semibold uppercase">Quantity</span>
                    <p className="font-extrabold text-slate-900 mt-0.5">{req.weight || req.quantity}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold uppercase">Distance</span>
                    <p className="font-extrabold text-slate-900 mt-0.5">{req.distance || '1.0 km'}</p>
                  </div>
                </div>

                <div className="space-y-1 text-slate-500">
                  <p>User: <strong className="text-slate-800">{req.user}</strong></p>
                  <p>Contact: <strong className="text-slate-800">{req.contact || req.phone}</strong></p>
                </div>
              </CardContent>

              <CardFooter className="p-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between gap-2">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleAcceptPickup(req)}
                  className="w-full"
                >
                  Accept Pickup
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedDetails(req)}
                  className="w-full"
                >
                  Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* DETAILS MODAL */}
      <Modal
        isOpen={!!selectedDetails}
        onClose={() => setSelectedDetails(null)}
        title="Pickup Request Details"
        subtitle={`Request ID: ${selectedDetails?.id}`}
      >
        {selectedDetails && (
          <div className="space-y-4 pt-2 text-xs">
            <div className="p-4 bg-slate-50 rounded-xl space-y-2">
              <p className="font-bold text-slate-900 text-sm">{selectedDetails.title || selectedDetails.type}</p>
              <div className="grid grid-cols-2 gap-3 text-slate-700 pt-2">
                <div>
                  <span className="text-slate-400 font-semibold">Quantity:</span>
                  <p className="font-extrabold text-slate-900">{selectedDetails.weight || selectedDetails.quantity}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold">Estimated Payout:</span>
                  <p className="font-extrabold text-emerald-700">₹{selectedDetails.estimatedValue}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold">Location:</span>
                  <p className="font-bold text-slate-900">{selectedDetails.location}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold">User:</span>
                  <p className="font-bold text-slate-900">{selectedDetails.user} ({selectedDetails.contact || selectedDetails.phone})</p>
                </div>
              </div>
            </div>

            <Button
              variant="primary"
              size="md"
              onClick={() => {
                handleAcceptPickup(selectedDetails);
                setSelectedDetails(null);
              }}
              className="w-full"
            >
              Accept Pickup Request
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CollectorDashboard;
