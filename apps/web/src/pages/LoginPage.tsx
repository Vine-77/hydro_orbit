import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { Button, Input, Card } from '@hydro-orbit/ui';
import { useAuthStore } from '../stores/authStore';

export default function LoginPage() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      if (phone && password) {
        login(
          {
            id: '1',
            phone,
            name: 'John Doe',
            role: 'FARMER',
          },
          'mock-token'
        );
        navigate('/dashboard');
      } else {
        setError('Invalid credentials');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-cyan-50 p-4">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&q=80')] bg-cover opacity-10" />
      
      <Card className="w-full max-w-md relative">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-emerald-600">Hydro-Orbit</h1>
          <p className="text-gray-500 mt-2">Smart Irrigation System</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}

          <Input
            label="Phone Number"
            type="tel"
            placeholder="+250781234567"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button type="submit" className="w-full" loading={loading}>
            <LogIn className="w-4 h-4 mr-2" />
            Login
          </Button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          New farmer?{' '}
          <a href="#" className="text-emerald-600 hover:underline">
            Request access
          </a>
        </p>
      </Card>
    </div>
  );
}
