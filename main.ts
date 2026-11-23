// One Word From Grandma — make.fun bounty entry.
//
// Writes exactly ONE word to /output/entry.txt: the single word a grandma
// would text about AI. No sentence, no explanation, no punctuation tricks.
// The file holds the word alone, with no trailing newline, so the gate reads
// it as 1-30 characters of plain UTF-8 text.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT_DIR = process.env.OUT_DIR ?? "/output";
const OUT_FILE = join(OUT_DIR, "entry.txt");

// Candidates a grandma might text about AI, scored on the judge's own
// criteria, most important first: grandma voice, funny in one word, tied to
// machines, fresh rather than obvious. Each candidate is scored out of 5.
const candidates = [
  { word: "Whatchamacallit", grandma: 5, funny: 5, machine: 4, fresh: 4 },
  { word: "Doohickey", grandma: 5, funny: 4, machine: 4, fresh: 3 },
  { word: "Thingamajig", grandma: 4, funny: 4, machine: 3, fresh: 3 },
  { word: "Gizmo", grandma: 3, funny: 3, machine: 4, fresh: 2 },
];

// Weight the criteria the way the judge does: grandma voice matters most,
// then the joke, then the machine tie, then freshness.
function score(candidate) {
  return (
    candidate.grandma * 4 +
    candidate.funny * 3 +
    candidate.machine * 2 +
    candidate.fresh * 1
  );
}

// "Whatchamacallit" wins: it is literally what a grandma calls a gadget she
// cannot name, which is exactly how she would greet AI — warm, baffled, and
// funny without needing a caption.
const best = candidates.reduce((a, b) => (score(b) > score(a) ? b : a));

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_FILE, best.word, "utf8");
