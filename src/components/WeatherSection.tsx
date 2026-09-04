import { useTranslations, useLocale } from 'next-intl';
import { siteConfig } from '@/config';

export interface WeatherData {
  current?: {
    time?: string;
    temperature_2m?: number;
    relative_humidity_2m?: number;
    apparent_temperature?: number;
    weather_code?: number;
    wind_speed_10m?: number;
  };
  daily?: {
    time?: string[];
    weather_code?: number[];
    temperature_2m_max?: number[];
    temperature_2m_min?: number[];
  };
}

/* WMO 天气代码 -> 语义分组 */
function codeGroup(code: number): string {
  if (code === 0) return 'clear';
  if (code === 1 || code === 2) return 'partly';
  if (code === 3) return 'overcast';
  if (code === 45 || code === 48) return 'fog';
  if (code >= 51 && code <= 57) return 'drizzle';
  if ((code >= 61 && code <= 67) || code === 80) return 'rain';
  if (code >= 71 && code <= 77) return 'snow';
  if (code >= 81 && code <= 86) return 'showers';
  if (code >= 95) return 'thunder';
  return 'clear';
}

/** Server-side fetch（由 page.tsx 在服务端调用并传入组件） */
export async function fetchWeather(): Promise<WeatherData | null> {
  const params = new URLSearchParams({
    latitude: String(siteConfig.geo.latitude),
    longitude: String(siteConfig.geo.longitude),
    current: 'temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min',
    timezone: 'Europe/Lisbon',
    forecast_days: '6',
    wind_speed_unit: 'kmh',
  });
  try {
    const res = await fetch(`https://api.open-meteo.com/v1/forecast?${params.toString()}`, {
      next: { revalidate: 1800 },
    });
    if (!res.ok) return null;
    return (await res.json()) as WeatherData;
  } catch {
    return null;
  }
}

function WeatherGlyph({ group }: { group: string }) {
  const stroke = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  } as const;
  switch (group) {
    case 'clear':
      return (
        <svg width="40" height="40" viewBox="0 0 24 24" {...stroke}>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      );
    case 'partly':
      return (
        <svg width="40" height="40" viewBox="0 0 24 24" {...stroke}>
          <path d="M17 18a5 5 0 0 0 0-10 5 5 0 0 0-9-1.6A4 4 0 1 0 9 18h8z" />
          <circle cx="7" cy="6" r="1.6" fill="currentColor" stroke="none" />
        </svg>
      );
    case 'overcast':
      return (
        <svg width="40" height="40" viewBox="0 0 24 24" {...stroke}>
          <path d="M17.5 11a4.5 4.5 0 0 0-8.6-2A4 4 0 1 0 8 17h9.5a3.5 3.5 0 0 0 0-6z" />
        </svg>
      );
    case 'fog':
      return (
        <svg width="40" height="40" viewBox="0 0 24 24" {...stroke}>
          <path d="M17.5 9a4.5 4.5 0 0 0-8.6-1.6A4 4 0 1 0 8 16h9.5a3.5 3.5 0 0 0 0-7z" opacity="0.55" />
          <path d="M5 19h14M7 21.5h10M7 16.5h10" />
        </svg>
      );
    case 'drizzle':
    case 'rain':
    case 'showers':
      return (
        <svg width="40" height="40" viewBox="0 0 24 24" {...stroke}>
          <path d="M17.5 9a4.5 4.5 0 0 0-8.6-1.6A4 4 0 1 0 8 16h9.5a3.5 3.5 0 0 0 0-7z" />
          <path d="M8.5 19l-1.2 2.2M12.5 19l-1.2 2.2M16.5 19l-1.2 2.2" />
        </svg>
      );
    case 'snow':
      return (
        <svg width="40" height="40" viewBox="0 0 24 24" {...stroke}>
          <path d="M17.5 9a4.5 4.5 0 0 0-8.6-1.6A4 4 0 1 0 8 16h9.5a3.5 3.5 0 0 0 0-7z" />
          <path d="M9 19l-1.3 2.4M13 19l-1.3 2.4M17 19l-1.3 2.4" />
        </svg>
      );
    case 'thunder':
      return (
        <svg width="40" height="40" viewBox="0 0 24 24" {...stroke}>
          <path d="M17.5 9a4.5 4.5 0 0 0-8.6-1.6A4 4 0 1 0 8 16h9.5a3.5 3.5 0 0 0 0-7z" />
          <path d="M12 16l-2.5 4h3.2L11.6 22" />
        </svg>
      );
    default:
      return (
        <svg width="40" height="40" viewBox="0 0 24 24" {...stroke}>
          <circle cx="12" cy="12" r="4" />
        </svg>
      );
  }
}

export default function WeatherSection({ data }: { data: WeatherData | null }) {
  const t = useTranslations('weather');
  const locale = useLocale();
  const cur = data?.current;
  const timeList = data?.daily?.time;
  if (!cur || !timeList || timeList.length === 0) return null;
  const codes = data?.daily?.weather_code ?? [];
  const maxT = data?.daily?.temperature_2m_max ?? [];
  const minT = data?.daily?.temperature_2m_min ?? [];
  const groupNow = codeGroup(cur.weather_code ?? 0);

  const intlLocale = locale === 'mwl' ? 'pt' : locale === 'zh' ? 'zh-CN' : locale;
  let fmtDay: (iso: string) => string = () => '';
  let fmtShort: (iso: string) => string = () => '';
  try {
    fmtDay = (iso) =>
      new Intl.DateTimeFormat(intlLocale, { weekday: 'short' }).format(new Date(`${iso}T00:00:00`));
    fmtShort = (iso) =>
      new Intl.DateTimeFormat(intlLocale, { day: 'numeric', month: 'short' }).format(new Date(`${iso}T00:00:00`));
  } catch {
    fmtDay = (iso) => iso;
    fmtShort = () => '';
  }

  const rows = timeList.map((iso, i) => ({
    iso,
    day: fmtDay(iso),
    date: fmtShort(iso),
    group: codeGroup(codes[i] ?? 0),
    max: Math.round(maxT[i] ?? 0),
    min: Math.round(minT[i] ?? 0),
  }));

  return (
    <section
      id="weather"
      className="section-padding"
      style={{ background: 'var(--bg-tertiary)' }}
    >
      <div className="mx-auto max-w-6xl">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-3"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <p className="mb-8 max-w-3xl text-base" style={{ color: 'var(--text-muted)' }}>
          {t('subtitle')}
        </p>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        <div className="grid gap-5 lg:grid-cols-[340px_1fr]">
          {/* 当前天气 */}
          <div
            className="rounded-2xl p-6"
            style={{ background: 'var(--card-bg)', boxShadow: 'var(--card-shadow)' }}
          >
            <div className="text-sm font-semibold mb-1" style={{ color: 'var(--text-muted)' }}>
              {t('now')}
            </div>
            <div className="flex items-center gap-4 mb-4">
              <span style={{ color: 'var(--accent)' }}>
                <WeatherGlyph group={groupNow} />
              </span>
              <div>
                <div className="text-4xl font-bold leading-none" style={{ color: 'var(--text-primary)' }}>
                  {Math.round(cur.temperature_2m ?? 0)}°C
                </div>
                <div className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
                  {t(`codes.${groupNow}`)}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
              <div>
                <div className="font-semibold" style={{ color: 'var(--text-muted)' }}>
                  {t('feels')}
                </div>
                <div>{Math.round(cur.apparent_temperature ?? 0)}°C</div>
              </div>
              <div>
                <div className="font-semibold" style={{ color: 'var(--text-muted)' }}>
                  {t('humidity')}
                </div>
                <div>{cur.relative_humidity_2m ?? 0}%</div>
              </div>
              <div>
                <div className="font-semibold" style={{ color: 'var(--text-muted)' }}>
                  {t('wind')}
                </div>
                <div>
                  {Math.round(cur.wind_speed_10m ?? 0)} {t('kmh')}
                </div>
              </div>
            </div>
            <div
              className="mt-4 pt-3 text-xs"
              style={{ borderTop: '1px solid var(--border-color)', color: 'var(--text-muted)' }}
            >
              {t('updated')} {cur.time ? cur.time.replace('T', ' ') : ''}
            </div>
          </div>

          {/* 未来多日预报 */}
          <div
            className="rounded-2xl p-6"
            style={{ background: 'var(--card-bg)', boxShadow: 'var(--card-shadow)' }}
          >
            <div className="text-sm font-semibold mb-4" style={{ color: 'var(--text-muted)' }}>
              {t('forecast')}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {rows.map((row, i) => (
                <div
                  key={row.iso}
                  className="rounded-xl p-3 text-center"
                  style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
                >
                  <div
                    className="text-xs font-semibold mb-1"
                    style={{ color: i === 0 ? 'var(--accent)' : 'var(--text-primary)' }}
                  >
                    {row.day}
                  </div>
                  <div className="text-[11px] mb-2" style={{ color: 'var(--text-muted)' }}>
                    {row.date}
                  </div>
                  <div className="flex justify-center mb-2" style={{ color: 'var(--accent)' }}>
                    <WeatherGlyph group={row.group} />
                  </div>
                  <div className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {row.max}°
                    <span style={{ color: 'var(--text-muted)' }}> / {row.min}°</span>
                  </div>
                  <div className="text-[11px] mt-1" style={{ color: 'var(--text-muted)' }}>
                    {t(`codes.${row.group}`)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
