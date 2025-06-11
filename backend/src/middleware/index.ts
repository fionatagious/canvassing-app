import express, { Express } from "express";
import cors from "cors";
import helmet from "helmet";
import { errorHandler } from "./errorHandler";

// Apply global middleware to Express app instance
export function applyMiddleware(app: Express) {
  app.use(cors());
  app.use(express.json());

  // Override CSP for development
  app.use(
    helmet({
      contentSecurityPolicy: false,
    })
  );

  // Custom error handler middleware (should be last)
  app.use(errorHandler);
}
