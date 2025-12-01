import type { WeatherCondition, WeatherData } from '../types/weather';

/**
 * Open-Meteoの天気コードを天気状態に変換
 * @see https://open-meteo.com/en/docs
 */
export const weatherCodeToCondition = (code: number): WeatherCondition => {
  // 0: 晴れ
  if (code === 0) return 'sunny';

  // 1-3: 晴れ時々曇り、曇り
  if (code >= 1 && code <= 3) return 'cloudy';

  // 45-48: 霧
  if (code >= 45 && code <= 48) return 'cloudy';

  // 51-67: 雨
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return 'rainy';

  // 71-77, 85-86: 雪
  if ((code >= 71 && code <= 77) || (code >= 85 && code <= 86)) return 'snowy';

  // 95-99: 雷雨
  if (code >= 95 && code <= 99) return 'stormy';

  return 'cloudy';
};

/**
 * 曜日を取得（日本語）
 */
export const getDayOfWeek = (dateString: string): string => {
  const date = new Date(dateString);
  const days = ['日', '月', '火', '水', '木', '金', '土'];
  return days[date.getDay()];
};

/**
 * 日付をフォーマット（MM/DD形式）
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}/${day}`;
};

/**
 * 今日・明日・日付を判定
 */
export const getRelativeDay = (dateString: string): string => {
  const date = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  // 時刻を無視して日付のみ比較
  const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const tomorrowOnly = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate());

  if (dateOnly.getTime() === todayOnly.getTime()) return '今日';
  if (dateOnly.getTime() === tomorrowOnly.getTime()) return '明日';

  return getDayOfWeek(dateString);
};

/**
 * 天気アイコンを取得（Ioniconsのアイコン名）
 * Note: Since we are not using Ionicons directly in the component anymore (using text/emoji or other icons),
 * this returns a string identifier that the component can map to an icon.
 */
export const getWeatherIcon = (condition: WeatherCondition): string => {
  switch (condition) {
    case 'sunny':
      return 'sunny';
    case 'cloudy':
      return 'cloudy';
    case 'rainy':
      return 'rainy';
    case 'snowy':
      return 'snow';
    case 'stormy':
      return 'thunderstorm';
    default:
      return 'cloudy';
  }
};

/**
 * 天気の日本語名を取得
 */
export const getWeatherLabel = (condition: WeatherCondition): string => {
  switch (condition) {
    case 'sunny':
      return '晴れ';
    case 'cloudy':
      return '曇り';
    case 'rainy':
      return '雨';
    case 'snowy':
      return '雪';
    case 'stormy':
      return '雷雨';
    default:
      return '曇り';
  }
};

interface OpenMeteoResponse {
  current: {
    temperature_2m: number;
    weather_code: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
  };
  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
}

export const fetchWeatherData = async (latitude: number, longitude: number): Promise<WeatherData> => {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=Asia%2FTokyo`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const data = (await response.json()) as OpenMeteoResponse;

    const current = {
      temp: data.current.temperature_2m,
      condition: weatherCodeToCondition(data.current.weather_code),
      humidity: data.current.relative_humidity_2m,
      windSpeed: data.current.wind_speed_10m,
    };

    const daily = data.daily.time.map((time: string, index: number) => ({
      date: time,
      formattedDate: formatDate(time),
      dayOfWeek: getRelativeDay(time),
      condition: weatherCodeToCondition(data.daily.weather_code[index]),
      tempMax: data.daily.temperature_2m_max[index],
      tempMin: data.daily.temperature_2m_min[index],
    }));

    return { current, daily };
  } catch (error) {
    console.error('Weather fetch error:', error);
    throw error;
  }
};
