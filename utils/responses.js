module.exports = {
  token_invalid: () => {
    return {
      status: 400,
      message: "invalid token",
    }
  },
  data_errors: (errors) => {
    return{
      status: 400,
      message: "Data errors",
      errors: errors
    }
  },
  not_found: (message="the url does not exist") => {
    return {
      status: 404,
      message: message,
    }
  },
  not_allowed: () => {
    return {
      status: 501,
      message: "you do not have access to the resource",
    }
  },
  success : (data = null) => {
    if(data===null){
      return {
        status: 200,
      }
    }else{
      return {
        status: 200,
        data: data,
      }
    }
  }
}