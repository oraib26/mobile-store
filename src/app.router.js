import cors from "cors";
import connectDB from "../DB/connection.js";

import authRouter from "../src/modules/auth/auth.router.js"
import userRouter from "./modules/user/user.router.js"
import categoryRouter from "./modules/category/category.router.js"
import subcategoryRouter from "./modules/subcategory/subcategory.router.js"
import productRouter from "./modules/product/product.router.js"

const initApp = (app, express) => {
  connectDB();
  app.use(cors());
  app.use(express.json());
  app.get("/", (req, res) => {
    return res.status(200).json({ message: "Welcome To Mobile Store" });
  });

  app.use("/auth", authRouter);
  app.use("/user",userRouter);
  app.use("/category",categoryRouter);
  app.use("/subcategory", subcategoryRouter);
  app.use("/product", productRouter);

 

}
export default initApp;
