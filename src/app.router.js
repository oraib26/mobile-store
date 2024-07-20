import cors from "cors";
import connectDB from "../DB/connection.js";

import authRouter from "../src/modules/auth/auth.router.js"
import userRouter from "./modules/user/user.router.js"
import categoryRouter from "./modules/category/category.router.js"
import subcategoryRouter from "./modules/subcategory/subcategory.router.js"
import productRouter from "./modules/product/product.router.js"
import couponRouter from "./modules/coupon/coupon.router.js"
import cartRouter from "./modules/cart/cart.router.js"
import orderRouter from "./modules/order/order.router.js"

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
  app.use("/coupon", couponRouter);
  app.use("/cart", cartRouter);
  app.use("/order", cartRouter);

 

}
export default initApp;
