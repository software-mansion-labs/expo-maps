import { Platform } from 'react-native';
import {
  EventEmitter,
  Subscription,
  ProxyNativeModule,
} from 'expo-modules-core';
import {
  NativeExpoAppleMapsModule,
  NativeExpoGoogleMapsModule,
} from './ExpoMaps';
import { CameraPosition, Point, PointOfInterest } from './Common.types';

var module: ProxyNativeModule;
if (Platform.OS == 'ios') {
  module = NativeExpoAppleMapsModule;
} else {
  module = NativeExpoGoogleMapsModule;
}

const emitter = new EventEmitter(module);

const MapsEventsNames = {
  ON_CAMERA_MOVE_STARTED_EVENT: 'onCameraMoveStarted',
  ON_CAMERA_MOVE_ENDED_EVENT: 'onCameraMoveEnded',
  ON_MARKER_CLICK_EVENT: 'onMarkerClick',
  ON_MARKER_DRAG_STARTED_EVENT: 'onMarkerDragStarted',
  ON_MARKER_DRAG_ENDED_EVENT: 'onMarkerDragEnded',
};

/**
 * Type of an argument of CameraMoveStarted and CameraMoveEnded listeners.
 */
export type CameraEvent = {
  /**
   * Latitude of the camera position.
   */
  latitude: number;
  /**
   * Longitude of the camera position.
   */
  longitude: number;
};

/**
 * Type of an argument of MarkerClick listener.
 */
export type MarkerClickEvent = {
  /**
   * Id of the marker that was clicked.
   */
  id: string;
};

/**
 * Type of an argument of MarkerDragEnded listener.
 */
export type MarkerDragEndedEvent = {
  /**
   * Id of the marker that was dragged.
   */
  id: string;
  /**
   * Latitude of the dragged marker.
   */
  latitude: number;
  /**
   * Longitude of the dragged marker.
   */
  longitude: number;
};

/**
 * Type of an argument of MarkerDragStarted listener.
 */
export type MarkerDragStartedEvent = {
  /**
   * Id of the marker that was dragged.
   */
  id: string;
};

/**
 * Represents data returned on click event.
 */
export type OnMapClickEvent = {
  /**
   * Coordinates the place where user clicked.
   * Represented by {@link Point}
   */
  nativeEvent: Point;
};

/**
 * Represents data returned on RegionChangeEvent
 */
export type OnRegionChangeEvent = {
  /**
   * Information on cameraPosition.
   * Represented by {@link CameraPosition}
   */
  nativeEvent: CameraPosition;
};

/**
 * Represents data returned on PoiClickEvent
 */
export type OnPoiClickEvent = {
  /**
   * Information on the clicked point of interest.
   * Represented by {@link PointOfInterest}
   */
  nativeEvent: PointOfInterest;
};

/**
 * Adds a new listener to be called when camera starts moving.
 * @returns Subscription which can be used later to remove this particular listener.
 */
export function addOnCameraMoveStartedListener(
  listener: (event: CameraEvent) => void
): Subscription {
  return emitter.addListener<CameraEvent>(
    MapsEventsNames.ON_CAMERA_MOVE_STARTED_EVENT,
    listener
  );
}

/**
 * Removes all listeners registered to listen for CameraMoveStarted event.
 */
export function removeAllOnCameraMoveStartedListeners() {
  emitter.removeAllListeners(MapsEventsNames.ON_CAMERA_MOVE_STARTED_EVENT);
}

/**
 * Adds a new listener to be called when camera stops moving.
 * @returns Subscription which can be used later to remove this particular listener.
 */
export function addOnCameraMoveEndedListener(
  listener: (event: CameraEvent) => void
): Subscription {
  return emitter.addListener<CameraEvent>(
    MapsEventsNames.ON_CAMERA_MOVE_ENDED_EVENT,
    listener
  );
}

/**
 * Removes all listeners registered to listen for CameraMoveEnded event.
 */
export function removeAllOnCameraMoveEndedListeners() {
  emitter.removeAllListeners(MapsEventsNames.ON_CAMERA_MOVE_ENDED_EVENT);
}

/**
 * Adds a new listener to be called when a marker or cluster is clicked.
 * @returns Subscription which can be used later to remove this particular listener.
 */
export function addOnMarkerClickListener(
  listener: (event: MarkerClickEvent) => void
): Subscription {
  return emitter.addListener<MarkerClickEvent>(
    MapsEventsNames.ON_MARKER_CLICK_EVENT,
    listener
  );
}

/**
 * Removes all listeners registered to listen for MarkerClick event.
 */
export function removeAllOnMarkerClickListeners() {
  emitter.removeAllListeners(MapsEventsNames.ON_MARKER_CLICK_EVENT);
}

/**
 * Adds a new listener to be called when a user starts dragging a marker.
 * Does not work for markers which are children of Cluster.
 * @returns Subscription which can be used later to remove this particular listener.
 */
export function addOnMarkerDragStartedListener(
  listener: (event: MarkerDragStartedEvent) => void
): Subscription {
  return emitter.addListener<MarkerDragStartedEvent>(
    MapsEventsNames.ON_MARKER_DRAG_STARTED_EVENT,
    listener
  );
}

/**
 * Removes all listeners registered to listen for MarkerDragStarted event.
 */
export function removeAllOnMarkerDragStartedListeners() {
  emitter.removeAllListeners(MapsEventsNames.ON_MARKER_DRAG_STARTED_EVENT);
}

/**
 * Adds a new listener to be called when a user drops a marker.
 * Does not work for markers which are children of Cluster.
 * @returns Subscription which can be used later to remove this particular listener.
 */
export function addOnMarkerDragEndedListener(
  listener: (event: MarkerDragEndedEvent) => void
): Subscription {
  return emitter.addListener<MarkerDragEndedEvent>(
    MapsEventsNames.ON_MARKER_DRAG_ENDED_EVENT,
    listener
  );
}

/**
 * Removes all listeners registered to listen for MarkerDragEnded event.
 */
export function removeAllOnMarkerDragEndedListeners() {
  emitter.removeAllListeners(MapsEventsNames.ON_MARKER_DRAG_ENDED_EVENT);
}

/**
 * Removes particular listener, which was earlier registered.
 */
export function removeEventListener(subscription: Subscription) {
  emitter.removeSubscription(subscription);
}

/**
 * Removes all registered listeners.
 */
export function removeAllListeners() {
  for (let event in MapsEventsNames) {
    emitter.removeAllListeners(MapsEventsNames[event]);
  }
}
