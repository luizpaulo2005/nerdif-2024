import { z } from 'zod'

const envSchema = z.object({
    DATABASE_URL: z.string().url(),
    NEXT_PUBLIC_AUTH_SECRET: z.string(),
    NEXT_PUBLIC_AUTH_GOOGLE_CLIENT_ID: z.string(),
    NEXT_PUBLIC_AUTH_GOOGLE_CLIENT_SECRET: z.string(),
})

const env = envSchema.parse(process.env)

export { env }