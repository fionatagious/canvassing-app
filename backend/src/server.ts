// This file is the entry point for the backend server
import express from "express";
import cors from "cors";
import apiV1Router from "./api/v1/routes";
import helmet from "helmet";

const app = express();

// apply global middleware
app.use(cors());
app.use(express.json());

// override CSP
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

app.use("/api/v1", apiV1Router);

// listen for incoming requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
