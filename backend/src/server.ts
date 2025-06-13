// Entry point for the backend server
import express from "express";
import apiV1Router from "./api/v1/routes";
import { applyMiddleware } from "./middleware";
import path from "path";

const app = express();

// apply global middleware
applyMiddleware(app);

// API routes
app.use("/api/v1", apiV1Router);

// use a public directory for static (frontend build) files
app.use(express.static(path.join(__dirname, "..", "public")));

// serve the index.html file for any other routes, e.g. /contacts, /contacts/new, /contacts/:id, etc.
// React Router will handle the routing on the client side
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

// listen for incoming requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// export app for vitest tests
export default app;
