import path from "node:path";
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import yaml from "js-yaml";
import storyboard from "../src/index.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const { safeDump, JSON_SCHEMA } = yaml;

await writeFile(
  path.resolve(__dirname, "../mock-micro-apps/demo/storyboard.yaml"),
  safeDump(storyboard, {
    indent: 2,
    schema: JSON_SCHEMA,
    skipInvalid: true,
    noRefs: true,
    noCompatMode: true,
  })
);

await writeFile(
  path.resolve(__dirname, "../mock-micro-apps/demo/storyboard.json"),
  JSON.stringify(storyboard, null, 2)
);
