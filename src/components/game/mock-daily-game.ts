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
    {
      championId: "viktor",
      championName: "Viktor",
    },
    {
      championId: "ekko",
      championName: "Ekko",
    },
    {
      championId: "seraphine",
      championName: "Seraphine",
    },
    {
      championId: "singed",
      championName: "Singed",
    },
  ],
  [getGameBoardCellId("zaun", "tank")]: [
    {
      championId: "zac",
      championName: "Zac",
    },
    {
      championId: "dr-mundo",
      championName: "Dr. Mundo",
      acceptedNames: ["mundo", "dr mundo"],
    },
    {
      championId: "urgot",
      championName: "Urgot",
    },
    {
      championId: "warwick",
      championName: "Warwick",
    },
    {
      championId: "blitzcrank",
      championName: "Blitzcrank",
    },
    {
      championId: "singed",
      championName: "Singed",
    },
  ],
  [getGameBoardCellId("zaun", "bandle-city")]: [
    {
      championId: "ziggs",
      championName: "Ziggs",
    },
    {
      championId: "heimerdinger",
      championName: "Heimerdinger",
      acceptedNames: ["heimer"],
    },
  ],
  [getGameBoardCellId("marksman", "mage")]: [
    {
      championId: "ezreal",
      championName: "Ezreal",
    },
    {
      championId: "corki",
      championName: "Corki",
    },
    {
      championId: "kaisa",
      championName: "Kai'Sa",
      acceptedNames: ["kai sa", "kaisa"],
    },
    {
      championId: "varus",
      championName: "Varus",
    },
    {
      championId: "teemo",
      championName: "Teemo",
      championImg: teemo,
      acceptedNames: ["the swift scout"],
    },
  ],
  [getGameBoardCellId("marksman", "tank")]: [
    {
      championId: "urgot",
      championName: "Urgot",
    },
    {
      championId: "gnar",
      championName: "Gnar",
    },
  ],
  [getGameBoardCellId("marksman", "bandle-city")]: [
    {
      championId: "teemo",
      championName: "Teemo",
      championImg: teemo,
      acceptedNames: ["the swift scout"],
    },
    {
      championId: "tristana",
      championName: "Tristana",
    },
    {
      championId: "corki",
      championName: "Corki",
    },
  ],
  [getGameBoardCellId("yordle", "mage")]: [
    {
      championId: "veigar",
      championName: "Veigar",
    },
    {
      championId: "vex",
      championName: "Vex",
    },
    {
      championId: "lulu",
      championName: "Lulu",
    },
    {
      championId: "yuumi",
      championName: "Yuumi",
    },
    {
      championId: "rumble",
      championName: "Rumble",
    },
    {
      championId: "ziggs",
      championName: "Ziggs",
    },
    {
      championId: "heimerdinger",
      championName: "Heimerdinger",
      acceptedNames: ["heimer"],
    },
    {
      championId: "kennen",
      championName: "Kennen",
    },
  ],
  [getGameBoardCellId("yordle", "tank")]: [
    {
      championId: "gnar",
      championName: "Gnar",
    },
    {
      championId: "poppy",
      championName: "Poppy",
    },
    {
      championId: "kled",
      championName: "Kled",
    },
  ],
  [getGameBoardCellId("yordle", "bandle-city")]: [
    {
      championId: "teemo",
      championName: "Teemo",
      championImg: teemo,
      acceptedNames: ["the swift scout"],
    },
    {
      championId: "tristana",
      championName: "Tristana",
    },
    {
      championId: "corki",
      championName: "Corki",
    },
    {
      championId: "gnar",
      championName: "Gnar",
    },
    {
      championId: "veigar",
      championName: "Veigar",
    },
    {
      championId: "vex",
      championName: "Vex",
    },
    {
      championId: "lulu",
      championName: "Lulu",
    },
    {
      championId: "yuumi",
      championName: "Yuumi",
    },
    {
      championId: "rumble",
      championName: "Rumble",
    },
    {
      championId: "ziggs",
      championName: "Ziggs",
    },
    {
      championId: "heimerdinger",
      championName: "Heimerdinger",
      acceptedNames: ["heimer"],
    },
    {
      championId: "kennen",
      championName: "Kennen",
    },
    {
      championId: "poppy",
      championName: "Poppy",
    },
    {
      championId: "kled",
      championName: "Kled",
    },
  ],
};

export const toVisibleGuess = ({
  championId,
  championName,
  championImg,
}: GameBoardSolution): GameBoardGuess => {
  return {
    championId,
    championName,
    championImg,
  };
};
