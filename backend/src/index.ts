import "dotenv/config";
import cors from "cors";
import express from "express";
import { generateRouter } from "./routes/generate";
import { newsRouter } from "./routes/news";
import { angleRouter } from "./routes/angle";
import { articleRouter } from "./routes/article";
import { documentRouter } from "./routes/document";

const app = express();
const port = Number(process.env.PORT) || 4000;
const frontendUrl = process.env.FRONTEND_URL ?? "http://localhost:3000";

app.use(cors({ origin: frontendUrl }));
app.use(express.json({ limit: "1mb" }));

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "signalpost-backend" });
});

app.use("/api/generate", generateRouter);
app.use("/api/news", newsRouter);
app.use("/api/article", articleRouter);
app.use("/api/document", documentRouter);
app.use("/api/angle", angleRouter);

app.listen(port, () => {
  console.log(`SignalPost backend running at http://localhost:${port}`);
});
