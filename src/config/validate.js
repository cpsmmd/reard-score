/**
 * 验证邮箱格式
 * @param email
 * @returns {boolean}
 */
function emailValidate (email) {
  var emailReg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
  return emailReg.test(email)
}
/**
 * 验证密码8-16位字母数字组合
 * @param password
 * @returns {boolean}
 */
function passwordValidate (password) {
  var passwordReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/
  return passwordReg.test(password)
}
export { emailValidate, passwordValidate }
