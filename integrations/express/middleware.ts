/* eslint-disable @typescript-eslint/no-explicit-any */
import express from "express";
import Keploy, { HTTP } from "../../src/keploy";
import { Request, Response, NextFunction } from "express";


// middleware
export default function middleware(
  keploy: Keploy
): (req: Request, res: Response, next: NextFunction) => void {
  console.log("middleware");
  
  return (req: Request, res: Response, next: NextFunction) => {
    res.on("finish", () => {
      afterMiddleware(keploy, req, res);
    });

  };
}


export function afterMiddleware(keploy: Keploy, req: Request, res: Response) {
        GetCoverage();
}

// isJsonValid checks whether o is a valid JSON or not

let count = 0;
const executedLinebyEachTest = new Array();
function GetCoverage() {
  console.log("Inside GetCoverage");
  count++;
  // iterate over global.__coverage__
  // @ts-ignore
  for (const filename in global.__coverage__) {
    console.log("FIlenamae", filename);
  }

  // while (1) {
  // @ts-ignore

  let coverageData =global.__coverage__[
      "/Users/sarthak_1/Documents/Keploy/trash/landing-page/javascript/server.js"
    ];
  console.log("Inside GetCoverage " + count);
  console.log(coverageData);
  let executedLinesByFile = {};

  // for (const filePath of Object.keys(coverageData)) {
  const executedLines = new Set();
  const fileCoverage = coverageData;
  const statementMap = fileCoverage.statementMap;
  const hitCounts = fileCoverage.s;
  if (count > 1) {
    // iterate over hitcounts and subtract the previous hitcounts
    // @ts-ignore
    var prevHitCounts = executedLinebyEachTest[count - 2];

    for (const statementId in hitCounts) {
      hitCounts[statementId] = Math.abs(
        hitCounts[statementId] - prevHitCounts[statementId]
      );
    }
  }

  for (const statementId in statementMap) {
    if (hitCounts[statementId] > 0) {
      const executedLine = statementMap[statementId].start.line;
      executedLines.add(executedLine);
    }
  }
  // @ts-ignore
  executedLinesByFile["/Users/sarthak_1/Documents/Keploy/trash/landing-page/javascript/server.js"] = Array.from(executedLines).sort((a, b) => a - b);
  // }
  // @ts-ignore
  executedLinebyEachTest.push({ ...hitCounts });

  console.log("Executed lines by file:", executedLinesByFile);
  // extract s from the coverage data
}