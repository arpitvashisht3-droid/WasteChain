import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Leaf,
  Sparkles,
  Scan,
  CheckCircle,
  Truck,
  Store,
  BarChart3,
  Trophy,
  ArrowRight,
  ShieldCheck,
  QrCode,
  Recycle,
  Layers,
  Menu,
  X,
  Lock,
  Globe,
  Award,
  Zap,
  TrendingUp,
  Heart,
  ChevronRight,
  Gift,
  Repeat
} from 'lucide-react';
import Button from '../components/Button';
import Card, { CardContent } from '../components/Card';
import Badge from '../components/Badge';
import Modal from '../components/Modal';
import Input from '../components/Input';
import { useToast } from '../hooks/useToast';

export const LandingPage = () => {
  const toast = useToast();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [activeScanDemo, setActiveScanDemo] = useState(0);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const scanDemos = [
    {
      title: 'PET Bottled Plastics',
      category: 'Plastic',
      material: 'Polyethylene Terephthalate',
      recyclability: 96,
      weight: '3.5 kg',
      value: '₹98',
      pts: '+140 Pts',
      tip: 'Rinse & crush bottles before pickup for 10% bonus Green Points.'
    },
    {
      title: 'Cardboard Boxes',
      category: 'Paper',
      material: 'Kraft Fiberboard',
      recyclability: 99,
      weight: '6.2 kg',
      value: '₹87',
      pts: '+120 Pts',
      tip: 'Flatten boxes for higher transport density.'
    },
    {
      title: 'E-Waste PCB Board',
      category: 'Electronics',
      material: 'Precious Metal PCB',
      recyclability: 88,
      weight: '1.8 kg',
      value: '₹252',
      pts: '+210 Pts',
      tip: 'High concentration of copper and gold wiring.'
    }
  ];

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!loginEmail) {
      toast.error('Please enter your email.');
      return;
    }
    setIsLoggingIn(true);
    setTimeout(() => {
      setIsLoggingIn(false);
      setIsLoginModalOpen(false);
      toast.success('Logged in successfully! Welcome back to WasteChain.');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* 1. NAVBAR */}
      <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-green-800 flex items-center justify-center text-white shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
              <Leaf className="w-5.5 h-5.5" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xl text-slate-900 tracking-tight leading-none">
                Waste<span className="text-emerald-600">Chain</span>
              </span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">
                AI Circular Economy
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <a href="#hero" className="hover:text-emerald-600 transition-colors">Home</a>
            <a href="#how-it-works" className="hover:text-emerald-600 transition-colors">How It Works</a>
            <Link to="/marketplace" className="hover:text-emerald-600 transition-colors">Marketplace</Link>
            <Link to="/impact" className="hover:text-emerald-600 transition-colors">Impact</Link>
            <Link to="/leaderboard" className="hover:text-emerald-600 transition-colors">Leaderboard</Link>
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-emerald-700 transition-colors"
            >
              Login
            </button>
            <Link to="/scanner">
              <Button variant="primary" size="md" icon={Sparkles} className="shadow-md shadow-emerald-600/20">
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 animate-fade-in shadow-xl">
            <nav className="flex flex-col gap-2 font-semibold text-slate-700 text-sm">
              <a
                href="#hero"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2.5 rounded-lg hover:bg-slate-50"
              >
                Home
              </a>
              <a
                href="#how-it-works"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2.5 rounded-lg hover:bg-slate-50"
              >
                How It Works
              </a>
              <Link
                to="/marketplace"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2.5 rounded-lg hover:bg-slate-50"
              >
                Marketplace
              </Link>
              <Link
                to="/impact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2.5 rounded-lg hover:bg-slate-50"
              >
                Impact
              </Link>
              <Link
                to="/leaderboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2.5 rounded-lg hover:bg-slate-50"
              >
                Leaderboard
              </Link>
            </nav>
            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <Button
                variant="outline"
                size="md"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsLoginModalOpen(true);
                }}
                className="w-full"
              >
                Login
              </Button>
              <Link to="/scanner" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="primary" size="md" icon={Sparkles} className="w-full">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* 2. HERO SECTION */}
      <section id="hero" className="relative pt-12 sm:pt-20 pb-16 sm:pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold border border-emerald-200/80 shadow-xs">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Next-Gen Circular Economy Platform</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
                Give Your Waste a <span className="bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-800 bg-clip-text text-transparent">Second Life.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                AI-powered recycling, reuse and waste tracking for a smarter circular economy. Turn everyday recyclable materials into verifiable Green Points and eco-rewards.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link to="/scanner" className="w-full sm:w-auto">
                  <Button variant="primary" size="lg" icon={Scan} className="w-full sm:w-auto shadow-lg shadow-emerald-600/30">
                    Scan Your Waste
                  </Button>
                </Link>
                <Link to="/marketplace" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" icon={Store} className="w-full sm:w-auto">
                    Explore Marketplace
                  </Button>
                </Link>
              </div>

              <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs text-slate-500">
                <span className="flex items-center gap-1.5 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" /> Instant Vision AI
                </span>
                <span className="flex items-center gap-1.5 font-semibold">
                  <QrCode className="w-4 h-4 text-emerald-600" /> Digital Waste Passports
                </span>
              </div>
            </div>

            {/* Right Sustainability Art Visual */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-square max-w-md mx-auto rounded-3xl bg-gradient-to-br from-emerald-900 via-green-900 to-emerald-950 p-6 sm:p-8 text-white shadow-2xl overflow-hidden border border-emerald-700/40">
                {/* Glowing backdrop elements */}
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-green-500/20 rounded-full blur-3xl" />

                {/* Central Micro-Illustration Card */}
                <div className="relative z-10 h-full flex flex-col justify-between space-y-6">
                  <div className="flex items-center justify-between bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center text-white">
                        <Scan className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">AI Vision Scanner</p>
                        <p className="text-[10px] text-emerald-200">Processing PET Plastic...</p>
                      </div>
                    </div>
                    <Badge variant="emerald" size="sm">98% Match</Badge>
                  </div>

                  {/* Circular Recycling Diagram Visual */}
                  <div className="relative py-4 flex items-center justify-center">
                    <div className="w-40 h-40 rounded-full border-4 border-dashed border-emerald-400/40 flex items-center justify-center animate-pulse-glow">
                      <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-emerald-600 to-green-500 flex flex-col items-center justify-center text-center p-2 shadow-inner">
                        <Recycle className="w-8 h-8 text-white animate-spin-slow" />
                        <span className="text-[10px] font-black text-white mt-1 uppercase tracking-wider">Circular</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex items-center justify-between text-xs">
                    <div>
                      <p className="text-emerald-200 font-medium">Estimated Value</p>
                      <p className="text-base font-black text-white">₹140 / 4.5 kg</p>
                    </div>
                    <div className="text-right">
                      <p className="text-emerald-200 font-medium">Reward Pts</p>
                      <p className="text-base font-black text-emerald-400">+160 Green Pts</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TRUST/IMPACT STRIP */}
      <section className="bg-slate-900 text-white py-10 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-black text-emerald-400">10K+ kg</p>
              <p className="text-xs sm:text-sm font-medium text-slate-400">Waste Diverted</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-black text-emerald-400">2.4K+</p>
              <p className="text-xs sm:text-sm font-medium text-slate-400">Active Recyclers</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-black text-emerald-400">850+</p>
              <p className="text-xs sm:text-sm font-medium text-slate-400">Verified Collections</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-black text-emerald-400">35+</p>
              <p className="text-xs sm:text-sm font-medium text-slate-400">College & Neighborhood Communities</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section id="how-it-works" className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <Badge variant="emerald">Simple 4-Step Process</Badge>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              How WasteChain Works
            </h2>
            <p className="text-slate-500 text-sm sm:text-base">
              A transparent protocol connecting users, verified collectors, and local recyclers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: '1. Scan Waste',
                desc: 'Upload a photo of your waste item. Vision AI categorizes material type, weight, and market value.',
                icon: Scan
              },
              {
                step: '02',
                title: '2. Choose Action',
                desc: 'Request a verified collection pickup, list on marketplace for reuse, or give away for free.',
                icon: Layers
              },
              {
                step: '03',
                title: '3. Collect / Reuse',
                desc: 'Nearby collectors pick up items or peers claim reusable goods using QR handshake verification.',
                icon: Truck
              },
              {
                step: '04',
                title: '4. Track Impact',
                desc: 'Earn Green Points rewards, track digital waste passports, and watch your college rise on leaderboards.',
                icon: BarChart3
              }
            ].map((st, idx) => {
              const Icon = st.icon;
              return (
                <Card key={idx} hover className="p-6 space-y-4 relative border-slate-200">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-2xl font-black text-slate-200">{st.step}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg">{st.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">{st.desc}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. AI WASTE SCANNER SECTION */}
      <section className="py-16 sm:py-24 bg-slate-50 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <Badge variant="emerald">Computer Vision AI</Badge>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Instant AI Waste Classification
            </h2>
            <p className="text-slate-500 text-sm sm:text-base">
              Snap a photo of waste material. Our neural model identifies material purity, recyclability rating, estimated weight, and cash value.
            </p>
          </div>

          {/* Interactive Mock Scanner UI Showcase */}
          <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
            <div className="bg-slate-900 px-6 py-4 flex items-center justify-between text-white text-xs">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500" />
                <span className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="font-mono text-slate-400 ml-2">WasteChain AI Vision Scanner v2.4</span>
              </div>
              <span className="text-emerald-400 font-bold">● Camera Ready</span>
            </div>

            <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Left Selector Tabs */}
              <div className="md:col-span-5 space-y-3">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Select Sample Image</p>
                {scanDemos.map((demo, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveScanDemo(idx)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                      activeScanDemo === idx
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{demo.title}</span>
                      <Badge variant={activeScanDemo === idx ? 'emerald' : 'slate'} size="sm">
                        {demo.category}
                      </Badge>
                    </div>
                  </button>
                ))}

                <Link to="/scanner" className="block pt-2">
                  <Button variant="primary" size="md" icon={Scan} className="w-full">
                    Try Scanner Demo Live
                  </Button>
                </Link>
              </div>

              {/* Right Mock Analysis Card */}
              <div className="md:col-span-7 bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-base">{scanDemos[activeScanDemo].title}</h4>
                    <p className="text-xs text-slate-500">{scanDemos[activeScanDemo].material}</p>
                  </div>
                  <Badge variant="emerald" showDot>AI Confirmed</Badge>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Recyclability</p>
                    <p className="text-lg font-black text-emerald-600">{scanDemos[activeScanDemo].recyclability}%</p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Weight</p>
                    <p className="text-lg font-black text-slate-900">{scanDemos[activeScanDemo].weight}</p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-200">
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Est. Value</p>
                    <p className="text-lg font-black text-slate-900">{scanDemos[activeScanDemo].value}</p>
                  </div>
                </div>

                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between font-bold">
                  <span>Eco Reward</span>
                  <span>{scanDemos[activeScanDemo].pts}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. WASTE PASSPORT SECTION */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <Badge variant="emerald">Full Lifecycle Provenance</Badge>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Digital Waste Passport
            </h2>
            <p className="text-slate-500 text-sm sm:text-base">
              Every verified waste item has a traceable digital journey logged from photo upload to final recycling.
            </p>
          </div>

          {/* Timeline Visual */}
          <div className="max-w-4xl mx-auto bg-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 relative">
              {[
                { stage: 'Generated', desc: 'Waste photo registered' },
                { stage: 'AI Identified', desc: 'Material purity graded' },
                { stage: 'Collected', desc: 'Collector QR handshake' },
                { stage: 'Sorted', desc: 'Pre-processed at EcoHub' },
                { stage: 'Recycled', desc: 'Converted to raw pellets' }
              ].map((step, idx) => (
                <div key={idx} className="relative flex flex-col items-center text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-sm shadow-md ring-4 ring-slate-800">
                    {idx + 1}
                  </div>
                  <h4 className="font-bold text-white text-sm mt-2">{step.stage}</h4>
                  <p className="text-[11px] text-slate-400">{step.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-2">
                <QrCode className="w-4 h-4 text-emerald-400" />
                <span>QR Code Verification Protocol prevents greenwashing.</span>
              </span>
              <Link to="/passport">
                <Button variant="ghost" size="sm" className="text-emerald-400 hover:text-emerald-300">
                  View Registry Demo →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. MARKETPLACE SECTION */}
      <section className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <Badge variant="amber">Peer-to-Peer Reuse</Badge>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Reusable Marketplace
              </h2>
              <p className="text-slate-500 text-sm max-w-xl">
                Buy, sell, giveaway, or swap pre-loved goods directly within your campus and community.
              </p>
            </div>

            <Link to="/marketplace">
              <Button variant="outline" icon={Store}>
                Explore Marketplace
              </Button>
            </Link>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Ergonomic Study Table',
                category: 'Furniture',
                price: '₹1,800',
                condition: 'Like New',
                distance: '1.2 km away',
                img: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=600&auto=format&fit=crop&q=80',
                type: 'For Sale'
              },
              {
                title: 'Engineering Textbooks Stack',
                category: 'Books',
                price: 'FREE',
                condition: 'Good',
                distance: '0.5 km away',
                img: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&auto=format&fit=crop&q=80',
                type: 'Giveaway'
              },
              {
                title: 'Mesh Office Chair',
                category: 'Furniture',
                price: '₹1,200',
                condition: 'Excellent',
                distance: '2.4 km away',
                img: 'https://images.unsplash.com/photo-1580481072645-022f9a6d1270?w=600&auto=format&fit=crop&q=80',
                type: 'For Sale'
              },
              {
                title: 'LG 22" HD Monitor',
                category: 'Electronics',
                price: 'Swap / Exchange',
                condition: 'Great Condition',
                distance: '1.8 km away',
                img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&auto=format&fit=crop&q=80',
                type: 'Exchange'
              }
            ].map((item, idx) => (
              <Card key={idx} hover className="flex flex-col">
                <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                  <div className="absolute top-2 left-2">
                    <Badge variant="emerald" size="sm">Reuse Verified</Badge>
                  </div>
                  <div className="absolute top-2 right-2 bg-slate-900/90 text-white text-xs font-bold px-2 py-0.5 rounded-md">
                    {item.price}
                  </div>
                </div>

                <CardContent className="p-4 space-y-2 flex-1">
                  <h4 className="font-bold text-slate-900 text-sm leading-snug">{item.title}</h4>
                  <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                    <span>{item.condition}</span>
                    <span>📍 {item.distance}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 8. COMMUNITY SECTION */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <Badge variant="green">Inter-College Challenges</Badge>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Community & College Leaderboard
            </h2>
            <p className="text-slate-500 text-sm sm:text-base">
              Colleges and neighborhoods competing for monthly circular economy trophies and bonus Green Points.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { rank: '🥇 Rank 1', name: 'IIT Delhi Eco Warriors', points: '48,900 Pts', recycled: '3,450 kg' },
              { rank: '🥈 Rank 2', name: 'BITS Pilani Green Club', points: '42,100 Pts', recycled: '2,980 kg' },
              { rank: '🥉 Rank 3', name: 'DTU Sustainable Campus (Your College)', points: '38,750 Pts', recycled: '2,710 kg' }
            ].map((col, idx) => (
              <Card key={idx} hover className={`p-6 space-y-3 text-center border-2 ${idx === 2 ? 'border-emerald-500 bg-emerald-50/40' : 'border-slate-200'}`}>
                <span className="text-xs font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
                  {col.rank}
                </span>
                <h4 className="font-bold text-slate-900 text-base">{col.name}</h4>
                <div className="pt-2 flex items-center justify-around text-xs">
                  <div>
                    <p className="text-slate-400 font-medium">Recycled</p>
                    <p className="font-bold text-slate-900">{col.recycled}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 font-medium">Points</p>
                    <p className="font-bold text-emerald-700">{col.points}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Link to="/leaderboard">
              <Button variant="outline" icon={Trophy}>
                View Full Leaderboard Rankings
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 9. IMPACT SECTION */}
      <section className="py-16 sm:py-24 bg-gradient-to-br from-emerald-900 to-green-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-emerald-500/20 rounded-full text-emerald-300 text-xs font-bold">
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Real-Time Environmental Footprint</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Tangible Ecological Savings
            </h2>
            <p className="text-emerald-100/80 text-sm">
              Verified metrics calculated from all circular transactions on WasteChain.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 space-y-2">
              <p className="text-xs text-emerald-200 font-semibold uppercase">Waste Recycled</p>
              <p className="text-3xl font-black text-white">14,850 kg</p>
              <p className="text-xs text-emerald-200/80">Plastic, Paper, Glass, Metals</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 space-y-2">
              <p className="text-xs text-emerald-200 font-semibold uppercase">CO₂ Avoided</p>
              <p className="text-3xl font-black text-white">25,245 kg</p>
              <p className="text-xs text-emerald-200/80">Equivalent to planting ~1,200 trees</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 space-y-2">
              <p className="text-xs text-emerald-200 font-semibold uppercase">Landfill Diverted</p>
              <p className="text-3xl font-black text-white">14,100 kg</p>
              <p className="text-xs text-emerald-200/80">Saved city waste disposal capacity</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 space-y-2">
              <p className="text-xs text-emerald-200 font-semibold uppercase">Material Recovered</p>
              <p className="text-3xl font-black text-white">94.2%</p>
              <p className="text-xs text-emerald-200/80">Average circular purity rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. FINAL CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
            <Leaf className="w-8 h-8" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Ready to give waste a second life?
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-sm sm:text-base">
            Join thousands of students, recyclers, and eco-conscious citizens building a zero-waste future today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link to="/scanner" className="w-full sm:w-auto">
              <Button variant="primary" size="lg" icon={Scan} className="w-full sm:w-auto shadow-lg shadow-emerald-600/30">
                Start Recycling
              </Button>
            </Link>
            <Link to="/marketplace" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" icon={Store} className="w-full sm:w-auto">
                Browse Marketplace
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 11. FOOTER */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-800">
            {/* Column 1: Brand */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold">
                  <Leaf className="w-4 h-4" />
                </div>
                <span className="text-white font-bold text-base">WasteChain</span>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                AI-powered circular economy platform driving verified recycling, digital waste passports, and reusable item marketplaces.
              </p>
            </div>

            {/* Column 2: Platform Links */}
            <div className="space-y-2">
              <p className="text-white font-bold text-xs uppercase tracking-wider">Platform</p>
              <ul className="space-y-1.5 text-slate-400">
                <li><Link to="/scanner" className="hover:text-emerald-400 transition-colors">AI Waste Scanner</Link></li>
                <li><Link to="/passport" className="hover:text-emerald-400 transition-colors">Digital Waste Passports</Link></li>
                <li><Link to="/collections" className="hover:text-emerald-400 transition-colors">Collection Requests</Link></li>
                <li><Link to="/marketplace" className="hover:text-emerald-400 transition-colors">Reusable Marketplace</Link></li>
              </ul>
            </div>

            {/* Column 3: Impact & Community */}
            <div className="space-y-2">
              <p className="text-white font-bold text-xs uppercase tracking-wider">Impact & Community</p>
              <ul className="space-y-1.5 text-slate-400">
                <li><Link to="/impact" className="hover:text-emerald-400 transition-colors">ESG Impact Metrics</Link></li>
                <li><Link to="/leaderboard" className="hover:text-emerald-400 transition-colors">College Standings</Link></li>
                <li><a href="#how-it-works" className="hover:text-emerald-400 transition-colors">Protocol Specs</a></li>
              </ul>
            </div>

            {/* Column 4: Account & Login */}
            <div className="space-y-2">
              <p className="text-white font-bold text-xs uppercase tracking-wider">Account</p>
              <ul className="space-y-1.5 text-slate-400">
                <li>
                  <button onClick={() => setIsLoginModalOpen(true)} className="hover:text-emerald-400 transition-colors">
                    User Login
                  </button>
                </li>
                <li><Link to="/dashboard" className="hover:text-emerald-400 transition-colors">Dashboard Overview</Link></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <p>© {new Date().getFullYear()} WasteChain Inc. All rights reserved.</p>
            <div className="flex items-center gap-1.5 text-slate-400">
              <span>Empowering a Zero-Waste World</span>
            </div>
          </div>
        </div>
      </footer>

      {/* LOGIN MODAL */}
      <Modal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        title="Login to WasteChain"
        subtitle="Access your recycling wallet and digital waste passports"
      >
        <form onSubmit={handleLoginSubmit} className="space-y-4 pt-2">
          <Input
            label="Email Address"
            type="email"
            placeholder="user@example.com"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
            required
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            required
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={isLoggingIn}
            className="w-full shadow-md mt-4"
          >
            Log In & Access Wallet
          </Button>

          <div className="pt-2 text-center">
            <Link
              to="/dashboard"
              onClick={() => setIsLoginModalOpen(false)}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800"
            >
              Or demo directly as Guest Recycler →
            </Link>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default LandingPage;
