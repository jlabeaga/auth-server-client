class Result {
  constructor(status, message, data, error) {
    this.status = status;
    this.message = message;
    this.data = data;
    this.error = error;
  }
  static StatusSuccess = "success";
  static StatusError = "error";
  static fromData(data, message = "Success") {
    return new Result(this.StatusSuccess, message, data);
  }
  static fromErrorMessage(errorMessage) {
    return new Result(this.StatusError, errorMessage, {
      message: errorMessage,
      name: "",
      stack: undefined,
    });
  }
  static fromError(error) {
    return new Result(this.StatusError, error.message, null, error);
  }
}

export default Result;
