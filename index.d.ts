// declare type ViewerType = "VIEWER_COMPOSITION";

declare enum ViewerType {
  "VIEWER_COMPOSITION" = "VIEWER_COMPOSITION",
  "VIEWER_LAYER" = "VIEWER_LAYER",
  "VIEWER_FOOTAGE" = "VIEWER_FOOTAGE",
}

declare enum FastPreview {
  "FP_OFF" = "Off (Final Quality)",
  "FP_ADAPTIVE_RESOLUTION" = "Adaptive Resolution",
  "FP_DRAFT" = "Draft",
  "FP_FAST_DRAFT" = "Fast Draft",
  "FP_WIREFRAME" = "Wireframe",
}

declare enum Channels {
  "CHANNEL_ALPHA" = "CHANNEL_ALPHA",
  "CHANNEL_ALPHA_BOUNDARY" = "CHANNEL_ALPHA_BOUNDARY",
  "CHANNEL_ALPHA_OVERLAY" = "CHANNEL_ALPHA_OVERLAY",
  "CHANNEL_BLUE" = "CHANNEL_BLUE",
  "CHANNEL_BLUE_COLORIZE" = "CHANNEL_BLUE_COLORIZE",
  "CHANNEL_GREEN" = "CHANNEL_GREEN",
  "CHANNEL_GREEN_COLORIZE" = "CHANNEL_GREEN_COLORIZE",
  "CHANNEL_RED" = "CHANNEL_RED",
  "CHANNEL_RED_COLORIZE" = "CHANNEL_RED_COLORIZE",
  "CHANNEL_RGB" = "CHANNEL_RGB",
  "CHANNEL_RGB_STRAIGHT" = "CHANNEL_RGB_STRAIGHT",
}

declare class Application {
  readonly activeViewer: Viewer;
}
/**
 * The Viewer object represents a Composition, Layer, or Footage panel.
 */
type Viewer = {
  /**
   * When true, indicates if the viewer panel is focused, and thereby frontmost.
   */
  readonly active: boolean;
  /**
   * The index of the current active View object, in the Viewer.views array.
   */
  activeViewIndex: number;
  /**
   * When true, indicates if the viewer panel is at its maximized size.
   */
  maximized: boolean;
  /**
   * All of the Views associated with this viewer.
   */
  readonly views: View[];
  /**
   * The content in the viewer panel.
   */
  readonly type: `${ViewerType}`;
  /**
   *Moves the viewer panel to the front and places focus on it, making it active. Calling this method will set the viewer’s active attribute to true.
   *
   * @returns Boolean indicating if the viewer panel was made active.
   */
  setActive: () => void;
};

/**
 * The View object represents a specific view.
 */
type View = {
  /**
   * When true, indicates if the viewer panel is focused, and thereby frontmost.
   */
  readonly active: boolean;
  /**
   * Options object for this View
   */
  options: ViewOptions;
  /**
   * Moves this view panel to the front and places focus on it, making it active. Calling this method will set the view’s active attribute to true.
   *
   * @returns
   * Boolean, indicating if the view panel was made active.
   */
  setActive: () => void;
};

/**
 * The ViewOptions object represents the options for a given {@link View} object
 */
type ViewOptions = {
  channels: `${Channels}`;
  /**
   * When true, checkerboards (transparency grid) is enabled in the current view.
   */
  checkerboards: boolean;
  /**
   * The exposure value for the current view.
   */
  exposure: number;
  /**
   * The state of the Fast Previews menu. This is a read/write attribute using an enumerated value.
   *
   * The Draft preview mode is only available in ray-traced 3D compositions. If you try to use it in a Classic 3D composition, you’ll get an error: “Cannot set Draft fast preview mode in a Classic 3D composition.”
   */
  fastPreview: `${FastPreview}`;
  /**
   * When true, indicates guides are locked in the view.
   *
   * Note: This functionality was added in After Effects 16.1 (CC 2019)
   */
  guidesLocked: boolean;
  /**
   * When true, indicates layers snap to guides when dragged in the view.
   *
   * Note: This functionality was added in After Effects 16.1 (CC 2019)
   */
  guidesSnap: boolean;
  /**
   * When true, indicates guides are visible in the view.
   *
   * Note: This functionality was added in After Effects 16.1 (CC 2019)
   */
  guidesVisibility: boolean;
  /**
   * When true, indicates rulers are shown in the view.
   *
   * Note: This functionality was added in After Effects 16.1 (CC 2019)
   */
  rulers: boolean;
  /**
   * Sets the current zoom value for the view, as a normalized percentage between 1% (0.01) and 1600% (16).
   */
  zoom: number;
};

declare const app: Application;
