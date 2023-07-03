import { nonExistEndpointHandler } from "./../utils";
import { IGetHandlerArgs, IRequestUser } from "../interfaces";
import usersObject from "../usersObject";
import { checkIsReceivedUserValid, checkIsUserWithIdExist } from "../utils";

const putHandler = (props: IGetHandlerArgs) => {
  const { request, response, url, users, updateUsersCallback } = props;
  if (users) {
    usersObject.setAllUsers(users);
  }
  if (url?.startsWith("/api/users/")) {
    const user = checkIsUserWithIdExist(props);
    if (!user) return;
    const chunkArr: Uint8Array[] = [];
    request.on("data", (chunk) => {
      chunkArr.push(chunk);
    });
    request.on("end", () => {
      const fullResponseUserData = Buffer.concat(chunkArr).toString();
      const requestData: IRequestUser = JSON.parse(fullResponseUserData);
      const isValid = checkIsReceivedUserValid(requestData);
      if (isValid) {
        usersObject.updateUser(user.id, requestData);
        response.statusCode = 200;
        response.end(JSON.stringify(usersObject.getOneUser(user.id)));
      } else {
        response.statusCode = 400;
        response.end(JSON.stringify("User should contain all required fields"));
      }
      if (updateUsersCallback) updateUsersCallback(usersObject.getAllUsers());
    });
  } else {
    nonExistEndpointHandler(response);
  }
};

export default putHandler;
