/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // The Next.js app lives in this subdirectory; pin the workspace root so the
  // repo-level lockfile doesn't get inferred as the root.
  turbopack: {
    root: import.meta.dirname,
  },
};

export default nextConfig;
