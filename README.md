## Requirements

- Postgres
- Node v16

## Installation backend

- Install the dependencies

```bash
cd backend
npm install
```

- Create a database called `project` in postgres, and, after it, run the command below to create the tables:

```
npx knex migrate:latest
```

## Running backend

```bash
cd backend
npm start
```

## Installation Frontend

```bash
cd frontend
npm install
```

### Running frontend
```
npm run serve
```