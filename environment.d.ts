export {}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      FRONTEND_PORT: number
      BACKEND_PORT: number
    }
  }
}
