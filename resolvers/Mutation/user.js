const bcrypt = require('bcrypt')
const db = require('../../config/db')
const { profile: getProfile } = require('../Query/profile')
const { user: getUser } = require('../Query/user')

const mutations = {
    async newUser(_, { data }) {
        try {
            const idProfiles = []

            if (!data.profiles || !data.profiles.length) {
                data.profiles = [{
                    name: 'common'
                }]
            }

            // search the profile ids
            for(let filter of data.profiles) {
                const perfil = await getProfile(_, {
                    filter
                })
                if(perfil) idProfiles.push(perfil.id)
            }

            // encrypt the password
            const salt = bcrypt.genSaltSync()
            data.password = bcrypt.hashSync(data.password, salt)

            // delete the profile ids from the data to insert into users table
            delete data.profiles

            // validate the email to avoid duplicated data
            const { email } = data
            const user = await db('users')
                .where({ email }).first()
            if(user) {
                throw new Error('E-mail já cadastrado')
            }

            // insert the user data into users table
            const [ id ] = await db('users')
                                .insert({...data})
                                .returning('id')

            if(idProfiles.length > 0) {
                for(profile_id of idProfiles) {
                    await db('user_profiles')
                        .insert({ profile_id, user_id: id })
                }
            }
            return db('users')
                .where({ id }).first()
        }
        catch(e) {
            throw new Error(e)
        }
    },
    async deleteUser(_, { filter }) {
        try {
            const user = await getUser(_, { filter })
            if(user) {
                const { id } = user
                await db('user_profiles')
                    .where({ user_id: id }).delete()
                await db('users')
                    .where({ id }).delete()
            }
            return user
        }
        catch(e) {
            throw new Error(e)
        }
    },
    async updateUser(_, { filter, data }) {
        try {
            const user = await getUser(_, { filter })
            if(user) {
                const { id } = user
                if(data.profiles) {
                    // delete all profiles from the user to add the new ones
                    await db('user_profiles')
                        .where({ user_id: id }).delete()
                    for(let filter of data.profiles) {
                        const profile = await getProfile(_, {
                            filter
                        })

                        // if the profile exists, insert it into user_profiles table
                        if(profile) {
                            await db('user_profiles')
                                .insert({
                                    profile_id: profile.id,
                                    user_id: id
                                })
                        }
                    }
                }

                if (data.password) {
                    // encrypt the password
                    const salt = bcrypt.genSaltSync()
                    data.password = bcrypt.hashSync(data.password, salt)
                }

                // delete the profiles from the data to update the user
                delete data.profiles

                // update the user data
                await db('users')
                    .where({ id }).update(data)
            }
            return {...user, ...data}
        }
        catch(e) {
            throw new Error(e)
        }
    },
    registerUser(_, { data }) {
        return mutations.newUser(_, {
            data: {
                name: data.name,
                email: data.email,
                password: data.password
            }
        })
    }
};

module.exports = mutations