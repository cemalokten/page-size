interface Colour {
  text: string;
  bg1: string;
  bg2: string;
  [key: string]: string;
}

export type Colours =
  | "green"
  | "red"
  | "blue"
  | "purple"
  | "orange"
  | "darkgreen"
  | "darkblue"
  | "grey";

interface Path {
  path: string;
}

type Paths = 1 | 2 | 3 | 4 | 5;

export function create_svg(kb: number, colour: Colours): string {
  const kb_string_length = kb.toString().length;
  const width = [120, 127, 134, 141, 148][kb_string_length - 1];

  const colours: Record<Colours, Colour> = {
    green: {
      text: "#047704",
      bg1: "#C7FFC7",
      bg2: "#E3FFE3",
    },
    red: {
      text: "#EA4641",
      bg1: "#FFE1DF",
      bg2: "#FDF0EF",
    },
    blue: {
      text: "#0030AB",
      bg1: "#BEE0FF",
      bg2: "#DCEEFF",
    },
    purple: {
      text: "#561ECD",
      bg1: "#D8D8FF",
      bg2: "#E6E6FA",
    },
    orange: {
      text: "#FF3D00",
      bg1: "#FFD8C1",
      bg2: "#FFE5D7",
    },
    darkgreen: {
      text: "#52FF00",
      bg1: "#103D00",
      bg2: "#1A6300",
    },
    darkblue: {
      text: "#00E0FF",
      bg1: "#02006B",
      bg2: "#0400C6",
    },
    grey: {
      text: "#1E1E1E",
      bg1: "#E1E1E1",
      bg2: "#EEEEEE",
    },
  };

  const paths: Record<Paths, Path> = {
    1: {
      path: "M81 0H116C118.209 0 120 1.79086 120 4V21C120 23.2091 118.209 25 116 25H81V0Z",
    },
    2: {
      path: "M81 0H123C125.209 0 127 1.79086 127 4V21C127 23.2091 125.209 25 123 25H81V0Z",
    },
    3: {
      path: "M81 0H130C132.209 0 134 1.79086 134 4V21C134 23.2091 132.209 25 130 25H81V0Z",
    },
    4: {
      path: "M81 0H137C139.209 0 141 1.79086 141 4V21C141 23.2091 139.209 25 137 25H81V0Z",
    },
    5: {
      path: "M81 0H144C146.209 0 148 1.79086 148 4V21C148 23.2091 146.209 25 144 25H81V0Z",
    },
  };

  const HEIGHT = 25;

  return `<svg width="${width || 120}" height="${HEIGHT}" viewBox="0 0 ${
    width || 120
  } ${HEIGHT}" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 4C0 1.79086 1.79086 0 4 0H81V25H4C1.79086 25 0 23.2091 0 21V4Z" fill="${
              colours[colour]["bg1"] || colours["purple"]["bg1"]
            }"/>
            <text fill="${
              colours[colour]["text"] || colours["purple"]["text"]
            }" xml:space="preserve" style="white-space: pre" font-family="Helvetica" font-size="12" letter-spacing="0.01em"><tspan x="8" y="16.6074">PAGE-SIZE</tspan></text>
            <path d="${paths[kb_string_length as Paths].path}" fill="${
              colours[colour]["bg2"] || colours["purple"]["bg2"]
            }"/>
            <text fill="${
              colours[colour]["text"] || colours["purple"]["text"]
            }" xml:space="preserve" style="white-space: pre" font-family="Helvetica" font-size="12" letter-spacing="0.01em"><tspan x="89" y="16.6074">${kb}KB</tspan></text>
          </svg> `;
}
