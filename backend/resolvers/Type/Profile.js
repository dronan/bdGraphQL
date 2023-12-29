const db = require('../../config/db')

module.exports = {
    async users(profile) {
        return db('users')
            .join(
                'user_profiles',
                'users.id',
                'user_profiles.user_id'
            )
            .where({ profile_id: profile.id })
    }
}