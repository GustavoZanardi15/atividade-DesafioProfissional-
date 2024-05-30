import { Request, Response, NextFunction } from 'express';

const valueMultiplier = (req: Request, res: Response, next: NextFunction) => {
  if (req.body.value) {
    req.body.value *= 1.25;
  }
  next();
};

export default valueMultiplier;
