import productsSchema from "./products.schema";
import { Products } from "./products.interface";
import refactorService from "../refactor.service";
import { NextFunction, Request, Response } from "express";
import sharp from "sharp";
import { uploadMultiFiles } from "../middlewares/uploadFiles.middleware";

class ProductsService {
  getAll = refactorService.getAll<Products>(productsSchema, "products");
  createOne = refactorService.createOne<Products>(productsSchema);
  getOne = refactorService.getOne<Products>(
    productsSchema,
    "products",
    "reviews"
  );
  updateOne = refactorService.updateOne<Products>(productsSchema);
  deleteOne = refactorService.deleteOne<Products>(productsSchema);

  uploadImages = uploadMultiFiles(
    ["image"],
    [
      { name: "cover", maxCount: 1 },
      { name: "images", maxCount: 5 },
    ]
  );
  saveImage = async (req: Request, res: Response, next: NextFunction) => {
    if (req.files) {
      if (req.files.cover) {
        const fileName: string = `product-${Date.now()}-cover.webp`;
        await sharp(req.files.cover[0].buffer)
          .resize(1200, 1200)
          .webp({ quality: 95 })
          .toFile(`uploads/images/products/${fileName}`);
        req.body.cover = fileName;
      }
      if (req.files.images) {
        req.body.images = [];
        await Promise.all(
          req.files.images.map(async (image: any, index: number) => {
            const fileName: string = `product-${Date.now()}-image-N${
              index + 1
            }.webp`;
            await sharp(image.buffer)
              .resize(1200, 1200)
              .webp({ quality: 95 })
              .toFile(`uploads/images/products/${fileName}`);
            req.body.images.push(fileName);
          })
        );
      }
    }
    next();
  };
  // }    saveImage = async (req: Request, res: Response, next: NextFunction) => {
  //     if (req.file) {
  //         const fileName: string = `product-${Date.now()}-cover.webp`;
  //         await sharp(req.file.buffer)
  //             .resize(1200, 1200)
  //             .webp({quality: 95})
  //             .toFile(`uploads/images/products/${fileName}`);
  //         req.body.cover = fileName;
  //     }
  //     next();
  // }
}

const productsService = new ProductsService();
export default productsService;
