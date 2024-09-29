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

declare enum GpuAccelType {
  "CUDA" = "CUDA",
  "Metal" = "Metal",
  "OPENCL" = "OPENCL",
  "SOFTWARE" = "SOFTWARE",
}

declare class Application {
  /**
   * The Viewer object for the currently focused or active-focused viewer (Composition, Layer, or Footage) panel. Returns null if no viewers are open.
   */
  readonly activeViewer: Viewer;
  /**
   * Use this in conjunction with `app.project.gpuAccelType` to set the value for Project Settings > Video Rendering and Effects > Use.
   *
   * Note: This functionality was added in After Effects 14.0 (CC 2017)
   */
  availableGPUAccelTypes: `${GpuAccelType}` | null;
  /**
   * The name of the build of After Effects being run, used internally by Adobe for testing and troubleshooting.
   */
  readonly buildName: string;
  /**
   * The number of the build of After Effects being run, used internally by Adobe for testing and troubleshooting.
   */
  readonly buildNumber: number;
  /**
   * When false (the default), rendering proceeds as normal. Set to true to disable rendering as if Caps Lock were turned on.
   *
   * Note: This functionality was added in After Effects 16.0 (CC 2019)
   */
  disableRendering: boolean;
  /**
   * The effects available in the application.
   */
  readonly effects: Effect[];
  /**
   * This attribute is used only when executing a script from a command line on Windows.
   * When the application is launched from the command line, the –r or –s command line flag causes the application to run a script (from a file or from a string, respectively).
   * If this attribute is set to true, After Effects will exit after the script is run; if it is false, the application will remain open.
   * This attribute only has an effect when After Effects is run from the Windows command line. It has no effect in Mac OS.
   */
  exitAfterLaunchAndEval: boolean;
  /**
   * A numeric status code used when executing a script externally (that is, from a command line or AppleScript).
   * - In Windows, the value is returned on the command line when After Effects was launched on the command line (using the afterfx or afterfx –m command), and a script was specified with the –r or –s option.
   * - In Mac OS, the value is returned as the AppleScript DoScript result for each script.
   * - In both Mac OS and Windows, the value is set to 0 (EXIT_SUCCESS) at the beginning of each script evaluation. In the event of an error while the script is running, the script can set this to a positive integer that indicates what error occurred.
   */
  exitCode: number;
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

type Effect = {
  /**
   * String representing the localized display name of the effect as seen in the Effect menu.
   */
  readonly displayName: string;
  /**
   * String representing the localized category label as seen in the Effect menu. This can be for synthetic effects that aren’t normally shown to the user.
   */
  readonly category: string;
  /**
   * String representing the internal unique name for the effect. This name does not change between versions of After Effects. Use this value to apply the effect.
   */
  readonly matchName: string;
  /**
   * Effect’s internal version string. This value might be different than the version number the plug-in vendor decides to show in the effect’s about box.
   */
  readonly version: string;
};

declare const app: Application;
