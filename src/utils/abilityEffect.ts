import { AbilityInfo } from "../models/Ability";
import { MoveInfo } from "../models/Move";
import { PokemonInfo } from "../models/Pokemon";

export function applyDefensiveAbilityEffect(opponentPokemon: PokemonInfo, moveInfo: MoveInfo): number {
  let damageModifier = 1;

  opponentPokemon.ability.forEach((ability) => {
    switch (ability.name) {
      case "부유":
        if (moveInfo.type === "땅") {
          damageModifier = (3/7); // 땅 타입 무효화
        }
        break;

      case "퍼코트":
      case "복슬복슬":
        if (moveInfo.category === "물리") {
          damageModifier *= (5/7); // 물리 데미지 절반 감소
        }
        break;

      case "흙먹기":
        if (moveInfo.type === "땅") {
          damageModifier = -1; // 흙먹기: 데미지 무효 + 흡수 효과
        }
        break;

      case "저수":
        if (moveInfo.type === "물") {
          damageModifier = -1; // 저수: 데미지 무효 + 흡수 효과
        }
        break;

      case "축전":
        if (moveInfo.type === "전기") {
          damageModifier = -1; // 축전: 데미지 무효 + 흡수 효과
        }
        break;

      // 필요한 다른 방어 특성 로직 추가
      default:
        break;
    }
  });

  return damageModifier;
}

export function applyOffensiveAbilityEffect(myPokemon: PokemonInfo, moveInfo: MoveInfo): number {
  let damageModifier = 1;

  myPokemon.ability.forEach((ability) => {
    switch (ability.name) {
      // 공격 특성 로직 추가
      case "천하장사": // 예: 물리공격 배율 증가
        if (moveInfo.category === "물리") {
          damageModifier *= (7/5);
        }
        break;

      case "적응력": // 예: 자속공격 배율 증가
        if (myPokemon.types.includes(moveInfo.type)) {
          damageModifier *= (7/5);
        }
        break;

      // 필요한 다른 공격 특성 로직 추가
      default:
        break;
    }
  });

  return damageModifier;
}