const uniq = require("lodash.uniq");
const fs = require("fs");
const parseMidi = require("midi-file").parseMidi;
const writeMidi = require("midi-file").writeMidi;

// Read MIDI file into a buffer
const input = fs.readFileSync("./test.mid");
console.log(input instanceof Buffer);

// Parse it into an intermediate representation
// This will take any array-like object.  It just needs to support .length, .slice, and the [] indexed element getter.
// Buffers do that, so do native JS arrays, typed arrays, etc.
const parsed = parseMidi(input);

const fluteTrack = parsed.tracks[0];
const controllerEvents = fluteTrack.filter((e) => e.type === "controller");
// console.log(controllerEvents.map((e) => e.controllerType))
