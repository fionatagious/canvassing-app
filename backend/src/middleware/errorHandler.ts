// This is middleware function to handle errors since Express does not handle errors by default
import { Request, Response, NextFunction } from "express";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error("Error occurred:", err);

  // set status code based on the error type or default to 500
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  // send the error response
  res.status(statusCode).json({
    message: err.message,
    // avoid exposing stack trace in prod for security
    stack: process.env.NODE_ENV === "development" && { stack: err.stack },
  });
}
