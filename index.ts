import express, { Express } from "express";
import moment from "moment";
import dotenv from "dotenv";
import bodyParser from "body-parser";
dotenv.config();
import { systemConfig } from "./config/system";
import adminRoutes from "./routes/admin/index.route";
import clientRoutes from "./routes/client/index.route";

const app: Express = express();
const port: number | string = process.env.PORT || 3000;

app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.static("public"));

// App Local Variables
app.locals.moment = moment;
app.locals.prefixAdmin = systemConfig.prefixAdmin;
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// Routes
clientRoutes(app);
adminRoutes(app);
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
