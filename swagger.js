const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "School API",
    description: "API documentation for Students, Teachers, Departments, and Courses",
  },
  host: "localhost:3000",
  schemes: ["http"],
};

const outputFile = "./swagger.json";
const routes = ["./routes/index.js"];

swaggerAutogen(outputFile, routes, doc);
