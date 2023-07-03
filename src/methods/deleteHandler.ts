import { nonExistEndpointHandler } from "./../utils";
import { IGetHandlerArgs } from "../interfaces";
import usersObject from "../usersObject";
import { checkIsUserWithIdExist } from "../utils";

const deleteHandler = (props: IGetHandlerArgs) => {
  const { response, url, users, updateUsersCallback } = props;
  if (users) {
    usersObject.setAllUsers(users);
  }
  if (url?.startsWith("/api/users/")) {
    const user = checkIsUserWithIdExist(props);
    if (!user) return;
    usersObject.deleteUser(user.id);
    response.statusCode = 204;
    response.end();
    if (updateUsersCallback) updateUsersCallback(usersObject.getAllUsers());
  } else {
    nonExistEndpointHandler(response);
  }
};

export default deleteHandler;
