import { AbilityInfo } from "./Ability";
import { IqInfo } from "./IQskill";
import { MoveInfo } from "./Move";
import { RankState } from "./RankState";

// 이걸 엔티티..로 봐야하나..? 그럴거같음. Pokemon 클래스를 따로 만들어야겠음. 
// 지능레벨 올라가거나, 아이템 장비하거나 등등... 

export type PokemonInfo = {
  pid: string; // 652-0-1-1: 수컷 이로치 숨특
  types: string[]; // ['불','물']
  moves: MoveInfo[];
  sex: 'male' | 'female';
  ability: AbilityInfo[];
  attack: number;
  spAttack: number;
  defense: number;
  spDefense: number;
  hp: number;
  rank: RankState;
  status: string[]; // TODO?: StatusState 추가 필요 
  level: number; // 레벨에 따라 동료 포획률 조정
  iq: IqInfo;
};