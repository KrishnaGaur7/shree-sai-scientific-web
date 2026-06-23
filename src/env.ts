import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  
  // --- Server-side Configurations ---
  PAYLOAD_SECRET: z.string().min(1, 'PAYLOAD_SECRET must not be empty'),
  DATABASE_URI: z.string().min(1, 'DATABASE_URI must not be empty'),
  HUBSPOT_ACCESS_TOKEN: z.string().min(1, 'HUBSPOT_ACCESS_TOKEN must not be empty'),
  
  AISENSY_WEBHOOK_URL: z.string().url('AISENSY_WEBHOOK_URL must be a valid URL').optional().or(z.literal('')),
  RESEND_API_KEY: z.string().optional(),
  SENTRY_AUTH_TOKEN: z.string().optional(),
  SENTRY_DSN: z.string().optional(),
  BLOB_READ_WRITE_TOKEN: z.string().optional(),
  OPENAI_API_KEY: z.string().optional(),

  // --- Client-side Configurations (Exposed via NEXT_PUBLIC_ prefix) ---
  NEXT_PUBLIC_SITE_URL: z.string().url('NEXT_PUBLIC_SITE_URL must be a valid URL').default('https://www.shreesaiscientific.com'),
  NEXT_PUBLIC_DEFAULT_LOCALE: z.string().default('en'),
  NEXT_PUBLIC_GA4_ID: z.string().optional(),
  NEXT_PUBLIC_CLARITY_ID: z.string().optional(),
});

// Avoid build-time execution failures on CI/CD (e.g. Github Actions / Vercel Builds)
const skipValidation = process.env.SKIP_ENV_VALIDATION === 'true' || process.env.NEXT_PHASE === 'phase-production-build';

let env: z.infer<typeof envSchema>;

if (skipValidation) {
  // Gracefully parse with partial matching to avoid blocking builds
  env = envSchema.partial().parse(process.env) as unknown as z.infer<typeof envSchema>;
} else {
  try {
    env = envSchema.parse({
      NODE_ENV: process.env.NODE_ENV,
      
      // Local dev fallbacks are populated only in development/test to facilitate zero-config dev boot
      PAYLOAD_SECRET: process.env.PAYLOAD_SECRET || (process.env.NODE_ENV !== 'production' ? 'dev_session_cryptographic_secret_key_mock' : undefined),
      DATABASE_URI: process.env.DATABASE_URI || (process.env.NODE_ENV !== 'production' ? 'mongodb://localhost:27017/shree-sai-scientific' : undefined),
      HUBSPOT_ACCESS_TOKEN: process.env.HUBSPOT_ACCESS_TOKEN || (process.env.NODE_ENV !== 'production' ? 'dummy_hubspot_token_val' : undefined),
      
      AISENSY_WEBHOOK_URL: process.env.AISENSY_WEBHOOK_URL || '',
      RESEND_API_KEY: process.env.RESEND_API_KEY,
      SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,
      SENTRY_DSN: process.env.SENTRY_DSN,
      BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN,
      OPENAI_API_KEY: process.env.OPENAI_API_KEY,
      
      NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.shreesaiscientific.com',
      NEXT_PUBLIC_DEFAULT_LOCALE: process.env.NEXT_PUBLIC_DEFAULT_LOCALE || 'en',
      NEXT_PUBLIC_GA4_ID: process.env.NEXT_PUBLIC_GA4_ID,
      NEXT_PUBLIC_CLARITY_ID: process.env.NEXT_PUBLIC_CLARITY_ID,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('❌ Environment Validation Failed:');
      const errorMap = error.format();
      Object.entries(errorMap).forEach(([field, info]) => {
        if (field !== '_errors') {
          console.error(`  - ${field}: ${(info as unknown as { _errors?: string[] })._errors?.join(', ')}`);
        }
      });
      throw new Error('Shree Sai Scientific Web failed to start due to missing environment variables. Check .env config.');
    } else {
      throw error;
    }
  }
}

export { env };
export default env;
