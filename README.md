# Foodie Impressions

Reviews Summariser for CookinGenie.

## Project overview

Foodie Impressions is a full‑stack application that demonstrates an Angular frontend and a Node/Express backend used to collect chef reviews and produce short AI-generated summaries. The server proxies requests to an external Foundry/OpenAI-style API to generate summaries.

Key parts:
- Client: Angular app ([client/angular.json](client/angular.json), [client/package.json](client/package.json))
- Server: Node + Express proxy and static server ([server/index.js](server/index.js))
- CI/CD: GitHub Actions workflow for build & Azure deployment ([.github/workflows/main_foodieimpressions.yml](.github/workflows/main_foodieimpressions.yml))

## Features

- Browse chefs and read/save reviews.
- Add new reviews (stored in localStorage).
- Automatic summary generation using the backend AI proxy.
- Static build served by the Node server for production.

## Prerequisites

- Node.js (recommended 18+)
- npm
- Angular CLI (for development): npm i -g @angular/cli

## Environment variables

The server expects the following environment variables (see [server/index.js](server/index.js)):

- FOUNDRY_BASE — base URL for Foundry/OpenAI proxy target
- FOUNDRY_API_KEY — API key for the Foundry/OpenAI service

Set these in a .env file in the `server/` folder or provide them in your production environment. The GitHub Actions workflow uses Azure secrets for deployment credentials.

## Development

1. Install dependencies
   - Client: cd client && npm ci
   - Server: cd server && npm ci

2. Run client (dev)
   - cd client
   - npm start
   - Opens on http://localhost:4200 and uses proxy config for API calls.

3. Run server (dev)
   - cd server
   - node index.js
   - Server serves static files from the built client (see public path in [server/index.js](server/index.js)) and exposes API endpoints such as POST /api/ai/responses.

4. To use the full app locally:
   - Build the client so assets are available to the server:
     - cd client && npm run build
     - This writes build artifacts into the server/public folder per [client/angular.json](client/angular.json).
   - Start the server:
     - cd server && node index.js
   - Navigate to http://localhost:3000 (or the port configured in server).

## Build & Production

- Client build: cd client && npm run build
  - Output path is configured in [client/angular.json](client/angular.json) to place files under `../server/public`.
- CI/CD: The repo contains a GitHub Actions workflow that builds client and server and deploys to Azure Web App ([.github/workflows/main_foodieimpressions.yml](.github/workflows/main_foodieimpressions.yml)).

## API (server proxy)

- POST /api/ai/responses
  - Forwards structured requests to the Foundry/OpenAI responses endpoint. See [server/index.js](server/index.js) for request structure and proxy behavior.
  - Example (curl):
    curl -X POST http://localhost:3000/api/ai/responses -H "Content-Type: application/json" -d '{"input":[{"role":"user","content":"..."}],"model":"gpt-5-mini"}'

## Helpful files to inspect

- Frontend summarization logic: [client/src/app/components/chef-profile/chef-profile.component.ts](client/src/app/components/chef-profile/chef-profile.component.ts)
- OpenAI client service (frontend): [client/src/app/services/openai.service.ts](client/src/app/services/openai.service.ts)
- Server entrypoint: [server/index.js](server/index.js)
- Angular build config: [client/angular.json](client/angular.json)

## Contributing

- Open issues and PRs.
- Keep changes small and focused; update README and any environment or deployment docs if you modify server behavior or build outputs.