import jwtDecode from 'jwt-decode'

export const decodeToken = token => {
  try {
    let decodedToken = jwtDecode(token)
    return decodedToken
  } catch (error) {
    return false
  }
}
