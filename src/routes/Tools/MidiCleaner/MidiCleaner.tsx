// THIS DOESN'T WORK :(

import { Button, Checkbox, FormGroup, Grid, Typography } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import React from "react";
import { parseMidi, writeMidi } from "midi-file";
import { Buffer } from "buffer";

const CC_TYPES = [
  {
    code: 0,
    label: "Bank Select (MSB)",
  },
  {
    code: 1,
    label: "Modulation Wheel",
  },
  {
    checked: true,
    code: 2,
    label: "Breath controller",
  },
  {
    code: 3,
    label: "Undefined",
  },
  {
    code: 4,
    label: "Foot Pedal (MSB)",
  },
  {
    code: 5,
    label: "Portamento Time (MSB)",
  },
  {
    code: 6,
    label: "Data Entry (MSB)",
  },
  {
    checked: true,
    code: 7,
    label: "Volume (MSB)",
  },
  {
    code: 8,
    label: "Balance (MSB",
  },
  {
    code: 9,
    label: "Undefined",
  },
  {
    checked: true,
    code: 10,
    label: "Pan position (MSB)",
  },
  {
    code: 11,
    label: "Expression (MSB)",
  },
  {
    code: 12,
    label: "Effect Control 1 (MSB)",
  },
  {
    code: 13,
    label: "Effect Control 2 (MSB)",
  },
  {
    code: 14,
    label: "Undefined",
  },
  {
    code: 15,
    label: "Undefined",
  },
  {
    code: 16,
    codeMin: 16,
    codeMax: 19,
    label: "General Purpose",
  },
  {
    code: 20,
    checked: true,
    codeMin: 20,
    codeMax: 31,
    label: "Undefined",
  },
  {
    code: 32,
    codeMin: 32,
    codeMax: 63,
    label: "Controller 0-31",
  },
  {
    code: 64,
    label: "Hold Pedal (on/off)",
  },
  {
    code: 65,
    label: "Portamento (on/off)",
  },
  {
    code: 66,
    label: "Sostenuto Pedal (on/off)",
  },
  {
    code: 67,
    label: "Soft Pedal (on/off)",
  },
  {
    code: 68,
    label: "Legato Pedal (on/off)",
  },
  {
    code: 69,
    label: "Hold 2 Pedal (on/off)",
  },
  {
    code: 70,
    label: "Sound Variation",
  },
  {
    code: 71,
    label: "Resonance (Timbre)",
  },
  {
    code: 72,
    label: "Sound Release Time",
  },
  {
    code: 73,
    label: "Sound Attack Time",
  },
  {
    code: 74,
    label: "Frequency Cutoff (Brightness)",
  },
  {
    code: 75,
    label: "Sound Control 6",
  },
  {
    code: 76,
    label: "Sound Control 7",
  },
  {
    code: 77,
    label: "Sound Control 8",
  },
  {
    code: 78,
    label: "Sound Control 9",
  },
  {
    code: 79,
    label: "Sound Control 10",
  },
  {
    code: 80,
    label: "Decay or General Purpose Button 1 (on/off) Roland Tone level 1",
  },
  {
    code: 81,
    label:
      "Hi Pass Filter Frequency or General Purpose Button 2 (on/off) Roland Tone level 2",
  },
  {
    code: 82,
    label: "General Purpose Button 3 (on/off) Roland Tone level 3",
  },
  {
    code: 83,
    label: "General Purpose Button 4 (on/off) Roland Tone level 4",
  },
  {
    code: 84,
    label: "Portamento Amount",
  },
  {
    code: 85,
    codeMin: 85,
    codeMax: 90,
    label: "Undefined",
  },
  {
    checked: true,
    code: 91,
    label: "Reverb Level",
  },
  {
    code: 92,
    label: "Tremolo Level",
  },
  {
    checked: true,
    code: 93,
    label: "Chorus Level",
  },
  {
    code: 94,
    label: "Detune Level",
  },
  {
    code: 95,
    label: "Phaser Level",
  },
  {
    code: 96,
    label: "Data Button increment",
  },
  {
    code: 97,
    label: "Data Button decrement",
  },
  {
    code: 98,
    label: "Non-registered Parameter (LSB)",
  },
  {
    code: 99,
    label: "Non-registered Parameter (MSB)",
  },
  {
    code: 100,
    label: "Registered Parameter (LSB)",
  },
  {
    code: 101,
    label: "Registered Parameter (MSB)",
  },
  {
    code: 102,
    codeMin: 102,
    codeMax: 119,
    label: "Undefined",
  },
  {
    code: 120,
    label: "All Sound Off",
  },
  {
    checked: true,
    code: 121,
    label: "All Controllers Off",
  },
  {
    code: 122,
    label: "Local Keyboard (on/off)",
  },
  {
    code: 123,
    label: "All Notes Off",
  },
  {
    code: 124,
    label: "Omni Mode Off",
  },
  {
    code: 125,
    label: "Omni Mode On",
  },
  {
    code: 126,
    label: "Mono Operation",
  },
  {
    code: 127,
    label: "Poly Mode",
  },
];

const NUM_ROWS = Math.ceil(CC_TYPES.length / 2);

const ITEMS: typeof CC_TYPES = [];
for (let idx = 0; idx < NUM_ROWS; idx++) {
  ITEMS.push(CC_TYPES[idx]);
  const idx2 = idx + NUM_ROWS;
  if (CC_TYPES[idx2]) {
    ITEMS.push(CC_TYPES[idx2]);
  }
}

function downloadFile(filename: string, blob: Blob) {
  const url = window.URL.createObjectURL(new Blob([blob]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);

  document.body.appendChild(link);
  link.click();
  link.parentNode?.removeChild(link);
}

export function MidiCleaner() {
  const [checkedState, setCheckedState] = React.useState<{
    [key: number]: boolean;
  }>(
    Object.fromEntries(
      CC_TYPES.map((item) => [item.code, item.checked ?? false])
    )
  );

  const doThing = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    reader.onload = () => {
      // @ts-expect-error TS can't handle this :(
      const midiResult = parseMidi(Buffer.from(reader.result));

      for (let index = 0; index < midiResult.tracks.length; index++) {
        const track = midiResult.tracks[index];
        const trackFiltered = track.filter(
          (midiEvent) =>
            midiEvent.type !== "controller" ||
            !checkedState[midiEvent.controllerType]
        );
        midiResult.tracks[index] = trackFiltered;
      }

      downloadFile(
        e.target.files?.[0].name as string,
        new Blob([Buffer.from(writeMidi(midiResult))])
      );
    };
    const file = e.target.files?.[0];
    if (file) {
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div>
      <Typography sx={{ mb: 2 }}>
        This is a tool to clean up some MIDI data.
      </Typography>

      <Typography sx={{ mb: 2 }}>
        In MuseScore 3, when exporting to MIDI, there seems to be a lot of
        additional MIDI CC data that also gets exported. I end up clearing out
        all of this data manually. I decided to build this tool to avoid having
        to do that.
      </Typography>

      <Typography sx={{ mb: 2 }}>
        Below is a list of all possible MIDI CC data types.{" "}
        <strong>
          The types that are checked will result in removing MIDI data of that
          type.
        </strong>{" "}
        That is, select the types that you want to remove.
      </Typography>

      <Button variant="contained" component="label">
        Upload
        <input hidden accept="midi" multiple type="file" onChange={doThing} />
      </Button>

      <FormGroup>
        <Grid container>
          {ITEMS.map((item, idx) => {
            const codeLabel = item.codeMin
              ? `${item.codeMin}-${item.codeMax}`
              : item.code;
            const defaultChecked = item.checked ?? false;
            const checked = checkedState[item.code] ?? defaultChecked;
            return (
              <Grid item key={idx} xs={12} md={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checked}
                      onChange={() =>
                        setCheckedState({
                          ...checkedState,
                          [item.code]: !checked,
                        })
                      }
                    />
                  }
                  label={
                    <>
                      {codeLabel} &#8212; {item.label}
                    </>
                  }
                />
              </Grid>
            );
          })}
        </Grid>
      </FormGroup>
    </div>
  );
}
