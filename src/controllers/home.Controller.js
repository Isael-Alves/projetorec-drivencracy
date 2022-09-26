import { STATUS_CODE } from "../enums/statusCode.enum.js";

function getHome(req, res) {
  res.status(STATUS_CODE.OK).send("<h1>Api Book Store - BACK</h1>");
}

export { getHome };