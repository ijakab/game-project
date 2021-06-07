# Tic-Tac-Toe

## How to run

The easiest way is to run with docker.

1. Make sure ports 5432 and 3000 are free

1. Navigate to app folder and run `docker-compose up -d`

1. Wait for docker to do its magic

The manual way:

1. Make sure you have postgres running with a database

1. Navigate to the project and run `npm i`

1. Build by running `npm run build`

1. Run the node process by running `dist/main.js` with node. Make sure your provides this process environment variables for connecting to database, if not using defaults

### Environment variables and defaults

- PG_HOST=localhost
- PG_PORT=5432
- PG_USER=root
- PG_PASS=root
- PG_DATABASE=postgres

## Architecture

- Built on top of [nestjs](https://docs.nestjs.com)
- Using its graphql code first approach
- Shipped in stateless container
- Using postgres for data storage (data storage logic is separated from logic and game saver adapter can be switched)
- Using game stateful logic classes not dependent on DI and execution context
- Using DI services as a core of integrators of execution flow, connecting requests with game logic and game stores
- Using resolvers as a graphql endpoints with minimal logic in them

## Notes

- There is no authentication system, players are just represented with string arguments
- AI moves at random, but ai strategy is easily switchable in code structure
- Redis is prepared in docker-compose and probably should be used in this kind of project, as we may have multiple instances running. However, docs do not specify a way to save subscription data to Redis
- Could not find specification how to add custom logic in validation phase of graphql on nest documentation, so used class validators instead
