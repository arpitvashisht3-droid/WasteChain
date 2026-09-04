import React from 'react';
import ReactQRCode from 'react-qr-code';
import { Copy, Check, Download } from 'lucide-react';
import { useToast } from '../hooks/useToast';

export const QRCode = ({
  value,
  size = 140,
  className = '',
  showCopy = true
}) => {
  const toast = useToast();
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    toast.success('Passport QR link copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <div className="p-3.5 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center justify-center">
        <ReactQRCode
          value={value}
          size={size}
          style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
        />
      </div>

      {showCopy && (
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied' : 'Copy Passport URL'}</span>
        </button>
      )}
    </div>
  );
};

export default QRCode;
