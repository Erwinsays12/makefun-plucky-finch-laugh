// One Line, One Laugh — make.fun entry.
//
// The program scores a small pool of original one-line jokes against a
// rubric that mirrors the judge's brief, then writes the best-scoring line
// to /output/entry.txt.
//
// The judge weighs, most important first:
//   1. funny on its own, no picture or setup
//   2. the laugh arrives fast, the punchline lands inside the line
//   3. a fresh angle, an unexpected image, word or twist
//   4. tight wording, every word earns its place
//   5. holds up on a second read, easy to repeat
// The weights below follow that same order: 5, 4, 3, 2, 1.
//
// Deterministic: no network, no clock, no randomness. The output is one
// line of 1-200 characters, written with no trailing newline.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

type Scores = {
  standalone: number; // funny on its own, no picture or setup
  fast: number; // the punchline lands inside the line
  fresh: number; // an unexpected image, word or twist
  tight: number; // every word earns its place
  holdsUp: number; // still amuses on a second read, easy to repeat
};

type Candidate = { text: string; scores: Scores };

const WEIGHTS: Scores = { standalone: 5, fast: 4, fresh: 3, tight: 2, holdsUp: 1 };

const CANDIDATES: Candidate[] = [
  {
    // Three beats: the setup, the punch ("cancelled plans"), and the kicker
    // (the therapist treating an introvert's joy as a clinical breakthrough).
    text: "My therapist asked what brings me joy. I said 'cancelled plans.' She wrote it down like it was a breakthrough.",
    scores: { standalone: 5, fast: 4, fresh: 5, tight: 4, holdsUp: 5 },
  },
  {
    // One vivid image: the GPS voice as a disappointed mother.
    text: "My GPS said 'recalculating' in the exact tone my mother uses when I've disappointed her again.",
    scores: { standalone: 4, fast: 5, fresh: 4, tight: 5, holdsUp: 4 },
  },
  {
    // Deadpan logic gag: the watch is right, and the owner was there.
    // The "sassy health device" frame is familiar, so freshness is lower.
    text: "I asked my smartwatch how I slept. It said 'poorly.' I said, 'I know, I was there.'",
    scores: { standalone: 5, fast: 5, fresh: 3, tight: 5, holdsUp: 4 },
  },
  {
    // Horoscope promise, landlord delivery, eviction kicker.
    text: "My horoscope said I'd meet someone special today. It was my landlord, and he brought an eviction notice.",
    scores: { standalone: 4, fast: 4, fresh: 4, tight: 4, holdsUp: 3 },
  },
  {
    // The printer as a cat: it only performs when it senses fear.
    text: "My printer only works when it senses fear. It's basically a cat with a paper tray.",
    scores: { standalone: 4, fast: 4, fresh: 5, tight: 5, holdsUp: 3 },
  },
  {
    // Wordplay on the dog's name; the walk outlasts the joke.
    text: "I named my dog 'Five Minutes' so I can finally tell people I'm out walking Five Minutes.",
    scores: { standalone: 3, fast: 4, fresh: 4, tight: 4, holdsUp: 4 },
  },
  {
    // Encouragement, death, ghosting: three small turns, thin payoff.
    text: "I told my plants I was proud of them. They died anyway. Even nature ghosts me now.",
    scores: { standalone: 3, fast: 4, fresh: 3, tight: 4, holdsUp: 3 },
  },
  {
    // Autocorrect knows the owner better than the owner does.
    text: "My phone autocorrected 'I love you' to 'I love tacos,' and honestly it has never understood me better.",
    scores: { standalone: 4, fast: 4, fresh: 3, tight: 5, holdsUp: 4 },
  },
];

function total(c: Candidate): number {
  return (
    c.scores.standalone * WEIGHTS.standalone +
    c.scores.fast * WEIGHTS.fast +
    c.scores.fresh * WEIGHTS.fresh +
    c.scores.tight * WEIGHTS.tight +
    c.scores.holdsUp * WEIGHTS.holdsUp
  );
}

function main(): void {
  for (const c of CANDIDATES) {
    console.log(`  ${total(c)} pts (${c.text.length} chars): ${c.text}`);
  }
  let best = CANDIDATES[0];
  for (const c of CANDIDATES.slice(1)) {
    if (total(c) > total(best)) best = c;
  }

  const line = best.text;
  if (line.length < 1 || line.length > 200) {
    throw new Error(`entry is ${line.length} characters, must be 1-200`);
  }
  if (line.trim().length === 0) {
    throw new Error("entry is only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }

  const outDir = process.env.OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), line, "utf8");
  console.log(`picked (${total(best)} pts, ${line.length} chars): ${line}`);
}

main();
