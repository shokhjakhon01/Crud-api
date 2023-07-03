import { IUser } from "../interfaces";
import { v4 } from "uuid";
import { IGetHandlerArgs, IRequestUser } from "../interfaces";
import usersObject from "../usersObject";
import { checkIsReceivedUserValid, nonExistEndpointHandler } from "../utils";

const postHandler = (props: IGetHandlerArgs) => {
  const { request, response, url, users, updateUsersCallback } = props;
  if (users) {
    usersObject.setAllUsers(users);
  }
  if (url === "/api/users") {
    let chunkArr: Uint8Array[] = [];
    request.on("data", (chunk) => {
      chunkArr.push(chunk);
    });
    request.on("end", () => {
      const fullResponseUserData = Buffer.concat(chunkArr).toString();
      const responseData: IRequestUser = JSON.parse(fullResponseUserData);
      const isValid = checkIsReceivedUserValid(responseData);
      if (isValid) {
        const userData: IUser = { id: v4(), ...responseData };
        usersObject.createNewUser(userData);

        response.statusCode = 201;
        response.end(JSON.stringify(userData));
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

export default postHandler;
