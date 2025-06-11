// Entry point for the backend server
import express from "express";
import apiV1Router from "./api/v1/routes";
import { applyMiddleware } from "./middleware";

const app = express();

// apply global middleware
applyMiddleware(app);

app.use("/api/v1", apiV1Router);

// listen for incoming requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
