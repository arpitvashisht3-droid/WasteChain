import React, { useEffect, useState, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import {
  QrCode,
  CheckCircle2,
  AlertCircle,
  Camera,
  RefreshCw,
  ArrowRight,
  ShieldCheck,
  Scale,
  Sparkles
} from 'lucide-react';
import Card, { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';
import Input from '../components/Input';
import { passportApi, collectionApi } from '../api';
import { useToast } from '../hooks/useToast';
import { useNavigate } from 'react-router-dom';

export const CollectorScanPage = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const [scanState, setScanState] = useState('scanning'); // 'scanning' | 'found' | 'confirmed'
  const [cameraError, setCameraError] = useState(null);
  const [manualInputId, setManualInputId] = useState('WC-2026-00124');
  const [scannedData, setScannedData] = useState(null);
  const [actualWeight, setActualWeight] = useState('4.7 kg');
  const [isConfirming, setIsConfirming] = useState(false);

  const html5QrCodeRef = useRef(null);

  useEffect(() => {
    let html5QrCode = null;

    const startScanner = async () => {
      try {
        html5QrCode = new Html5Qrcode('qr-reader-container');
        html5QrCodeRef.current = html5QrCode;

        await html5QrCode.start(
          { facingMode: 'environment' },
          { fps: 10, qrbox: { width: 250, height: 250 } },
          (decodedText) => {
            handleSuccessfulScan(decodedText);
            if (html5QrCode?.isScanning) {
              html5QrCode.stop().catch((err) => console.error(err));
            }
          },
          () => {
            // Ignore ongoing frame noise
          }
        );
      } catch (err) {
        console.warn('Camera permission or availability note:', err);
        setCameraError('Camera access not permitted or unavailable. Use manual QR input below.');
      }
    };

    if (scanState === 'scanning') {
      startScanner();
    }

    return () => {
      if (html5QrCodeRef.current?.isScanning) {
        html5QrCodeRef.current.stop().catch((err) => console.error(err));
      }
    };
  }, [scanState]);

  const handleSuccessfulScan = async (qrValue) => {
    try {
      const result = await passportApi.verifyPassportQR(qrValue);
      const passport = result.passport || await passportApi.getPassportById(result.passportId);

      setScannedData({
        id: passport.id || result.passportId,
        wasteType: passport.material || `${passport.category} Waste`,
        expectedWeight: `${passport.estimatedWeight} kg`,
        owner: passport.owner || 'Atharv Kapoor',
        location: passport.location || 'Hostel Gate 2, Campus',
        estimatedValue: `₹${passport.estimatedValue}`,
        pts: passport.greenPointsEarned || 160
      });
      setActualWeight(`${passport.estimatedWeight} kg`);
      setScanState('found');
      toast.success('Waste Passport Found & Verified!');
    } catch (err) {
      toast.error('Unable to verify QR code. Please check passport ID.');
    }
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (!manualInputId) return;
    handleSuccessfulScan(manualInputId);
  };

  const handleConfirmCollection = async () => {
    if (!scannedData) return;
    setIsConfirming(true);
    try {
      await collectionApi.verifyCollection(scannedData.id, {
        actualWeight: actualWeight
      });
      setIsConfirming(false);
      setScanState('confirmed');
      toast.success(`Collection Verified! Actual weight logged: ${actualWeight}. +${scannedData.pts} Green Points awarded.`);
    } catch (err) {
      setIsConfirming(false);
      toast.error('Failed to log collection verification.');
    }
  };

  const handleResetScanner = () => {
    setScannedData(null);
    setCameraError(null);
    setScanState('scanning');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-16">
      {/* Header */}
      <div className="space-y-2 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold">
          <QrCode className="w-3.5 h-3.5" />
          <span>Collector QR Verification Protocol</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Collector QR Scanner
        </h1>
        <p className="text-slate-500 text-sm">
          Scan user Waste Passport QR codes at pickup point to verify handoff and confirm actual weight.
        </p>
      </div>

      {/* SCANNING STATE */}
      {scanState === 'scanning' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* HTML5 QR Code Reader Zone */}
          <div className="md:col-span-7">
            <Card className="p-6 text-center space-y-4">
              <CardHeader className="p-0 mb-4">
                <CardTitle className="text-base flex items-center justify-center gap-2">
                  <Camera className="w-5 h-5 text-emerald-600" /> Live QR Camera Feed
                </CardTitle>
                <CardDescription>Position Passport QR code inside frame</CardDescription>
              </CardHeader>

              {/* Camera Container Element */}
              <div className="relative aspect-square w-full max-w-sm mx-auto bg-slate-900 rounded-2xl overflow-hidden border-4 border-emerald-500/40 shadow-xl flex items-center justify-center">
                <div id="qr-reader-container" className="w-full h-full" />

                {cameraError && (
                  <div className="absolute inset-0 bg-slate-900/95 p-6 flex flex-col items-center justify-center text-center text-slate-300 space-y-3">
                    <AlertCircle className="w-10 h-10 text-amber-400" />
                    <p className="text-xs">{cameraError}</p>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Manual Input Fallback Card */}
          <div className="md:col-span-5 space-y-4">
            <Card className="p-6">
              <CardHeader className="p-0 pb-4 border-b border-slate-100">
                <CardTitle className="text-base">Manual ID Entry</CardTitle>
                <CardDescription>Or test with sample verified Passport ID</CardDescription>
              </CardHeader>

              <form onSubmit={handleManualSubmit} className="space-y-4 pt-4">
                <Input
                  label="Passport / Request ID"
                  placeholder="e.g. WC-2026-00124"
                  value={manualInputId}
                  onChange={(e) => setManualInputId(e.target.value)}
                  icon={QrCode}
                  required
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="w-full shadow-md"
                >
                  Verify Passport ID
                </Button>
              </form>

              <div className="mt-6 pt-4 border-t border-slate-100 space-y-2">
                <p className="text-[11px] font-bold text-slate-400 uppercase">Quick Test Passports:</p>
                {['WC-2026-00124', 'WP-892401', 'WP-892402'].map((id) => (
                  <button
                    key={id}
                    onClick={() => handleSuccessfulScan(id)}
                    className="w-full text-left p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 text-xs font-mono font-bold text-slate-700 hover:text-emerald-800 transition-colors flex items-center justify-between"
                  >
                    <span>{id}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* FOUND PASSPORT / WEIGHING CONFIRMATION STATE */}
      {scanState === 'found' && scannedData && (
        <Card glass className="border-emerald-200 shadow-xl animate-fade-in">
          <CardHeader className="bg-emerald-50 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="emerald" showDot>Waste Passport Found</Badge>
                <span className="text-xs font-mono font-bold text-emerald-800">{scannedData.id}</span>
              </div>
              <CardTitle className="text-xl mt-1">{scannedData.wasteType}</CardTitle>
              <CardDescription>Owner: {scannedData.owner} • {scannedData.location}</CardDescription>
            </div>

            <Button variant="ghost" size="sm" icon={RefreshCw} onClick={handleResetScanner}>
              Scan Another
            </Button>
          </CardHeader>

          <CardContent className="p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 bg-white rounded-xl border border-slate-200">
                <span className="text-slate-400 font-semibold uppercase">Expected Weight</span>
                <p className="text-lg font-black text-slate-900 mt-1">{scannedData.expectedWeight}</p>
              </div>

              <div className="p-4 bg-white rounded-xl border border-slate-200">
                <span className="text-slate-400 font-semibold uppercase">Estimated Value</span>
                <p className="text-lg font-black text-emerald-700 mt-1">{scannedData.estimatedValue}</p>
              </div>

              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                <span className="text-emerald-800 font-semibold uppercase">Green Points</span>
                <p className="text-lg font-black text-emerald-700 mt-1">+{scannedData.pts} Pts</p>
              </div>
            </div>

            {/* Weighing Scale Input */}
            <div className="p-5 bg-slate-50 rounded-2xl border-2 border-slate-200 space-y-4">
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-emerald-600" />
                <h3 className="font-extrabold text-slate-900 text-sm">Physical Scale Verification</h3>
              </div>

              <Input
                label="Confirm Actual Measured Weight"
                placeholder="e.g. 4.7 kg"
                value={actualWeight}
                onChange={(e) => setActualWeight(e.target.value)}
                helperText="Input the certified scale weight measured on-site."
                required
              />
            </div>

            <Button
              variant="primary"
              size="lg"
              icon={CheckCircle2}
              isLoading={isConfirming}
              onClick={handleConfirmCollection}
              className="w-full shadow-lg shadow-emerald-600/30"
            >
              Confirm Collection & Issue Green Points
            </Button>
          </CardContent>
        </Card>
      )}

      {/* CONFIRMED STATE */}
      {scanState === 'confirmed' && scannedData && (
        <Card className="p-8 sm:p-12 text-center space-y-6 max-w-xl mx-auto border-emerald-200 shadow-xl animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto ring-8 ring-emerald-50">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-900">Collection Verified!</h2>
            <p className="text-xs text-slate-500">
              The waste batch has been transferred to your custody. Waste Passport #{scannedData.id} updated to Collected.
            </p>
          </div>

          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs grid grid-cols-2 gap-3 text-left">
            <div>
              <span className="text-emerald-800 font-semibold">Passport ID:</span>
              <p className="font-mono font-bold text-slate-900">{scannedData.id}</p>
            </div>
            <div>
              <span className="text-emerald-800 font-semibold">Logged Weight:</span>
              <p className="font-bold text-slate-900">{actualWeight}</p>
            </div>
            <div>
              <span className="text-emerald-800 font-semibold">Green Points Issued:</span>
              <p className="font-bold text-emerald-700">+{scannedData.pts} Pts</p>
            </div>
            <div>
              <span className="text-emerald-800 font-semibold">Status:</span>
              <Badge variant="emerald" size="sm">Collected</Badge>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Button
              variant="primary"
              size="md"
              icon={RefreshCw}
              onClick={handleResetScanner}
              className="w-full sm:w-auto"
            >
              Scan Next Item
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={() => navigate('/collector')}
              className="w-full sm:w-auto"
            >
              Back to Collector Dashboard
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default CollectorScanPage;
