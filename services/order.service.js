const config = require('config')
const crypto = require('crypto')

class OrderService {
  crypt(payload) {
    // generate 16 bytes of random data

    const initVector = Buffer.from(config.get('initVector'), 'hex')

    // protected data
    const message = JSON.stringify(payload)

    // secret key generate 32 bytes of random data
    const Securitykey = Buffer.from(config.get('Securitykey'), 'hex')

    // the cipher function
    const cipher = crypto.createCipheriv(
      config.get('algorithm'),
      Securitykey,
      initVector,
    )

    // encrypt the message
    // input encoding
    // output encoding
    let encryptedData = cipher.update(message, 'utf-8', 'hex')

    encryptedData += cipher.final('hex')
    return encryptedData
  }
  decrypt(payload) {
    const Securitykey = Buffer.from(config.get('Securitykey'), 'hex')
    const initVector = Buffer.from(config.get('initVector'), 'hex')
    const decipher = crypto.createDecipheriv(
      config.get('algorithm'),
      Securitykey,
      initVector,
    )

    let decryptedData = decipher.update(payload, 'hex', 'utf-8')

    decryptedData += decipher.final('utf8')
    return decryptedData
  }
}
module.exports = new OrderService()
