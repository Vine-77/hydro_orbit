#ifndef CONFIG_H
#define CONFIG_H

#define WIFI_SSID "your-ssid"
#define WIFI_PASSWORD "your-password"

#define MQTT_SERVER "192.168.1.100"
#define MQTT_PORT 1883

#define DEVICE_ID "esp32-001"

#define MOISTURE_PIN 34
#define PH_PIN 35
#define WATER_LEVEL_PIN 32
#define BATTERY_PIN 33

#define VALVE_PIN_1 25
#define VALVE_PIN_2 26
#define VALVE_PIN_3 27

#define SENSOR_READ_INTERVAL 30000UL
#define DRY_THRESHOLD 30.0
#define LOW_WATER_LEVEL 20.0

#endif
