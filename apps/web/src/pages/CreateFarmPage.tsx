import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, MapPin } from 'lucide-react';
import { Button, Card, CardContent, Input } from '@hydro-orbit/ui';
import { useCreateFarm } from '../hooks/useApi';

export default function CreateFarmPage() {
  const navigate = useNavigate();
  const { mutate: createFarm, isPending: isLoading, isError } = useCreateFarm();
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [area, setArea] = useState('');
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!name || !location || !area) {
      setFormError('Please fill in all fields');
      return;
    }

    const areaNum = parseFloat(area);
    if (isNaN(areaNum) || areaNum <= 0) {
      setFormError('Please enter a valid area');
      return;
    }

    createFarm(
      { name, location, area: areaNum },
      {
        onSuccess: () => {
          navigate('/dashboard');
        },
        onError: () => {
          setFormError('Failed to create farm. Please try again.');
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardContent>
          <div className="flex items-center gap-2 mb-6">
            <Link to="/dashboard" className="text-gray-500 hover:text-gray-700">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2">
              <MapPin className="w-6 h-6 text-emerald-600" />
              <h2 className="text-2xl font-bold">Create New Farm</h2>
            </div>
          </div>

          {(formError || isError) && (
            <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm mb-4">
              {formError || 'Failed to create farm. Please try again.'}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Farm Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Green Valley Farm"
              required
            />
            <Input
              label="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Kigali, Rwanda"
              required
            />
            <Input
              label="Area (hectares)"
              type="number"
              step="0.1"
              min="0.1"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              placeholder="10.5"
              required
            />
            <Button type="submit" className="w-full" loading={isLoading}>
              Create Farm
            </Button>
          </form>

          <div className="mt-4 text-center">
            <Link to="/dashboard" className="text-sm text-gray-500 hover:text-gray-700">
              Cancel and go back
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
