export function applyStatusEffect(status: string[] | undefined, rate: number): { rate: number; isHit: boolean; message: string | null } {
  // 상태이상 효과 계산
  return { rate, isHit: false, message: null };
}