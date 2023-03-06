const chalk = require('chalk');
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const AppError = require("./utils/appError");
const express = require('express');
const app = express();
const router = require("./Routes/GraphRoutes");
const graphicRouteur = require("./Routes/GraphRoutes");
const fs = require("fs");

/**
 * CORS definition to communicate with VueJS server
 */
const cors = require('cors');
const corsOptions ={
  origin:process.env.LOCALHOST_PORT,
  credentials:true,
  optionSuccessStatus:200
}
app.use(cors(corsOptions));

/**
 * Documentation definition
 */
const swaggerOption = {
  swaggerDefinition: (swaggerJsdoc.Options = {
    info: {
      title: "API REST",
      description: "API documentation",
      contact: {
        name: "Groupe 13",
      },
      servers: ["http://localhost:3000/"],
    },
  }),
  apis: ["app.js", "./routes/*.js"],
};
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const swaggerDocs = swaggerJsdoc(swaggerOption);
app.use("/api-docs", swaggerUi.serve,swaggerUi.setup(swaggerDocs));

/**
 * Router definition
 */
app.use("/", router);
app.use("/graphic", graphicRouteur)

/**
 * For all not defined routes
 */
app.all("*", (req, res,next) => {
  throw new AppError(`Requested URL ${req.path} not found !`, 404)
})

/**
 * Display server port
 */
app.listen(process.env.PORT, () => {
  console.log(`The server listening on port http://localhost:${process.env.PORT}`)
})

/**
 * Server usage
 */
console.log(chalk.cyan.bold.bgBlack(`Usage : \nLunch nodeJS server : \nnpm start \nLunch nodeJS server and force update : \nnpm run start_update\n`));

/**
 * Import data.json
 * @returns {Promise<null|*>}
 */
async function giveJsonValue(path) {
  if (fs.existsSync(path)) {
    try {
      const data = await fs.promises.readFile(path, 'utf8');
      if (data.trim() === '') return null;
      let obj = JSON.parse(data);
      return obj;
    } catch (err) {
      console.log(err);
      return null;
    }
  } else return null;
}

/**
 * Data refresh
 */
const dataRefresh = require('./DataRefresh/dataRefresh');
dataRefresh.serverUpdate().then(async function (response) {
  console.log(response);
  let data = await giveJsonValue("../Files/full_df.json");
  data = await data.filter(elt => elt.country && elt.country === "France");
  //console.log(data);
  const filteredData = data.map(({ YearWeekISO, cumulative_count }) => ({ YearWeekISO, cumulative_count }));
  console.log(filteredData);
}).catch(function (error) {
  console.log(error);
})
