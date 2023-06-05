"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const fs = require("fs");
const cors = require("cors");
const PORT = 4000;
const app = express();
app.use(cors());
app.use(express.json());
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
app.put("/reports/:id", (req, res) => {
    const reportId = req.params.id;
    console.log(req);
    res.end();
});
app.get("/reports", (_, res) => {
    fs.readFile("./data/reports.json", "utf8", (err, data) => {
        if (err) {
            console.log(err);
            return;
        }
        try {
            const reportsData = JSON.parse(data);
            const reports = reportsData["elements"];
            const openReports = [];
            for (let i = 0; i < reports.length; i++) {
                if (reports[i].state === "OPEN") {
                    openReports.push(reports[i]);
                }
            }
            console.log(openReports);
            res.json(JSON.parse(data));
        }
        catch (err) {
            console.log(err);
            return;
        }
    });
});
//# sourceMappingURL=index.js.map