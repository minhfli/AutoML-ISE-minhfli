import jwt from 'jsonwebtoken'


const generateToken = (user: { _id: any; role: any }, secretSignature: jwt.Secret, tokenLife: any) =>
  new Promise((resolve, reject) => {
    const { _id, role } = user
    jwt.sign({ _id, role }, secretSignature, { expiresIn: tokenLife }, (error, token) => {
      if (error) {
        return reject(error)
      }
      resolve(token)
    })
  })

const verifyToken = (token: string, secretSignature: jwt.Secret | jwt.GetPublicKeyOrSecret, options: jwt.VerifyOptions & { complete: true }) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, secretSignature, options, (error, decoded) => {
      if (error) {
        return reject(error)
      }
      return resolve(decoded)
    })
  })

export { generateToken, verifyToken }
