import { useMemo, useState } from 'react';

const COLOR = {
  line: '#1B3E63',
  bluebright: '#6FB7E8',
  blueline: '#3E7CB1',
  paperdim: '#B7CBE0',
  copper: '#E0A458',
};

function parseDevice(ua) {
  if (!ua) return 'Unknown';
  const s = ua.toLowerCase();
  if (/ipad|tablet/.test(s)) return 'Tablet';
  if (/mobile|iphone|android/.test(s)) return 'Mobile';
  return 'Desktop';
}

function referrerLabel(referrer) {
  if (!referrer) return 'Direct';
  try {
    return new URL(referrer).hostname.replace(/^www\./, '');
  } catch {
    return referrer;
  }
}

function topGroups(rows, keyFn, limit = 6) {
  const map = new Map();
  for (const row of rows) {
    const key = keyFn(row) || 'Unknown';
    map.set(key, (map.get(key) || 0) + 1);
  }
  return [...map.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([label, value]) => ({ label, value }));
}

function bucketizeByTime(rows) {
  const times = rows.map((r) => new Date(r.timestamp).getTime()).filter((t) => !Number.isNaN(t));
  if (!times.length) return { labels: [], counts: [] };

  const min = Math.min(...times);
  const max = Math.max(...times);
  const spanHours = (max - min) / 3_600_000;
  const granularity = spanHours <= 48 ? 'hour' : spanHours <= 24 * 60 ? 'day' : 'week';
  const step = granularity === 'hour' ? 3_600_000 : granularity === 'day' ? 86_400_000 : 604_800_000;

  const floorTo = (t) => {
    const d = new Date(t);
    if (granularity === 'hour') d.setMinutes(0, 0, 0);
    else if (granularity === 'day') d.setHours(0, 0, 0, 0);
    else {
      d.setHours(0, 0, 0, 0);
      d.setDate(d.getDate() - d.getDay());
    }
    return d.getTime();
  };

  const start = floorTo(min);
  const end = floorTo(max);
  const bucketStarts = [];
  for (let t = start; t <= end; t += step) bucketStarts.push(t);
  if (bucketStarts.length === 0) bucketStarts.push(start);

  const counts = new Array(bucketStarts.length).fill(0);
  for (const row of rows) {
    const t = new Date(row.timestamp).getTime();
    if (Number.isNaN(t)) continue;
    const idx = Math.min(bucketStarts.length - 1, Math.max(0, Math.round((floorTo(t) - start) / step)));
    counts[idx] += 1;
  }

  const labels = bucketStarts.map((t) => {
    if (granularity === 'hour') return new Date(t).toLocaleTimeString([], { hour: 'numeric' });
    if (granularity === 'day') return new Date(t).toLocaleDateString([], { month: 'short', day: 'numeric' });
    return `Wk of ${new Date(t).toLocaleDateString([], { month: 'short', day: 'numeric' })}`;
  });

  return { labels, counts, granularity };
}

function StatCard({ label, value, small }) {
  return (
    <div className="rounded-sm border border-ink-line bg-ink-panel/40 p-4">
      <p className="font-mono text-[11px] uppercase tracking-wider text-paper-dim mb-1">{label}</p>
      <p className={`font-mono text-paper truncate ${small ? 'text-base' : 'text-2xl font-semibold'}`} title={String(value)}>
        {value}
      </p>
    </div>
  );
}

function TrafficChart({ labels, counts }) {
  const [hover, setHover] = useState(null);
  const width = 800;
  const height = 260;
  const padL = 36;
  const padR = 12;
  const padT = 16;
  const padB = 28;
  const innerW = width - padL - padR;
  const innerH = height - padT - padB;
  const n = counts.length;
  const max = Math.max(...counts, 1);
  const stepX = n > 1 ? innerW / (n - 1) : 0;

  const points = counts.map((c, i) => ({
    x: padL + (n > 1 ? i * stepX : innerW / 2),
    y: padT + innerH - (c / max) * innerH,
    value: c,
    label: labels[i],
  }));

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
  const areaPath =
    n > 0
      ? `${linePath} L ${points[n - 1].x.toFixed(1)} ${padT + innerH} L ${points[0].x.toFixed(1)} ${padT + innerH} Z`
      : '';

  const gridSteps = [0, 0.25, 0.5, 0.75, 1];
  const labelStride = Math.max(1, Math.ceil(n / 8));

  function handleMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = ((e.clientX - rect.left) / rect.width) * width;
    let idx = n > 1 ? Math.round((relX - padL) / stepX) : 0;
    idx = Math.max(0, Math.min(n - 1, idx));
    setHover(idx);
  }

  const hp = hover !== null ? points[hover] : null;

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto touch-none"
        onMouseMove={handleMove}
        onMouseLeave={() => setHover(null)}
      >
        <defs>
          <linearGradient id="trafficFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={COLOR.bluebright} stopOpacity="0.35" />
            <stop offset="100%" stopColor={COLOR.bluebright} stopOpacity="0" />
          </linearGradient>
        </defs>

        {gridSteps.map((g) => {
          const y = padT + innerH * (1 - g);
          return (
            <g key={g}>
              <line
                x1={padL}
                x2={width - padR}
                y1={y}
                y2={y}
                stroke={COLOR.line}
                strokeWidth="1"
                strokeDasharray={g === 0 ? undefined : '2 4'}
              />
              <text x={padL - 8} y={y + 3} textAnchor="end" fontSize="10" fontFamily="'JetBrains Mono', monospace" fill={COLOR.paperdim}>
                {Math.round(max * g)}
              </text>
            </g>
          );
        })}

        {n > 0 && <path d={areaPath} fill="url(#trafficFill)" />}
        {n > 0 && <path d={linePath} fill="none" stroke={COLOR.bluebright} strokeWidth="2" />}

        {points.map(
          (p, i) =>
            i % labelStride === 0 && (
              <text
                key={i}
                x={p.x}
                y={height - 8}
                textAnchor="middle"
                fontSize="10"
                fontFamily="'JetBrains Mono', monospace"
                fill={COLOR.paperdim}
              >
                {p.label}
              </text>
            )
        )}

        {hp && (
          <>
            <line x1={hp.x} x2={hp.x} y1={padT} y2={padT + innerH} stroke={COLOR.copper} strokeWidth="1" strokeDasharray="3 3" />
            <circle cx={hp.x} cy={hp.y} r="4" fill={COLOR.copper} stroke="#08192E" strokeWidth="2" />
          </>
        )}
      </svg>

      {hp && (
        <div
          className="pointer-events-none absolute top-1 rounded-sm border border-ink-line bg-ink-deep px-3 py-2 font-mono text-xs shadow-lg"
          style={{ left: `${(hp.x / width) * 100}%`, transform: 'translateX(-50%)' }}
        >
          <p className="text-paper-dim">{hp.label}</p>
          <p className="text-blue-bright">
            {hp.value} visit{hp.value === 1 ? '' : 's'}
          </p>
        </div>
      )}
    </div>
  );
}

function BarList({ title, data }) {
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="rounded-sm border border-ink-line bg-ink-panel/40 p-5">
      <h4 className="font-mono text-xs uppercase tracking-wider text-paper-dim mb-4">{title}</h4>
      {data.length === 0 ? (
        <p className="text-sm text-paper-dim">No data yet.</p>
      ) : (
        <ul className="space-y-3">
          {data.map((d) => (
            <li key={d.label}>
              <div className="flex items-center justify-between gap-3 text-sm text-paper mb-1">
                <span className="truncate" title={d.label}>
                  {d.label}
                </span>
                <span className="shrink-0 font-mono text-xs text-paper-dim">
                  {d.value} · {((d.value / total) * 100).toFixed(0)}%
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-ink-line/50 overflow-hidden">
                <div className="h-full rounded-full bg-blue-line" style={{ width: `${(d.value / max) * 100}%` }} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function AdminAnalytics({ analytics }) {
  const stats = useMemo(() => {
    if (!analytics.length) return null;
    const uniqueIps = new Set(analytics.map((r) => r.ipAddress).filter(Boolean)).size;
    const paths = topGroups(analytics, (r) => r.path, 8);
    const countries = topGroups(analytics, (r) => [r.city, r.country].filter(Boolean).join(', ') || r.country, 6);
    const referrers = topGroups(analytics, (r) => referrerLabel(r.referrer), 6);
    const devices = topGroups(analytics, (r) => parseDevice(r.userAgent), 4);
    const searchEngines = topGroups(
      analytics.filter((r) => r.searchEngine),
      (r) => r.searchEngine,
      6
    );
    const { labels, counts } = bucketizeByTime(analytics);
    return {
      uniqueIps,
      paths,
      countries,
      referrers,
      devices,
      searchEngines,
      labels,
      counts,
      topCountry: countries[0]?.label,
      topDevice: devices[0]?.label,
    };
  }, [analytics]);

  if (!stats) {
    return <p className="text-paper-dim">No analytics data yet.</p>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total visits" value={analytics.length} />
        <StatCard label="Unique visitors" value={stats.uniqueIps} />
        <StatCard label="Top location" value={stats.topCountry || '—'} small />
        <StatCard label="Top device" value={stats.topDevice || '—'} small />
      </div>

      <div className="rounded-sm border border-ink-line bg-ink-panel/40 p-5">
        <h4 className="font-mono text-xs uppercase tracking-wider text-paper-dim mb-4">Traffic over time</h4>
        <TrafficChart labels={stats.labels} counts={stats.counts} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BarList title="Top pages" data={stats.paths} />
        <BarList title="Locations" data={stats.countries} />
        <BarList title="Referrers" data={stats.referrers} />
        <BarList title="Devices" data={stats.devices} />
        {stats.searchEngines.length > 0 && <BarList title="Search engines" data={stats.searchEngines} />}
      </div>
    </div>
  );
}
