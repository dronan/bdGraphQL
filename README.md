## Requirements

- Postgres
- Node

## Installation

```
npm install
```

- Create a database called `exercises-cap-4` in postgres

```
npx knex migrate:latest
```

## Running

```
npm start
```

## Executing

```

Usuarios:

{
    usuarios {
    id nome email
      perfis {
        nome
      }
  	}
		usuario(filtro:{
      email: "jlann@empresa.com.br"
    }) {   id nome email
      perfis {
        nome
      }
  	}
}

mutation {
  novoUsuario(dados: {
    nome: "novo Usuario"
    email:"teste@usuario.com"
    senha: "123456"
    }) {
    id nome email
    }
}




Perfil:


{
  perfis {
    id nome rotulo
  }
  perfil (filtro:{
    # nome: "admin"
    id: 1
  }){
    id nome rotulo
  }
}

mutation {
  novoPerfil(dados: {
    nome: "novo Usuario"
    rotulo:"user"
  }) {
    id nome rotulo
  }
}

mutation {
  alterarPerfil(filtro: { 
    # id:2 
    nome: "alterado"
  }, dados:{ 
    # nome: "alterado"
    rotulo: "test change"
  } ) {
    id nome rotulo
  }
}

mutation {
  excluirPerfil(filtro: { id:3 } ) {
    id nome rotulo
  }
}