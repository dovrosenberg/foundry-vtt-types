import type { GetDataReturnType, MaybePromise } from "../../../../utils/index.d.mts";

declare global {
  /**
   * The Application responsible for configuring a single MeasuredTemplate document within a parent Scene.
   * @typeParam Options - the type of the options object
   */
  class MeasuredTemplateConfig<
    Options extends
      DocumentSheetOptions<MeasuredTemplateDocument.Implementation> = DocumentSheetOptions<MeasuredTemplateDocument.Implementation>,
  > extends DocumentSheet<Options, MeasuredTemplateDocument.Implementation> {
    /**
     * @defaultValue
     * ```typescript
     * foundry.utils.mergeObject(super.defaultOptions, {
     *   id: "template-config",
     *   classes: ["sheet", "template-sheet"],
     *   title: "TEMPLATE.MeasuredConfig",
     *   template: "templates/scene/template-config.html",
     *   width: 400,
     * })
     * ```
     */
    static override get defaultOptions(): DocumentSheetOptions<MeasuredTemplateDocument.Implementation>;

    override getData(): MaybePromise<GetDataReturnType<MeasuredTemplateConfig.MeasuredTemplateConfigData>>;

    protected override _updateObject(event: Event, formData: MeasuredTemplateConfig.FormData): Promise<unknown>;
  }

  namespace MeasuredTemplateConfig {
    type Any = MeasuredTemplateConfig<any>;

    interface FormData {
      angle: number | null;
      borderColor: string;
      direction: number | null;
      distance: number | null;
      fillColor: string;
      hidden: boolean;
      t: foundry.CONST.MEASURED_TEMPLATE_TYPES;
      texture: string;
      width: number | null;
      x: number | null;
      y: number | null;
    }

    interface MeasuredTemplateConfigData<
      Options extends
        DocumentSheetOptions<MeasuredTemplateDocument.Implementation> = DocumentSheetOptions<MeasuredTemplateDocument.Implementation>,
    > extends DocumentSheet.DocumentSheetData<Options, MeasuredTemplateDocument.Implementation> {
      templateTypes: Record<foundry.CONST.MEASURED_TEMPLATE_TYPES, string>;
      gridUnits: string;
      submitText: string;
    }
  }
}
