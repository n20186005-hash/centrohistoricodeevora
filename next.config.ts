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
  // 静态导出
  output: 'export',
  distDir: 'out',
};

export default withNextIntl(nextConfig);
