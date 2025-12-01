import React from 'react';
import type { WeatherData, WeatherRegion } from '../types/weather';
import { getWeatherIcon, getWeatherLabel } from '../utils/weather';

interface WeatherCardProps {
  weatherData: WeatherData | null;
  loading: boolean;
  error: boolean;
  region: WeatherRegion;
}

const WeatherIcon = ({ icon }: { icon: string }) => {
  const iconMap: Record<string, string> = {
    sunny: '☀️',
    cloudy: '☁️',
    rainy: '☔',
    snow: '⛄',
    thunderstorm: '⚡',
  };
  return <span className="text-2xl">{iconMap[icon] || '☁️'}</span>;
};

export default function WeatherCard({ weatherData, loading, error, region }: WeatherCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden p-6 transition transform hover:-translate-y-1 hover:shadow-xl duration-300">
      <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2 border-gray-100">
        {region.prefecture} {region.name}
      </h3>

      <div className="min-h-[200px]">
        {loading ? (
          <div className="flex justify-center items-center h-full py-8">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-500"></div>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-full py-8 text-red-500">
            <p>天気予報の取得に失敗しました</p>
          </div>
        ) : weatherData ? (
          <>
            <div className="flex justify-between items-start mb-6">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <WeatherIcon icon={getWeatherIcon(weatherData.current.condition)} />
                  <span className="text-4xl font-bold text-gray-800">{weatherData.current.temp}°</span>
                </div>
                <p className="text-gray-600 text-sm">
                  {getWeatherLabel(weatherData.current.condition)}
                  {weatherData.current.humidity && ` ・ 湿度${weatherData.current.humidity}%`}
                </p>
              </div>
              <div className="text-right">
                <div className="text-gray-600 text-sm mb-1">
                  💨 {weatherData.current.windSpeed}m/s
                </div>
              </div>
            </div>

            {/* 週間予報 */}
            <div className="grid grid-cols-5 gap-2 text-center">
              {weatherData.daily.slice(0, 5).map((day, i) => (
                <div key={i} className="flex flex-col items-center p-1 rounded hover:bg-gray-50">
                  <span className="text-[10px] text-gray-400 leading-tight">{day.formattedDate}</span>
                  <span className="text-xs text-gray-500 mb-1">{day.dayOfWeek}</span>
                  <div className="mb-1">
                    <WeatherIcon icon={getWeatherIcon(day.condition)} />
                  </div>
                  <span className="text-sm font-semibold text-gray-700">{day.tempMax}°</span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center h-full py-8 text-gray-500">
            <p>天気予報を取得できません</p>
          </div>
        )}
      </div>
    </div>
  );
}
