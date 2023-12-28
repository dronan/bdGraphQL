const db = require('../config/db');
const { getLoggedUser } = require('../resolvers/Common/user');

const sql = `
    select
        u.*
    from
        users u,
        user_profiles up,
        profiles p
    where
        up.user_id = u.id and
        up.profile_id = p.id and
        u.active = true and
        p.name = :nameProfile
    limit 1
`;

const getUser = async nameProfile => {
    const res = await db.raw(sql, { nameProfile });
    return res ? res.rows[0] : null;
}

module.exports = async req  => {
    const user = await getUser('admin');
    if(user) {
        const { token } = await getLoggedUser(user);
        req.headers = {
            authorization: `Bearer ${token}`
        }
    }
}