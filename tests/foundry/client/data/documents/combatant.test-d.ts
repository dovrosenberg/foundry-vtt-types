import { expectTypeOf } from "vitest";
import type { DOCUMENT_OWNERSHIP_LEVELS } from "../../../../../src/foundry/common/constants.d.mts";

const combatant = new Combatant();

// properties
expectTypeOf(combatant._videoSrc).toEqualTypeOf<string | null>();
expectTypeOf(combatant.resource).toEqualTypeOf<`${number}` | number | boolean | null>();
expectTypeOf(combatant.combat).toEqualTypeOf<Combat | null>();
expectTypeOf(combatant.isNPC).toEqualTypeOf<boolean>();
expectTypeOf(combatant.permission).toEqualTypeOf<DOCUMENT_OWNERSHIP_LEVELS>();
expectTypeOf(combatant.visible).toEqualTypeOf<boolean>();
expectTypeOf(combatant.actor).toEqualTypeOf<Actor | null>();
expectTypeOf(combatant.token).toEqualTypeOf<TokenDocument | null>();
expectTypeOf(combatant.players).toEqualTypeOf<User.ConfiguredInstance[]>();
expectTypeOf(combatant.isDefeated).toEqualTypeOf<boolean>();

const baseUser = new foundry.documents.BaseUser({ name: "username" });

expectTypeOf(
  combatant.testUserPermission(baseUser, foundry.CONST.DOCUMENT_OWNERSHIP_LEVELS.LIMITED),
).toEqualTypeOf<boolean>();
expectTypeOf(combatant.getInitiativeRoll()).toEqualTypeOf<Roll>();
expectTypeOf(combatant.rollInitiative("1d20")).toEqualTypeOf<Promise<Combatant | undefined>>();
expectTypeOf(combatant.prepareDerivedData()).toEqualTypeOf<void>();
expectTypeOf(combatant.updateResource()).toEqualTypeOf<`${number}` | number | boolean | null>();

expectTypeOf(combatant.sheet).toEqualTypeOf<FormApplication | foundry.applications.api.ApplicationV2 | null>();
