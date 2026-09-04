import React, { useState, useEffect } from 'react';
import { User, Mail, Shield, Award, Leaf, CheckCircle2, Save, LogOut } from 'lucide-react';
import Card, { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import Badge from '../components/Badge';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';
import { useNavigate } from 'react-router-dom';

export const Profile = () => {
  const { user, updateUserProfile, logout } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || 'Atharv Kapoor');
  const [email, setEmail] = useState(user?.email || 'atharv@wastechain.org');
  const [role, setRole] = useState(user?.role || 'User');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setRole(user.role || 'User');
    }
  }, [user]);

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateUserProfile({ name, email, role });
      toast.success('Profile settings updated successfully!');
    } catch (err) {
      toast.error('Failed to update profile settings.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogoutClick = async () => {
    try {
      await logout();
      toast.info('Logged out from WasteChain.');
      navigate('/login');
    } catch (err) {
      navigate('/login');
    }
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12 max-w-4xl mx-auto">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold">
          <User className="w-3.5 h-3.5" />
          <span>User Account & Wallet</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Recycler Profile Settings
        </h1>
        <p className="text-slate-500 text-sm">
          Manage your account profile, role preferences, and Green Points wallet credentials.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Profile Card Summary */}
        <div className="md:col-span-4 space-y-6">
          <Card className="p-6 text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-600 to-green-800 text-white flex items-center justify-center font-black text-2xl mx-auto ring-4 ring-emerald-500/20">
              {user?.avatar || (user?.name ? user.name.substring(0, 2).toUpperCase() : 'WC')}
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg">{user?.name || 'Community Recycler'}</h3>
              <p className="text-xs text-slate-500">{user?.email || 'user@wastechain.org'}</p>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Badge variant="emerald" showDot>{user?.tier || 'Gold Recycler'}</Badge>
              <Badge variant="slate">{user?.role || 'User'}</Badge>
            </div>

            <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-2 text-center text-xs">
              <div className="p-2.5 bg-slate-50 rounded-xl">
                <p className="text-slate-400 font-semibold uppercase">Green Pts</p>
                <p className="font-black text-emerald-700 text-base">{user?.greenPoints ?? 840}</p>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl">
                <p className="text-slate-400 font-semibold uppercase">Recycled</p>
                <p className="font-black text-slate-900 text-base">{user?.recycledKg ?? 42.8} kg</p>
              </div>
            </div>

            <Button
              variant="danger"
              size="md"
              icon={LogOut}
              onClick={handleLogoutClick}
              className="w-full mt-2"
            >
              Log Out
            </Button>
          </Card>
        </div>

        {/* Edit Profile Form */}
        <div className="md:col-span-8">
          <Card>
            <CardHeader>
              <CardTitle>Account Details</CardTitle>
              <CardDescription>Update your personal information and roles</CardDescription>
            </CardHeader>
            <form onSubmit={handleSave}>
              <CardContent className="space-y-4">
                <Input
                  label="Full Name"
                  type="text"
                  icon={User}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />

                <Input
                  label="Email Address"
                  type="email"
                  icon={Mail}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <Input
                  label="Platform Role"
                  type="select"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  options={[
                    { value: 'User', label: 'User / Waste Producer' },
                    { value: 'Collector', label: 'Waste Collector' },
                    { value: 'Recycler', label: 'Eco Recycling Hub' }
                  ]}
                />
              </CardContent>
              <CardFooter>
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  icon={Save}
                  isLoading={isSaving}
                  className="shadow-md"
                >
                  Save Profile Changes
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
