import { expectTypeOf } from "vitest";
import type { EmptyObject } from "fvtt-types/utils";
import fields = foundry.data.fields;

declare const myItem: foundry.documents.BaseItem;

myItem.updateSource({ img: "newPath" });
//@ts-expect-error foo isn't a valid path
myItem.updateSource({ foo: "bar" });

type SchemaWithIndexSignatures = {
  genericProperty: fields.StringField;

  [K: string | number | symbol]: fields.StringField | fields.NumberField;
};

class _GenericDataModel<Schema extends SchemaWithIndexSignatures> extends foundry.abstract.DataModel<Schema, null> {
  method() {
    expectTypeOf(this.genericProperty).toEqualTypeOf<string | undefined>();

    // @ts-expect-error - string index signatures should be stripped so accessing an arbitrary string should fail.
    this.arbitraryProperty;

    // @ts-expect-error - number index signatures should be stripped so accessing an arbitrary number should fail.
    this[0];

    // @ts-expect-error - symbol index signatures should be stripped so accessing an arbitrary symbol should fail.
    this[Symbol("symbol")];
  }
}

declare const dataModel: foundry.abstract.DataModel<SchemaWithIndexSignatures, foundry.documents.BaseActor>;

expectTypeOf(dataModel.parent).toEqualTypeOf<Readonly<foundry.documents.BaseActor>>();
expectTypeOf(dataModel.schema).toEqualTypeOf<foundry.data.fields.SchemaField<SchemaWithIndexSignatures, EmptyObject>>();
expectTypeOf(dataModel.invalid).toEqualTypeOf<boolean>();
expectTypeOf(dataModel.validationFailures).toEqualTypeOf<{
  fields: DataModelValidationFailure | null;
  joint: DataModelValidationFailure | null;
}>();

expectTypeOf(foundry.abstract.DataModel.defineSchema()).toEqualTypeOf<foundry.data.fields.DataSchema>();
expectTypeOf(foundry.abstract.DataModel.schema).toEqualTypeOf<foundry.data.fields.SchemaField<any>>();
expectTypeOf(foundry.abstract.DataModel.defineSchema()).toEqualTypeOf<foundry.data.fields.DataSchema>();
expectTypeOf(foundry.abstract.DataModel.LOCALIZATION_PREFIXES).toEqualTypeOf<string[]>();
expectTypeOf(foundry.abstract.DataModel.cleanData()()).toEqualTypeOf<object>();
