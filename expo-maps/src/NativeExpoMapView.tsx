import { requireNativeViewManager } from "expo-modules-core";
import * as React from "react";

import { NativeExpoMapViewProps } from "./Maps.types";

const NativeExpoMapView = requireNativeViewManager(
  "ExpoMaps"
) as React.FC<NativeExpoMapViewProps>;

export default NativeExpoMapView;
