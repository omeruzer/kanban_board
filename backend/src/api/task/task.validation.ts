import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../../common/ServiceResponse";
const Joi = require("joi");

const TaskStatusEnum = ["To Do", "In Progress", "Done"] as const;

class TaskValidation {
  createTaskValidation(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
    });

    const validationResult = schema.validate(req.body, {
      abortEarly: false,
    });

    if (validationResult.error) {
      const errorMessage = validationResult.error.details
        .map((detail: any) => detail.message)
        .join(", ");
      return ErrorResponse(res, 422, errorMessage, null);
    }

    next();
  }
  updateTaskValidation(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
      status: Joi.string()
        .valid(...TaskStatusEnum)
        .required(),
    });

    const validationResult = schema.validate(req.body, {
      abortEarly: false,
    });

    if (validationResult.error) {
      const errorMessage = validationResult.error.details
        .map((detail: any) => detail.message)
        .join(", ");
      return ErrorResponse(res, 422, errorMessage, null);
    }

    next();
  }
  statusTaskValidation(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      status: Joi.string().valid('todo', 'inprogress', 'done').required()
    });

    const validationResult = schema.validate(req.query, {
      abortEarly: false,
    });

    if (validationResult.error) {
      const errorMessage = validationResult.error.details
        .map((detail: any) => detail.message)
        .join(", ");
      return ErrorResponse(res, 422, errorMessage, null);
    }

    next();
  }
}

export const taskValidation = new TaskValidation();
