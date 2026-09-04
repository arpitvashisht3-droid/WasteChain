import React, { useState } from 'react';
import {
  Truck,
  Plus,
  MapPin,
  Clock,
  Phone,
  User,
  CheckCircle,
  QrCode,
  ShieldCheck,
  Calendar,
  FileText,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import Card, { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';
import Modal from '../components/Modal';
import Input from '../components/Input';
import Loader from '../components/Loader';
import { useCollections } from '../hooks/useCollections';
import { useToast } from '../hooks/useToast';
import { getStatusBadgeVariant } from '../utils/formatters';

export const CollectionRequests = () => {
  const toast = useToast();
  const {
    activeRequests,
    completedRequests,
    isLoading,
    isCreating,
    error,
    createRequest,
    refetch
  } = useCollections();

  const [activeTab, setActiveTab] = useState('active'); // 'active' | 'completed'
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [wasteType, setWasteType] = useState('Plastic');
  const [quantity, setQuantity] = useState('5.0 kg');
  const [location, setLocation] = useState('');
  const [preferredTime, setPreferredTime] = useState('Today, 4:00 PM - 6:00 PM');
  const [notes, setNotes] = useState('');

  const handleCreateRequest = async (e) => {
    e.preventDefault();
    if (!location || !quantity) {
      toast.error('Please complete all required fields.');
      return;
    }

    try {
      await createRequest({
        title: `${quantity} ${wasteType} Waste`,
        category: wasteType,
        weight: quantity,
        location: location,
        contact: '+91 98765 43210',
        rewardPts: 150,
        preferredTime: preferredTime,
        notes: notes
      });

      toast.success('Collection request created successfully.');
      setIsModalOpen(false);
      setLocation('');
      setNotes('');
    } catch (err) {
      toast.error(err.message || 'Failed to create collection request.');
    }
  };

  if (isLoading) {
    return <Loader size="lg" text="Loading Collection Requests..." />;
  }

  const displayedRequests = activeTab === 'active' ? activeRequests : completedRequests;

  return (
    <div className="space-y-8 animate-fade-in pb-16 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold mb-2">
            <Truck className="w-3.5 h-3.5" />
            <span>Circular Waste Pickup Service</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Waste Collection Requests
          </h1>
          <p className="text-slate-500 text-sm">
            Schedule door-step recyclable collections and track collector dispatch status.
          </p>
        </div>

        <Button
          variant="primary"
          icon={Plus}
          onClick={() => setIsModalOpen(true)}
          className="self-start sm:self-auto shadow-md shadow-emerald-600/20"
        >
          Request Collection
        </Button>
      </div>

      {/* Tabs Filter */}
      <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab('active')}
          className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors cursor-pointer ${
            activeTab === 'active'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Active Requests ({activeRequests.length})
        </button>

        <button
          onClick={() => setActiveTab('completed')}
          className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors cursor-pointer ${
            activeTab === 'completed'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          Completed Collections ({completedRequests.length})
        </button>
      </div>

      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-center justify-between text-xs text-rose-800">
          <span>{error}</span>
          <Button variant="outline" size="sm" icon={RefreshCw} onClick={refetch}>
            Retry
          </Button>
        </div>
      )}

      {/* Request Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedRequests.length > 0 ? (
          displayedRequests.map((req) => (
            <Card key={req.id} hover className="flex flex-col">
              <CardHeader className="bg-slate-50/80 p-5">
                <div className="flex items-center justify-between">
                  <Badge variant={getStatusBadgeVariant(req.status)} showDot>
                    {req.status}
                  </Badge>
                  <span className="text-xs font-mono font-bold text-slate-400">{req.id}</span>
                </div>
                <CardTitle className="mt-2 text-base">{req.title || `${req.category} Waste`}</CardTitle>
                <CardDescription>Created: {req.timeAgo || req.createdAt?.substring(0, 10)}</CardDescription>
              </CardHeader>

              <CardContent className="flex-1 p-5 space-y-3 text-xs">
                <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
                  <span className="text-slate-500 font-medium">Waste Type & Qty:</span>
                  <span className="font-extrabold text-slate-900">{req.category} • {req.weight}</span>
                </div>

                <div className="space-y-1 text-slate-600">
                  <p className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    <span className="truncate">{req.location}</span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    <span>{req.preferredTime || 'ASAP'}</span>
                  </p>
                </div>

                {req.collector && (
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                        <Truck className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 text-xs">{req.collector}</p>
                        <p className="text-[10px] text-emerald-700">Assigned Collector</p>
                      </div>
                    </div>
                    <Badge variant="emerald" size="sm">Verified</Badge>
                  </div>
                )}
              </CardContent>

              <CardFooter className="bg-slate-50/50 p-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-bold text-emerald-700">+{req.rewardPts || 150} Green Pts</span>
                <span className="text-slate-400 text-[11px] font-mono">Passport: {req.passportId || 'WP-Linked'}</span>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full py-16 text-center bg-white rounded-2xl border border-slate-200 text-slate-400 space-y-3">
            <Truck className="w-12 h-12 text-slate-300 mx-auto" />
            <p className="text-sm font-semibold">No {activeTab} collection requests found.</p>
            <Button variant="outline" size="sm" onClick={() => setIsModalOpen(true)}>
              Schedule a New Pickup
            </Button>
          </div>
        )}
      </div>

      {/* REQUEST COLLECTION MODAL FORM */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Request Waste Collection"
        subtitle="Schedule a verified green pickup for recyclable scrap"
        size="md"
      >
        <form onSubmit={handleCreateRequest} className="space-y-4 pt-2">
          <Input
            label="Waste Type / Category"
            type="select"
            value={wasteType}
            onChange={(e) => setWasteType(e.target.value)}
            options={[
              { value: 'Plastic', label: 'Plastic (PET, HDPE, Bottles)' },
              { value: 'E-Waste', label: 'Electronics & Cables (E-Waste)' },
              { value: 'Paper', label: 'Paper & Corrugated Cardboard' },
              { value: 'Metal', label: 'Metal & Aluminum Cans' },
              { value: 'Glass', label: 'Glass Containers & Jars' }
            ]}
          />

          <Input
            label="Estimated Quantity (kg)"
            placeholder="e.g. 5.0 kg"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />

          <Input
            label="Pickup Location & Address"
            placeholder="e.g. Hostel Block B, Room 204, Campus Gate 2"
            icon={MapPin}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />

          <Input
            label="Preferred Pickup Time"
            placeholder="e.g. Today 4:00 PM - 6:00 PM"
            icon={Calendar}
            value={preferredTime}
            onChange={(e) => setPreferredTime(e.target.value)}
          />

          <Input
            label="Notes for Collector"
            multiline
            rows={2}
            placeholder="e.g. Bins kept near loading gate; call upon arrival."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="md"
              icon={Truck}
              isLoading={isCreating}
            >
              Confirm Request
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default CollectionRequests;
