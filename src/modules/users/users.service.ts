import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { DocumentNotFoundException } from '@exceptions/documentNotFound.exception';
import { usersSeeds } from './seeds/users.seed';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = await this.userModel.create(createUserDto);
    return newUser;
  }

  async findAll() {
    return this.userModel.find().exec();
  }

  async findOneById(id: string) {
    const targetUser = await this.userModel.findById(id).exec();
    if (!targetUser) {
      throw new DocumentNotFoundException('User', id);
    }

    targetUser.password = undefined;
    return targetUser;
  }

  async findOneByLogin(login: string) {
    const targetUser = await this.userModel.findOne({ login }).exec();
    if (!targetUser) {
      throw new DocumentNotFoundException('User');
    }

    return targetUser;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();

    if (!updatedUser) {
      throw new DocumentNotFoundException('User', id);
    }

    return updatedUser;
  }

  async remove(id: string) {
    const deletedUser = await this.userModel.findByIdAndRemove(id).exec();
    if (!deletedUser) {
      throw new DocumentNotFoundException('User', id);
    }

    return deletedUser;
  }

  async onModuleInit() {
    const countDocuments = await this.userModel.countDocuments();
    if (!countDocuments) {
      await this.userModel.insertMany(usersSeeds);
    }
  }
}
