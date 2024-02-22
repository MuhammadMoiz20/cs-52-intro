# cs52 notes app

simple notes app for cs52. backend in express, frontend in react, mongo for storage.

## run

```
make install
make dev
```

needs mongodb running locally. copy `.env.example` to `.env` in both dirs.

## stack
- express + mongoose
- react + react-router
- jwt auth
- bcrypt for password hashing

## features
- register / login
- create / edit / delete notes
- search
- pagination
- per-user notes only

## deploy
see DEPLOY.md
