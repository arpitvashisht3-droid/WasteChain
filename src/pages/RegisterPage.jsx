import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf, Lock, Mail, User, ShieldCheck, CheckCircle } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';

const roles = [
  { id: 'User', label: 'Waste Producer / User', desc: 'Scan waste, request collections, trade on marketplace' },
  { id: 'Collector', label: 'Waste Collector', desc: 'Accept pickup requests & earn reward fees' },
  { id: 'Recycler', label: 'Eco Recycling Hub', desc: 'Process verified sorted waste & issue digital passports' }
];

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const toast = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('User');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error('Please complete all required fields.');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    try {
      await register({ name, email, role: selectedRole });
      toast.success('Registration successful! Welcome to WasteChain.');
      navigate('/dashboard');
    } catch (err) {
      toast.error('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3">
        <Link to="/" className="inline-flex items-center gap-2.5 group">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-green-800 flex items-center justify-center text-white shadow-lg shadow-emerald-600/30 group-hover:scale-105 transition-transform">
            <Leaf className="w-6 h-6" />
          </div>
          <span className="font-black text-2xl text-slate-900 tracking-tight">
            Waste<span className="text-emerald-600">Chain</span>
          </span>
        </Link>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Create Your WasteChain Account
        </h2>
        <p className="text-xs text-slate-500 max-w-xs mx-auto">
          Join the circular economy movement and earn Green Points
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg px-4 sm:px-0">
        <Card className="shadow-xl border-slate-200/80 p-6 sm:p-8 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              type="text"
              placeholder="Atharv Kapoor"
              icon={User}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <Input
              label="Email Address"
              type="email"
              placeholder="user@example.com"
              icon={Mail}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                icon={Lock}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <Input
                label="Confirm Password"
                type="password"
                placeholder="••••••••"
                icon={Lock}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {/* User Role Selection */}
            <div className="space-y-2 pt-1">
              <label className="text-xs font-semibold text-slate-700 tracking-wide">
                Select Your Account Role
              </label>
              <div className="space-y-2">
                {roles.map((r) => {
                  const isSelected = selectedRole === r.id;
                  return (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setSelectedRole(r.id)}
                      className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-50/70 text-emerald-950 font-bold shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                      }`}
                    >
                      <div>
                        <p className="font-bold text-slate-900">{r.label}</p>
                        <p className="text-[11px] text-slate-500 font-normal mt-0.5">{r.desc}</p>
                      </div>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-slate-300'}`}>
                        {isSelected && <CheckCircle className="w-3 h-3" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isLoading}
              className="w-full shadow-md shadow-emerald-600/20 mt-4"
            >
              Complete Registration
            </Button>
          </form>

          <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-600">
            <span>Already have an account? </span>
            <Link to="/login" className="font-bold text-emerald-700 hover:text-emerald-800">
              Log in here
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RegisterPage;
