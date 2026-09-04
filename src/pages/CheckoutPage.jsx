import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import {
  ShoppingBag,
  ArrowLeft,
  ShieldCheck,
  MapPin,
  User,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RefreshCw,
  Copy,
  Check
} from 'lucide-react';
import Card, { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import Badge from '../components/Badge';
import CheckoutSummary from '../components/CheckoutSummary';
import PaymentModal from '../components/PaymentModal';
import { paymentApi } from '../api';
import { useAuth } from '../hooks/useAuth';
import { formatCurrency } from '../utils/formatters';
import { useToast } from '../hooks/useToast';

const defaultCheckoutItem = {
  id: 'MKT-901',
  title: 'Ergonomic Wooden Study Table',
  price: 900,
  condition: 'Like New',
  seller: 'Vikram Sharma',
  images: ['https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&auto=format&fit=crop&q=80']
};

export const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const toast = useToast();
  const { user } = useAuth();

  const item = location.state?.item || defaultCheckoutItem;

  // Buyer Form State
  const [buyerName, setBuyerName] = useState(user?.name || 'Atharv Kapoor');
  const [address, setAddress] = useState(user?.location || 'Hostel Block B, Room 204, Campus');
  const [phone, setPhone] = useState('+91 98765 43210');

  // Checkout Flow States: 'initial' | 'modal' | 'success' | 'failed' | 'cancelled'
  const [checkoutState, setCheckoutState] = useState('initial');
  const [orderData, setOrderData] = useState(null);
  const [paymentResult, setPaymentResult] = useState(null);
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const [copied, setCopied] = useState(false);

  // Trigger Pay Now
  const handleInitiatePayment = async () => {
    if (!buyerName || !address) {
      toast.error('Please complete buyer name and delivery address.');
      return;
    }

    setIsCreatingOrder(true);
    try {
      const order = await paymentApi.createPaymentOrder({
        amount: item.price,
        currency: 'INR',
        itemId: item.id,
        buyer: { name: buyerName, phone, address }
      });

      setOrderData(order);
      setIsCreatingOrder(false);
      setCheckoutState('modal');
    } catch (err) {
      setIsCreatingOrder(false);
      toast.error('Failed to initiate checkout order.');
    }
  };

  const handleSelectSimulatedOutcome = async (outcome) => {
    if (outcome === 'cancelled') {
      setCheckoutState('cancelled');
      toast.info('Payment checkout was cancelled by user.');
      return;
    }

    if (outcome === 'failed') {
      setCheckoutState('failed');
      toast.error('Payment authorization failed.');
      return;
    }

    if (outcome === 'success') {
      try {
        const verifyRes = await paymentApi.verifyPayment({
          orderId: orderData.orderId,
          paymentId: `pay_RZP_${Math.floor(100000 + Math.random() * 900000)}`
        });
        setPaymentResult(verifyRes);
        setCheckoutState('success');
        toast.success('Payment verified & order completed!');
      } catch (err) {
        setCheckoutState('failed');
        toast.error('Signature verification failed.');
      }
    }
  };

  const handleCopyOrderId = () => {
    if (orderData?.orderId) {
      navigator.clipboard?.writeText(orderData.orderId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.info('Order ID copied to clipboard');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-16">
      {/* Top Breadcrumb Header */}
      <div className="flex items-center justify-between">
        <Link to="/marketplace" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Marketplace</span>
        </Link>
        <span className="text-xs font-semibold text-slate-400">Secure 256-Bit SSL Checkout</span>
      </div>

      {/* STATE 1: INITIAL CHECKOUT FORM */}
      {checkoutState === 'initial' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Buyer Information Form */}
          <div className="md:col-span-7 space-y-6">
            <Card className="p-6 space-y-4">
              <CardHeader className="p-0 border-b border-slate-100 pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <User className="w-5 h-5 text-emerald-600" />
                  Buyer & Delivery Details
                </CardTitle>
                <CardDescription>Specify campus pickup or dorm drop-off address</CardDescription>
              </CardHeader>

              <div className="space-y-4 pt-2">
                <Input
                  label="Full Name"
                  placeholder="e.g. Atharv Kapoor"
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  required
                />

                <Input
                  label="Campus Contact Number"
                  placeholder="e.g. +91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />

                <Input
                  label="Pickup Location / Hostel Address"
                  placeholder="e.g. Hostel Block B, Room 204, Campus Gate 2"
                  icon={MapPin}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>

              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center gap-3 text-xs text-emerald-900 mt-4">
                <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span>
                  WasteChain Buyer Escrow Protection: Funds are only released after item verification upon physical handover.
                </span>
              </div>
            </Card>
          </div>

          {/* Right Order Summary Column */}
          <div className="md:col-span-5 space-y-4">
            <CheckoutSummary item={item} />

            <Button
              variant="primary"
              size="lg"
              icon={ShoppingBag}
              isLoading={isCreatingOrder}
              onClick={handleInitiatePayment}
              className="w-full shadow-lg shadow-emerald-600/30"
            >
              Pay Now ({formatCurrency(item.price)})
            </Button>
          </div>
        </div>
      )}

      {/* STATE 2: PAYMENT MODAL */}
      <PaymentModal
        isOpen={checkoutState === 'modal'}
        onClose={() => setCheckoutState('cancelled')}
        orderData={orderData}
        onSelectOutcome={handleSelectSimulatedOutcome}
      />

      {/* STATE 3: PAYMENT SUCCESSFUL */}
      {checkoutState === 'success' && (
        <Card className="p-8 sm:p-12 text-center space-y-6 max-w-xl mx-auto border-emerald-200 shadow-xl">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto ring-8 ring-emerald-50">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-900">Payment Successful!</h2>
            <p className="text-xs text-slate-500">
              Your transaction has been confirmed and locked in escrow. The seller has been notified for handover.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-3 text-left">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="text-slate-400 font-semibold">Order ID:</span>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-slate-900">{orderData?.orderId || 'ORD-982401'}</span>
                <button onClick={handleCopyOrderId} className="text-slate-400 hover:text-slate-600">
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="text-slate-400 font-semibold">Amount Paid:</span>
              <span className="font-black text-emerald-700 text-sm">{formatCurrency(item.price)}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-400 font-semibold">Seller:</span>
              <span className="font-bold text-slate-800">{item.seller}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Button
              variant="primary"
              size="md"
              onClick={() => navigate('/dashboard')}
              className="w-full sm:w-auto"
            >
              View Order on Dashboard
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={() => navigate('/marketplace')}
              className="w-full sm:w-auto"
            >
              Continue Browsing
            </Button>
          </div>
        </Card>
      )}

      {/* STATE 4: PAYMENT FAILED */}
      {checkoutState === 'failed' && (
        <Card className="p-8 sm:p-12 text-center space-y-6 max-w-xl mx-auto border-rose-200 shadow-xl">
          <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center mx-auto ring-8 ring-rose-50">
            <XCircle className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-900">Payment Failed</h2>
            <p className="text-xs text-slate-500">
              The payment gateway was unable to process your transaction. No funds were debited.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Button
              variant="primary"
              size="md"
              icon={RefreshCw}
              onClick={handleInitiatePayment}
              className="w-full sm:w-auto bg-rose-600 hover:bg-rose-700"
            >
              Try Again
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={() => setCheckoutState('initial')}
              className="w-full sm:w-auto"
            >
              Review Order Details
            </Button>
          </div>
        </Card>
      )}

      {/* STATE 5: PAYMENT CANCELLED */}
      {checkoutState === 'cancelled' && (
        <Card className="p-8 sm:p-12 text-center space-y-6 max-w-xl mx-auto border-amber-200 shadow-xl">
          <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto ring-8 ring-amber-50">
            <AlertTriangle className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-900">Payment Cancelled</h2>
            <p className="text-xs text-slate-500">
              You cancelled the payment process. You can resume checkout anytime.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Button
              variant="primary"
              size="md"
              icon={ShoppingBag}
              onClick={handleInitiatePayment}
              className="w-full sm:w-auto"
            >
              Resume Payment
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={() => navigate('/marketplace')}
              className="w-full sm:w-auto"
            >
              Back to Marketplace
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default CheckoutPage;
