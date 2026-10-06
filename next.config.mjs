/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    // The big data modules (tour and destination details) make webpack print a
    // "Serializing big strings ... impacts deserialization performance" notice
    // about its on-disk build cache on every cold build. It is purely advisory
    // (no effect on the site or its speed), so only errors are logged here.
    config.infrastructureLogging = { ...config.infrastructureLogging, level: "error" };
    return config;
  },
};

export default nextConfig;
