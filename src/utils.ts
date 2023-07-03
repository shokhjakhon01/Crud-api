import { IncomingMessage, ServerResponse } from "http";
import { validate } from "uuid";
import { ICheckIsExistArgs } from "./interfaces";
import usersObject from "./usersObject";

export const checkIsReceivedUserValid = (body: any): boolean => {
  return (
    "username" in body &&
    typeof body.username === "string" &&
    "age" in body &&
    typeof body.age === "number" &&
    "hobbies" in body &&
    Array.isArray(body.hobbies) &&
    (body.hobbies.length === 0 ||
      body.hobbies.every((item: any) => typeof item === "string"))
  );
};

export const checkIsUserWithIdExist = ({
  url,
  response,
}: ICheckIsExistArgs) => {
  const requestId = url!.replace(/^\/api\/users\//, "");
  const user = usersObject.getOneUser(requestId);
  if (!validate(requestId)) {
    response.statusCode = 400;
    response.end(JSON.stringify("ID is not valid"));
  } else if (!user) {
    response.statusCode = 404;
    response.end(JSON.stringify("User with this ID does not exist"));
    return false;
  } else {
    return user;
  }
};

export const nonExistEndpointHandler = (
  response: ServerResponse<IncomingMessage>
) => {
  response.statusCode = 404;
  response.end(JSON.stringify("Error: endpoint is not exist"));
};
