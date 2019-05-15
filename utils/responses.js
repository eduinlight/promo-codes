module.exports = {
  token_invalid: () => {
    return {
      status: 400,
      message: "el token es inválido",
    }
  },
  data_errors: (errors) => {
    return{
      status: 400,
      message: "existen errores en los datos",
      errors: errors
    }
  },
  not_found: () => {
    return {
      status: 404,
      message: "la url no existe",
    }
  },
  not_allowed: () => {
    return {
      status: 501,
      message: "usted no tiene acceso al recurso",
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