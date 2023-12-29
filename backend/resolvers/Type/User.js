const db = require('../../config/db')

module.exports = {
    async profiles(user) {
        return db('profiles')
            .join(
                'user_profiles',
                'profiles.id',
                'user_profiles.profile_id'
            )
            .where({ user_id: user.id })
    }
}