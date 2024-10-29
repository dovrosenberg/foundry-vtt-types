import type { ConstructorOf, InexactPartial, ValueOf } from "../../../../../../types/utils.d.mts";

export {};

declare abstract class AnyVisualEffectsMaskingFilter extends VisualEffectsMaskingFilter {
  constructor(arg0: never, ...args: never[]);
}

declare global {
  namespace VisualEffectsMaskingFilter {
    type AnyConstructor = typeof AnyVisualEffectsMaskingFilter;

    //todo: convert to interface
    type PostProcessModes = Array<keyof (typeof VisualEffectsMaskingFilter)["POST_PROCESS_TECHNIQUES"]>;

    //todo: convert to interface
    type FilterMode = ValueOf<(typeof VisualEffectsMaskingFilter)["FILTER_MODES"]>;

    /**
     * @privateRemarks Implementation taken from https://stackoverflow.com/a/61434547
     */
    // TODO: Replace when https://github.com/microsoft/TypeScript/issues/17867 is resolved
    type CreateOptionsIntersection = {
      filterMode?: FilterMode;
      postProcessModes?: PostProcessModes;
    } & AbstractBaseShader.Uniforms;

    type CreateOptions<T> = InexactPartial<{
      filterMode: FilterMode;
      postProcessModes: PostProcessModes;
    }> & {
      [K in keyof T]: K extends "filterMode" | "postProcessModes" ? unknown : AbstractBaseShader.UniformValue;
    };

    interface POST_PROCESS_TECHNIQUES {
      EXPOSURE: { id: string; glsl: string };
      CONTRAST: { id: string; glsl: string };
      SATURATION: { id: string; glsl: string };
    }
  }

  /**
   * This filter handles masking and post-processing for visual effects.
   */
  class VisualEffectsMaskingFilter extends AbstractBaseMaskFilter {
    /**
     * @remarks This method has been overloaded to accurately type the object input.
     * The input cannot be separately typed, it must be fed directly into this method
     */
    // TODO: Replace when https://github.com/microsoft/TypeScript/issues/17867 is resolved
    static override create<
      T extends VisualEffectsMaskingFilter,
      Options extends VisualEffectsMaskingFilter.CreateOptions<T>,
    >(this: ConstructorOf<T>, { postProcessModes, ...uniforms }?: Options): T;
    static override create<T extends VisualEffectsMaskingFilter>(
      this: ConstructorOf<T>,
      { postProcessModes, ...uniforms }?: VisualEffectsMaskingFilter.CreateOptionsIntersection,
    ): T;

    /**
     * Masking modes.
     */
    static readonly FILTER_MODES: {
      BACKGROUND: 0;
      ILLUMINATION: 1;
      COLORATION: 2;
    };

    /**
     * @defaultValue
     * ```js
     * {
     *    tint: [1, 1, 1],
     *    screenDimensions: [1, 1],
     *    enableVisionMasking: true,
     *    visionTexture: null,
     *    darknessLevelTexture: null,
     *    exposure: 0,
     *    contrast: 0,
     *    saturation: 0,
     *    mode: 0,
     *    ambientDarkness: [0, 0, 0],
     *    ambientDaylight: [1, 1, 1],
     *    replacementColor: [0, 0, 0]
     * }
     * ```
     */
    static override defaultUniforms: AbstractBaseShader.Uniforms;

    /**
     * Update the filter shader with new post-process modes.
     * @param postProcessModes - New modes to apply.
     * @param uniforms         - Uniforms value to update.
     */
    updatePostprocessModes(
      postProcessModes?: VisualEffectsMaskingFilter.PostProcessModes,
      uniforms?: AbstractBaseShader.Uniforms,
    ): void;

    /**
     * Remove all post-processing modes and reset some key uniforms.
     */
    reset(): void;

    override apply(
      filterManager: PIXI.FilterSystem,
      input: PIXI.RenderTexture,
      output: PIXI.RenderTexture,
      clear: PIXI.CLEAR_MODES,
      currentState: PIXI.FilterState,
    ): void;

    /**
     * Filter post-process techniques.
     */
    static POST_PROCESS_TECHNIQUES: VisualEffectsMaskingFilter.POST_PROCESS_TECHNIQUES;

    /**
     * Memory allocations and headers for the VisualEffectsMaskingFilter
     */
    static fragmentHeader: string;

    static fragmentCore: string;

    /**
     * Construct filter post-processing code according to provided value.
     * @param postProcessModes - Post-process modes to construct techniques.
     * @returns The constructed shader code for post-process techniques.
     */
    static fragmentPostProcess(postProcessModes?: VisualEffectsMaskingFilter.PostProcessModes): string;

    /**
     * Specify the fragment shader to use according to mode
     * @param filterMode       - (default: this.FILTER_MODES.BACKGROUND)
     * @param postProcessModes - (default: [])
     */
    static override fragmentShader(postProcessModes?: VisualEffectsMaskingFilter.PostProcessModes): string;
  }
}
