import React from 'react';
import Card, { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './Card';
import Button from './Button';
import Badge from './Badge';
import { formatCurrency } from '../utils/formatters';
import { ShieldCheck, CreditCard, Sparkles } from 'lucide-react';

export const CheckoutSummary = ({ item, onPayNow, isProcessing }) => {
  if (!item) return null;

  const itemPrice = item.price || 900;
  const platformFee = 0; // Free for circular economy platform
  const greenDiscount = 50; // Discount applied via Green Points
  const totalAmount = Math.max(0, itemPrice + platformFee - greenDiscount);

  return (
    <Card glass className="border-emerald-200 shadow-xl">
      <CardHeader className="bg-emerald-50">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Order Summary</CardTitle>
          <Badge variant="emerald">Eco Checkout</Badge>
        </div>
        <CardDescription>Verified circular marketplace transaction</CardDescription>
      </CardHeader>

      <CardContent className="p-6 space-y-4 text-xs">
        {/* Item snippet */}
        <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
          <img
            src={item.images?.[0] || 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400&auto=format&fit=crop&q=80'}
            alt={item.title}
            className="w-14 h-14 rounded-xl object-cover border border-slate-200 flex-shrink-0"
          />
          <div>
            <h4 className="font-extrabold text-slate-900 text-sm leading-snug">{item.title}</h4>
            <p className="text-slate-500">Condition: {item.condition || 'Like New'}</p>
          </div>
        </div>

        {/* Pricing breakdown */}
        <div className="space-y-2.5">
          <div className="flex justify-between text-slate-600">
            <span>Item Subtotal</span>
            <span className="font-bold text-slate-900">{formatCurrency(itemPrice)}</span>
          </div>

          <div className="flex justify-between text-slate-600">
            <span>Circular Platform Fee</span>
            <span className="font-bold text-emerald-600">FREE (₹0)</span>
          </div>

          <div className="flex justify-between text-emerald-800 font-medium bg-emerald-50 p-2 rounded-lg">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Green Points Reward Discount
            </span>
            <span className="font-extrabold text-emerald-700">- {formatCurrency(greenDiscount)}</span>
          </div>

          <div className="flex justify-between items-baseline pt-3 border-t border-slate-200 text-sm">
            <span className="font-extrabold text-slate-900">Total Payable</span>
            <span className="text-xl font-black text-emerald-700">{formatCurrency(totalAmount)}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-6 bg-slate-50 flex flex-col gap-3">
        <Button
          variant="primary"
          size="lg"
          icon={CreditCard}
          isLoading={isProcessing}
          onClick={onPayNow}
          className="w-full shadow-md"
        >
          Pay Now ({formatCurrency(totalAmount)})
        </Button>

        <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Razorpay / Cashfree Test Gateway Simulation</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CheckoutSummary;
