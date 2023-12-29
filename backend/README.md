## Requirements

- Postgres
- Node

## Installation

- Install the dependencies

```bash
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

## Executing

Execute on playground: **http://localhost:4000/graphql**

## Users:

- List all users and filter by email

```graphql
{
  users {
    id
    name
    email
    profiles {
      name
    }
  }
  user(filter: { email: "jlann@empresa.com.br" }) {
    id
    name
    email
    profiles {
      name
    }
  }
}
```

- Create an user

```graphql
mutation {
  newUser(
    data: {
      name: "New User"
      email: "new3@user.com"
      password: "123456"
      profiles: [{ name: "master" }]
    }
  ) {
    id
    name
    email
    profiles {
    	name
    }
  }
}
```

- Update an user

```graphql
mutation {
  updateUser(
    filter: { email: "new3@user.com" }
    data: {
      name: "test"
      password: "123"
      profiles: [{ name: "admin" }, { name: "master" }]
    }
  ) {
    name
    password
    profiles {
      name
    }
  }
}
```

- Delete an user

```graphql
mutation {
  deleteUser(filter: { email: "new3@user.com" }) {
    name
  }
}

```

- Find an user by id

```graphql
{
  user(filter: { id: 1 }) {
    id
    name
    email
    password
    profiles {
      name
      users {
        email
      }
    }
  }
}
```

- Register an user using bcrypt password

```graphql
mutation {
  registerUser(
    data: { name: "John K", email: "john.k@gmail.com", password: "123" }
  ) {
    id
    name
    email
    password
    profiles {
      name
    }
  }
}
```

- Return an user with a jwt token

```graphql
{
  login(data: {
    email:"john.k@gmail.com"
    password:"123"
  }) {
    id
    name
    email
    name
    profiles {
      name
    }
    token
  }
}
```


## Profiles:


- List all profiles and filter by name

```graphql
{
  profiles {
    id
    name
    label
  }
  profile(
    filter: {
      # name: "admin"
      id: 1
    }
  ) {
    id
    name
    label
  }
}
```

- Create a profile

```graphql
mutation {
  newProfile(data: { name: "New Profile", label: "new" }) {
    id
    name
    label
  }
}
```

- Update a profile

```graphql
mutation {
  updateProfile(
    filter: {
      id:3
    }
    data: {
      label: "test change"
    }
  ) {
    id
    name
    label
  }
}
```

- Delete a profile

```graphql
mutation {
  deleteProfile(filter: { id: 3 }) {
    id
    name
    label
  }
}
```
