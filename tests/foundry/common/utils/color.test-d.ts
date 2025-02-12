import { expectTypeOf } from "vitest";

const color = new Color();

expectTypeOf(color.valid).toEqualTypeOf<boolean>();
expectTypeOf(color.css).toEqualTypeOf<string>();
expectTypeOf(color.rgb).toEqualTypeOf<Color.RGBColorVector>();
expectTypeOf(color.r).toEqualTypeOf<number>();
expectTypeOf(color.g).toEqualTypeOf<number>();
expectTypeOf(color.b).toEqualTypeOf<number>();
expectTypeOf(color.maximum).toEqualTypeOf<number>();
expectTypeOf(color.minimum).toEqualTypeOf<number>();
expectTypeOf(color.littleEndian).toEqualTypeOf<number>();
expectTypeOf(color.hsv).toEqualTypeOf<Color.HSVColorVector>();
expectTypeOf(color.hsl).toEqualTypeOf<Color.HSLColorVector>();
expectTypeOf(color.linear).toEqualTypeOf<Color.RGBColorVector>();
expectTypeOf(color.toJSON()).toEqualTypeOf<string>();
expectTypeOf(color.toHTML()).toEqualTypeOf<string>();
expectTypeOf(color.equals(4)).toEqualTypeOf<boolean>();
expectTypeOf(color.toRGBA(5)).toEqualTypeOf<string>();
expectTypeOf(color.mix(new Color(), 4)).toEqualTypeOf<Color>();
expectTypeOf(color.multiply(new Color())).toEqualTypeOf<Color>();
expectTypeOf(color.add(new Color())).toEqualTypeOf<Color>();
expectTypeOf(color.subtract(new Color())).toEqualTypeOf<Color>();
expectTypeOf(color.maximize(new Color())).toEqualTypeOf<Color>();
expectTypeOf(color.applyRGB([])).toEqualTypeOf<void>();

// TODO - finish
expectTypeOf(color.applyRGB([])).toEqualTypeOf<void>();
