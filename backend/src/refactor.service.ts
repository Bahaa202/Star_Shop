import { Request, Response, NextFunction } from "express";
import expressAsyncHandler from "express-async-handler";
import mongoose from "mongoose";
import ApiErrors from "./utils/apiErrors";
import Features from "./utils/features";
import sanitization from "./utils/sanitization";

class RefactorService {
  // Get All
  getAll = <modelType>(model: mongoose.Model<any>, modelName?: string) =>
    expressAsyncHandler(async (req: Request, res: Response) => {
      let filterData: any = {};
      if (req.filterData) filterData = req.filterData;
      const documentsCount: number = await model
        .find(filterData)
        .countDocuments();
      const features = new Features(model.find(filterData), req.query)
        .sort()
        .limitFields()
        .search(modelName!)
        .pagination(documentsCount!);
      const { mongooseQuery, pagination } = features;
      const documents: modelType[] = await mongooseQuery;
      // if (req.filterData) filterData = req.filterData;
      // const documents: modelType[] = await model.find(filterData);
      res.status(200).json({
        paginationResult: pagination,
        length: documents.length,
        data: documents,
      });
    });

  // Create a new Category
  createOne = <modelType>(model: mongoose.Model<any>) =>
    expressAsyncHandler(async (req: Request, res: Response) => {
      const document: modelType = await model.create(req.body);
      res.status(201).json({ data: document });
    });

  // Get One Category
  getOne = <modelType>(
    model: mongoose.Model<any>,
    modelName?: string,
    populationOptions?: string
  ) =>
    expressAsyncHandler(
      async (
        req: Request,
        res: Response,
        next: NextFunction
      ): Promise<void> => {
        let query: any = model.findById(req.params.id);
        if (populationOptions) query = query.populate(populationOptions);
        let document: any = await query;
        if (!document)
          return next(new ApiErrors(`${req.__("not_found")}`, 404));
        if (model.name === "User") document = sanitization.User(document);
        res.status(200).json({ data: document });
      }
    );

  // Update Category
  updateOne = <modelType>(model: mongoose.Model<any>) =>
    expressAsyncHandler(
      async (req: Request, res: Response, next: NextFunction) => {
        const document: any = await model.findOneAndUpdate(
          { _id: req.params.id },
          req.body,
          { new: true }
        );
        if (!document)
          return next(new ApiErrors(`${req.__("not_found")}`, 404));
        res.status(200).json({ data: document });
      }
    );

  // Delete Category
  deleteOne = <modelType>(model: mongoose.Model<any>) =>
    expressAsyncHandler(
      async (
        req: Request,
        res: Response,
        next: NextFunction
      ): Promise<void> => {
        const document: modelType | null = await model.findByIdAndDelete(
          req.params.id
        );
        if (!document)
          return next(new ApiErrors(`${req.__("not_found")}`, 400));
        res.status(200).json();
      }
    );
}

const refactorService = new RefactorService();
export default refactorService;
