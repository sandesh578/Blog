const crypto = require('crypto');

const password = 'fsadfdsqweqweqwe';
const algorithm = 'aes-192-cbc';

const key = crypto.scryptSync(password, 'salt', 24);
const initializationVector = Buffer.alloc(16, 0);

const encrypt = (plaintext) => {
  if (plaintext == null) return null;
  if (typeof plaintext === 'boolean' || typeof plaintext === 'number') {
    plaintext = plaintext.toString();
  }

  const cipher = crypto.createCipheriv(algorithm, key, initializationVector);
  let result = cipher.update(plaintext, 'utf-8', 'hex');
  result += cipher.final('hex');
  return result;
};

const decrypt = (encryptedText) => {
  const decipher = crypto.createDecipheriv(
    algorithm,
    key,
    initializationVector
  );
  let decryptedData = decipher.update(encryptedText, 'hex', 'utf-8');
  decryptedData += decipher.final('utf-8');
  return decryptedData;
};

module.exports = { encrypt, decrypt };
