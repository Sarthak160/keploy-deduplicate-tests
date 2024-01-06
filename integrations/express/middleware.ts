/* eslint-disable @typescript-eslint/no-explicit-any */
import Keploy from "../../src/keploy";
import { Request, Response, NextFunction } from "express";
import http from "http";
const fs = require('fs');
const yaml = require('js-yaml');

const filePath = 'dedupData.yaml';

export default function middleware(
  keploy: Keploy
): (req: Request, res: Response, next: NextFunction) => void {
  console.log("middleware");
  
  return (req: Request, res: Response, next: NextFunction) => {
    res.on("finish", () => {
      afterMiddleware(keploy, req, res);
    });
    next();
  };
}


export function afterMiddleware(keploy: Keploy, req: Request, res: Response) {
  const id = req.get("KEPLOY_TEST_ID");
  console.log(id);
        
  var data = GetCoverage();
  // Read existing content of the file (if any)
let existingData = [];
try {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  existingData = yaml.load(fileContent) || [];
} catch (error) {
  // Handle the case where the file doesn't exist or is not valid YAML
  console.error("Error reading existing file:", error);
}

// Append the new data to the array
existingData.push(data);

// Convert the array to YAML format
const yamlData = yaml.dump(existingData);

// Write the updated YAML data back to the file
fs.writeFileSync(filePath, yamlData, 'utf-8');

// Log to the console
console.log("Executed lines by file:", executedLinebyEachTest);
console.log("Data has been appended and logged to", filePath);
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
  

  // while (1) {
  // @ts-ignore
  let coverageData = global.__coverage__[filename];
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
  executedLinesByFile[filename] = Array.from(executedLines).sort((a, b) => a - b);
  // }
  // @ts-ignore
  executedLinebyEachTest.push({ ...hitCounts });

  // console.log("Executed lines by file:", executedLinesByFile);

  // extract s from the coverage data
}
  console.log("Executed lines by file:", executedLinebyEachTest);

  return executedLinebyEachTest;
}



function sendCustomRequest(
  url: string,
  method: string,
  headers: any,
  body: string
): Promise<any> {
  return new Promise((resolve, reject) => {
    const options: http.RequestOptions = {
      method,
      headers,
    };

    const req = http.request(url, options, (res) => {
      let responseData = "";

      res.on("data", (chunk) => {
        responseData += chunk;
      });

      res.on("end", () => {
        resolve(responseData);
      });
    });

    req.on("error", (error) => {
      reject(error);
    });

    if (body) {
      req.write(body);
    }

    req.end();
  });
}

// Example usage
const url = "http://example.com";
const method = "POST";
const headers = {
  "Content-Type": "application/json",
};
const body = JSON.stringify({ message: "Hello" });

sendCustomRequest(url, method, headers, body)
  .then((response) => {
    console.log("Response:", response);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
