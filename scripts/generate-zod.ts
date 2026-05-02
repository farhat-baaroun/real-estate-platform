import { readFile, writeFile } from 'node:fs/promises';
import process from 'node:process';
import { URL } from 'node:url';

import yaml from 'js-yaml';
import { jsonSchemaToZod } from 'json-schema-to-zod';

type OpenApiDocument = {
  components?: {
    schemas?: Record<string, unknown>;
  };
};

const SPEC_PATH = new URL('../specs/openapi.yaml', import.meta.url);
const OUTPUT_PATH = new URL('../apps/backend/src/generated/schemas.ts', import.meta.url);

const toConstName = (name: string): string => {
  const normalized = name.replace(/[^a-zA-Z0-9]/g, '_');
  return `${normalized.charAt(0).toUpperCase()}${normalized.slice(1)}Schema`;
};

async function main(): Promise<void> {
  const source = await readFile(SPEC_PATH, 'utf8');
  const openapi = yaml.load(source) as OpenApiDocument;
  const schemas = openapi.components?.schemas ?? {};

  const blocks = Object.entries(schemas).map(([name, schema]) =>
    jsonSchemaToZod(schema as Record<string, unknown>, {
      name: toConstName(name),
      type: false,
      noImport: true,
    })
  );

  const output = `import { z } from 'zod';\n\n${blocks.join('\n\n')}\n`;
  await writeFile(OUTPUT_PATH, output, 'utf8');
  process.stdout.write(`Generated Zod schemas at ${OUTPUT_PATH.pathname}\n`);
}

main().catch((error) => {
  process.stderr.write(`${String(error)}\n`);
  process.exit(1);
});
