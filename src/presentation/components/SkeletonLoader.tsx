export function CurrentWeatherSkeleton() {
  return (
    <div className="glass rounded-3xl p-8 animate-pulse">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="h-8 w-32 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
          <div className="h-4 w-48 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>
        <div className="h-16 w-16 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i}>
            <div className="h-4 w-20 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
            <div className="h-6 w-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function HourlyTimelineSkeleton() {
  return (
    <div className="glass rounded-3xl p-6 animate-pulse">
      <div className="h-8 w-48 bg-gray-300 dark:bg-gray-700 rounded mb-6"></div>
      <div className="flex gap-4 overflow-x-auto pb-4">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="flex-shrink-0 bg-gray-200 dark:bg-gray-800 rounded-2xl p-4 min-w-[100px]"
          >
            <div className="h-4 w-12 bg-gray-300 dark:bg-gray-700 rounded mb-3 mx-auto"></div>
            <div className="h-8 w-8 bg-gray-300 dark:bg-gray-700 rounded-full mb-3 mx-auto"></div>
            <div className="h-6 w-16 bg-gray-300 dark:bg-gray-700 rounded mb-2 mx-auto"></div>
            <div className="h-3 w-20 bg-gray-300 dark:bg-gray-700 rounded mx-auto"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function WeatherChartSkeleton() {
  return (
    <div className="glass rounded-3xl p-6 animate-pulse">
      <div className="h-8 w-48 bg-gray-300 dark:bg-gray-700 rounded mb-6"></div>
      <div className="h-[400px] bg-gray-200 dark:bg-gray-800 rounded-2xl"></div>
    </div>
  );
}

export function ForecastCardSkeleton() {
  return (
    <div className="glass rounded-2xl p-4 animate-pulse">
      <div className="h-4 w-16 bg-gray-300 dark:bg-gray-700 rounded mb-3 mx-auto"></div>
      <div className="h-12 w-12 bg-gray-300 dark:bg-gray-700 rounded-full mb-3 mx-auto"></div>
      <div className="h-6 w-12 bg-gray-300 dark:bg-gray-700 rounded mb-2 mx-auto"></div>
      <div className="h-4 w-20 bg-gray-300 dark:bg-gray-700 rounded mx-auto"></div>
    </div>
  );
}

export function AQIWidgetSkeleton() {
  return (
    <div className="glass rounded-3xl p-6 animate-pulse">
      <div className="h-8 w-40 bg-gray-300 dark:bg-gray-700 rounded mb-6"></div>
      <div className="space-y-4">
        {[...Array(6)].map((_, i) => (
          <div key={i}>
            <div className="flex justify-between mb-2">
              <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
              <div className="h-4 w-12 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full w-2/3 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SunsetWidgetSkeleton() {
  return (
    <div className="glass rounded-3xl p-6 animate-pulse">
      <div className="h-8 w-32 bg-gray-300 dark:bg-gray-700 rounded mb-6"></div>
      <div className="h-32 w-32 bg-gray-300 dark:bg-gray-700 rounded-full mx-auto mb-6"></div>
      <div className="space-y-3">
        <div className="flex justify-between">
          <div className="h-4 w-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="h-4 w-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>
        <div className="flex justify-between">
          <div className="h-4 w-20 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="h-4 w-16 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    </div>
  );
}

export function WindCompassSkeleton() {
  return (
    <div className="glass rounded-3xl p-6 animate-pulse">
      <div className="h-8 w-24 bg-gray-300 dark:bg-gray-700 rounded mb-6"></div>
      <div className="h-40 w-40 bg-gray-300 dark:bg-gray-700 rounded-full mx-auto mb-4"></div>
      <div className="h-6 w-24 bg-gray-300 dark:bg-gray-700 rounded mx-auto"></div>
    </div>
  );
}
