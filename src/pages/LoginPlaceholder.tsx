import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/common/Button';
import { Badge } from '@/components/common/Badge';

export function LoginPlaceholder() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<'super_vendor' | 'regional_vendor' | 'city_vendor' | 'local_vendor'>('super_vendor');

  const roles = [
    {
      id: 'super_vendor',
      title: 'Super Vendor',
      badge: 'Level 1 • Global Access',
      desc: 'Complete network oversight, permission delegation, compliance overrides, and full payouts.',
    },
    {
      id: 'regional_vendor',
      title: 'Regional Vendor',
      badge: 'Level 2 • Regional Hub',
      desc: 'Fleet and driver management scoped to North Region Hub and subordinate state fleets.',
    },
    {
      id: 'city_vendor',
      title: 'City Vendor',
      badge: 'Level 3 • State/City Fleet',
      desc: 'Direct dispatch and vehicle allocation for Punjab State Fleet.',
    },
    {
      id: 'local_vendor',
      title: 'Local Vendor',
      badge: 'Level 4 • Local Fleet',
      desc: 'Operate Amritsar local cabs and assigned drivers only.',
    },
  ];

  const handleContinue = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      
      {/* Background ambient decorative glow */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute inset-x-0 -top-20 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl opacity-30"
      >
        <div className="aspect-[1000/500] w-[60rem] bg-gradient-to-tr from-primary via-indigo-500 to-emerald-500" />
      </div>

      <div className="w-full max-w-md space-y-6">
        
        {/* Brand identity header */}
        <div className="text-center space-y-2">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 via-primary to-emerald-500 text-white font-black text-xl shadow-lg shadow-primary/25">
            ◈
          </div>
          <h1 className="text-2xl font-black tracking-tight text-foreground">
            CabNexus Authentication
          </h1>
          <p className="text-xs text-muted-foreground">
            Choose a mock role to evaluate role-based access control (Phase 4 engine)
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-border/80 bg-card p-6 shadow-xl space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Select Demo Role
          </div>

          <div className="space-y-2">
            {roles.map((r) => (
              <label
                key={r.id}
                className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                  selectedRole === r.id
                    ? 'border-primary bg-primary/5 text-foreground shadow-xs'
                    : 'border-border/60 hover:bg-muted/50 text-muted-foreground hover:text-foreground'
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value={r.id}
                  checked={selectedRole === r.id}
                  onChange={() => setSelectedRole(r.id as any)}
                  className="mt-1 h-4 w-4 text-primary border-border focus:ring-primary accent-primary"
                />
                <div className="space-y-0.5 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-foreground">{r.title}</span>
                    <Badge variant="secondary" className="text-[10px] py-0 px-1.5">{r.badge}</Badge>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">{r.desc}</p>
                </div>
              </label>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <Button
              onClick={handleContinue}
              className="w-full text-xs font-bold justify-center bg-primary text-primary-foreground py-2.5"
            >
              <span>Continue to Dashboard</span>
              <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
            </Button>

            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="w-full text-xs font-semibold justify-center py-2"
            >
              <ArrowLeft className="h-3.5 w-3.5 mr-1.5" />
              <span>Back to Landing Page</span>
            </Button>
          </div>
        </div>

      </div>

    </div>
  );
}

export default LoginPlaceholder;
