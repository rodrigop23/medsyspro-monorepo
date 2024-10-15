import { config } from 'dotenv';
import { expand } from 'dotenv-expand';

import { ZodError, z } from 'zod';

const EnvSchema = z.object({
  PORT: z
    .string()
    .min(1)
    .transform((v) => parseInt(v, 10)),
  NATS_SERVER: z
    .string()
    .min(1)
    .transform((v) => v.split(',')),
});

export type EnvSchema = z.infer<typeof EnvSchema>;

expand(config());

try {
  EnvSchema.parse(process.env);

  console.log(EnvSchema.parse(process.env));
} catch (error) {
  if (error instanceof ZodError) {
    let message = 'Missing required values in .env:\n';
    error.issues.forEach((issue) => {
      message += issue.path[0] + '\n';
    });
    const e = new Error(message);
    e.stack = '';
    throw e;
  } else {
    console.error(error);
  }
}

export default EnvSchema.parse(process.env);
