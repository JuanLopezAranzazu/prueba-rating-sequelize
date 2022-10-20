const express = require("express");
const app = express();
const { config } = require("./config/config");
const port = config.port;

const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const routes = require("./routes/index");
routes(app);

const pool = require("./postgres");

class ToolService {
  constructor() {
    this.pool = pool;
    this.pool.on("error", (error) => console.log(error));
  }

  findAllByRating(status = true) {
    const string = status ? "IN" : "NOT IN";
    const query = `SELECT * FROM project WHERE id ${string} (SELECT "projectId" FROM rating WHERE true)`;
    console.log(query);
    return new Promise((resolve, reject) => {
      this.pool.query(query, (err, res) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          console.log(res.rows);
          resolve(res.rows);
        }
      });
    });
  }
}

const toolService = new ToolService();

app.use("/test", async (req, res, next) => {
  try {
    const projects = await toolService.findAllByRating(false);
    res.json(projects);
  } catch (error) {
    next(error);
  }
});

const {
  errorHandler,
  boomErrorHandler,
  logErrors,
} = require("./middleware/errorHandler");
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
