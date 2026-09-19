# Cognito Demo App

A minimal Next.js app that demonstrates AWS Cognito authentication. Users can
sign up or log in, and once signed in they land on a welcome page that shows
the Cognito access token issued to their session.

The backend (a single Cognito User Pool) is defined with [AWS Amplify Gen
2](https://docs.amplify.aws/nextjs/) in the `amplify/` directory and deployed
by AWS Amplify Hosting.

All AWS-specific auth code is isolated behind `lib/auth/` (see
[MIGRATION.md](./MIGRATION.md)) — pages only ever call the provider-agnostic
functions exported from `@/lib/auth`, never the `aws-amplify` SDK directly.

## Local development

Start a local Amplify sandbox backend (requires AWS credentials configured via
`aws configure`):

```bash
npx ampx sandbox
```

This generates `amplify_outputs.json` at the project root, which the app
reads at runtime. It is git-ignored since its contents differ per
environment.

In a separate terminal, run the app:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deployment

The app is deployed on AWS Amplify Hosting, connected to this GitHub repo.
`amplify.yml` defines the build: Amplify first deploys the backend
(`npx ampx pipeline-deploy`), which provisions the Cognito resources and
generates `amplify_outputs.json`, then builds and deploys the Next.js
frontend.

## Status

This is phase 1: authentication only. A later phase will add a backend API
that validates the bearer token shown on the welcome page.
