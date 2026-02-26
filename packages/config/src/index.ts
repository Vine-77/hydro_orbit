export const config = {
  api: {
    port: parseInt(process.env.PORT || '3000', 10),
    baseUrl: process.env.API_URL || 'http://localhost:3000',
    jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
    jwtExpiresIn: '7d',
  },
  database: {
    url: process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/hydro_orbit',
  },
  redis: {
    url: process.env.REDIS_URL || 'redis://localhost:6379',
  },
  mqtt: {
    broker: process.env.MQTT_BROKER || 'mqtt://localhost:1883',
  },
  aiEngine: {
    url: process.env.AI_ENGINE_URL || 'http://ai-engine:8000',
  },
  frontend: {
    apiUrl: process.env.VITE_API_URL || 'http://localhost:3000/api',
    wsUrl: process.env.VITE_WS_URL || 'ws://localhost:3000',
  },
};
