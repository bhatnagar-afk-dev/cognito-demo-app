# Moving off AWS (Amplify + Cognito)

Every page in this app (`app/page.tsx`, `app/login/page.tsx`, `app/signup/page.tsx`,
`app/welcome/page.tsx`) only ever imports auth functions from `@/lib/auth`. None
of them import anything from `aws-amplify` directly. That's the seam this app
is built around: swapping auth providers means changing files under `lib/auth/`
and removing AWS-specific config, not touching any page.

## Where AWS-specific code actually lives

| File/dir | Purpose |
| --- | --- |
| `amplify/` | Amplify Gen 2 backend definition — declares the Cognito User Pool |
| `amplify.yml` | Amplify Hosting build spec (deploys the backend, then builds Next.js) |
| `amplify_outputs.json` | Generated Cognito config (User Pool ID, Client ID, region). Git-ignored. |
| `lib/auth/amplify-provider.ts` | The only file that calls the `aws-amplify` SDK |
| `aws-amplify`, `@aws-amplify/backend`, `@aws-amplify/backend-cli` in `package.json` | npm dependencies |

## Where the vendor-neutral contract lives

- `lib/auth/types.ts` defines the `AuthProvider` interface: `init`, `registerUser`,
  `confirmRegistration`, `loginUser`, `logoutUser`, `getSignedInUser`,
  `getBearerToken`.
- `lib/auth/index.ts` picks which provider implementation is active and
  re-exports its functions. This is the **one line** (`const provider: AuthProvider = ...`)
  that selects the provider for the whole app.
- Every page imports from `@/lib/auth`, never from a specific provider file.

## Steps to switch to a different auth provider

1. Write a new file, e.g. `lib/auth/<provider>-provider.ts`, that implements
   `AuthProvider` from `lib/auth/types.ts` using the new provider's SDK
   (Auth0, Firebase Auth, Supabase Auth, a custom backend, etc.). `getBearerToken()`
   just needs to return whatever token string your backend will accept in an
   `Authorization: Bearer <token>` header.
2. In `lib/auth/index.ts`, change the `provider` assignment to your new
   provider instead of `amplifyAuthProvider`.
3. Delete the AWS-only files: `amplify/`, `amplify.yml`, `amplify_outputs.json`,
   `lib/auth/amplify-provider.ts`.
4. Remove the AWS packages from `package.json`
   (`aws-amplify`, `@aws-amplify/backend`, `@aws-amplify/backend-cli`) and run
   `npm install`.
5. Point deployment at your new host (Vercel, Netlify, etc.) and configure
   whatever env vars/config your new provider needs — this app currently reads
   config from a static generated JSON file, so an equivalent config source
   (env vars, a config file) should be wired up in the new provider file.

No changes are needed in `app/page.tsx`, `app/login/page.tsx`,
`app/signup/page.tsx`, `app/welcome/page.tsx`, or `app/layout.tsx`.
