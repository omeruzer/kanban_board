import { Response } from "express";

const buildResponse = <T>(
  res: Response,
  statusCode: number,
  message: string,
  data: T | null
): Response => {
  return res.status(statusCode).json({ status: statusCode, message, data });
};

export const SuccessResponse = <T>(res: Response, data: T): Response => {
  return buildResponse(res, 200, "Success", data);
};

export const ErrorResponse = (
  res: Response,
  statusCode: number,
  message: string,
  data: any
): Response => {
  return buildResponse(res, statusCode, message, data);
};
