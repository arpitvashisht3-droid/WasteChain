import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import {
  Navigation,
  MapPin,
  Truck,
  Building,
  Clock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';
import Loader from '../components/Loader';
import { useCollectorRoute } from '../hooks/useCollectorRoute';
import { useToast } from '../hooks/useToast';

// Fix Leaflet icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
});

export const CollectorRouteMap = () => {
  const toast = useToast();
  const {
    routeData,
    stops,
    activeStopIndex,
    isLoading,
    error,
    markStopCompleted,
    setActiveStopIndex,
    refetch
  } = useCollectorRoute();

  if (isLoading) {
    return <Loader size="lg" text="Loading AI-optimized route map & coordinates..." />;
  }

  const collectorLoc = routeData?.collectorVehicle || { lat: 28.7041, lng: 77.1025, name: 'Your Vehicle (EcoVan #04)' };
  const facility = routeData?.facility || { lat: 28.7120, lng: 77.1110, name: 'EcoHub Regional Recycling Facility' };
  const metrics = routeData?.metrics || { totalDistanceKm: 8.4, estimatedDurationMins: 22, totalWeightKg: 25.2 };

  return (
    <div className="space-y-8 animate-fade-in pb-12 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold mb-2">
            <Navigation className="w-3.5 h-3.5" />
            <span>AI Pickup Optimization</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Optimized Pickup Route Map
          </h1>
          <p className="text-slate-500 text-sm">
            AI-sequenced navigation route connecting pickup requests to regional recycling hubs.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          icon={Navigation}
          onClick={() => toast.success('Turn-by-turn navigation launched!')}
          className="shadow-md shadow-emerald-600/20 self-start sm:self-auto"
        >
          Start Navigation
        </Button>
      </div>

      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-center justify-between text-xs text-rose-800">
          <span>{error}</span>
          <Button variant="outline" size="sm" icon={RefreshCw} onClick={refetch}>
            Retry
          </Button>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4 bg-emerald-50/60 border-emerald-200">
          <p className="text-xs font-bold text-emerald-800 uppercase">Total Route Distance</p>
          <p className="text-2xl font-black text-slate-900 mt-1">{metrics.totalDistanceKm} km</p>
        </Card>
        <Card className="p-4 bg-blue-50/60 border-blue-200">
          <p className="text-xs font-bold text-blue-800 uppercase">Estimated Duration</p>
          <p className="text-2xl font-black text-slate-900 mt-1">{metrics.estimatedDurationMins} mins</p>
        </Card>
        <Card className="p-4 bg-amber-50/60 border-amber-200">
          <p className="text-xs font-bold text-amber-800 uppercase">Total Payload</p>
          <p className="text-2xl font-black text-slate-900 mt-1">{metrics.totalWeightKg} kg</p>
        </Card>
      </div>

      {/* Map & Sequence Stops Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Leaflet Map Card */}
        <div className="lg:col-span-8">
          <Card className="overflow-hidden border-slate-200 shadow-md">
            <div className="h-[460px] w-full">
              <MapContainer
                center={[collectorLoc.lat, collectorLoc.lng]}
                zoom={14}
                scrollWheelZoom={false}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Collector Marker */}
                <Marker position={[collectorLoc.lat, collectorLoc.lng]}>
                  <Popup>
                    <div className="text-xs">
                      <p className="font-extrabold text-emerald-800">{collectorLoc.name}</p>
                      <p className="text-slate-500">Live GPS Location</p>
                    </div>
                  </Popup>
                </Marker>

                {/* Stops Markers */}
                {stops.map((stop, idx) => (
                  <Marker key={stop.id} position={[stop.lat, stop.lng]}>
                    <Popup>
                      <div className="text-xs space-y-1">
                        <p className="font-bold text-slate-900">{stop.name}</p>
                        <p className="text-slate-500">{stop.weight}</p>
                        <p className="text-emerald-700 font-bold">Stop #{idx + 1}</p>
                      </div>
                    </Popup>
                  </Marker>
                ))}

                {/* Recycler Facility Marker */}
                <Marker position={[facility.lat, facility.lng]}>
                  <Popup>
                    <div className="text-xs">
                      <p className="font-bold text-blue-900">{facility.name}</p>
                      <p className="text-slate-500">Final Drop-off Destination</p>
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </Card>
        </div>

        {/* Route Stops Stepper */}
        <div className="lg:col-span-4 space-y-4">
          <Card className="p-5">
            <CardHeader className="p-0 pb-4 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Route Stops ({stops.length})</CardTitle>
                <Badge variant="emerald">Optimized</Badge>
              </div>
              <CardDescription>Follow the stop sequence to minimize emissions</CardDescription>
            </CardHeader>

            <CardContent className="p-0 pt-4 space-y-3">
              {stops.map((stop, idx) => {
                const isCurrent = idx === activeStopIndex;
                const isDone = stop.status === 'Completed';

                return (
                  <div
                    key={stop.id}
                    onClick={() => setActiveStopIndex(idx)}
                    className={`p-3.5 rounded-xl border text-xs transition-all cursor-pointer ${
                      isCurrent
                        ? 'border-emerald-500 bg-emerald-50/70 shadow-xs ring-2 ring-emerald-500/20'
                        : isDone
                        ? 'border-slate-200 bg-slate-50/60 opacity-60'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-900">Stop #{idx + 1}</span>
                      <Badge variant={isDone ? 'emerald' : isCurrent ? 'emerald' : 'slate'} size="sm">
                        {isDone ? 'Completed' : isCurrent ? 'Next Stop' : 'Pending'}
                      </Badge>
                    </div>
                    <p className="text-slate-700 font-semibold">{stop.name}</p>
                    <p className="text-slate-500 mt-0.5">{stop.address || stop.weight}</p>

                    {isCurrent && !isDone && (
                      <div className="mt-3 pt-2 border-t border-emerald-200/80 flex items-center justify-between">
                        <span className="text-[11px] font-bold text-emerald-800">{stop.weight}</span>
                        <Button
                          variant="primary"
                          size="sm"
                          icon={CheckCircle2}
                          onClick={(e) => {
                            e.stopPropagation();
                            markStopCompleted(stop.id);
                            toast.success(`Stop ${idx + 1} marked as collected!`);
                          }}
                        >
                          Mark Done
                        </Button>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Destination Facility Card */}
              <div className="p-3.5 bg-blue-50 rounded-xl border border-blue-200 text-xs">
                <div className="flex items-center gap-2 text-blue-900 font-bold mb-1">
                  <Building className="w-4 h-4 text-blue-600" />
                  <span>Final Drop-off Destination</span>
                </div>
                <p className="text-slate-700 font-semibold">{facility.name}</p>
                <p className="text-slate-500 text-[11px] mt-0.5">Automated batch scale weighing on arrival</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CollectorRouteMap;
