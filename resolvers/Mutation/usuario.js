const db = require('../../config/db')
const { perfil: obterPerfil } = require('../Query/perfil')
const { usuario: obterUsuario } = require('../Query/usuario')

module.exports = {
    async novoUsuario(_, { dados }) {
        try {
            const idsPerfis = []

            // search the profile ids
            if(dados.perfis) {
                for(let filtro of dados.perfis) {
                    const perfil = await obterPerfil(_, {
                        filtro
                    })
                    if(perfil) idsPerfis.push(perfil.id)
                }
            }

            // delete the profile ids from the data to insert into usuarios table
            delete dados.perfis

            // validate the email to avoid duplicated data
            const { email } = dados
            const usuario = await db('usuarios')
                .where({ email }).first()
            if(usuario) {
                throw new Error('E-mail já cadastrado')
            }

            // insert the user data into usuarios table
            const [ id ] = await db('usuarios')
                                .insert({...dados})
                                .returning('id')

            if(idsPerfis.length > 0) {
                for(perfil_id of idsPerfis) {
                    await db('usuarios_perfis')
                        .insert({ perfil_id, usuario_id: id })
                }
            }
            return db('usuarios')
                .where({ id }).first()
        }
        catch(e) {
            throw new Error(e)
        }
    },
    async excluirUsuario(_, { filtro }) {
        try {
            const usuario = await obterUsuario(_, { filtro })
            if(usuario) {
                const { id } = usuario
                await db('usuarios_perfis')
                    .where({ usuario_id: id }).delete()
                await db('usuarios')
                    .where({ id }).delete()
            }
            return usuario
        }
        catch(e) {
            throw new Error(e.sqlMessage)
        }
    },
    async alterarUsuario(_, { filtro, dados }) {
        try {
            const usuario = await obterUsuario(_, { filtro })
            if(usuario) {
                const { id } = usuario
                if(dados.perfis) {
                    // delete all profiles from the user to add the new ones
                    await db('usuarios_perfis')
                        .where({ usuario_id: id }).delete()
                    for(let filtro of dados.perfis) {
                        const perfil = await obterPerfil(_, {
                            filtro
                        })

                        // if the profile exists, insert it into usuarios_perfis table
                        if(perfil) {
                            await db('usuarios_perfis')
                                .insert({
                                    perfil_id: perfil.id,
                                    usuario_id: id
                                })
                        }
                    }
                }

                // delete the profiles from the data to update the user
                delete dados.perfis

                // update the user data
                await db('usuarios')
                    .where({ id }).update(dados)
            }
            return {...usuario, ...dados}
        }
        catch(e) {
            throw new Error(e.sqlMessage)
        }
    }
}