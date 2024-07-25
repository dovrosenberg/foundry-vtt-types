import type ApplicationV2 from "../api/application.mts";
import type HandlebarsApplicationMixin from "../api/handlebars-application.mts";

/**
 * Scene Region Legend.
 */
export default class RegionLegend<
  Configuration extends ApplicationV2.Configuration = ApplicationV2.Configuration,
  RenderOptions extends ApplicationV2.RenderOptions = ApplicationV2.RenderOptions,
> extends HandlebarsApplicationMixin(ApplicationV2)<Configuration, RenderOptions> {}
