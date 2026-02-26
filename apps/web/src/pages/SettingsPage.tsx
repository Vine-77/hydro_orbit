import { useState } from 'react';
import { Settings, User, Bell, Smartphone, CreditCard, Save } from 'lucide-react';
import { Card, CardHeader, CardContent, Button, Input, Badge } from '@hydro-orbit/ui';
import { useSettingsStore } from '../stores/settingsStore';

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'devices', label: 'Devices', icon: Smartphone },
  { id: 'billing', label: 'Billing', icon: CreditCard }
];

const devices = [
  { name: 'Main Controller', id: 'esp32-001', status: 'online', firmware: '1.2.0' },
  { name: 'Sensor S1', id: 's1', status: 'online', battery: '98%' }
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const { notifications, setNotifications } = useSettingsStore();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-3 bg-emerald-100 rounded-lg">
          <Settings className="w-6 h-6 text-emerald-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      </div>

      <div className="flex gap-4 border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-emerald-500 text-emerald-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'profile' && (
        <Card>
          <CardContent className="space-y-4">
            <Input label="Name" defaultValue="John Doe" />
            <Input label="Phone" type="tel" defaultValue="+250781234567" />
            <Input label="Farm Name" defaultValue="Green Valley" />
            <Input label="Location" defaultValue="Kigali" />
            <Button>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </CardContent>
        </Card>
      )}

      {activeTab === 'notifications' && (
        <Card>
          <CardContent className="space-y-4">
            <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span>SMS alerts</span>
              <input
                type="checkbox"
                checked={notifications.sms}
                onChange={(e) => setNotifications({ ...notifications, sms: e.target.checked })}
                className="w-5 h-5 text-emerald-600 rounded"
              />
            </label>
            <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span>Push notifications</span>
              <input
                type="checkbox"
                checked={notifications.push}
                onChange={(e) => setNotifications({ ...notifications, push: e.target.checked })}
                className="w-5 h-5 text-emerald-600 rounded"
              />
            </label>
            <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span>Email summary</span>
              <input
                type="checkbox"
                checked={notifications.email}
                onChange={(e) => setNotifications({ ...notifications, email: e.target.checked })}
                className="w-5 h-5 text-emerald-600 rounded"
              />
            </label>
            <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span>Critical alerts only</span>
              <input
                type="checkbox"
                checked={notifications.criticalOnly}
                onChange={(e) => setNotifications({ ...notifications, criticalOnly: e.target.checked })}
                className="w-5 h-5 text-emerald-600 rounded"
              />
            </label>
          </CardContent>
        </Card>
      )}

      {activeTab === 'devices' && (
        <Card>
          <CardContent className="space-y-4">
            {devices.map((device, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{device.name}</p>
                  <p className="text-sm text-gray-500">ID: {device.id}</p>
                  {'firmware' in device && (
                    <p className="text-sm text-gray-500">Firmware: {device.firmware}</p>
                  )}
                  {'battery' in device && (
                    <p className="text-sm text-gray-500">Battery: {device.battery}</p>
                  )}
                </div>
                <Badge variant={device.status === 'online' ? 'success' : 'danger'}>
                  {device.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {activeTab === 'billing' && (
        <Card>
          <CardContent className="space-y-4">
            <div className="p-4 bg-emerald-50 rounded-lg">
              <p className="text-sm text-emerald-600">Current Plan</p>
              <p className="text-xl font-bold text-emerald-700">Pay-As-You-Harvest</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-500">Balance</p>
              <p className="text-xl font-bold">12,500 RWF</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-2">Payment Methods</p>
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                <Smartphone className="w-5 h-5 text-gray-500" />
                <span>Mobile Money</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
