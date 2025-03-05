import { restFetch } from '@vunk-server/shared/fetch/ssr'

restFetch.baseURL = import.meta.env.VITE_SSR_API_URL
