import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Always put <title>, description, canonical and Open Graph tags into the initial <head>
  // instead of streaming them, so every crawler (Yandex, social previews) sees them.
  htmlLimitedBots: /.*/,
};

export default nextConfig;
