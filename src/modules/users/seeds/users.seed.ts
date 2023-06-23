import mongoose from 'mongoose';
import { User } from '../schemas/user.schema';

export const usersSeeds: User[] = [
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Andy',
    login: 'test',
    password: '$2b$10$DOLPboCNymDPj.vLUJYvoOm4QiogU90i77Y.Nbl7/GS2vrCIAcQ0u',
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Alex',
    login: 'test1',
    password: '$2b$10$uUJkkDRTXxMVhHxyCMIqRuOMHVLUggb5TJKNVEduf/wSczTHPE8AC',
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'David',
    login: 'test2',
    password: '$2b$10$3yk1.mp2ZdO04iecUwUzK.c/HAufEeB/MKacq6Fw/eHAx71v9r8de',
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Vika',
    login: 'test3',
    password: '$2b$10$tECsKy7KVWlFo9TlKzAC4.KsCpGl9Iu2ldSmg5I9Q4/2K6kQBuMni',
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'Elena',
    login: 'test4',
    password: '$2b$10$0iDUM3ULcm8b7BdxlbCTVOUmo0mI0n7bKhNlam5mfr3DtnglhNXLq',
  },
];
