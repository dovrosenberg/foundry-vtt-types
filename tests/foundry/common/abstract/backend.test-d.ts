import { expectTypeOf } from "vitest";

declare const database: foundry.abstract.DatabaseBackend;

declare const getOperation: foundry.abstract.DatabaseGetOperation;
declare const createOperation: foundry.abstract.DatabaseCreateOperation<foundry.documents.BaseActor>;
declare const updateOperation: foundry.abstract.DatabaseUpdateOperation<foundry.documents.BaseActor>;
declare const deleteOperation: foundry.abstract.DatabaseDeleteOperation;
expectTypeOf(database.get(foundry.documents.BaseActor, getOperation)).toEqualTypeOf<
  Promise<FixedInstanceType<foundry.documents.BaseActor>>
>();
expectTypeOf(database.create(foundry.documents.BaseActor, createOperation)).toEqualTypeOf<
  Promise<FixedInstanceType<foundry.documents.BaseActor>>
>();
expectTypeOf(database.update(foundry.documents.BaseActor, updateOperation)).toEqualTypeOf<
  Promise<FixedInstanceType<foundry.documents.BaseActor>>
>();
expectTypeOf(database.delete(foundry.documents.BaseActor, deleteOperation)).toEqualTypeOf<
  Promise<FixedInstanceType<foundry.documents.BaseActor>[]>
>();

expectTypeOf(database.getFlagScopes).toEqualTypeOf<string>();
expectTypeOf(database.getCompendiumScopes).toEqualTypeOf<string>();
