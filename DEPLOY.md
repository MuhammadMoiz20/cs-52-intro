# deploy notes

backend deployed to render. frontend to netlify.

env vars on render:
- MONGO_URI
- JWT_SECRET
- PORT (render injects this)

netlify build:
- base: client
- command: npm run build
- publish: client/build
