import { IGetHandlerArgs } from "../interfaces";
import usersObject from "../usersObject";
import { checkIsUserWithIdExist, nonExistEndpointHandler } from "../utils";

const getHandler = (props: IGetHandlerArgs) => {
  const { response, url, users, updateUsersCallback } = props;
  if (users) {
    usersObject.setAllUsers(users);
  }

  if (url === "/api/users") {
    response.statusCode = 200;
    response.end(JSON.stringify(usersObject.getAllUsers()));
  } else if (url?.startsWith("/api/users/")) {
    const user = checkIsUserWithIdExist(props);
    if (user) {
      response.statusCode = 200;
      response.end(JSON.stringify(user));
    }
  } else {
    nonExistEndpointHandler(response);
  }
  if (updateUsersCallback) updateUsersCallback(usersObject.getAllUsers());
};

export default getHandler;
