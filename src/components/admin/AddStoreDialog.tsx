import React, { useEffect, useState } from 'react';
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface Props {
  children: React.ReactNode;
  onCreated?: () => void;
}

type MerchantOption = {
  id: string;
  business_name: string;
  owner_email: string;
  plan?: string | null;
  outlet_limit?: number | null;
  extra_outlets?: number | null;
  active_stores?: number;
};

export default function AddStoreDialog({ children, onCreated }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [isCreating, setIsCreating] = useState(false);
  const [merchants, setMerchants] = useState<MerchantOption[]>([]);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    merchant_id: '',
    store_name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    business_type: 'restaurant',
    country: 'India',
    currency_code: 'INR',
    tax_type: 'GST',
    tax_percentage: 0,
  });

  const reset = () => {
    setFormData({
      merchant_id: '', store_name: '', email: '', password: '', phone: '', address: '',
      business_type: 'restaurant', country: 'India', currency_code: 'INR', tax_type: 'GST', tax_percentage: 0,
    });
    setStep('form');
  };

  useEffect(() => {
    if (!isOpen) return;
    (async () => {
      const { data: ms } = await supabase
        .from('merchants')
        .select('id, business_name, owner_email')
        .eq('is_active', true)
        .order('business_name');
      const list = (ms || []) as MerchantOption[];
      if (list.length === 0) { setMerchants([]); return; }

      const ids = list.map(m => m.id);
      const [{ data: subs }, { data: storeRows }] = await Promise.all([
        supabase
          .from('merchant_subscription')
          .select('merchant_id, plan_name, outlet_limit, extra_outlets, expiry_date, status')
          .in('merchant_id', ids),
        supabase
          .from('stores')
          .select('id, merchant_id')
          .in('merchant_id', ids)
          .eq('is_active', true),
      ]);

      const subMap = new Map<string, any>();
      (subs || []).forEach((s: any) => subMap.set(s.merchant_id, s));
      const countMap = new Map<string, number>();
      (storeRows || []).forEach((r: any) => countMap.set(r.merchant_id, (countMap.get(r.merchant_id) || 0) + 1));

      setMerchants(list.map(m => {
        const sub = subMap.get(m.id);
        const active = sub && sub.status === 'active' && new Date(sub.expiry_date) >= new Date();
        return {
          ...m,
          plan: active ? sub.plan_name : 'basic',
          outlet_limit: active ? (sub.outlet_limit || 1) : 1,
          extra_outlets: active ? (sub.extra_outlets || 0) : 0,
          active_stores: countMap.get(m.id) || 0,
        };
      }));
    })();
  }, [isOpen]);

  const selectedMerchant = merchants.find(m => m.id === formData.merchant_id);
  const allowedOutlets = selectedMerchant ? ((selectedMerchant.outlet_limit || 1) + (selectedMerchant.extra_outlets || 0)) : 0;
  const atLimit = selectedMerchant ? (selectedMerchant.active_stores || 0) >= allowedOutlets : false;

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.merchant_id || !formData.store_name || !formData.email || !formData.password) {
      toast({ title: 'Validation Error', description: 'Merchant, store name, email and password are required.', variant: 'destructive' });
      return;
    }
    if (formData.password.length < 6) {
      toast({ title: 'Validation Error', description: 'Password must be at least 6 characters.', variant: 'destructive' });
      return;
    }
    if (atLimit) {
      toast({
        title: 'Outlet limit reached',
        description: `${selectedMerchant?.business_name} is on the ${selectedMerchant?.plan} plan (${allowedOutlets} outlet${allowedOutlets === 1 ? '' : 's'}). Upgrade the plan or add an outlet add-on.`,
        variant: 'destructive',
      });
      return;
    }

    setIsCreating(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-store', {
        body: {
          merchant_id: formData.merchant_id,
          store_name: formData.store_name,
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
          phone: formData.phone || null,
          address: formData.address || null,
          business_type: formData.business_type,
          country: formData.country,
          currency_code: formData.currency_code,
          tax_type: formData.tax_type,
          tax_percentage: Number(formData.tax_percentage) || 0,
        },
      });
      if (error) throw new Error(error.message);
      if ((data as any)?.error) throw new Error((data as any).error);

      setStep('success');
      toast({ title: 'Success', description: 'Store created. Owner can log in with the email & password.' });
      onCreated?.();
      setTimeout(() => { setIsOpen(false); reset(); }, 1500);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unknown error';
      toast({ title: 'Creation Failed', description: msg, variant: 'destructive' });
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { setIsOpen(open); if (!open) reset(); }}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[520px] max-h-[calc(100vh-2rem)] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Store</DialogTitle>
          <DialogDescription>Create a store/outlet with its own login. Outlet count is enforced by the merchant's plan.</DialogDescription>
        </DialogHeader>

        {step === 'form' && (
          <form onSubmit={handleCreate} className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Merchant *</Label>
              <select
                required
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                value={formData.merchant_id}
                onChange={e => setFormData({ ...formData, merchant_id: e.target.value })}
              >
                <option value="">Select merchant...</option>
                {merchants.map(m => (
                  <option key={m.id} value={m.id}>
                    {m.business_name} — {m.plan} ({m.active_stores}/{(m.outlet_limit || 1) + (m.extra_outlets || 0)})
                  </option>
                ))}
              </select>
              {selectedMerchant && (
                <p className={`text-xs ${atLimit ? 'text-destructive' : 'text-muted-foreground'}`}>
                  Plan: <b>{selectedMerchant.plan}</b> · Outlets used: {selectedMerchant.active_stores}/{allowedOutlets}
                  {atLimit && ' · Limit reached. Upgrade plan or buy an outlet add-on.'}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Store Name *</Label>
                <Input required value={formData.store_name} onChange={e => setFormData({ ...formData, store_name: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Business Type *</Label>
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  value={formData.business_type}
                  onChange={e => setFormData({ ...formData, business_type: e.target.value })}
                >
                  <option value="restaurant">Restaurant</option>
                  <option value="retail">Retail</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Login Email *</Label>
                <Input type="email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="store@example.com" autoComplete="off" />
              </div>
              <div className="space-y-2">
                <Label>Password *</Label>
                <Input type="password" required minLength={6} value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} placeholder="min 6 chars" autoComplete="new-password" />
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} placeholder="9876543210" />
              </div>
              <div className="space-y-2">
                <Label>Tax %</Label>
                <Input type="number" min={0} step="0.01" value={formData.tax_percentage} onChange={e => setFormData({ ...formData, tax_percentage: Number(e.target.value) })} />
              </div>
              <div className="col-span-2 space-y-2">
                <Label>Address</Label>
                <Input value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} />
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button type="submit" disabled={isCreating || atLimit}>
                {isCreating ? 'Creating…' : 'Create Store'}
              </Button>
            </div>
          </form>
        )}

        {step === 'success' && (
          <div className="py-8 text-center text-green-600">
            <h3 className="text-xl font-bold mb-2">Store Created!</h3>
            <p className="text-sm text-muted-foreground">Owner can sign in immediately with the email & password.</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
