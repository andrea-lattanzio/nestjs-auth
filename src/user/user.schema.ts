import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { AuthProvider, IUser, UserRole } from './user.entity';

export type UserDocument = HydratedDocument<User>;

@Schema({
  toJSON: {
    virtuals: true,
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.createdAt;
      delete ret.updatedAt;
      delete ret.password;
      delete ret.role;
      delete ret.authProvider;
      delete ret.__v;
    },
  },
  timestamps: true,
})
export class User implements IUser {
  id?: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  lastname: string;

  @Prop({ type: String, enum: AuthProvider, required: true })
  authProvider: AuthProvider;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop({ required: true, enum: UserRole, default: UserRole.MEMBER })
  role: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual('fullName').get(function () {
  return `${this.name} ${this.lastname}`;
});
