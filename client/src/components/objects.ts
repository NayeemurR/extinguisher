const longToIndex: Record<string, number> = {
  "HASS-H": 0,
  "HASS-A": 1,
  "HASS-S": 2,
  "HASS-E": 3,
  "CI-H": 4,
  "CI-HW": 5,
};

const indexToLong: Record<number, string> = {
  0: "HASS-H",
  1: "HASS-A",
  2: "HASS-S",
  3: "HASS-E",
  4: "CI-H",
  5: "CI-HW",
};

const shortToLong: Record<string, string> = {
  hh: "HASS-H",
  ha: "HASS-A",
  hs: "HASS-S",
  he: "HASS-E",
  ci: "CI-H",
  cw: "CI-HW",
};

const longToShort: Record<string, string> = {
  "HASS-H": "hh",
  "HASS-A": "ha",
  "HASS-S": "hs",
  "HASS-E": "he",
  "CI-H": "ci",
  "CI-HW": "cw",
};

export { longToIndex, indexToLong, shortToLong, longToShort };
