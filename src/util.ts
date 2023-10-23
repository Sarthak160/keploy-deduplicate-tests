/* eslint-disable @typescript-eslint/no-explicit-any */

// import { DataBytes } from "../proto/services/DataBytes";
// import { StrArr } from "../proto/services/StrArr";
// import { getExecutionContext } from "./context";
// import { GENERIC, V1_BETA2 } from "./keploy";

/**
 * Converts all of the keys of an existing object from camelCase to snake_case.
 * @param obj Any object, ideally with camelCase keys.
 * @returns A new object, with camelCase keys replaced with snake_case keys.
 */
const transformToSnakeCase = (obj: any): object => {
  const snakeCaseObj: any = {};

  for (const key of Object.keys(obj)) {
    const snakeCaseKey = key.replace(
      /[A-Z]/g,
      (char) => `_${char.toLowerCase()}`
    );
    snakeCaseObj[snakeCaseKey] = obj[key];
  }
  return snakeCaseObj;
};

export { transformToSnakeCase };



export function stringToBinary(input: string) {
  const characters = input.split("");
  const res = new Uint8Array(characters.length);

  characters.map(function (char, i) {
    const bit = char.charCodeAt(0);
    res[i] = bit;
  });
  return res;
}
