import { expectTypeOf } from "vitest";
import type { EffectChangeData } from "../../../../src/foundry/common/documents/_types.d.mts";

type InitialType<ReturnType> = ReturnType | ((initialData: unknown) => ReturnType);

// DataField
declare const dataField: foundry.data.fields.DataField;
expectTypeOf(dataField.options).toEqualTypeOf<foundry.data.fields.DataField.DefaultOptions>();
expectTypeOf(dataField.required).toEqualTypeOf<boolean>();
expectTypeOf(dataField.nullable).toEqualTypeOf<boolean>();
expectTypeOf(dataField.gmOnly).toEqualTypeOf<boolean>();
expectTypeOf(dataField.initial).toEqualTypeOf<
  foundry.data.fields.DataField.InitializedType<foundry.data.fields.DataField.DefaultOptions>
>();
expectTypeOf(dataField.readonly).toEqualTypeOf<boolean>();
expectTypeOf(dataField.label).toEqualTypeOf<string>();
expectTypeOf(dataField.hint).toEqualTypeOf<string>();
expectTypeOf(dataField.validationError).toEqualTypeOf<string>();
expectTypeOf(dataField.name).toEqualTypeOf<string | undefined>();
expectTypeOf(dataField.parent).toEqualTypeOf<foundry.data.fields.DataField.Any | undefined>();
expectTypeOf(dataField.fieldPath).toEqualTypeOf<string>();
expectTypeOf(dataField.toInput()).toEqualTypeOf<HTMLElement | HTMLCollection>();
expectTypeOf(dataField.toFormGroup()).toEqualTypeOf<HTMLDivElement>();

expectTypeOf(foundry.data.fields.DataField.hierarchical).toEqualTypeOf<boolean>();
expectTypeOf(foundry.data.fields.DataField.recursive).toEqualTypeOf<boolean>();
expectTypeOf(foundry.data.fields.DataField.hasFormSupport).toEqualTypeOf<boolean>();

// NOTE: Most of the test failures are a result of the actual type including 'undefined' even though it
//    shouldn't because there is an initial value specified

// SchemaField
type FooType = foundry.data.fields.StringField<{ initial: "bars" }>;
const schema: {
  foo: FooType;
} = {
  foo: new foundry.data.fields.StringField({ initial: "bars" }),
};
const schemaField = new foundry.data.fields.SchemaField(schema);

expectTypeOf(schemaField.required).toEqualTypeOf<boolean>();
expectTypeOf(schemaField.nullable).toEqualTypeOf<boolean>();
expectTypeOf(schemaField.fields).toEqualTypeOf<{
  foo: foundry.data.fields.StringField<{ initial: "bars" }>;
}>();
expectTypeOf(schemaField.keys()).toEqualTypeOf<keyof (typeof schema)[]>();
expectTypeOf(schemaField.values()).toEqualTypeOf<FooType[]>();

// expectTypeOf(schemaField.entries()).toEqualTypeOf<[name: string, dataField: FooType][]>();
const entries = schemaField.entries()[0];
expectTypeOf(entries[0]).toEqualTypeOf<string>();
expectTypeOf(entries[1]).toEqualTypeOf<FooType>();

expectTypeOf(schemaField.has("foo")).toEqualTypeOf<true>();
expectTypeOf(schemaField.has("bar")).toEqualTypeOf<false>();
expectTypeOf(schemaField.get("foo")).toEqualTypeOf<FooType>();
expectTypeOf(schemaField.get("bar")).toEqualTypeOf<undefined>();
expectTypeOf(schemaField.getField("foo")).toEqualTypeOf<foundry.data.fields.DataField.Unknown | undefined>();
expectTypeOf(schemaField.getField("bar")).toEqualTypeOf<foundry.data.fields.DataField.Unknown | undefined>();

declare const model: foundry.abstract.DataModel.Any;

// TODO
expectTypeOf(schemaField.initialize({ foo: "bar" }, model)).toEqualTypeOf<
  { foo: string } | (() => { foo: string } | null)
>();
expectTypeOf(schemaField.toObject({ foo: "bars" })).toEqualTypeOf<{ foo: string }>();
expectTypeOf(schemaField.migrateSource({}, "")).toEqualTypeOf<unknown>();

expectTypeOf(foundry.data.fields.SchemaField.recursive).toEqualTypeOf<boolean>();

// BooleanField
const booleanField = new foundry.data.fields.BooleanField({ initial: true });

expectTypeOf(booleanField.required).toEqualTypeOf<boolean>();
expectTypeOf(booleanField.nullable).toEqualTypeOf<boolean>();
expectTypeOf(booleanField.initial).toEqualTypeOf<InitialType<boolean>>();

expectTypeOf(booleanField.apply(() => true, false)).toEqualTypeOf<boolean>();
expectTypeOf(booleanField.clean(true)).toEqualTypeOf<boolean>();
expectTypeOf(booleanField.getInitialValue()).toEqualTypeOf<boolean>();
expectTypeOf(booleanField.getInitialValue({})).toEqualTypeOf<boolean>();
expectTypeOf(booleanField.validate(false)).toEqualTypeOf<foundry.data.validation.DataModelValidationError | void>();
expectTypeOf(booleanField.initialize(true, model)).toEqualTypeOf<boolean | (() => boolean | null)>();
expectTypeOf(booleanField.toObject(false)).toEqualTypeOf<boolean>();

declare const change: EffectChangeData;
expectTypeOf(booleanField.applyChange(false, model, change)).toEqualTypeOf<boolean>();

// NumberField
const numberField = new foundry.data.fields.NumberField({ initial: 7 });

expectTypeOf(numberField.required).toEqualTypeOf<boolean>();
expectTypeOf(numberField.nullable).toEqualTypeOf<boolean>();
expectTypeOf(numberField.initial).toEqualTypeOf<InitialType<number | null>>();
expectTypeOf(numberField.min).toEqualTypeOf<number | undefined>();
expectTypeOf(numberField.max).toEqualTypeOf<number | undefined>();
expectTypeOf(numberField.step).toEqualTypeOf<number | undefined>();
expectTypeOf(numberField.integer).toEqualTypeOf<boolean>();
expectTypeOf(numberField.positive).toEqualTypeOf<boolean>();
expectTypeOf(numberField.choices).toEqualTypeOf<
  number[] | Record<number, string> | (() => number[] | Record<number, string>) | undefined
>();
expectTypeOf(numberField.toFormGroup()).toEqualTypeOf<HTMLDivElement>();
expectTypeOf(numberField.toInput()).toEqualTypeOf<HTMLElement | HTMLCollection>();

expectTypeOf(numberField.apply(() => 4, 6)).toEqualTypeOf<number>();
expectTypeOf(numberField.clean(3)).toEqualTypeOf<number | null>();
expectTypeOf(numberField.getInitialValue()).toEqualTypeOf<number | null>();
expectTypeOf(numberField.getInitialValue({})).toEqualTypeOf<number | null>();
expectTypeOf(numberField.validate(4)).toEqualTypeOf<foundry.data.validation.DataModelValidationError | void>();
expectTypeOf(numberField.initialize(3, model)).toEqualTypeOf<number | null | (() => number | null)>();
expectTypeOf(numberField.toObject(4)).toEqualTypeOf<number | null>();
expectTypeOf(numberField.applyChange(2, model, change)).toEqualTypeOf<number | null>();

// StringField
const stringField = new foundry.data.fields.StringField({ initial: "abc" });

expectTypeOf(stringField.required).toEqualTypeOf<boolean>();
expectTypeOf(stringField.nullable).toEqualTypeOf<boolean>();
expectTypeOf(stringField.initial).toEqualTypeOf<InitialType<string>>();
expectTypeOf(stringField.blank).toEqualTypeOf<boolean>();
expectTypeOf(stringField.trim).toEqualTypeOf<boolean>();
expectTypeOf(stringField.textSearch).toEqualTypeOf<boolean>();
expectTypeOf(stringField.choices).toEqualTypeOf<
  string[] | Record<string, string> | (() => string[] | Record<string, string>) | undefined
>();
expectTypeOf(stringField.toFormGroup()).toEqualTypeOf<HTMLDivElement>();
expectTypeOf(stringField.toInput()).toEqualTypeOf<HTMLElement | HTMLCollection>();

expectTypeOf(stringField.apply(() => 4, 6)).toEqualTypeOf<string>();
expectTypeOf(stringField.clean("foo")).toEqualTypeOf<string>();
expectTypeOf(stringField.getInitialValue()).toEqualTypeOf<string>();
expectTypeOf(stringField.getInitialValue({})).toEqualTypeOf<string>();
expectTypeOf(stringField.validate("foo")).toEqualTypeOf<foundry.data.validation.DataModelValidationError | void>();
expectTypeOf(stringField.initialize("foo", model)).toEqualTypeOf<string | (() => string)>();
expectTypeOf(stringField.toObject("foo")).toEqualTypeOf<string>();
expectTypeOf(stringField.applyChange("foo", model, change)).toEqualTypeOf<string>();

// ObjectField
type ObjType = {
  foo: string;
};
const objectField = new foundry.data.fields.ObjectField({ initial: { foo: "bar" } as ObjType });

expectTypeOf(objectField.required).toEqualTypeOf<boolean>();
expectTypeOf(objectField.nullable).toEqualTypeOf<boolean>();

// TODO
expectTypeOf(objectField.initial).toEqualTypeOf<InitialType<ObjType>>();

// ArrayField
const arrayField = new foundry.data.fields.ArrayField(new foundry.data.fields.StringField(), { initial: [] });

expectTypeOf(arrayField.required).toEqualTypeOf<boolean>();
expectTypeOf(arrayField.nullable).toEqualTypeOf<boolean>();

// TODO
expectTypeOf(arrayField.initial).toEqualTypeOf<InitialType<string[]>>();
expectTypeOf(arrayField.element).toEqualTypeOf<foundry.data.fields.StringField>();

expectTypeOf(foundry.data.fields.ArrayField.recursive).toEqualTypeOf<boolean>();

// SetField
const setField = new foundry.data.fields.SetField(new foundry.data.fields.StringField(), { initial: [] });

expectTypeOf(setField.required).toEqualTypeOf<boolean>();
expectTypeOf(setField.nullable).toEqualTypeOf<boolean>();

// TODO
expectTypeOf(setField.initial).toEqualTypeOf<InitialType<string[]>>();
expectTypeOf(setField.element).toEqualTypeOf<foundry.data.fields.StringField>();

// EmbeddedDataField
const embeddedDataField = new foundry.data.fields.EmbeddedDataField(Actor);

expectTypeOf(embeddedDataField.model).toEqualTypeOf<typeof Actor>();

const actor = new Actor({ name: "aaa", type: "base" });

// TODO
expectTypeOf(embeddedDataField.toObject(actor)).toEqualTypeOf<typeof Actor>();
expectTypeOf(embeddedDataField.migrateSource({}, {})).toEqualTypeOf<unknown>();

// EmbeddedCollectionField
// EmbeddedCollectionDeltaField
// EmbeddedDocumentField
// DocumentIdField
// DocumentUUIDField
// ForeignDocumentField
// ColorField
// FilePathField
// AngleField
// AlphaField
// HueField
// DocumentOwnershipField
// JSONField
// AnyField
// HTMLField
// IntegerSortField
// DocumentStatsField
// DocumentTypeField
// TypeDataField
// TypedSchemaField

// Various special case tests
// #3071 - SchemaField circularity issue
interface TestTypes extends foundry.data.fields.TypedSchemaField.Types {
  rectangle: typeof foundry.data.RectangleShapeData;
}
declare const t: TestTypes;
expectTypeOf(t.rectangle).toEqualTypeOf<typeof foundry.data.RectangleShapeData>();

// ModelValidationError
// JavaScriptField

// #2554 Null and undefined for SchemaField and EmbeddedDataField
new foundry.documents.BaseAmbientSound({
  darkness: null,
});

new foundry.documents.BaseAmbientSound({
  darkness: undefined,
});

new foundry.documents.BaseNote({
  texture: null,
});

new foundry.documents.BaseNote({
  texture: undefined,
});

// #2555 NumberField Choices

// @ts-expect-error - A textAnchor cannot be an arbitrary number.
new foundry.documents.BaseNote({ textAnchor: 999 });

// Should be correct
new foundry.documents.BaseNote({ textAnchor: 2 });

// @ts-expect-error - t cannot be an arbitrary string.
new foundry.documents.BaseMeasuredTemplate({ t: "foobar" });

// TypeDataField
declare const JEPCoreTypes: JournalEntryPage.TypeNames;
declare const JEPSystemTypes: Game.Model.TypeNames<"JournalEntryPage">;

declare global {
  interface DataModelConfig {
    JournalEntryPage: {
      headquarters: typeof foundry.abstract.TypeDataModel<DataSchema, JournalEntryPage>;
    };
  }
}

expectTypeOf(JEPCoreTypes).toEqualTypeOf<"base" | "image" | "pdf" | "text" | "video">();
expectTypeOf(JEPSystemTypes).toEqualTypeOf<"headquarters">();

declare const myJournalEntryPage: JournalEntryPage;
if (myJournalEntryPage.system instanceof foundry.abstract.TypeDataModel) {
  expectTypeOf(myJournalEntryPage.system?.prepareBaseData()).toEqualTypeOf<void>();
}

/** EmbeddedDataField */

declare const embeddedModel: typeof foundry.data.LightData;
declare type embeddedOptions = foundry.data.fields.EmbeddedDataField.Options<typeof embeddedModel>;
declare const embeddedAssignment: foundry.data.fields.EmbeddedDataField.AssignmentType<
  typeof embeddedModel,
  embeddedOptions
>;
declare const embeddedInitialized: foundry.data.fields.EmbeddedDataField.InitializedType<
  typeof embeddedModel,
  embeddedOptions
>;
declare const embeddedPersisted: foundry.data.fields.EmbeddedDataField.PersistedType<
  typeof embeddedModel,
  embeddedOptions
>;

expectTypeOf(embeddedAssignment?.alpha).toEqualTypeOf<number | undefined | null>();
expectTypeOf(embeddedInitialized?.alpha).toEqualTypeOf<number | undefined>();
expectTypeOf(embeddedPersisted?.alpha).toEqualTypeOf<number | undefined>();
expectTypeOf(embeddedModel["schema"]["fields"]["color"]).toEqualTypeOf<
  foundry.data.fields.ColorField<{ label: "LIGHT.Color" }>
>();

declare const embeddedLightField: foundry.data.fields.EmbeddedDataField<typeof foundry.data.LightData>;
expectTypeOf(embeddedLightField.model).toEqualTypeOf<typeof foundry.data.LightData>();

declare const schemaWithLight: foundry.data.fields.SchemaField.InnerInitializedType<{
  light: typeof embeddedLightField;
}>;
expectTypeOf(schemaWithLight.light).toEqualTypeOf<foundry.data.LightData>();

/** EmbeddedCollectionField */

declare const effectsField: foundry.data.fields.EmbeddedCollectionField<
  typeof foundry.documents.BaseActiveEffect,
  Actor.ConfiguredInstance
>;

expectTypeOf(effectsField.hint).toEqualTypeOf<string>();

declare const ElementFieldType: typeof foundry.documents.BaseActiveEffect;
declare const ParentDataModel: Actor.ConfiguredInstance;
declare const AssignmentElementType: foundry.data.fields.EmbeddedCollectionField.InitializedElementType<
  typeof ElementFieldType
>;
declare const InitializedElementType: foundry.data.fields.EmbeddedCollectionField.InitializedElementType<
  typeof ElementFieldType
>;
declare type EmbeddedCollectionOptions = foundry.data.fields.EmbeddedCollectionField.DefaultOptions<
  typeof AssignmentElementType
>;
declare const InitializedType: foundry.data.fields.EmbeddedCollectionField.InitializedType<
  typeof AssignmentElementType,
  typeof InitializedElementType,
  typeof ParentDataModel,
  EmbeddedCollectionOptions
>;

expectTypeOf(ElementFieldType.hasTypeData).toEqualTypeOf<boolean>();
expectTypeOf(ParentDataModel.name).toEqualTypeOf<string>();
expectTypeOf(AssignmentElementType.documentName).toEqualTypeOf<"ActiveEffect">();
expectTypeOf(InitializedElementType.collectionName).toEqualTypeOf<"effects">();
expectTypeOf(InitializedType.get("", { strict: true })).toEqualTypeOf<ActiveEffect>();

const stringField2 = new foundry.data.fields.StringField();

const withChoices = new foundry.data.fields.StringField({ choices: ["a", "b", "c"] });

// @ts-expect-error - A string field is not `nullable` by default and validate does not accept null.
stringField2.validate(null);

// A string field can effectively cast anything. It's a very unsound method.
stringField2["_cast"](null);

// `null` gets handled by `DataField.clean` and gets turned into `undefined` and then the default initial value.
stringField2.clean(null);

stringField2.initialize(null);

// @ts-expect-error - Options cannot accept null.
type _NullOptions = DataField.Options<null>;

// @ts-expect-error - Options cannot accept undefined.
type _UndefinedOptions = DataField.Options<undefined>;

// Options never contains required elements.
const _emptyOptions = {} satisfies DataField.Options.Default<number>;

// Regression test for issue where label was being constrained to `""`.
// Reported by @FloRadical on Discord, see https://discord.com/channels/732325252788387980/793933527065690184/1268262811063287869.
new foundry.data.fields.BooleanField({
  label: "foo",
});

stringField2.toInput({ value: "foo" });

// @ts-expect-error values passed to `toInput` MUST be valid for the field
stringField2.toInput({ value: 200 });

// Inputs generated from a StringField should accept additional config properties for possible use in `createSelectInput`.
stringField2.toInput({ blank: "blank option", choices: ["option1"] });
stringField2.toInput({ blank: "blank option", options: [{ value: "option2", label: "Option 2" }] });

// @ts-expect-error - `blank` is not valid by itself when the field doesn't have choices set.
stringField2.toInput({ blank: "blank option" });

// Because this `StringField` has options it doesn't need to be passed in to `toInput` anymore.
withChoices.toInput({ blank: "blank option" });
