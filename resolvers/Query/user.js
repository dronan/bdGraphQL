const db = require('../../config/db')
const bcrypt = require('bcrypt')
const { getLoggedUser } = require('../Common/user')

module.exports = {
    login(_, { data }) {
        return db('users')
            .where({ email: data.email })
            .first()
            .then(user => {
                if (!user) {
                    throw new Error('Invalid user')
                }
                const isMatch = bcrypt.compareSync(data.password, user.password)
                if (!isMatch) {
                    throw new Error('Invalid password')
                }
                return getLoggedUser(user)
            })
    },
    users() {
        return db('users')
    },
    user(_, { filter }) {
        if (!filter) return null
        const { id, email } = filter
        if(id) {
            return db('users')
                .where({ id })
                .first()
        } else if (email) {
            return db('users')
                .where({ email })
                .first()
        } else {
            return 
        }
    },
}