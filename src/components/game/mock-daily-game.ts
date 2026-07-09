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
      id: "marksman",
      label: "Marksman",
      imageSrc: marksman,
      kind: "role",
    },
    {
      id: "mage",
      label: "Mage",
      imageSrc: mage,
      kind: "role",
    },
    {
      id: "zaun",
      label: "Zaun",
      imageSrc: zaun,
      kind: "region",
    },
  ] satisfies GameBoardIndicator[],
  rows: [
    {
      id: "bandle-city",
      label: "Bandle City",
      imageSrc: bandleCity,
      kind: "region",
    },
    {
      id: "tank",
      label: "Tank",
      imageSrc: tank,
      kind: "role",
    },
    {
      id: "yordle",
      label: "Yordle",
      kind: "trait",
    },
  ] satisfies GameBoardIndicator[],
};

export const mockDailySolutions: Record<string, GameBoardSolution> = {
  [getGameBoardCellId("bandle-city", "marksman")]: {
    championId: "teemo",
    championName: "Teemo",
    championImg: teemo,
    acceptedNames: ["the swift scout"],
  },
  [getGameBoardCellId("bandle-city", "mage")]: {
    championId: "veigar",
    championName: "Veigar",
  },
  [getGameBoardCellId("bandle-city", "zaun")]: {
    championId: "ziggs",
    championName: "Ziggs",
  },
  [getGameBoardCellId("tank", "mage")]: {
    championId: "galio",
    championName: "Galio",
  },
  [getGameBoardCellId("tank", "zaun")]: {
    championId: "zac",
    championName: "Zac",
  },
  [getGameBoardCellId("yordle", "marksman")]: {
    championId: "tristana",
    championName: "Tristana",
  },
  [getGameBoardCellId("yordle", "mage")]: {
    championId: "veigar",
    championName: "Veigar",
  },
  [getGameBoardCellId("yordle", "zaun")]: {
    championId: "ziggs",
    championName: "Ziggs",
  },
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
