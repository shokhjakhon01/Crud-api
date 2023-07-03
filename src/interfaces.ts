import { Worker } from "cluster";
import { IncomingMessage, ServerResponse } from "http";

export interface IRequestUser {
  username: string;
  age: number;
  hobbies: string[];
}

export interface IUser extends IRequestUser {
  id: string;
}

export interface IGetHandlerArgs {
  request: IncomingMessage;
  response: ServerResponse<IncomingMessage>;
  url: string | undefined;
  users?: IUser[];
  updateUsersCallback?: (users: IUser[]) => void;
}

export interface IUsersObject {
  _allUsers: IUser[];
  setAllUsers: (users: IUser[]) => void;
  getAllUsers: () => IUser[];
  getOneUser: (id: string) => IUser | undefined;
  createNewUser: (user: IUser) => void;
  updateUser: (id: string, user: IRequestUser) => void;
  deleteUser: (id: string) => void;
}

export interface ICheckIsExistArgs {
  response: ServerResponse<IncomingMessage>;
  url: string | undefined;
}

export interface IWorkersObj {
  [key: string]: Worker;
}
