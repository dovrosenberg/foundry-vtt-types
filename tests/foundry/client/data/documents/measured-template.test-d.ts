import { expectTypeOf } from "vitest";

const doc = new MeasuredTemplateDocument();

expectTypeOf(doc.author).toEqualTypeOf<User | undefined>();
expectTypeOf(doc.layer).toEqualTypeOf<TemplateLayer>();

expectTypeOf(doc.sheet).toEqualTypeOf<FormApplication | foundry.applications.api.ApplicationV2 | null>();
