/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// import * as grpc from "@grpc/grpc-js";
// import * as protoLoader from "@grpc/proto-loader";
// import { ProtoGrpcType } from "../proto/services";
// import path from "path";
// import { RegressionServiceClient } from "../proto/services/RegressionService";
// import { TestCaseReq } from "../proto/services/TestCaseReq";
// import { TestCase } from "../proto/services/TestCase";

// import { createExecutionContext, getExecutionContext } from "./context";
// import Mode, { MODE_OFF } from "./mode";

const PROTO_PATH = "../proto/services.proto";
// const packageDef = protoLoader.loadSync(path.resolve(__dirname, PROTO_PATH));
// const grpcObj = grpc.loadPackageDefinition(
//   packageDef
// ) as unknown as ProtoGrpcType;

// export const Http = "Http";
export const V1_BETA2 = "api.keploy.io/v1beta2",
  V1_BETA1 = "api.keploy.io/v1beta1",
  HTTP = "Http",
  NO_SQL = "NO_SQL",
  GENERIC = "Generic";

type AppConfigFilter = {
  urlRegex?: string;
};

type AppConfig = {
  name: string;
  host: string;
  port: number;
  delay: number;
  timeout: number;
  filter: AppConfigFilter;
  testCasePath: string;
  mockPath: string;
};

type ServerConfig = {
  url: string;
  licenseKey: string;
};




export default class Keploy {

  
}
