import crypto from 'crypto';

function hashPassword(password) {
    var salt = crypto.randomBytes(128).toString('base64');
    var toHash = password + salt;

    var hash = crypto.createHmac('sha256', salt)
        .update(toHash)
        .digest('base64');

    return {
        salt: salt,
        hash: hash
    };
}

function hashPasswordWithSalt(password, salt) {
    var toHash = password + salt;
    var hash = crypto.createHmac('sha256', salt)
        .update(toHash)
        .digest('base64');

	return hash;
}

module.exports = {
	hashPassword: hashPassword,
	hashPasswordWithSalt: hashPasswordWithSalt
}