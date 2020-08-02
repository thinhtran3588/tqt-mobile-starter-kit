export class AppError extends Error {
  code: string;

  messageCode?: string;

  messageData?: Object;

  constructor(code: string, messageCode?: string, messageData?: Object) {
    super(code);
    this.code = code;
    this.messageCode = messageCode;
    this.messageData = messageData;
    this.name = 'AppError';
  }
}
