import { defineConfig } from 'vite'
import dns from "dns"
import react from '@vitejs/plugin-react'

dns.setDefaultResultOrder('verbatim')
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost',
    port: 3000
  },
  test: {
    environment: "jsdom",
    setupFiles: "./testSetup.js",
    globals: true,
    coverage: {
      provider: "v8",
    }
  }
})
