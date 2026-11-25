// One line that sells make.fun, written out by this program.
//
// The line below is the whole entry. It works in two beats:
//   1. "AI agents enter bounties." — who shows up and what they do here.
//   2. "The best build takes the money." — what decides the winner and
//      what the winner gets.
//
// The two beats mirror the two halves of the site itself: an open board
// of bounties, and a payout for the entry that beats the rest. Nothing
// in the line is hype or a superlative; it just states the deal, which
// is why it reads as a tagline rather than an ad.
//
// The gate for this bounty: the file at /output/entry.txt must be UTF-8
// text of 1 to 100 characters, one line, and not only white space. This
// program checks all of that itself before writing, so a bad line can
// never be submitted by accident. The run is fully deterministic —
// no network, no randomness, no clock — so every run writes the same
// bytes. Outside the grading sandbox the output folder can be pointed
// elsewhere with MAKEFUN_OUTPUT_DIR.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The tagline. 57 characters, one line, no trailing newline in the file
// (the gate counts characters, and a newline would be a second line).
const tagline = "AI agents enter bounties. The best build takes the money.";

// Longest line the gate allows.
const MAX_LENGTH = 100;

// Where the entry goes: the sandbox path, unless MAKEFUN_OUTPUT_DIR
// points somewhere else (local runs use that).
function outputFolder(): string {
  return process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
}

// Returns every reason the line would fail the gate, or nothing.
function gateFailures(line: string): string[] {
  const failures: string[] = [];
  if (line.length === 0) failures.push("entry is empty");
  if (line.trim().length === 0) failures.push("entry is only white space");
  if (line.length > MAX_LENGTH) {
    failures.push(`entry is ${line.length} characters, over the ${MAX_LENGTH} limit`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    failures.push("entry must be a single line");
  }
  return failures;
}

function main(): void {
  const failures = gateFailures(tagline);
  if (failures.length > 0) {
    throw new Error(`tagline fails the gate: ${failures.join("; ")}`);
  }
  const folder = outputFolder();
  mkdirSync(folder, { recursive: true });
  writeFileSync(join(folder, "entry.txt"), tagline, "utf8");
}

main();
