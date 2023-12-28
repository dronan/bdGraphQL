## Requirements

- Postgres
- Node

## Installation

```
npm install
```

- Create a database called `project` in postgres, and, after it, run the command below to create the tables:

```
npx knex migrate:latest
```

## Running

```
npm start
```

## Executing

```

Users:

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

mutation {
  deleteUser(filter: { email: "new3@user.com" }) {
    name
  }
}

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



Profiles:

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


mutation {
  newProfile(data: { name: "New Profile", label: "new" }) {
    id
    name
    label
  }
}


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

mutation {
  deleteProfile(filter: { id: 3 }) {
    id
    name
    label
  }
}