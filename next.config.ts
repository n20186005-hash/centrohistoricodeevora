import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';
import { join } from 'node:path';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  // 避免上层目录存在其他 lockfile 时误判 workspace root
  outputFileTracingRoot: join(__dirname),
  images: {
    remotePatterns: [
      { protocol: 'https' as const, hostname: 'images.unsplash.com' },
    ],
  },
  // OpenNext (Cloudflare Workers) 需要 standalone 输出，
  // 以生成 .next/standalone，否则 opennextjs-cloudflare 的
  // createCacheAssets 读 pages-manifest.json 时会 ENOENT 崩溃。
  output: 'standalone',
};

export default withNextIntl(nextConfig);
