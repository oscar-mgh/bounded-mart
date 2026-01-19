import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | string[] = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();

      message = typeof res === 'object' && res['message']
        ? res['message']
        : exception.message;

      if (exception instanceof NotFoundException && typeof message === 'string') {
        if (message.startsWith('Cannot')) {
          message = `The route ${request.method} ${request.url} does not exist.`;
        }
      }
    } else {

      this.logger.error(`Unhandled Exception: ${exception instanceof Error ? exception.stack : exception}`);
    }

    const messageArray = Array.isArray(message) ? message : [message];

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message: messageArray,
    });
  }
}