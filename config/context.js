const jwt = require('jwt-simple');

module.exports = async ({req})  => {
    await require('./simulateLoggedUser')(req);
    const auth = req.headers.authorization;

    // get the code from the token after 7 characters (Bearer )
    const token = auth && auth.substring(7);

    let user = null;
    let admin = false;

    if(token) {
        try {
            let contentToken = jwt.decode(token, process.env.APP_AUTH_SECRET);

            // if the token is valid
            if(new Date(contentToken.exp * 1000) > new Date()) {
                user = contentToken;
            }
        } catch(e) {
            // token invalid
        }

        // check if the user is admin
        if (user && user.profiles) {
            admin = user.profiles.includes('admin');
        }
    }

    const err = new Error('Unauthorized!');

    return {
        user,
        admin,
        validateUser() {
            if(!user) throw err;
        },
        validateAdmin() {
            if(!admin) throw err;
        },
        validateUserFilter(filter) {
            if(admin) return;

            if(!user) throw err;
            if(!filter) throw err;

            const { id, email } = filter;
            if(!id && !email) throw err;
            if(id && id !== user.id) throw err;
            if(email && email !== user.email) throw err;
        }
    }
}