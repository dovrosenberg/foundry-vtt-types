import type { FilterSystem, RenderTexture, CLEAR_MODES } from "pixi.js";
import type { ValueOf } from "../../../../../../types/utils.d.mts";

export {};

declare global {
  /**
   * A filter specialized for transition effects between a source object and a target texture.
   */
  class TextureTransitionFilter extends AbstractBaseFilter {
    /**
     * Transition types for this shader.
     */
    static get TYPES(): TextureTransitionFilter.TYPES;

    /**
     * The transition type (see {@link TextureTransitionFilter.TYPES}).
     * @defaultValue TextureTransitionFilter.TYPES.FADE
     */
    get type(): ValueOf<TextureTransitionFilter.TYPES>;

    set type(type: ValueOf<TextureTransitionFilter.TYPES>);

    /**
     * Sampler target for this filter.
     */
    set targetTexture(targetTexture: PIXI.Texture);

    /**
     * Animate a transition from a subject SpriteMesh/PIXI.Sprite to a given texture.
     * @param subject - The source mesh/sprite to apply a transition.
     * @param texture - The target texture.
     * @param options - Animation options.
     * @returns   A Promise which resolves to true once the animation has concluded
     *            or false if the animation was prematurely terminated
     */
    static animate(
      subject: PIXI.Sprite | SpriteMesh,
      texture: PIXI.Texture,
      options?: {
        /**
         * The transition type
         * @defaultValue `TYPES.FADE`
         */
        type?: ValueOf<TextureTransitionFilter.TYPES>;
        /**
         * The name of the {@link CanvasAnimation}.
         */
        name?: string | symbol;
        /**
         * The animation duration
         * @defaultValue 1000
         */
        duration?: number;
        /**
         * The easing function of the animation
         */
        easing?: CanvasAnimation.EasingFunction;
      },
    ): Promise<boolean>;

    /**
     * @defaultValue
     * ```js
     * {
     *   tintAlpha: [1, 1, 1, 1],
     *   targetTexture: null,
     *   progress: 0,
     *   rotation: 0,
     *   anchor: {x: 0.5, y: 0.5},
     *   type: 1,
     *   filterMatrix: new PIXI.Matrix(),
     *   filterMatrixInverse: new PIXI.Matrix(),
     *   targetUVMatrix: new PIXI.Matrix()
     * }
     * ```
     */
    static override defaultUniforms: AbstractBaseShader.Uniforms;

    static override vertexShader: string;

    static override fragmentShader: AbstractBaseFilter.FragmentShader;

    override apply(
      filterManager: FilterSystem,
      input: RenderTexture,
      output: RenderTexture,
      clearMode?: CLEAR_MODES,
    ): void;
  }

  namespace TextureTransitionFilter {
    // types are literals and not `string` to make the `type` getter and setter typings work
    interface TYPES {
      FADE: "fade";
      SWIRL: "swirl";
      WATER_DROP: "waterDrop";
      MORPH: "morph";
      CROSSHATCH: "crosshatch";
      WIND: "wind";
      WAVES: "waves";
      WHITE_NOISE: "whiteNoise";
      HOLOGRAM: "hologram";
      HOLE: "hole";
      HOLE_SWIRL: "holeSwirl";
      GLITCH: "glitch";
      DOTS: "dots";
    }
  }
}
