import { Request, Response } from "express";
import Tour from "../../models/tour.model";
import sequelize from "../../config/database";
import { QueryTypes } from "sequelize";

// [GET] /tours/:slugCategory
export const index = async (req: Request, res: Response) => {
  const slugCategory = req.params.slugCategory;

  const tours = await sequelize.query(`
    SELECT tours.*
    FROM tours
    JOIN tours_categories ON tours.id = tours_categories.tour_id
    JOIN categories ON tours_categories.category_id = categories.id
    WHERE
      categories.slug = '${slugCategory}'
      AND categories.deleted = false
      AND categories.status = 'active'
      AND tours.deleted = false
      AND tours.status = 'active';
  `, {
    type: QueryTypes.SELECT,
    raw: true
  });

  for (const tour of tours) {
    if(tour["images"]) {
      const images = JSON.parse(tour["images"]);
      tour["image"] = images[0];
    }

    tour["price_special"] = tour["price"] * (1 - tour["discount"]/100);
  }

  console.log(tours);

  res.render("client/pages/tours/index", {
    pageTitle: "Danh sách tour",
    tours: tours
  });
}

// [GET] /tours/detail/:slugTour
export const detail = async (req: Request, res: Response) => {
  const slugTour = req.params.slugTour;

  console.log(slugTour);
  
  res.render("client/pages/tours/detail", {
    pageTitle: "Chi tiết tour",
  });
};