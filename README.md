# Paladin🛡️

Simple feature flag manager

# Preview
![flags](https://github.com/P0u4a/paladin/assets/66873325/e54b778d-ca4a-4e11-80fe-85f2410bb129)
![projects](https://github.com/P0u4a/paladin/assets/66873325/b21cedde-b8b2-4f98-b33f-2452ba397f88)
![signup](https://github.com/P0u4a/paladin/assets/66873325/72c36049-0eec-40c7-9c6e-051a586790b9)

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
