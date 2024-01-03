# Paladin🛡️
Simple feature flag manager 

## Motivation
An excercise to see how a barebones version of something like LaunchDarkly could be replicated. It all started when a friend told me
> _LaunchDarkly is literally just a concurrent hashmap to turn a boolean on and off._

## Running Locally
1. Run `pnpm install`
2. Create a Vercel Postgres database
3. Add the necessary enviornment variables
4. Push schema to postgres with `prisma db push`
5. Use `pnpm run dev` to start project locally
