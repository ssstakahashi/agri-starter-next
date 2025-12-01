export type WeatherCondition = 'sunny' | 'cloudy' | 'rainy' | 'snowy' | 'stormy';

export interface WeatherData {
  current: {
    temp: number;
    condition: WeatherCondition;
    humidity?: number;
    windSpeed: number;
  };
  daily: {
    date: string;
    formattedDate: string;
    dayOfWeek: string;
    condition: WeatherCondition;
    tempMax: number;
    tempMin: number;
  }[];
}

export interface WeatherRegion {
  name: string;
  prefecture: string;
  latitude: number;
  longitude: number;
}
