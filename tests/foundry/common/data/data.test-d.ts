import { expectTypeOf } from "vitest";
import type { AnyMutableObject, ToMethod } from "fvtt-types/utils";
import type DatabaseBackend from "../../../../src/foundry/common/abstract/backend.d.mts";
import type { TombstoneData } from "../../../../src/foundry/common/data/data.d.mts";
import type DataModel from "../../../../src/foundry/common/abstract/data.d.mts";
import type { DataSchema } from "../../../../src/foundry/common/data/fields.d.mts";

// LightData
const lightData = new foundry.data.LightData();

expectTypeOf(foundry.data.LightData.defineSchema()).toEqualTypeOf<foundry.data.LightData.Schema>();
expectTypeOf(foundry.data.LightData.LOCALIZATION_PREFIXES).toEqualTypeOf<string[]>();
expectTypeOf(foundry.data.LightData.migrateData({})).toEqualTypeOf<AnyMutableObject>();

// schema fields
type AlphaField = number;
type AngleField = number;
type ColorField = foundry.utils.Color | undefined | null;

expectTypeOf(lightData.negative).toEqualTypeOf<boolean>();
expectTypeOf(lightData.priority).toEqualTypeOf<number>();
expectTypeOf(lightData.alpha).toEqualTypeOf<AlphaField>();
expectTypeOf(lightData.angle).toEqualTypeOf<AngleField>();
expectTypeOf(lightData.bright).toEqualTypeOf<number>();
expectTypeOf(lightData.color).toEqualTypeOf<ColorField>();
expectTypeOf(lightData.coloration).toEqualTypeOf<number | null>();
expectTypeOf(lightData.dim).toEqualTypeOf<number>();
expectTypeOf(lightData.attenuation).toEqualTypeOf<AlphaField>();
expectTypeOf(lightData.luminosity).toEqualTypeOf<number>();
expectTypeOf(lightData.saturation).toEqualTypeOf<number>();
expectTypeOf(lightData.contrast).toEqualTypeOf<number>();
expectTypeOf(lightData.shadows).toEqualTypeOf<number>();

expectTypeOf(lightData.animation.type).toEqualTypeOf<string | null | undefined>();
expectTypeOf(lightData.animation.speed).toEqualTypeOf<number>();
expectTypeOf(lightData.animation.intensity).toEqualTypeOf<number>();
expectTypeOf(lightData.animation.reverse).toEqualTypeOf<boolean>();

expectTypeOf(lightData.darkness.min).toEqualTypeOf<number | undefined | null>();
expectTypeOf(lightData.darkness.max).toEqualTypeOf<number | undefined | null>();

// ShapeData
const shapeData = new foundry.data.ShapeData();

expectTypeOf(foundry.data.ShapeData.defineSchema()).toEqualTypeOf<foundry.data.ShapeData.Schema>();
expectTypeOf(foundry.data.ShapeData.TYPES).toEqualTypeOf<foundry.data.ShapeData.TYPES>();

// schema fields
expectTypeOf(shapeData.type).toEqualTypeOf<"c" | "r" | "e" | "p">();
expectTypeOf(shapeData.width).toEqualTypeOf<number | undefined | null>();
expectTypeOf(shapeData.height).toEqualTypeOf<number | undefined | null>();
expectTypeOf(shapeData.radius).toEqualTypeOf<number | undefined | null>();
expectTypeOf(shapeData.points).toEqualTypeOf<(number | undefined)[]>();

// BaseShapeData
expectTypeOf(foundry.data.BaseShapeData.defineSchema()).toEqualTypeOf<foundry.data.BaseShapeData.Schema>();
expectTypeOf(foundry.data.BaseShapeData.TYPES).toEqualTypeOf<Readonly<foundry.data.BaseShapeData.Types>>();
expectTypeOf(foundry.data.BaseShapeData.TYPE).toEqualTypeOf<string>();

// schema fields
declare const baseShapeData: foundry.data.BaseShapeData;
expectTypeOf(baseShapeData.type).toEqualTypeOf<string>();
expectTypeOf(baseShapeData.hole).toEqualTypeOf<boolean>();

// RectangleShapeData
const rectangleShapeData = new foundry.data.RectangleShapeData({ x: 1, y: 1, width: 1, height: 1, rotation: 4 });
expectTypeOf(foundry.data.RectangleShapeData.TYPE).toEqualTypeOf<string>();
expectTypeOf(foundry.data.RectangleShapeData.defineSchema()).toEqualTypeOf<foundry.data.RectangleShapeData.Schema>();

// schema fields
expectTypeOf(rectangleShapeData.x).toEqualTypeOf<number>();
expectTypeOf(rectangleShapeData.y).toEqualTypeOf<number>();
expectTypeOf(rectangleShapeData.width).toEqualTypeOf<number>();
expectTypeOf(rectangleShapeData.height).toEqualTypeOf<number>();
expectTypeOf(rectangleShapeData.rotation).toEqualTypeOf<AngleField>();

// CircleShapeData
const circleShapeData = new foundry.data.CircleShapeData({ x: 1, y: 1, radius: 1 });
expectTypeOf(foundry.data.CircleShapeData.TYPE).toEqualTypeOf<string>();
expectTypeOf(foundry.data.CircleShapeData.defineSchema()).toEqualTypeOf<foundry.data.CircleShapeData.Schema>();

// schema fields
expectTypeOf(circleShapeData.x).toEqualTypeOf<number>();
expectTypeOf(circleShapeData.y).toEqualTypeOf<number>();
expectTypeOf(circleShapeData.radius).toEqualTypeOf<number>();

// EllipseShapeData
const ellipseShapeData = new foundry.data.EllipseShapeData({ x: 1, y: 1, radiusX: 1, radiusY: 1, rotation: 4 });
expectTypeOf(foundry.data.EllipseShapeData.TYPE).toEqualTypeOf<string>();
expectTypeOf(foundry.data.EllipseShapeData.defineSchema()).toEqualTypeOf<foundry.data.EllipseShapeData.Schema>();

// schema fields
expectTypeOf(ellipseShapeData.x).toEqualTypeOf<number>();
expectTypeOf(ellipseShapeData.y).toEqualTypeOf<number>();
expectTypeOf(ellipseShapeData.radiusX).toEqualTypeOf<number>();
expectTypeOf(ellipseShapeData.radiusY).toEqualTypeOf<number>();
expectTypeOf(ellipseShapeData.rotation).toEqualTypeOf<AngleField>();

// PolygonShapeData
const polygonShapeData = new foundry.data.PolygonShapeData({ points: [1, 4, 5, 2, 4, 4] });
expectTypeOf(foundry.data.PolygonShapeData.TYPE).toEqualTypeOf<string>();
expectTypeOf(foundry.data.PolygonShapeData.defineSchema()).toEqualTypeOf<foundry.data.PolygonShapeData.Schema>();

// schema fields
expectTypeOf(polygonShapeData.points).toEqualTypeOf<number[]>();

// BaseToken

declare const baseToken: foundry.documents.BaseToken;
expectTypeOf(baseToken.displayName).toEqualTypeOf<foundry.CONST.TOKEN_DISPLAY_MODES>();
expectTypeOf(baseToken.light.alpha).toEqualTypeOf<number>();

// schema fields

// ProtoTypeToken
const prototypeToken = new foundry.data.PrototypeToken();
expectTypeOf(prototypeToken.parent).toEqualTypeOf<foundry.data.PrototypeToken.Parent>();
expectTypeOf(prototypeToken.apps).toEqualTypeOf<Record<string, Application.Any>>();
expectTypeOf(prototypeToken.actor).toEqualTypeOf<foundry.data.PrototypeToken.Parent>();

expectTypeOf(prototypeToken.toObject(true)).toEqualTypeOf<
  (typeof prototypeToken)["_source"] & { actorId: string | undefined }
>();
expectTypeOf(prototypeToken.toObject()).toEqualTypeOf<ReturnType<(typeof prototypeToken)["schema"]["toObject"]>>();

expectTypeOf(prototypeToken.update({}, {})).toEqualTypeOf<unknown>();
expectTypeOf(prototypeToken.getFlag("foo", "bar")).toEqualTypeOf<unknown>();
expectTypeOf(prototypeToken.setFlag("foo", "bar", 3)).toEqualTypeOf<Promise<unknown>>();
expectTypeOf(prototypeToken.unsetFlag("foo", "bar")).toEqualTypeOf<Promise<unknown>>();

declare const user: User;
expectTypeOf(prototypeToken.testUserPermission(user, "INHERIT", { exact: true })).toEqualTypeOf<boolean>();
expectTypeOf(prototypeToken.isOwner).toEqualTypeOf<boolean>();
expectTypeOf(prototypeToken.getBarAttribute).toEqualTypeOf<ToMethod<TokenDocument["getBarAttribute"]>>();
expectTypeOf(prototypeToken.getBarAttribute("foo")?.attribute).toEqualTypeOf<string | undefined>();

expectTypeOf(foundry.data.PrototypeToken.defineSchema()).toEqualTypeOf<foundry.data.PrototypeToken.Schema>();
expectTypeOf(foundry.data.PrototypeToken.LOCALIZATION_PREFIXES).toEqualTypeOf<string[]>();
expectTypeOf(foundry.data.PrototypeToken.database).toEqualTypeOf<DatabaseBackend>();

// schema fields
expectTypeOf(prototypeToken.name).toEqualTypeOf<string>();
expectTypeOf(prototypeToken.randomImg).toEqualTypeOf<boolean>();
expectTypeOf(prototypeToken.displayName).toEqualTypeOf<foundry.CONST.TOKEN_DISPLAY_MODES>();
expectTypeOf(prototypeToken.light.alpha).toEqualTypeOf<number>();

// TextureData (is a schemafield, not a datamodel)
interface TestSchema extends DataSchema {
  testTexture: foundry.data.TextureData;
}

declare class SchemaTest extends DataModel<TestSchema, any> {
  static override defineSchema(): TestSchema;
}

const textureModel = new SchemaTest();

// schema fields
expectTypeOf(textureModel.testTexture.src).toEqualTypeOf<string | null>();
expectTypeOf(textureModel.testTexture.anchorX).toEqualTypeOf<number>();
expectTypeOf(textureModel.testTexture.anchorY).toEqualTypeOf<number>();
expectTypeOf(textureModel.testTexture.offsetX).toEqualTypeOf<number>();
expectTypeOf(textureModel.testTexture.offsetY).toEqualTypeOf<number>();
expectTypeOf(textureModel.testTexture.fit).toEqualTypeOf<(typeof CONST.TEXTURE_DATA_FIT_MODES)[number] | undefined>();
expectTypeOf(textureModel.testTexture.scaleX).toEqualTypeOf<number | undefined>();
expectTypeOf(textureModel.testTexture.scaleY).toEqualTypeOf<number | undefined>();
expectTypeOf(textureModel.testTexture.rotation).toEqualTypeOf<AngleField>();
expectTypeOf(textureModel.testTexture.tint).toEqualTypeOf<Exclude<ColorField, undefined>>();
expectTypeOf(textureModel.testTexture.alphaThreshold).toEqualTypeOf<AlphaField>();

// TombstoneData
const tombstoneData = new foundry.data.TombstoneData();

expectTypeOf(foundry.data.TombstoneData.defineSchema()).toEqualTypeOf<TombstoneData.Schema>();

// schema fields
expectTypeOf(tombstoneData._id).toEqualTypeOf<string | null>();
expectTypeOf(tombstoneData._tombstone).toEqualTypeOf<boolean>();
