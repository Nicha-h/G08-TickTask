import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // `neon deploy` / `neon env pull` write the branch's Neon vars to the repo root .env.local;
  // expose only the public URLs to the browser (never NEON_REALTIME_SECRET)
  const neon = { ...loadEnv(mode, '..', ''), ...process.env }

  return {
   content: ["./index.html",
   "./src/**/*.{js,ts,jsx,tsx}",],
   plugins: [react(),
   tailwindcss(),
  ],
   define: {
     'import.meta.env.VITE_NEON_AUTH_URL': JSON.stringify(neon.VITE_NEON_AUTH_URL ?? neon.NEON_AUTH_BASE_URL),
     'import.meta.env.VITE_NEON_REALTIME_URL': JSON.stringify(neon.VITE_NEON_REALTIME_URL ?? neon.NEON_REALTIME_URL),
   },
  }
 })
