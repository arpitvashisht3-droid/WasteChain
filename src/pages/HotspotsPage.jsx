import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import {
  AlertTriangle,
  Flame,
  CheckCircle2,
  MapPin,
  Sparkles,
  Recycle,
  Package,
  Coffee,
  RefreshCw,
  Zap,
  ClipboardList,
  AlertCircle
} from 'lucide-react';
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';
import Loader from '../components/Loader';
import { useHotspots } from '../hooks/useHotspots';

// Fix Leaflet default icons for Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png'
});

const severityConfig = {
  Critical: { color: '#EF4444', fillOpacity: 0.85, radius: 28, pulse: true },
  High:     { color: '#F97316', fillOpacity: 0.75, radius: 22, pulse: true },
  Normal:   { color: '#16A34A', fillOpacity: 0.65, radius: 16, pulse: false }
};

const SeverityIcon = ({ severity }) => {
  if (severity === 'Critical') return <Flame className="w-4 h-4 text-rose-600 fill-rose-500" />;
  if (severity === 'High') return <AlertTriangle className="w-4 h-4 text-orange-600" />;
  return <CheckCircle2 className="w-4 h-4 text-emerald-600" />;
};

const badgeVariant = { Critical: 'rose', High: 'amber', Normal: 'emerald' };

const WasteTypeIcon = ({ type }) => {
  if (type === 'plastic' || type === 'Plastic') return <Package className="w-4 h-4 text-emerald-600" />;
  if (type === 'paper' || type === 'Paper') return <Recycle className="w-4 h-4 text-amber-600" />;
  return <Coffee className="w-4 h-4 text-orange-600" />;
};

export const HotspotsPage = () => {
  const { hotspots, selectedHotspot, setSelectedHotspot, isLoading, error, refetch } = useHotspots();

  if (isLoading) {
    return <Loader size="lg" text="Simulating AI Smart-City Waste Hotspots..." />;
  }

  if (error && hotspots.length === 0) {
    return (
      <div className="p-8 text-center max-w-lg mx-auto bg-white rounded-2xl border border-rose-200 shadow-md space-y-4">
        <AlertCircle className="w-12 h-12 text-rose-500 mx-auto" />
        <h3 className="text-lg font-bold text-slate-900">Hotspots Unavailable</h3>
        <p className="text-xs text-slate-500">{error}</p>
        <Button variant="primary" icon={RefreshCw} onClick={refetch}>
          Retry
        </Button>
      </div>
    );
  }

  const mapCenter = selectedHotspot ? [selectedHotspot.lat, selectedHotspot.lng] : [28.7041, 77.1025];

  return (
    <div className="space-y-6 animate-fade-in pb-16 max-w-7xl mx-auto">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-100 text-rose-900 rounded-full text-xs font-bold">
          <Zap className="w-3.5 h-3.5" />
          <span>AI Smart-City Waste Intelligence</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          AI Waste Hotspot Monitor
        </h1>
        <p className="text-slate-500 text-sm">
          Real-time predictive heatmap of campus waste generation using AI event forecasting.
        </p>
      </div>

      {/* Status Legend */}
      <div className="flex flex-wrap items-center gap-3">
        {[
          { label: 'Normal', color: 'bg-emerald-500', desc: 'Under capacity' },
          { label: 'High', color: 'bg-orange-500', desc: 'Needs attention' },
          { label: 'Critical', color: 'bg-rose-500', desc: 'Immediate action required' }
        ].map((l) => (
          <div key={l.label} className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-xl border border-slate-200 shadow-xs text-xs font-semibold text-slate-700">
            <div className={`w-3 h-3 rounded-full ${l.color}`} />
            <span>{l.label}</span>
            <span className="text-slate-400 font-normal">{l.desc}</span>
          </div>
        ))}
        <div className="ml-auto flex items-center gap-1.5 text-xs font-semibold text-slate-500">
          <RefreshCw className="w-3.5 h-3.5 text-emerald-600 animate-spin-slow" />
          Live • Updated via AI Event Stream
        </div>
      </div>

      {/* Main Grid: Map + Detail Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT: Leaflet Map */}
        <div className="lg:col-span-7">
          <Card className="overflow-hidden border-slate-200 shadow-lg">
            <div style={{ height: '500px', width: '100%' }}>
              <MapContainer
                center={mapCenter}
                zoom={15}
                style={{ height: '100%', width: '100%' }}
                zoomControl={true}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {hotspots.map((spot) => {
                  const cfg = severityConfig[spot.severity] || severityConfig.Normal;
                  const isSelected = selectedHotspot?.id === spot.id;
                  return (
                    <CircleMarker
                      key={spot.id}
                      center={[spot.lat, spot.lng]}
                      radius={isSelected ? cfg.radius + 5 : cfg.radius}
                      pathOptions={{
                        color: cfg.color,
                        fillColor: cfg.color,
                        fillOpacity: cfg.fillOpacity,
                        weight: isSelected ? 3 : 2,
                        dashArray: spot.severity === 'Critical' ? '6 3' : undefined
                      }}
                      eventHandlers={{ click: () => setSelectedHotspot(spot) }}
                    >
                      <Tooltip direction="top" permanent={spot.severity === 'Critical'}>
                        <span className="text-xs font-bold">{spot.name} · {spot.reportedKg} kg</span>
                      </Tooltip>
                      <Popup>
                        <div className="text-xs space-y-1 min-w-[160px]">
                          <p className="font-extrabold text-slate-900">{spot.name}</p>
                          <p className="text-slate-500">Severity: <strong style={{ color: cfg.color }}>{spot.severity}</strong></p>
                          <p className="text-slate-500">Waste Reported: <strong>{spot.reportedKg} kg</strong></p>
                          <button
                            onClick={() => setSelectedHotspot(spot)}
                            className="text-emerald-700 font-bold underline mt-1 cursor-pointer"
                          >
                            View AI Prediction →
                          </button>
                        </div>
                      </Popup>
                    </CircleMarker>
                  );
                })}
              </MapContainer>
            </div>
          </Card>
        </div>

        {/* RIGHT: Detail & AI Insight Panel */}
        <div className="lg:col-span-5 space-y-4">
          {selectedHotspot ? (
            <>
              {/* Hotspot Overview Card */}
              <Card className={`border-2 ${
                selectedHotspot.severity === 'Critical' ? 'border-rose-300' :
                selectedHotspot.severity === 'High' ? 'border-orange-300' : 'border-emerald-300'
              }`}>
                <CardHeader className={`p-5 ${
                  selectedHotspot.severity === 'Critical' ? 'bg-rose-50' :
                  selectedHotspot.severity === 'High' ? 'bg-orange-50' : 'bg-emerald-50'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <SeverityIcon severity={selectedHotspot.severity} />
                      <CardTitle className="text-base">{selectedHotspot.name}</CardTitle>
                    </div>
                    <Badge variant={badgeVariant[selectedHotspot.severity]} showDot>
                      {selectedHotspot.severity}
                    </Badge>
                  </div>
                  <CardDescription>Last reported: {selectedHotspot.lastReported}</CardDescription>
                </CardHeader>

                <CardContent className="p-5 grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <p className="text-slate-400 font-bold uppercase">Waste Reported</p>
                    <p className="text-xl font-black text-slate-900 mt-0.5">{selectedHotspot.reportedKg} kg</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <p className="text-slate-400 font-bold uppercase">Most Common</p>
                    <p className="text-base font-extrabold text-slate-900 mt-0.5">{selectedHotspot.mostCommon}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <p className="text-slate-400 font-bold uppercase">Active Collectors</p>
                    <p className="text-xl font-black text-slate-900 mt-0.5">{selectedHotspot.collectors}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <p className="text-slate-400 font-bold uppercase">Collection Points</p>
                    <p className="text-xl font-black text-emerald-700 mt-0.5">{selectedHotspot.ai?.recommendedCollectionPoints || 2} Rec.</p>
                  </div>
                </CardContent>
              </Card>

              {/* AI Prediction Card */}
              {selectedHotspot.ai && (
                <Card className="border-emerald-200 shadow-md">
                  <CardHeader className="bg-gradient-to-r from-emerald-900 to-slate-900 text-white p-5">
                    <div className="flex items-center gap-2 mb-1">
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-extrabold text-emerald-300 uppercase tracking-wider">AI Prediction Engine</span>
                    </div>
                    <p className="text-sm text-white font-bold leading-snug">
                      "{selectedHotspot.ai.insight}"
                    </p>
                  </CardHeader>

                  <CardContent className="p-5 space-y-4">
                    {/* Predicted Range */}
                    <div className="flex items-center justify-between p-3 bg-slate-900 text-white rounded-xl">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">Predicted Generation</p>
                        <p className="text-slate-200 text-xs font-semibold">Event: {selectedHotspot.ai.event}</p>
                      </div>
                      <p className="text-xl font-black text-emerald-400">
                        {selectedHotspot.ai.predictedKg[0]}–{selectedHotspot.ai.predictedKg[1]} kg
                      </p>
                    </div>

                    {/* Predicted Breakdown */}
                    {selectedHotspot.ai.breakdown?.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">Predicted Waste Composition</p>
                        {selectedHotspot.ai.breakdown.map((item) => {
                          const totalPredicted = selectedHotspot.ai.predictedKg[1] || 100;
                          const pct = Math.round((item.kg / totalPredicted) * 100);
                          return (
                            <div key={item.type} className="space-y-1">
                              <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                                <div className="flex items-center gap-1.5">
                                  <WasteTypeIcon type={item.icon || item.type} />
                                  <span>Predicted {item.type}</span>
                                </div>
                                <span className="font-extrabold text-slate-900">{item.kg} kg</span>
                              </div>
                              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div
                                  className={`h-full rounded-full transition-all duration-500 ${
                                    item.type === 'Plastic' ? 'bg-emerald-500' :
                                    item.type === 'Paper' ? 'bg-amber-500' : 'bg-orange-500'
                                  }`}
                                  style={{ width: `${pct}%` }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Recommended Collection Points */}
                    <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between text-xs font-bold">
                      <span className="flex items-center gap-1.5 text-emerald-950">
                        <ClipboardList className="w-4 h-4 text-emerald-600" />
                        Recommended Collection Points
                      </span>
                      <span className="text-emerald-700 font-extrabold text-sm">
                        {selectedHotspot.ai.recommendedCollectionPoints} Points
                      </span>
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          ) : (
            <Card className="p-8 text-center text-slate-400">
              <MapPin className="w-10 h-10 mx-auto mb-3 text-slate-300" />
              <p className="text-sm font-semibold">Click a hotspot on the map to view AI prediction details</p>
            </Card>
          )}

          {/* Hotspot List for Quick Selection */}
          <Card className="border-slate-200">
            <CardHeader className="p-4">
              <CardTitle className="text-sm">All Hotspots ({hotspots.length})</CardTitle>
            </CardHeader>
            <CardContent className="p-0 divide-y divide-slate-100">
              {hotspots.map((spot) => (
                <button
                  key={spot.id}
                  onClick={() => setSelectedHotspot(spot)}
                  className={`w-full flex items-center justify-between px-4 py-3 text-left transition-colors hover:bg-slate-50 cursor-pointer ${
                    selectedHotspot?.id === spot.id ? 'bg-emerald-50 border-l-4 border-l-emerald-600' : ''
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <SeverityIcon severity={spot.severity} />
                    <div>
                      <p className="text-xs font-bold text-slate-900">{spot.name}</p>
                      <p className="text-[11px] text-slate-500">{spot.reportedKg} kg • {spot.lastReported}</p>
                    </div>
                  </div>
                  <Badge variant={badgeVariant[spot.severity]} size="sm">{spot.severity}</Badge>
                </button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HotspotsPage;
