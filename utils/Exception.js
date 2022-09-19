export function Exception(message, innerException = null) {
  this.message = message;
  this.innerException = innerException;
}

export function NetworkException(message, statuscode, innerException = null) {
  this.message = message;
  this.status = statuscode;
  this.innerException = innerException;
}
