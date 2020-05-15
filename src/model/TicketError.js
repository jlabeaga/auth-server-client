class TicketError {
  constructor(originalError) {
    this.ticket = "AUTH_SERVER_TICKET_" + new Date().toISOString();
    this.name = originalError.name;
    this.message = originalError.message;
    this.stack = originalError.stack;
  }
  static fromError(err) {
    return new TicketError(err);
  }
  static fromErrorMessage(message) {
    const error = new Error(message);
    return new TicketError(error);
  }
}

export default TicketError;
