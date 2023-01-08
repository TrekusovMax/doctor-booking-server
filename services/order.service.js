const config = require('config')
const crypto = require('crypto')

class OrderService {
  crypt(payload) {
    // generate 16 bytes of random data

    const initVector = Buffer.from(process.env.INIT_VECTOR, 'hex')

    // protected data
    const message = JSON.stringify(payload)

    // secret key generate 32 bytes of random data
    const Securitykey = Buffer.from(process.env.SECURITY_KEY, 'hex')

    // the cipher function
    const cipher = crypto.createCipheriv(
      process.env.ALGORITHM,
      Securitykey,
      initVector,
    )
    let encryptedData = cipher.update(message, 'utf-8', 'hex')
    encryptedData += cipher.final('hex')
    return encryptedData
  }
  decrypt(payload) {
    const Securitykey = Buffer.from(process.env.SECURITY_KEY, 'hex')
    const initVector = Buffer.from(process.env.INIT_VECTOR, 'hex')
    const decipher = crypto.createDecipheriv(
      process.env.ALGORITHM,
      Securitykey,
      initVector,
    )

    let decryptedData = decipher.update(payload, 'hex', 'utf-8')

    decryptedData += decipher.final('utf8')
    return decryptedData
  }
}
module.exports = new OrderService()
