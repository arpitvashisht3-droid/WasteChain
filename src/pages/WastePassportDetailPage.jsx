import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Scan, RefreshCw, AlertCircle } from 'lucide-react';
import Button from '../components/Button';
import Loader from '../components/Loader';
import WastePassportCard from '../components/WastePassportCard';
import { usePassport } from '../hooks/usePassport';

export const WastePassportDetailPage = () => {
  const { id } = useParams();
  const { passport, isLoading, error, refetch } = usePassport(id);

  if (isLoading) {
    return <Loader size="lg" text="Fetching Digital Waste Passport from Registry..." />;
  }

  if (error && !passport) {
    return (
      <div className="p-8 text-center max-w-lg mx-auto bg-white rounded-2xl border border-rose-200 shadow-md space-y-4">
        <AlertCircle className="w-12 h-12 text-rose-500 mx-auto" />
        <h3 className="text-lg font-bold text-slate-900">Waste Passport Not Found</h3>
        <p className="text-xs text-slate-500">{error}</p>
        <div className="flex justify-center gap-3">
          <Button variant="outline" size="sm" icon={RefreshCw} onClick={refetch}>
            Retry
          </Button>
          <Link to="/passport">
            <Button variant="primary" size="sm">
              Back to Registry
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in pb-16 max-w-5xl mx-auto">
      {/* Top Bar Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link to="/passport">
          <Button variant="outline" size="sm" icon={ArrowLeft}>
            Back to Passports Registry
          </Button>
        </Link>

        <div className="flex items-center gap-2">
          <Link to="/collector/scan">
            <Button variant="primary" size="sm" icon={Scan}>
              Collector QR Scanner
            </Button>
          </Link>
        </div>
      </div>

      {/* Passport Card Component */}
      <WastePassportCard passport={passport} />
    </div>
  );
};

export default WastePassportDetailPage;
