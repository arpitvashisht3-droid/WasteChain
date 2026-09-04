import React from 'react';
import Card, { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './Card';
import Badge from './Badge';
import QRCode from './QRCode';
import WasteTimeline from './WasteTimeline';
import { getStatusBadgeVariant, formatCurrency, formatWeight } from '../utils/formatters';
import { ShieldCheck, User, Truck, Building, Sparkles } from 'lucide-react';

export const WastePassportCard = ({ passport }) => {
  if (!passport) return null;

  const qrUrl = `https://wastechain.app/passport/${passport.id}`;

  return (
    <Card glass className="border-emerald-200 shadow-xl max-w-4xl mx-auto overflow-hidden">
      {/* Header Banner */}
      <CardHeader className="bg-gradient-to-r from-emerald-900 via-green-900 to-emerald-950 text-white p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/20 backdrop-blur-md rounded-full border border-emerald-400/30 text-emerald-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Verifiable Digital Waste Passport</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white mt-2">
              {passport.id}
            </h2>
            <p className="text-emerald-100/90 text-sm">{passport.itemTitle || passport.material}</p>
          </div>

          <Badge variant={getStatusBadgeVariant(passport.status)} showDot size="md">
            {passport.status}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-6 sm:p-8 space-y-8">
        {/* Core Material Metrics & QR Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center border-b border-slate-200 pb-8">
          {/* QR Code Container */}
          <div className="md:col-span-4 flex justify-center">
            <QRCode value={qrUrl} size={150} />
          </div>

          {/* Metric Stats Grid */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <p className="text-[11px] font-bold text-slate-400 uppercase">Material</p>
              <p className="text-base font-extrabold text-slate-900 mt-0.5">{passport.material}</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <p className="text-[11px] font-bold text-slate-400 uppercase">Weight</p>
              <p className="text-base font-extrabold text-emerald-700 mt-0.5">{formatWeight(passport.estimatedWeight)}</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <p className="text-[11px] font-bold text-slate-400 uppercase">Est. Value</p>
              <p className="text-base font-extrabold text-slate-900 mt-0.5">{formatCurrency(passport.estimatedValue)}</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <p className="text-[11px] font-bold text-slate-400 uppercase">CO₂ Avoided</p>
              <p className="text-base font-extrabold text-sky-700 mt-0.5">{passport.co2Avoided || '1.8 kg'}</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <p className="text-[11px] font-bold text-slate-400 uppercase">Created Date</p>
              <p className="text-xs font-bold text-slate-900 mt-1">{passport.createdAt?.substring(0, 10) || '2026-08-26'}</p>
            </div>

            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
              <p className="text-[11px] font-bold text-emerald-800 uppercase">Green Points</p>
              <p className="text-base font-extrabold text-emerald-700 mt-0.5">+{passport.greenPointsEarned || 140} Pts</p>
            </div>
          </div>
        </div>

        {/* Stakeholders Provenance History */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-b border-slate-200 pb-8">
          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
            <p className="text-xs font-bold text-slate-400 uppercase flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-emerald-600" /> Current Owner
            </p>
            <p className="font-extrabold text-slate-900 text-sm">{passport.owner || 'Atharv Kapoor'}</p>
            <p className="text-[11px] text-slate-500">Verified User</p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
            <p className="text-xs font-bold text-slate-400 uppercase flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-blue-600" /> Collector
            </p>
            <p className="font-extrabold text-slate-900 text-sm">{passport.collector || 'EcoCollector #12'}</p>
            <p className="text-[11px] text-slate-500">Pickup Logistics Partner</p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1">
            <p className="text-xs font-bold text-slate-400 uppercase flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-amber-600" /> Recycler
            </p>
            <p className="font-extrabold text-slate-900 text-sm">{passport.recycler || 'City EcoHub Plant #04'}</p>
            <p className="text-[11px] text-slate-500">Verified Circular Facility</p>
          </div>
        </div>

        {/* 6-Stage Timeline */}
        <WasteTimeline
          currentStageIndex={passport.currentStage ?? 3}
          timelineLogs={passport.timeline || []}
        />
      </CardContent>

      <CardFooter className="bg-slate-50 text-xs text-slate-500 flex items-center justify-between p-6">
        <span className="flex items-center gap-1.5 font-semibold text-emerald-800">
          <ShieldCheck className="w-4 h-4 text-emerald-600" /> Verified Circular Provenance Protocol
        </span>
        <span className="font-mono">URL: {qrUrl}</span>
      </CardFooter>
    </Card>
  );
};

export default WastePassportCard;
