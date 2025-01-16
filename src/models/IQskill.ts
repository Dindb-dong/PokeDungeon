import { PokemonInfo } from "./Pokemon";

// IQskill 클래스도 만들어야겠음... 그래야 isAvailable 변경될 때마다 지능스킬 목록 업데이트하지 

export type IqInfo = {
  group: string; // 'A', ... 'E'
  level: integer; // 레벨에 따라 지능 스킬 적용
  isAvailable: boolean[]; // 사용자가 지능 스킬을 키고 끌 수 있음 
}

const groupNoneSkills: string[] = [
  '탈출',
  '도구 마스터',
  '도구 캐치',
  // 여기에 추가
]

const groupASkills: string[] = [
  '배신하지 않아',
  // 여기에 추가 
]

export function getIqskillInfo(pokemon:PokemonInfo) {
  // 우선 지능 레벨에 따라서 지능스킬 부여. 
  // 이후 isAvailable 상태에 따라, 배열에서 지능스킬 지우기. 
}