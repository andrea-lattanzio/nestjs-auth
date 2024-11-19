import { Body, Controller, Delete, Get, Post, Put, Req, Request, UseGuards } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { UpdateUserInfoDTO } from "src/user/user.dto";

@Controller('user')
export class UserController {
  constructor(private userSrv: UserService) {}

  @Get()
  async list() {
    return await this.userSrv.list();
  }
  
  @Put()
  async update(@Req() req, @Body() body: UpdateUserInfoDTO) {
    return await this.userSrv.update(req.user.id, body);
  }

  @Delete()
  async delete(@Req() req) {
    return await this.userSrv.delete(req.user.id);
  }
}