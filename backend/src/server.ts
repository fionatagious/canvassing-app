// Entry point for the backend server
import express from "express";
import apiV1Router from "./api/v1/routes";
import { applyMiddleware } from "./middleware";

const app = express();

// apply global middleware
applyMiddleware(app);

// use a public directory for static files
app.use(express.static("public"));

app.use("/api/v1", apiV1Router);

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ error: "Route not found." });
});

// listen for incoming requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// export app for vitest tests
export default app;
