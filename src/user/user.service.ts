import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { IUser } from './user.entity';
import { UpdateUserInfoDTO } from './user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  private _findById(id: string): Promise<IUser | null> {
    return this.userModel.findById(id);
  }

  async findOneByEmail(email: string): Promise<IUser | null> {
    const existingUser: IUser | null = await this.userModel.findOne({ email });
    if (!existingUser) return null;
    return existingUser;
  }

  async list(): Promise<IUser[]> {
    return await this.userModel.find();
  }

  async create(user: IUser): Promise<IUser> {
    return await this.userModel.create(user);
  }

  async update(
    id: string,
    newInfo: Partial<UpdateUserInfoDTO>,
  ): Promise<IUser> {
    const foundUser = await this._findById(id);
    return await this.userModel.findOneAndUpdate(foundUser, newInfo, {
      new: true,
    });
  }

  async delete(id: string) {
    const foundUser = await this._findById(id);
    return await this.userModel.findOneAndDelete(foundUser);
  }
}
