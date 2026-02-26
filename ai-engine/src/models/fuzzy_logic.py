class FuzzyLogic:
    def __init__(self):
        self.dry_threshold = 30
        self.wet_threshold = 70
        self.optimal_ph_min = 6.0
        self.optimal_ph_max = 7.0
    
    def membership_moisture(self, value):
        if value < self.dry_threshold:
            return {'dry': 1.0, 'optimal': 0.0, 'wet': 0.0}
        elif value < self.wet_threshold:
            dry_degree = (self.wet_threshold - value) / (self.wet_threshold - self.dry_threshold)
            wet_degree = (value - self.dry_threshold) / (self.wet_threshold - self.dry_threshold)
            return {'dry': dry_degree, 'optimal': 1.0 - abs(wet_degree - dry_degree), 'wet': wet_degree}
        else:
            return {'dry': 0.0, 'optimal': 0.0, 'wet': 1.0}
    
    def membership_ph(self, value):
        if value < self.optimal_ph_min:
            return {'low': 1.0, 'optimal': 0.0, 'high': 0.0}
        elif value <= self.optimal_ph_max:
            return {'low': 0.0, 'optimal': 1.0, 'high': 0.0}
        else:
            return {'low': 0.0, 'optimal': 0.0, 'high': 1.0}
    
    def infer(self, moisture, ph, water_level, time_since_rain):
        moist_mem = self.membership_moisture(moisture)
        ph_mem = self.membership_ph(ph)
        
        irrigation_score = 0.0
        
        if moist_mem['dry'] > 0.5 and ph_mem['optimal'] > 0.5:
            irrigation_score = 0.9
        elif moist_mem['dry'] > 0.3:
            irrigation_score = 0.7
        elif moist_mem['optimal'] > 0.5:
            irrigation_score = 0.2
        else:
            irrigation_score = 0.0
        
        if water_level < 20:
            irrigation_score *= 0.3
        
        if time_since_rain < 24:
            irrigation_score *= 0.5
        
        duration = int(irrigation_score * 30)
        
        return {
            'recommended': irrigation_score > 0.3,
            'duration': duration,
            'confidence': irrigation_score
        }

if __name__ == "__main__":
    fuzzy = FuzzyLogic()
    
    result = fuzzy.infer(moisture=25, ph=6.5, water_level=80, time_since_rain=48)
    print(f"Fuzzy logic result: {result}")
    
    result2 = fuzzy.infer(moisture=60, ph=6.8, water_level=50, time_since_rain=12)
    print(f"Fuzzy logic result 2: {result2}")
