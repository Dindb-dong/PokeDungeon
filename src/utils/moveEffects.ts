import { MoveInfo } from "../models/Move";

// 기술 효과 적용 함수 예시
export function applyMoveEffect(move: MoveInfo, target: any): void {
  if (move.effects.includes("마비")) {
    console.log(`${target.name}은(는) 마비 상태가 되었다!`);
    target.status = "마비";
  }
  // 다른 효과 처리 로직 추가 가능
}