import { Express } from "express";
import { tourRoutes } from "./tour.route";
import { categoryRoutes } from "./category.route";
import { cartRoutes } from "./cart.route";
import { orderRoutes } from "./order.route";

const clientRoutes = (app: Express): void => {
  app.use(`/tours`, tourRoutes);
  app.use(`/order`, orderRoutes);
  app.use(`/categories`, categoryRoutes);
  app.use(`/cart`, cartRoutes);
};

export default clientRoutes;
