class ErrorResponse extends Error {
    constructor(message, code) {
      super(message);
      this.status = code;
    }
}
  
export default ErrorResponse;
  