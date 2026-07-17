import draven from "@/assets/champions/DRAVEN.png";
import gwen from "@/assets/champions/GWEN.png";
import teemo from "@/assets/champions/teemo.png";
import bandleCity from "@/assets/placeholders/indicators/bandle-city.png";
import demacia from "@/assets/placeholders/indicators/demacia.png";
import fighter from "@/assets/placeholders/indicators/fighter.png";
import mage from "@/assets/placeholders/indicators/mage.png";
import marksman from "@/assets/placeholders/indicators/marksman.png";
import noxus from "@/assets/placeholders/indicators/noxus.png";
import piltover from "@/assets/placeholders/indicators/piltover.png";
import shurima from "@/assets/placeholders/indicators/shurima.png";
import tank from "@/assets/placeholders/indicators/tank.png";
import zaun from "@/assets/placeholders/indicators/zaun.png";

import type {
  GameBoardGuess,
  GameBoardIndicator,
  GameBoardSolution,
} from "./game-board.types";
import { getGameBoardCellId } from "./game-board.utils";

const dailyBoardRowCount = 3;
const dailyBoardColumnCount = 3;
const utcDayInMs = 86_400_000;
const challengeNumberEpochDay = Math.floor(Date.UTC(2026, 6, 17) / utcDayInMs);

export const mockDailyIndicators = {
  "bandle-city": {
    id: "bandle-city",
    label: "Bandle City",
    imageSrc: bandleCity,
    kind: "region",
  },
  demacia: {
    id: "demacia",
    label: "Demacia",
    imageSrc: demacia,
    kind: "region",
  },
  fighter: {
    id: "fighter",
    label: "Fighter",
    imageSrc: fighter,
    kind: "role",
  },
  mage: {
    id: "mage",
    label: "Mage",
    imageSrc: mage,
    kind: "role",
  },
  marksman: {
    id: "marksman",
    label: "Marksman",
    imageSrc: marksman,
    kind: "role",
  },
  noxus: {
    id: "noxus",
    label: "Noxus",
    imageSrc: noxus,
    kind: "region",
  },
  piltover: {
    id: "piltover",
    label: "Piltover",
    imageSrc: piltover,
    kind: "region",
  },
  shurima: {
    id: "shurima",
    label: "Shurima",
    imageSrc: shurima,
    kind: "region",
  },
  tank: {
    id: "tank",
    label: "Tank",
    imageSrc: tank,
    kind: "role",
  },
  yordle: {
    id: "yordle",
    label: "Yordle",
    kind: "trait",
  },
  zaun: {
    id: "zaun",
    label: "Zaun",
    imageSrc: zaun,
    kind: "region",
  },
} satisfies Record<string, GameBoardIndicator>;

type MockDailyIndicatorId = keyof typeof mockDailyIndicators;

type MockChampionSolution = GameBoardSolution & {
  championEmoji: string;
  indicatorIds: MockDailyIndicatorId[];
};

const mockChampions = {
  akshan: {
    championId: "akshan",
    championName: "Akshan",
    championEmoji: "🪃",
    indicatorIds: ["shurima", "marksman"],
  },
  azir: {
    championId: "azir",
    championName: "Azir",
    championEmoji: "🦅",
    indicatorIds: ["shurima", "mage", "marksman"],
  },
  blitzcrank: {
    championId: "blitzcrank",
    championName: "Blitzcrank",
    championEmoji: "🤖",
    indicatorIds: ["zaun", "tank"],
  },
  caitlyn: {
    championId: "caitlyn",
    championName: "Caitlyn",
    championEmoji: "🎯",
    indicatorIds: ["piltover", "marksman"],
  },
  camille: {
    championId: "camille",
    championName: "Camille",
    championEmoji: "🦿",
    indicatorIds: ["piltover", "fighter"],
  },
  corki: {
    championId: "corki",
    championName: "Corki",
    championEmoji: "✈️",
    indicatorIds: ["bandle-city", "mage", "marksman", "yordle"],
  },
  darius: {
    championId: "darius",
    championName: "Darius",
    championEmoji: "🪓",
    indicatorIds: ["noxus", "fighter", "tank"],
  },
  "dr-mundo": {
    championId: "dr-mundo",
    championName: "Dr. Mundo",
    championEmoji: "🩺",
    indicatorIds: ["zaun", "fighter", "tank"],
    acceptedNames: ["mundo", "dr mundo"],
  },
  draven: {
    championId: "draven",
    championName: "Draven",
    championImg: draven,
    championEmoji: "🪓",
    indicatorIds: ["noxus", "marksman"],
  },
  ekko: {
    championId: "ekko",
    championName: "Ekko",
    championEmoji: "⏱️",
    indicatorIds: ["zaun", "mage"],
  },
  ezreal: {
    championId: "ezreal",
    championName: "Ezreal",
    championEmoji: "🧭",
    indicatorIds: ["piltover", "mage", "marksman"],
  },
  fiora: {
    championId: "fiora",
    championName: "Fiora",
    championEmoji: "🤺",
    indicatorIds: ["demacia", "fighter"],
  },
  galio: {
    championId: "galio",
    championName: "Galio",
    championEmoji: "🛡️",
    indicatorIds: ["demacia", "mage", "tank"],
  },
  garen: {
    championId: "garen",
    championName: "Garen",
    championEmoji: "⚔️",
    indicatorIds: ["demacia", "fighter", "tank"],
  },
  gnar: {
    championId: "gnar",
    championName: "Gnar",
    championEmoji: "🦴",
    indicatorIds: ["bandle-city", "fighter", "marksman", "tank", "yordle"],
  },
  gragas: {
    championId: "gragas",
    championName: "Gragas",
    championEmoji: "🍻",
    indicatorIds: ["fighter", "mage", "tank"],
  },
  gwen: {
    championId: "gwen",
    championName: "Gwen",
    championImg: gwen,
    championEmoji: "🪡",
    indicatorIds: ["fighter", "mage"],
  },
  heimerdinger: {
    championId: "heimerdinger",
    championName: "Heimerdinger",
    championEmoji: "🔧",
    indicatorIds: ["bandle-city", "mage", "piltover", "yordle", "zaun"],
    acceptedNames: ["heimer"],
  },
  jarvan: {
    championId: "jarvan",
    championName: "Jarvan IV",
    championEmoji: "🏳️",
    indicatorIds: ["demacia", "fighter", "tank"],
    acceptedNames: ["jarvan", "jarvan 4", "j4"],
  },
  "kai-sa": {
    championId: "kaisa",
    championName: "Kai'Sa",
    championEmoji: "✨",
    indicatorIds: ["mage", "marksman", "shurima"],
    acceptedNames: ["kai sa", "kaisa"],
  },
  kennen: {
    championId: "kennen",
    championName: "Kennen",
    championEmoji: "⚡",
    indicatorIds: ["bandle-city", "mage", "yordle"],
  },
  kled: {
    championId: "kled",
    championName: "Kled",
    championEmoji: "🪓",
    indicatorIds: ["bandle-city", "fighter", "noxus", "tank", "yordle"],
  },
  lucian: {
    championId: "lucian",
    championName: "Lucian",
    championEmoji: "🔫",
    indicatorIds: ["demacia", "marksman"],
  },
  lulu: {
    championId: "lulu",
    championName: "Lulu",
    championEmoji: "🪄",
    indicatorIds: ["bandle-city", "mage", "yordle"],
  },
  lux: {
    championId: "lux",
    championName: "Lux",
    championEmoji: "💡",
    indicatorIds: ["demacia", "mage"],
  },
  mordekaiser: {
    championId: "mordekaiser",
    championName: "Mordekaiser",
    championEmoji: "👑",
    indicatorIds: ["noxus", "fighter", "mage", "tank"],
  },
  nasus: {
    championId: "nasus",
    championName: "Nasus",
    championEmoji: "🐕",
    indicatorIds: ["shurima", "fighter", "mage", "tank"],
  },
  orianna: {
    championId: "orianna",
    championName: "Orianna",
    championEmoji: "⚙️",
    indicatorIds: ["piltover", "mage"],
  },
  poppy: {
    championId: "poppy",
    championName: "Poppy",
    championEmoji: "🔨",
    indicatorIds: ["bandle-city", "demacia", "fighter", "tank", "yordle"],
  },
  rammus: {
    championId: "rammus",
    championName: "Rammus",
    championEmoji: "🛞",
    indicatorIds: ["shurima", "tank"],
  },
  renekton: {
    championId: "renekton",
    championName: "Renekton",
    championEmoji: "🐊",
    indicatorIds: ["shurima", "fighter", "tank"],
  },
  riven: {
    championId: "riven",
    championName: "Riven",
    championEmoji: "🗡️",
    indicatorIds: ["noxus", "fighter"],
  },
  rumble: {
    championId: "rumble",
    championName: "Rumble",
    championEmoji: "🔥",
    indicatorIds: ["bandle-city", "fighter", "mage", "yordle"],
  },
  samira: {
    championId: "samira",
    championName: "Samira",
    championEmoji: "🌹",
    indicatorIds: ["noxus", "marksman"],
  },
  seraphine: {
    championId: "seraphine",
    championName: "Seraphine",
    championEmoji: "🎤",
    indicatorIds: ["mage", "piltover", "zaun"],
  },
  singed: {
    championId: "singed",
    championName: "Singed",
    championEmoji: "🧪",
    indicatorIds: ["zaun", "mage", "tank"],
  },
  sion: {
    championId: "sion",
    championName: "Sion",
    championEmoji: "🪦",
    indicatorIds: ["noxus", "fighter", "tank"],
  },
  sivir: {
    championId: "sivir",
    championName: "Sivir",
    championEmoji: "🪃",
    indicatorIds: ["shurima", "marksman"],
  },
  swain: {
    championId: "swain",
    championName: "Swain",
    championEmoji: "🦅",
    indicatorIds: ["noxus", "mage"],
  },
  taliyah: {
    championId: "taliyah",
    championName: "Taliyah",
    championEmoji: "🪨",
    indicatorIds: ["shurima", "mage"],
  },
  teemo: {
    championId: "teemo",
    championName: "Teemo",
    championImg: teemo,
    championEmoji: "🍄",
    indicatorIds: ["bandle-city", "mage", "marksman", "yordle"],
    acceptedNames: ["the swift scout"],
  },
  tristana: {
    championId: "tristana",
    championName: "Tristana",
    championEmoji: "🚀",
    indicatorIds: ["bandle-city", "marksman", "yordle"],
  },
  urgot: {
    championId: "urgot",
    championName: "Urgot",
    championEmoji: "🦾",
    indicatorIds: ["zaun", "marksman", "tank"],
  },
  varus: {
    championId: "varus",
    championName: "Varus",
    championEmoji: "🏹",
    indicatorIds: ["mage", "marksman"],
  },
  vayne: {
    championId: "vayne",
    championName: "Vayne",
    championEmoji: "🕶️",
    indicatorIds: ["demacia", "marksman"],
  },
  veigar: {
    championId: "veigar",
    championName: "Veigar",
    championEmoji: "🌑",
    indicatorIds: ["bandle-city", "mage", "yordle"],
  },
  vex: {
    championId: "vex",
    championName: "Vex",
    championEmoji: "🌘",
    indicatorIds: ["bandle-city", "mage", "yordle"],
  },
  vi: {
    championId: "vi",
    championName: "Vi",
    championEmoji: "🥊",
    indicatorIds: ["piltover", "fighter", "tank"],
  },
  viktor: {
    championId: "viktor",
    championName: "Viktor",
    championEmoji: "⚙️",
    indicatorIds: ["zaun", "mage"],
  },
  warwick: {
    championId: "warwick",
    championName: "Warwick",
    championEmoji: "🐺",
    indicatorIds: ["zaun", "fighter", "tank"],
  },
  xerath: {
    championId: "xerath",
    championName: "Xerath",
    championEmoji: "🔷",
    indicatorIds: ["shurima", "mage"],
  },
  yuumi: {
    championId: "yuumi",
    championName: "Yuumi",
    championEmoji: "📖",
    indicatorIds: ["bandle-city", "mage", "yordle"],
  },
  zac: {
    championId: "zac",
    championName: "Zac",
    championEmoji: "🟢",
    indicatorIds: ["zaun", "tank"],
  },
  zeri: {
    championId: "zeri",
    championName: "Zeri",
    championEmoji: "⚡",
    indicatorIds: ["zaun", "marksman"],
  },
  ziggs: {
    championId: "ziggs",
    championName: "Ziggs",
    championEmoji: "💣",
    indicatorIds: ["bandle-city", "mage", "yordle", "zaun"],
  },
} satisfies Record<string, MockChampionSolution>;

export const canReuseChampionsInDailyGame = false;

export const mockDailyChampionOptions: MockChampionSolution[] = Object.values(
  mockChampions,
).sort((firstChampion, secondChampion) =>
  firstChampion.championName.localeCompare(secondChampion.championName),
);

export type DailyChallengeDefinition = {
  id: string;
  rowIds: MockDailyIndicatorId[];
  columnIds: MockDailyIndicatorId[];
};

export type SelectedDailyChallenge = {
  challengeId: string;
  challengeNumber: number;
  dateLabel: string;
  game: {
    rows: GameBoardIndicator[];
    columns: GameBoardIndicator[];
  };
  solutions: Record<string, GameBoardSolution[]>;
};

export const mockDailyChallengePool = [
  {
    id: "regional-starter",
    rowIds: ["zaun", "noxus", "demacia"],
    columnIds: ["mage", "tank", "marksman"],
  },
  {
    id: "city-states-skirmish",
    rowIds: ["noxus", "demacia", "piltover"],
    columnIds: ["mage", "fighter", "marksman"],
  },
  {
    id: "empires-marksman-frontline",
    rowIds: ["shurima", "noxus", "demacia"],
    columnIds: ["marksman", "mage", "tank"],
  },
  {
    id: "inventors-and-ascended",
    rowIds: ["zaun", "piltover", "shurima"],
    columnIds: ["marksman", "mage", "tank"],
  },
  {
    id: "bandle-war-marksmen",
    rowIds: ["bandle-city", "noxus", "piltover"],
    columnIds: ["mage", "fighter", "marksman"],
  },
  {
    id: "tiny-heroes-big-kingdoms",
    rowIds: ["yordle", "demacia", "shurima"],
    columnIds: ["fighter", "marksman", "mage"],
  },
] satisfies DailyChallengeDefinition[];

const positiveModulo = (value: number, divisor: number) => {
  return ((value % divisor) + divisor) % divisor;
};

export const getUtcDayNumber = (date = new Date()) => {
  return Math.floor(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) /
      utcDayInMs,
  );
};

export const getDailyChallengeNumber = (date = new Date()) => {
  return getUtcDayNumber(date) - challengeNumberEpochDay + 1;
};

export const getDailyChallengeDateLabel = (date = new Date()) => {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const getDailyChallengeDefinitionForDate = (date = new Date()) => {
  const challengeIndex = positiveModulo(
    getUtcDayNumber(date),
    mockDailyChallengePool.length,
  );

  return mockDailyChallengePool[challengeIndex];
};

const getChallengeIndicators = (challenge: DailyChallengeDefinition) => {
  return {
    rows: challenge.rowIds.map(
      (indicatorId) => mockDailyIndicators[indicatorId],
    ),
    columns: challenge.columnIds.map(
      (indicatorId) => mockDailyIndicators[indicatorId],
    ),
  };
};

const getMatchingChampions = (
  rowId: MockDailyIndicatorId,
  columnId: MockDailyIndicatorId,
  champions: MockChampionSolution[] = mockDailyChampionOptions,
) => {
  return champions
    .filter(
      (champion) =>
        champion.indicatorIds.includes(rowId) &&
        champion.indicatorIds.includes(columnId),
    )
    .sort((firstChampion, secondChampion) =>
      firstChampion.championName.localeCompare(secondChampion.championName),
    );
};

const getChallengeCells = (challenge: DailyChallengeDefinition) => {
  return challenge.rowIds.flatMap((rowId) =>
    challenge.columnIds.map((columnId) => ({
      id: getGameBoardCellId(rowId, columnId),
      rowId,
      columnId,
    })),
  );
};

type DailyChallengeCell = ReturnType<typeof getChallengeCells>[number];
type DailyChallengeCells = DailyChallengeCell[];
type DailyChallengeCandidateLookup = Map<string, MockChampionSolution[]>;

const getCandidateLookup = (
  cells: DailyChallengeCells,
  champions: MockChampionSolution[],
): DailyChallengeCandidateLookup => {
  return new Map(
    cells.map((cell) => [
      cell.id,
      getMatchingChampions(cell.rowId, cell.columnId, champions),
    ]),
  );
};

const getCellCandidates = (
  cell: DailyChallengeCell,
  champions: MockChampionSolution[],
  candidateLookup?: DailyChallengeCandidateLookup,
) => {
  return (
    candidateLookup?.get(cell.id) ??
    getMatchingChampions(cell.rowId, cell.columnId, champions)
  );
};

const getSolverStateKey = (
  remainingCells: DailyChallengeCells,
  usedChampionIds: Set<string>,
) => {
  const cellKey = remainingCells
    .map((cell) => cell.id)
    .sort()
    .join(",");
  const championKey = [...usedChampionIds].sort().join(",");

  return `${cellKey}|${championKey}`;
};

const buildDailySolutions = (challenge: DailyChallengeDefinition) => {
  return Object.fromEntries(
    getChallengeCells(challenge).map((cell) => [
      cell.id,
      getMatchingChampions(cell.rowId, cell.columnId),
    ]),
  );
};

export const getDailyChallengeForDate = (
  date = new Date(),
): SelectedDailyChallenge => {
  const challenge = getDailyChallengeDefinitionForDate(date);

  return {
    challengeId: challenge.id,
    challengeNumber: getDailyChallengeNumber(date),
    dateLabel: getDailyChallengeDateLabel(date),
    game: getChallengeIndicators(challenge),
    solutions: buildDailySolutions(challenge),
  };
};

type DailyChallengeValidationCode =
  | "duplicate-challenge-id"
  | "duplicate-champion-id"
  | "duplicate-champion-name"
  | "duplicate-indicator"
  | "invalid-board-size"
  | "missing-cell-match"
  | "no-complete-solution"
  | "softlock";

export type DailyChallengeValidationIssue = {
  code: DailyChallengeValidationCode;
  reason: string;
  challengeId?: string;
  cellId?: string;
};

const getDuplicateValues = (values: string[]) => {
  const seenValues = new Set<string>();
  const duplicateValues = new Set<string>();

  values.forEach((value) => {
    if (seenValues.has(value)) {
      duplicateValues.add(value);
      return;
    }

    seenValues.add(value);
  });

  return [...duplicateValues];
};

const hasCompleteSolution = (
  remainingCells: DailyChallengeCells,
  champions: MockChampionSolution[],
  usedChampionIds = new Set<string>(),
  memo = new Map<string, boolean>(),
  candidateLookup?: DailyChallengeCandidateLookup,
): boolean => {
  const stateKey = getSolverStateKey(remainingCells, usedChampionIds);
  const cachedResult = memo.get(stateKey);

  if (cachedResult !== undefined) {
    return cachedResult;
  }

  if (remainingCells.length === 0) {
    memo.set(stateKey, true);
    return true;
  }

  const cellsByCandidateCount = remainingCells
    .map((cell) => ({
      cell,
      candidates: getCellCandidates(cell, champions, candidateLookup).filter(
        (champion) =>
          canReuseChampionsInDailyGame ||
          !usedChampionIds.has(champion.championId),
      ),
    }))
    .sort(
      (firstCell, secondCell) =>
        firstCell.candidates.length - secondCell.candidates.length,
    );
  const nextCell = cellsByCandidateCount[0];

  if (!nextCell || nextCell.candidates.length === 0) {
    memo.set(stateKey, false);
    return false;
  }

  const nextRemainingCells = remainingCells.filter(
    (cell) => cell.id !== nextCell.cell.id,
  );

  const hasSolution = nextCell.candidates.some((champion) => {
    const nextUsedChampionIds = new Set(usedChampionIds);

    if (!canReuseChampionsInDailyGame) {
      nextUsedChampionIds.add(champion.championId);
    }

    return hasCompleteSolution(
      nextRemainingCells,
      champions,
      nextUsedChampionIds,
      memo,
      candidateLookup,
    );
  });

  memo.set(stateKey, hasSolution);

  return hasSolution;
};

const findSoftlock = (
  remainingCells: DailyChallengeCells,
  champions: MockChampionSolution[],
  usedChampionIds = new Set<string>(),
  visitedStates = new Set<string>(),
  completeSolutionMemo = new Map<string, boolean>(),
  candidateLookup?: DailyChallengeCandidateLookup,
): DailyChallengeValidationIssue | undefined => {
  if (remainingCells.length === 0 || canReuseChampionsInDailyGame) {
    return undefined;
  }

  const stateKey = getSolverStateKey(remainingCells, usedChampionIds);

  if (visitedStates.has(stateKey)) {
    return undefined;
  }

  visitedStates.add(stateKey);

  const cellsByCandidateCount = remainingCells
    .map((cell) => ({
      cell,
      candidates: getCellCandidates(cell, champions, candidateLookup).filter(
        (champion) => !usedChampionIds.has(champion.championId),
      ),
    }))
    .sort(
      (firstCell, secondCell) =>
        firstCell.candidates.length - secondCell.candidates.length,
    );

  for (const { cell, candidates } of cellsByCandidateCount) {
    const nextRemainingCells = remainingCells.filter(
      (remainingCell) => remainingCell.id !== cell.id,
    );

    for (const champion of candidates) {
      const nextUsedChampionIds = new Set(usedChampionIds);

      nextUsedChampionIds.add(champion.championId);

      if (
        !hasCompleteSolution(
          nextRemainingCells,
          champions,
          nextUsedChampionIds,
          completeSolutionMemo,
          candidateLookup,
        )
      ) {
        return {
          code: "softlock",
          challengeId: undefined,
          cellId: cell.id,
          reason: `${champion.championName} is valid for ${cell.id}, but choosing it can leave the remaining board impossible.`,
        };
      }

      const softlock = findSoftlock(
        nextRemainingCells,
        champions,
        nextUsedChampionIds,
        visitedStates,
        completeSolutionMemo,
        candidateLookup,
      );

      if (softlock) {
        return softlock;
      }
    }
  }

  return undefined;
};

export const validateDailyChallenge = (
  challenge: DailyChallengeDefinition,
  champions: MockChampionSolution[] = mockDailyChampionOptions,
): DailyChallengeValidationIssue[] => {
  const issues: DailyChallengeValidationIssue[] = [];

  if (
    challenge.rowIds.length !== dailyBoardRowCount ||
    challenge.columnIds.length !== dailyBoardColumnCount
  ) {
    issues.push({
      code: "invalid-board-size",
      challengeId: challenge.id,
      reason: `${challenge.id} must contain ${dailyBoardRowCount} rows and ${dailyBoardColumnCount} columns.`,
    });
  }

  const duplicateIndicators = getDuplicateValues([
    ...challenge.rowIds,
    ...challenge.columnIds,
  ]);

  duplicateIndicators.forEach((indicatorId) => {
    issues.push({
      code: "duplicate-indicator",
      challengeId: challenge.id,
      reason: `${challenge.id} uses ${indicatorId} more than once.`,
    });
  });

  const cells = getChallengeCells(challenge);
  const candidateLookup = getCandidateLookup(cells, champions);

  cells.forEach((cell) => {
    if (getCellCandidates(cell, champions, candidateLookup).length === 0) {
      issues.push({
        code: "missing-cell-match",
        challengeId: challenge.id,
        cellId: cell.id,
        reason: `${challenge.id} has no champion for ${cell.id}.`,
      });
    }
  });

  if (issues.length > 0) {
    return issues;
  }

  if (
    !hasCompleteSolution(
      cells,
      champions,
      new Set(),
      new Map(),
      candidateLookup,
    )
  ) {
    issues.push({
      code: "no-complete-solution",
      challengeId: challenge.id,
      reason: `${challenge.id} has no complete board solution.`,
    });
  }

  const softlock = findSoftlock(
    cells,
    champions,
    new Set(),
    new Set(),
    new Map(),
    candidateLookup,
  );

  if (softlock) {
    issues.push({
      ...softlock,
      challengeId: challenge.id,
    });
  }

  return issues;
};

export const validateDailyChallengePool = (
  challengePool: DailyChallengeDefinition[] = mockDailyChallengePool,
  champions: MockChampionSolution[] = mockDailyChampionOptions,
) => {
  const issues: DailyChallengeValidationIssue[] = [];

  getDuplicateValues(challengePool.map((challenge) => challenge.id)).forEach(
    (challengeId) => {
      issues.push({
        code: "duplicate-challenge-id",
        challengeId,
        reason: `${challengeId} is used by more than one daily challenge.`,
      });
    },
  );

  getDuplicateValues(champions.map((champion) => champion.championId)).forEach(
    (championId) => {
      issues.push({
        code: "duplicate-champion-id",
        reason: `${championId} is used by more than one champion.`,
      });
    },
  );

  getDuplicateValues(
    champions.map((champion) => champion.championName),
  ).forEach((championName) => {
    issues.push({
      code: "duplicate-champion-name",
      reason: `${championName} is used by more than one champion.`,
    });
  });

  challengePool.forEach((challenge) => {
    issues.push(...validateDailyChallenge(challenge, champions));
  });

  return issues;
};

export const dailyChallengeValidationIssues = validateDailyChallengePool();

if (import.meta.env.DEV && dailyChallengeValidationIssues.length > 0) {
  console.warn(
    "Invalid Rift9 daily challenge data",
    dailyChallengeValidationIssues,
  );
}

export const mockDailyChallenge = getDailyChallengeForDate();
export const mockDailyGame = mockDailyChallenge.game;
export const mockDailySolutions = mockDailyChallenge.solutions;

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
