# Paladin🛡️

Simple feature flag manager

## Motivation

An excercise to see how a minimally viable version of something like [LaunchDarkly](https://launchdarkly.com/) could be replicated.

## Usage

**Base URL**
`https://p0u4a-paladin.vercel.app/api`

**Endpoint**
`GET /external/get-flag?pname={projectName}&fname={flagName}`

**Headers** 
`X-Paladin-Key : <api_key>`

**Response**

```ts
Flag = {
    name: string,
    description: string,
    active: boolean,
}
```

## Running Locally

1. Run `pnpm install`
2. Create a Vercel Postgres database on Vercel
3. Add the necessary enviornment variables to a `.env` file
   - `POSTGRES_URL`
   - `POSTGRES_PRISMA_URL`
   - `POSTGRES_URL_NON_POOLING`
   - `POSTGRES_USER`
   - `POSTGRES_HOST`
   - `POSTGRES_PASSWORD`
   - `POSTGRES_DATABASE`
   - `NEXTAUTH_SECRET`

4. Push schema to postgres with `prisma db push`
5. Use `pnpm run dev` to start project locally
