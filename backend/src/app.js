const express =
  require("express");

const cors =
  require("cors");

const app =
  express();

// MIDDLEWARE
app.use(
  cors({
    origin:
      "https://smart-campus-connect-iota.vercel.app",
    credentials: true,
  })
);

app.use(express.json());

// ROUTES
const userRoutes =
  require(
    "./routes/user.routes"
  );

const orderRoutes =
  require(
    "./routes/order.routes"
  );

const foodRoutes =
  require(
    "./routes/food.routes"
  );

const libraryRoutes =
  require(
    "./routes/library.routes"
  );

const bookRoutes =
  require(
    "./routes/book.routes"
  );

const busRoutes =
  require(
    "./routes/bus.routes"
  );


  const stationeryRoutes =
  require(
    "./routes/stationery.routes"
  );

// USE ROUTES
app.use(
  "/",
  userRoutes
);

app.use(
  "/",
  orderRoutes
);

app.use(
  "/",
  foodRoutes
);

app.use(
  "/library",
  libraryRoutes
);

app.use(
  "/books",
  bookRoutes
);

app.use(
  "/buses",
  busRoutes
);

app.use(
  "/stationery",
  stationeryRoutes
);

module.exports =
  app;