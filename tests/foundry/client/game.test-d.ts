import { expectTypeOf, assertType } from "vitest";
import type { EmptyObject } from "../../../src/types/utils.d.mts";

declare const aGame: Game;

expectTypeOf(aGame.combats).toEqualTypeOf<CombatEncounters | undefined>();
expectTypeOf(aGame.i18n).toEqualTypeOf<Localization | undefined>();
expectTypeOf(aGame.settings).toEqualTypeOf<ClientSettings>();

declare global {
  interface ModuleConfig {
    "optional-api-module": {
      api: {
        testApi: (value: string) => boolean;
      };
    };
    "api-module-with-optional-props": {
      always: string;
      maybe?: number;
    };
    "required-api-module": {
      hooks: {
        triggerDialog: (value: number) => void;
      };
    };
  }
  interface RequiredModules {
    "required-module": true;
    "required-api-module": true;
  }
}

assertType<undefined | Module>(aGame.modules.get("optional-module"));

expectTypeOf(aGame.modules.get("required-module")).toEqualTypeOf<Module>();

const optionalApiModule = aGame.modules.get("optional-api-module");
if (optionalApiModule) {
  expectTypeOf(optionalApiModule.api).toEqualTypeOf<undefined | ModuleConfig["optional-api-module"]["api"]>();
  if (optionalApiModule.active) {
    expectTypeOf(optionalApiModule.active).toEqualTypeOf<true>();
    expectTypeOf(optionalApiModule.api.testApi).toEqualTypeOf<(value: string) => boolean>();
  } else {
    expectTypeOf(optionalApiModule.active).toEqualTypeOf<false>();
    expectTypeOf(optionalApiModule.api).toEqualTypeOf<undefined>();
  }
}

const moduleOptionalProps = aGame.modules.get("api-module-with-optional-props");
if (moduleOptionalProps) {
  expectTypeOf(moduleOptionalProps.always).toEqualTypeOf<undefined | string>();
  expectTypeOf(moduleOptionalProps.maybe).toEqualTypeOf<undefined | number>();
  if (moduleOptionalProps.active) {
    expectTypeOf(moduleOptionalProps.always).toEqualTypeOf<string>();
    expectTypeOf(moduleOptionalProps.maybe).toEqualTypeOf<undefined | number>();
    // @ts-expect-error - number would the entirely wrong type.
    expectTypeOf(moduleOptionalProps.maybe).toEqualTypeOf<number>();
  }
}
const requiredApiModule = aGame.modules.get("required-api-module");

expectTypeOf(requiredApiModule).toEqualTypeOf<Module & ModuleConfig["required-api-module"]>();
expectTypeOf(requiredApiModule.hooks.triggerDialog(5)).toEqualTypeOf<void>();

declare global {
  interface Game {
    declarationMergingWorks: number;
  }

  interface ReadyGame {
    onlyInReady: string;
  }
}

expectTypeOf(game.declarationMergingWorks).toEqualTypeOf<number | undefined>();

if (game instanceof Game) {
  expectTypeOf(game.declarationMergingWorks).toEqualTypeOf<number>();

  // @ts-expect-error - game is not guaranteed to be ready yet.
  // Arguably it shouldn't be a hard error, just undefined.
  game.onlyInReady;
}

if (game.ready) {
  expectTypeOf(game.declarationMergingWorks).toEqualTypeOf<number>();
  expectTypeOf(game.onlyInReady).toEqualTypeOf<string>();
}

// Game model
declare const itemTypes: Game.Model.TypeNames<"Item">;
expectTypeOf(itemTypes).toEqualTypeOf<"weapon" | "armor" | "base">();
declare const itemCls: foundry.abstract.Document.ConfiguredClassForName<"Item">;
expectTypeOf(itemCls).toEqualTypeOf<typeof Item>();
declare const itemTypes2: Game.Model.TypeNames<foundry.abstract.Document.ConfiguredClassForName<"Item">>;
expectTypeOf(itemTypes2).toEqualTypeOf<"weapon" | "armor" | "base">();
expectTypeOf(game.documentTypes!.Item).toEqualTypeOf<Array<"weapon" | "armor" | "base">>();

if (game instanceof Game) {
  const tokenModel = game.model.Token;
  expectTypeOf(tokenModel.base).toEqualTypeOf<EmptyObject>();

  const itemModel = game.model.Item;
  expectTypeOf(itemModel.base).toEqualTypeOf<EmptyObject>();
  expectTypeOf(itemModel.weapon).toEqualTypeOf<EmptyObject>();

  const journalEntryPageModel = game.model.JournalEntryPage;
  // @ts-expect-error base is not a valid subtype for JournalEntryPage
  journalEntryPageModel.base;
  expectTypeOf(journalEntryPageModel.text).toEqualTypeOf<EmptyObject>();
}
