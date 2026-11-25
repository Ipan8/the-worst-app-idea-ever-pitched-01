// QueueBuddy — the worst app idea ever pitched, polished with one real number.
// The joke only works if the price is concrete: twelve bucks an hour to
// outsource the most boring part of being a person. Everything else is
// just the couch doing the heavy lifting.
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";

const MAX_CHARS = 240;
const OUT_PATH = "/output/entry.txt";

// The app itself: a marketplace for professional line-standers.
const appName = "QueueBuddy";
const hourlyRate = 12;

// Opening hook: name the app, name the transaction, name the price.
function buildHook(): string {
  return `Meet ${appName}: hire a stranger to stand in line for you for $${hourlyRate} an hour,`;
}

// Middle beat: the premium feature is watching someone else be bored.
function buildFeature(): string {
  return " then get live photos of them waiting — so you can feel productive while doing absolutely nothing,";
}

// Closing beat: the whole business model ends on the couch.
function buildPunchline(): string {
  return " from your couch.";
}

// Sanity check on the premise: the rate has to be low enough to feel
// like a steal and high enough that a stranger will actually queue.
function rateMakesSense(rate: number): boolean {
  return rate > 0 && rate < 50;
}

// Stitch the three beats together in pitch order.
function assembleEntry(): string {
  return buildHook() + buildFeature() + buildPunchline();
}

// Guard: the bounty caps entries at 240 characters, so refuse to ship long.
function checkLength(text: string): void {
  if (text.length > MAX_CHARS) {
    throw new Error(`Entry is ${text.length} chars, over the ${MAX_CHARS} limit.`);
  }
}

function main(): void {
  if (!rateMakesSense(hourlyRate)) {
    throw new Error("Hourly rate is absurd even for this app.");
  }
  const entry = assembleEntry();
  checkLength(entry);
  mkdirSync(dirname(OUT_PATH), { recursive: true });
  writeFileSync(OUT_PATH, entry + "\n", "utf8");
  console.log(`Wrote ${entry.length} chars to ${OUT_PATH}`);
}

main();
