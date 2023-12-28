module.exports = async ({req})  => {
    await require('./simulateLoggedUser')(req);
    const auth = req.headers.authorization;
    console.log(auth);
}