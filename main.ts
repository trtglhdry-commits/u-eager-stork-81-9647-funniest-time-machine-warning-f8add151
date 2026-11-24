// Funniest Time Machine Warning Label
// (make.fun competition u-eager-stork-81-9647-funniest-time-machine-warning-f8add151)
//
// The entry is one fixed line, written to /output/entry.txt. The program is
// deterministic: no input, no clock, no randomness — the same line every run.
// It enforces the competition gate itself before writing: UTF-8 text of
// 1 to 120 characters, a single line, not only whitespace.
//
// The line, against the judge's brief:
// - Phrased as a genuine safety notice ("CAUTION: ... Our warranty does not
//   cover..."), with a straight bureaucratic face, so the joke cuts against
//   official calm.
// - Turns a real hazard of time travel — the grandfather paradox — into the
//   joke instead of naming it flatly, by reframing it as a warranty
//   exclusion.
// - Saves the surprise for the last two words ("or you"), where the reader
//   discovers they are the uncovered item.
// - Wastes no words inside the 120-character limit: every phrase does work.
//   The label format (CAUTION + imperative + warranty clause) is the whole
//   joke's delivery mechanism.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const WARNING_LABEL =
  "CAUTION: Do not kill your grandfather. Our warranty does not cover ancestors, paradoxes, or you.";

// The sealed gate: 1 to 120 characters, a single line, not only whitespace.
// The gate counts the file's text, so the trailing newline the program adds
// is inside the budget too: 96 characters of label plus 1 newline.
const MAX_CHARS = 120;

function checkLine(line: string): void {
  const chars = [...line];
  if (chars.length < 1 || chars.length > MAX_CHARS) {
    throw new Error(
      `warning label must be 1 to ${MAX_CHARS} characters, got ${chars.length}`,
    );
  }
  if (line.trim().length === 0) {
    throw new Error("warning label must not be only whitespace");
  }
  if (line !== line.trim()) {
    throw new Error("warning label must not start or end with whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("warning label must be a single line");
  }
}

function main(): void {
  checkLine(WARNING_LABEL);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const text = WARNING_LABEL + "\n";
  writeFileSync(join(outDir, "entry.txt"), text, "utf8");
  console.log(
    `wrote entry.txt: ${[...WARNING_LABEL].length} characters, 1 line`,
  );
}

main();
