# Paladin🛡️

Simple feature flag manager

## Motivation

An excercise to see how a barebones version of something like LaunchDarkly could be replicated. It all started when a friend told me

> _LaunchDarkly is literally just a concurrent hashmap to turn a boolean on and off._

## Usage

**Server**
`https://p0u4a-paladin.vercel.app/api`

**Endpoint**
`POST /external/get-flag?pname={projectName}&fname={flagName}`

Make sure you add the header `X-Paladin-Key` with your API key as its value.

**Response**

```ts
Flag = {
    name: String
    description: String
    active: Boolean
}
```

## Running Locally

1. Run `pnpm install`
2. Create a Vercel Postgres database on Vercel
3. Add the necessary enviornment variables to a `.env` file
   `POSTGRES_URL`
   `POSTGRES_PRISMA_URL`
   `POSTGRES_URL_NON_POOLING`
   `POSTGRES_USER`
   `POSTGRES_HOST`
   `POSTGRES_PASSWORD`
   `POSTGRES_DATABASE`
   `NEXTAUTH_SECRET`

4. Push schema to postgres with `prisma db push`
5. Use `pnpm run dev` to start project locally
