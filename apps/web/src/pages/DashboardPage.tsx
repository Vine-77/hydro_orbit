import { Sun, Droplet, Gauge, TestTube, Clock, TrendingDown, Hand, Map, Activity, AlertTriangle, AlertOctagon } from 'lucide-react';
import { Card, CardHeader, CardContent, Badge } from '@hydro-orbit/ui';

const summaryCards = [
  { title: 'Soil Moisture', value: '32%', icon: Droplet, color: 'blue', trend: 'down', status: 'normal' },
  { title: 'Water Level', value: '1,200 L', icon: Gauge, color: 'cyan', status: 'good' },
  { title: 'pH Level', value: '6.8', icon: TestTube, color: 'green', status: 'optimal' },
  { title: 'Last Irrigation', value: '2 hours ago', icon: Clock, color: 'gray' }
];

const recentAlerts = [
  { message: 'Low water level in Tank B', time: '10 min ago', severity: 'warning', icon: AlertTriangle },
  { message: 'pH imbalance detected in Zone 3', time: '1 hour ago', severity: 'critical', icon: AlertOctagon }
];

export default function DashboardPage() {
  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Sun className="w-8 h-8 text-amber-500" />
        <h1 className="text-2xl font-bold text-gray-900">{greeting()}, John!</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((card) => (
          <Card key={card.title}>
            <CardContent className="flex items-center gap-4">
              <div className={`p-3 rounded-lg bg-${card.color}-100`}>
                <card.icon className={`w-6 h-6 text-${card.color}-600`} />
              </div>
              <div>
                <p className="text-sm text-gray-500">{card.title}</p>
                <p className="text-xl font-semibold text-gray-900">{card.value}</p>
              </div>
              {card.trend && (
                <TrendingDown className="w-4 h-4 text-red-500 ml-auto" />
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader title="Soil Moisture Trend (Last 24h)" icon={<TrendingDown className="w-5 h-5" />} />
        <CardContent>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <p className="text-gray-400">Chart visualization</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader title="Quick Actions" />
          <CardContent className="flex gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 p-4 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100">
              <Hand className="w-5 h-5" />
              <span>Manual Water</span>
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 p-4 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100">
              <Map className="w-5 h-5" />
              <span>View Farm</span>
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 p-4 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100">
              <Activity className="w-5 h-5" />
              <span>Sensors</span>
            </button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Recent Alerts" />
          <CardContent className="space-y-3">
            {recentAlerts.map((alert, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <alert.icon className={`w-5 h-5 mt-0.5 ${
                  alert.severity === 'critical' ? 'text-red-500' : 'text-yellow-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{alert.message}</p>
                  <p className="text-xs text-gray-500">{alert.time}</p>
                </div>
                <Badge variant={alert.severity === 'critical' ? 'danger' : 'warning'}>
                  {alert.severity}
                </Badge>
              </div>
            ))}
            <a href="/dashboard/alerts" className="block text-center text-sm text-emerald-600 hover:underline mt-2">
              View all alerts
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
