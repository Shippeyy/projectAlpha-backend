import crypto from 'crypto';

function hashPassword(password) {
    let salt = crypto.randomBytes(128).toString('base64');
    let toHash = password + salt;

    let hash = crypto.createHmac('sha256', salt)
        .update(toHash)
        .digest('base64');

    return {
        salt: salt,
        hash: hash
    };
}

function hashPasswordWithSalt(password, salt) {
    let toHash = password + salt;
    let hash = crypto.createHmac('sha256', salt)
        .update(toHash)
        .digest('base64');

	return hash;
}

function checkForCorrectPassword(password, hash, salt){
    let hashedPassword = hashPasswordWithSalt(password, salt);
    if(hashedPassword == hash) return true;
    return false;
}

module.exports = {
	hashPassword: hashPassword,
	hashPasswordWithSalt: hashPasswordWithSalt,
    checkForCorrectPassword: checkForCorrectPassword
}