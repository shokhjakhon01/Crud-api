import { IUser, IUsersObject } from "./interfaces";

const usersObject: IUsersObject = {
  _allUsers: [],
  setAllUsers(users) {
    this._allUsers = users
  },
  getAllUsers() {
    return this._allUsers;
  },
  getOneUser(id) {
    return this._allUsers.find((user: IUser) => user.id === id);
  },
  createNewUser(user) {
    this._allUsers.push(user);
  },
  updateUser(id, user) {
    const index = this._allUsers.findIndex((item: IUser) => item.id === id);
    const updatedUser = { ...this._allUsers[index], ...user };
    this._allUsers[index] = updatedUser;
  },
  deleteUser(id) {
    this._allUsers = this._allUsers.filter((user: IUser) => user.id !== id);
  },
};

export default usersObject;
