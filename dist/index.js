import express from "express";
import fs from "fs";
import cors from "cors";
const PORT = 4000;
const REPORTS_FILE_PATH = "./data/reports.json";
const app = express();
app.use(cors());
app.use(express.json());
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
// handle request to block or revoke a report of given id
app.put("/reports/:id", (req, res) => {
    const reportId = req.params.id;
    const newState = req.body.ticketState;
    const data = fs.readFileSync(REPORTS_FILE_PATH, "utf8");
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
            const allReports = reportsJSON["elements"];
            const openReports = [];
            allReports.forEach((report) => {
                if (report.state === "OPEN" || report.state === "REVOKED") {
                    openReports.push(report);
                }
            });
            res.status(200).json(openReports);
        }
        catch (err) {
            console.log(err);
            res.status(500).end();
            return;
        }
    });
});
//# sourceMappingURL=index.js.map