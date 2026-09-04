import React, { useState } from 'react';
import {
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Smartphone,
  Landmark,
  X,
  Lock
} from 'lucide-react';
import Modal from './Modal';
import Button from './Button';
import Badge from './Badge';
import { formatCurrency } from '../utils/formatters';

export const PaymentModal = ({
  isOpen,
  onClose,
  orderOptions = {},
  onSuccess,
  onFailure,
  onCancel
}) => {
  const [selectedMethod, setSelectedMethod] = useState('upi'); // 'upi' | 'card' | 'netbanking'
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const { orderId = 'order_MOCK_982401', amount = 850, itemName = 'Reusable Item' } = orderOptions;

  const handleSimulateSuccess = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onSuccess({
        orderId,
        paymentId: `pay_MOCK_${Math.floor(100000 + Math.random() * 900000)}`,
        signature: 'sig_MOCK_VERIFIED_77102'
      });
    }, 600);
  };

  const handleSimulateFailure = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onFailure({
        code: 'PAYMENT_FAILED',
        description: 'Transaction declined by issuing bank (Test Simulation).'
      });
    }, 600);
  };

  const handleSimulateCancel = () => {
    onCancel();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleSimulateCancel}
      title="WasteChain Secure Payment Gateway"
      subtitle="Razorpay / Cashfree Test API Simulation Window"
      size="md"
    >
      <div className="space-y-6 pt-2 text-xs">
        {/* Order Details Header */}
        <div className="p-4 bg-slate-900 text-white rounded-2xl flex items-center justify-between shadow-md">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase">Order: {orderId}</span>
            <h4 className="font-extrabold text-white text-sm mt-0.5">{itemName}</h4>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-emerald-400 font-bold uppercase">Total Payable</span>
            <p className="text-lg font-black text-white">{formatCurrency(amount)}</p>
          </div>
        </div>

        {/* Payment Method Tabs */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Select Payment Method
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'upi', label: 'UPI / GPay', icon: Smartphone },
              { id: 'card', label: 'Card', icon: CreditCard },
              { id: 'netbanking', label: 'NetBanking', icon: Landmark }
            ].map((m) => {
              const Icon = m.icon;
              const isSelected = selectedMethod === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setSelectedMethod(m.id)}
                  className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-950 shadow-xs'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-4 h-4 text-emerald-600" />
                  <span>{m.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Test Simulation Controls Box */}
        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200/80 space-y-3">
          <div className="flex items-center gap-1.5 text-amber-900 font-bold">
            <ShieldCheck className="w-4 h-4 text-amber-600" />
            <span>Test API Simulation Triggers</span>
          </div>
          <p className="text-amber-800 text-[11px]">
            Test all payment states before production backend API integration:
          </p>

          <div className="flex flex-col gap-2 pt-1">
            <Button
              variant="primary"
              size="sm"
              icon={CheckCircle2}
              isLoading={isProcessing}
              onClick={handleSimulateSuccess}
              className="w-full justify-center bg-emerald-600 hover:bg-emerald-700 shadow-sm"
            >
              Simulate Payment Successful
            </Button>

            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="danger"
                size="sm"
                icon={XCircle}
                disabled={isProcessing}
                onClick={handleSimulateFailure}
                className="w-full justify-center text-xs"
              >
                Simulate Payment Failed
              </Button>

              <Button
                variant="outline"
                size="sm"
                icon={AlertTriangle}
                disabled={isProcessing}
                onClick={handleSimulateCancel}
                className="w-full justify-center text-xs"
              >
                Simulate Cancelled
              </Button>
            </div>
          </div>
        </div>

        <div className="text-center text-[10px] text-slate-400 flex items-center justify-center gap-1 pt-1">
          <Lock className="w-3 h-3 text-emerald-600" />
          <span>256-bit Encrypted Test Payment Handshake</span>
        </div>
      </div>
    </Modal>
  );
};

export default PaymentModal;
