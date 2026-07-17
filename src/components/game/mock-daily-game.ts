import teemo from "@/assets/champions/teemo.png";
import bandleCity from "@/assets/placeholders/indicators/bandle-city.png";
import mage from "@/assets/placeholders/indicators/mage.png";
import marksman from "@/assets/placeholders/indicators/marksman.png";
import tank from "@/assets/placeholders/indicators/tank.png";
import zaun from "@/assets/placeholders/indicators/zaun.png";

import type {
  GameBoardGuess,
  GameBoardIndicator,
  GameBoardSolution,
} from "./game-board.types";
import { getGameBoardCellId } from "./game-board.utils";

type MockChampionSolution = GameBoardSolution & {
  championEmoji: string;
};

const mockChampions = {
  blitzcrank: {
    championId: "blitzcrank",
    championName: "Blitzcrank",
    championEmoji: "🤖",
  },
  corki: {
    championId: "corki",
    championName: "Corki",
    championEmoji: "✈️",
  },
  "dr-mundo": {
    championId: "dr-mundo",
    championName: "Dr. Mundo",
    championEmoji: "🩺",
    acceptedNames: ["mundo", "dr mundo"],
  },
  ekko: {
    championId: "ekko",
    championName: "Ekko",
    championEmoji: "⏱️",
  },
  ezreal: {
    championId: "ezreal",
    championName: "Ezreal",
    championEmoji: "🧭",
  },
  galio: {
    championId: "galio",
    championName: "Galio",
    championEmoji: "🛡️",
  },
  garen: {
    championId: "garen",
    championName: "Garen",
    championEmoji: "⚔️",
  },
  gnar: {
    championId: "gnar",
    championName: "Gnar",
    championEmoji: "🦴",
  },
  gragas: {
    championId: "gragas",
    championName: "Gragas",
    championEmoji: "🍻",
  },
  gwen: {
    championId: "gwen",
    championName: "Gwen",
    championEmoji: "🪡",
  },
  heimerdinger: {
    championId: "heimerdinger",
    championName: "Heimerdinger",
    championEmoji: "🔧",
    acceptedNames: ["heimer"],
  },
  "kai-sa": {
    championId: "kaisa",
    championName: "Kai'Sa",
    championEmoji: "✨",
    acceptedNames: ["kai sa", "kaisa"],
  },
  kennen: {
    championId: "kennen",
    championName: "Kennen",
    championEmoji: "⚡",
  },
  kled: {
    championId: "kled",
    championName: "Kled",
    championEmoji: "🪓",
  },
  lulu: {
    championId: "lulu",
    championName: "Lulu",
    championEmoji: "🪄",
  },
  poppy: {
    championId: "poppy",
    championName: "Poppy",
    championEmoji: "🔨",
  },
  rumble: {
    championId: "rumble",
    championName: "Rumble",
    championEmoji: "🔥",
  },
  seraphine: {
    championId: "seraphine",
    championName: "Seraphine",
    championEmoji: "🎤",
  },
  singed: {
    championId: "singed",
    championName: "Singed",
    championEmoji: "🧪",
  },
  teemo: {
    championId: "teemo",
    championName: "Teemo",
    championImg: teemo,
    championEmoji: "🍄",
    acceptedNames: ["the swift scout"],
  },
  tristana: {
    championId: "tristana",
    championName: "Tristana",
    championEmoji: "🚀",
  },
  urgot: {
    championId: "urgot",
    championName: "Urgot",
    championEmoji: "🦾",
  },
  varus: {
    championId: "varus",
    championName: "Varus",
    championEmoji: "🏹",
  },
  veigar: {
    championId: "veigar",
    championName: "Veigar",
    championEmoji: "🌑",
  },
  vex: {
    championId: "vex",
    championName: "Vex",
    championEmoji: "🌘",
  },
  viktor: {
    championId: "viktor",
    championName: "Viktor",
    championEmoji: "⚙️",
  },
  warwick: {
    championId: "warwick",
    championName: "Warwick",
    championEmoji: "🐺",
  },
  yuumi: {
    championId: "yuumi",
    championName: "Yuumi",
    championEmoji: "📖",
  },
  zac: {
    championId: "zac",
    championName: "Zac",
    championEmoji: "🟢",
  },
  ziggs: {
    championId: "ziggs",
    championName: "Ziggs",
    championEmoji: "💣",
  },
} satisfies Record<string, MockChampionSolution>;

type MockChampionId = keyof typeof mockChampions;

const getMockChampion = (championId: MockChampionId) => {
  return mockChampions[championId];
};

export const mockDailyChampionOptions: MockChampionSolution[] = Object.values(
  mockChampions,
).sort((firstChampion, secondChampion) =>
  firstChampion.championName.localeCompare(secondChampion.championName),
);

export const mockDailyGame = {
  columns: [
    {
      id: "mage",
      label: "Mage",
      imageSrc: mage,
      kind: "role",
    },
    {
      id: "tank",
      label: "Tank",
      imageSrc: tank,
      kind: "role",
    },
    {
      id: "bandle-city",
      label: "Bandle City",
      imageSrc: bandleCity,
      kind: "region",
    },
  ] satisfies GameBoardIndicator[],
  rows: [
    {
      id: "zaun",
      label: "Zaun",
      imageSrc: zaun,
      kind: "region",
    },
    {
      id: "marksman",
      label: "Marksman",
      imageSrc: marksman,
      kind: "role",
    },
    {
      id: "yordle",
      label: "Yordle",
      kind: "trait",
    },
  ] satisfies GameBoardIndicator[],
};

export const mockDailySolutions: Record<string, GameBoardSolution[]> = {
  [getGameBoardCellId("zaun", "mage")]: [
    getMockChampion("viktor"),
    getMockChampion("ekko"),
    getMockChampion("seraphine"),
    getMockChampion("singed"),
  ],
  [getGameBoardCellId("zaun", "tank")]: [
    getMockChampion("zac"),
    getMockChampion("dr-mundo"),
    getMockChampion("urgot"),
    getMockChampion("warwick"),
    getMockChampion("blitzcrank"),
    getMockChampion("singed"),
  ],
  [getGameBoardCellId("zaun", "bandle-city")]: [
    getMockChampion("ziggs"),
    getMockChampion("heimerdinger"),
  ],
  [getGameBoardCellId("marksman", "mage")]: [
    getMockChampion("ezreal"),
    getMockChampion("corki"),
    getMockChampion("kai-sa"),
    getMockChampion("varus"),
    getMockChampion("teemo"),
  ],
  [getGameBoardCellId("marksman", "tank")]: [
    getMockChampion("urgot"),
    getMockChampion("gnar"),
  ],
  [getGameBoardCellId("marksman", "bandle-city")]: [
    getMockChampion("teemo"),
    getMockChampion("tristana"),
    getMockChampion("corki"),
  ],
  [getGameBoardCellId("yordle", "mage")]: [
    getMockChampion("veigar"),
    getMockChampion("vex"),
    getMockChampion("lulu"),
    getMockChampion("yuumi"),
    getMockChampion("rumble"),
    getMockChampion("ziggs"),
    getMockChampion("heimerdinger"),
    getMockChampion("kennen"),
  ],
  [getGameBoardCellId("yordle", "tank")]: [
    getMockChampion("gnar"),
    getMockChampion("poppy"),
    getMockChampion("kled"),
  ],
  [getGameBoardCellId("yordle", "bandle-city")]: [
    getMockChampion("teemo"),
    getMockChampion("tristana"),
    getMockChampion("corki"),
    getMockChampion("gnar"),
    getMockChampion("veigar"),
    getMockChampion("vex"),
    getMockChampion("lulu"),
    getMockChampion("yuumi"),
    getMockChampion("rumble"),
    getMockChampion("ziggs"),
    getMockChampion("heimerdinger"),
    getMockChampion("kennen"),
    getMockChampion("poppy"),
    getMockChampion("kled"),
  ],
};

export const toVisibleGuess = ({
  championId,
  championName,
  championImg,
  championEmoji,
}: GameBoardSolution): GameBoardGuess => {
  return {
    championId,
    championName,
    championImg,
    championEmoji,
  };
};
