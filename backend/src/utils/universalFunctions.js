import crypto from 'crypto';
import bcrypt from 'bcrypt'

export const sendCustomResponse = function (res, message, code, data, metaInfo = null) {
    let response = {
        message: message,
        status: code,
        data: data || {},
    };
    if (metaInfo) response.metaInfo = metaInfo;

    if (code === 500) {
        console.error(message);
    }
    return res.status(code || 200).json(response);
};

 
export function formatJoiValidationError(error) {
    const { details } = error;
    console.log("err",error)
    return {
        error: 'Validation Error',
        message: formatErrorMessage((details.body?.length)?details.body[0]:details.query[0]),
        status: error.statusCode,
        data: {},
    }
  }

  function formatErrorMessage(error) {
    console.log("error",error)
    const { message, type,context } = error;
    let fieldName = message.match(/"([^"]+)"/)[1];
     fieldName = fieldName.charAt(0).toUpperCase() + fieldName.slice(1);

    switch (type) {
      case 'any.required':
        return `${fieldName} is required`;
      case 'string.min':
        return `${fieldName} should have at least ${detail.context.limit} characters`;
        case 'string.empty':
            return `${fieldName} is not allowed to be empty`;
            case 'number.base':
              return `${fieldName} must be a number`;
              case 'string.pattern.base':
              return `${fieldName} should be strong`;
              case 'any.only':
                return `${fieldName} must be one of ${context.valids}`;
                case 'array.base':
                  return `${fieldName}  must be an array`;
      default:
        return message;
    }
  }
  
  export function generatePassword (password){
      return  bcrypt.hash(password, 10);
  }

  export function comparePasswords(candidatePassword, hashedPassword) {
    return bcrypt.compare(candidatePassword, hashedPassword);
  }
