import { ExecutionContext, HttpStatus } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { LoginRequestDTO } from "src/auth/auth.dto";
import { Request, Response } from "express";


export class LocalAuthGuard extends AuthGuard('local') {
  constructor() { super(); }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();
    const body = plainToClass(LoginRequestDTO, request.body);
    const errors = await validate(body);
    const errorMessages = errors.flatMap(({ constraints }) => Object.values(constraints));
    if(errorMessages.length>0) {
      response.status(HttpStatus.BAD_REQUEST).send({
        statusCode: HttpStatus.BAD_REQUEST,
        error: 'Bad Request',
        message: errorMessages
      })
    }
    return super.canActivate(context) as Promise<boolean>;
  }
}