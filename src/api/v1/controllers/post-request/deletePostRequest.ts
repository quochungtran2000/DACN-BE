import { Request, Response } from 'express';

const deletePostRequest = async (req: Request, res: Response) => {
  try {
  } catch (error: any) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};

export default deletePostRequest;
