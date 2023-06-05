import express from "express";
import fs from "fs";
import cors from "cors";
import { Report } from "./types.tsx";

const PORT = 4000;
const REPORTS_FILE_PATH: string = "./data/reports.json";
const app = express();

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// handle request to block or revoke a report of given id
app.put("/reports/:id", (req, res) => {
  const reportId: string = req.params.id;
  const newState: string = req.body.ticketState;
  const data: string = fs.readFileSync(REPORTS_FILE_PATH, "utf8");
  const reportsJSON = JSON.parse(data);
  const allReports = reportsJSON["elements"];
  const resolvedReport = allReports.find((report) => report.id === reportId);
  resolvedReport.state = newState;
  fs.writeFileSync(REPORTS_FILE_PATH, JSON.stringify(reportsJSON));
  res.status(200).end();
});

// handle request to get all open reports
app.get("/reports", (_, res) => {
  fs.readFile(REPORTS_FILE_PATH, "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).end();
      return;
    }
    try {
      const reportsJSON = JSON.parse(data);
      const allReports: Report[] = reportsJSON["elements"];
      const openReports: Report[] = [];
      allReports.forEach((report) => {
        if (report.state === "OPEN" || report.state === "REVOKED") {
          openReports.push(report);
        }
      });
      res.status(200).json(openReports);
    } catch (err) {
      console.log(err);
      res.status(500).end();
      return;
    }
  });
});
