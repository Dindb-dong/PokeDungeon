import * as fs from "fs";
import * as path from "path";

export type MoveInfo = {
  id: number;
  name: string;
  type: string;
  category: '물리' | '특수' | '변화';
  power: number; // 위력 
  pp?: integer;
  isTouch: boolean; // 접촉 기술 여부 
  affiliation?: '펀치' | '폭탄' | '바람' | null; // 계열 
  accuracy: number; // 명중율. 
  criticalRate: number; // 급소율. 랭크로 나타냄. 0은 6.25프로, ..4는 50프로. 
  effects: any;
};

let movesCache: MoveInfo[] | null = null; // 캐시를 저장할 변수
const movesFilePath = path.resolve(__dirname, "../data/moves.json"); // 경로 문제 방지

async function loadMoves(): Promise<MoveInfo[] | null> {
  if (!movesCache) {
    // 캐시가 없을 때만 파일을 읽음
    const fileData = await fs.promises.readFile(movesFilePath, "utf-8");
    movesCache = JSON.parse(fileData).moves;
  }
  return movesCache;
}

export async function getMoveInfo(moveNum: number): Promise<MoveInfo> {
  const moves = await loadMoves();
  const move = moves?.find((move) => move.id === moveNum);
  if (!move) {
    throw new Error(`Move with ID ${moveNum} not found.`);
  }
  return move as MoveInfo;
}