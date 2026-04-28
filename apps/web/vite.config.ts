import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const apiProxyTarget =
  process.env.LIBRA_API_PROXY_TARGET ??
  process.env.VITE_LIBRA_API_PROXY_TARGET ??
  "http://127.0.0.1:8001";

const proxyConfig = {
  "/api": {
    target: apiProxyTarget,
    changeOrigin: true,
  },
  "/health": {
    target: apiProxyTarget,
    changeOrigin: true,
  },
};

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    allowedHosts: [".loca.lt"],
    proxy: proxyConfig,
  },
  preview: {
    port: 4173,
    allowedHosts: [".loca.lt"],
    proxy: proxyConfig,
  },
});
