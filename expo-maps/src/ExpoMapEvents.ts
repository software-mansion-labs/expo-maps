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

export type CameraEvent = {
  latitude: number;
  longitude: number;
};

export type MarkerClickEvent = {
  id: string;
};

export type MarkerDragEndedEvent = {
  id: string;
  latitude: number;
  longitude: number;
};

export type MarkerDragStartedEvent = {
  id: string;
};

export function addOnCameraMoveStartedListener(
  listener: (event: CameraEvent) => void
): Subscription {
  return emitter.addListener<CameraEvent>(
    MapsEventsNames.ON_CAMERA_MOVE_STARTED_EVENT,
    listener
  );
}

export function removeAllOnCameraMoveStartedListeners() {
  emitter.removeAllListeners(MapsEventsNames.ON_CAMERA_MOVE_STARTED_EVENT);
}

export function addOnCameraMoveEndedListener(
  listener: (event: CameraEvent) => void
): Subscription {
  return emitter.addListener<CameraEvent>(
    MapsEventsNames.ON_CAMERA_MOVE_ENDED_EVENT,
    listener
  );
}

export function removeAllOnCameraMoveEndedListeners() {
  emitter.removeAllListeners(MapsEventsNames.ON_CAMERA_MOVE_ENDED_EVENT);
}

export function addOnMarkerClickListener(
  listener: (event: MarkerClickEvent) => void
): Subscription {
  console.log(emitter._listenerCount);
  return emitter.addListener<MarkerClickEvent>(
    MapsEventsNames.ON_MARKER_CLICK_EVENT,
    listener
  );
}

export function removeAllOnMarkerClickListeners() {
  emitter.removeAllListeners(MapsEventsNames.ON_MARKER_CLICK_EVENT);
}

export function addOnMarkerDragStartedListener(
  listener: (event: MarkerDragStartedEvent) => void
): Subscription {
  return emitter.addListener<MarkerDragStartedEvent>(
    MapsEventsNames.ON_MARKER_DRAG_STARTED_EVENT,
    listener
  );
}

export function removeAllOnMarkerDragStartedListeners() {
  emitter.removeAllListeners(MapsEventsNames.ON_MARKER_DRAG_STARTED_EVENT);
}

export function addOnMarkerDragEndedListener(
  listener: (event: MarkerDragEndedEvent) => void
): Subscription {
  return emitter.addListener<MarkerDragEndedEvent>(
    MapsEventsNames.ON_MARKER_DRAG_ENDED_EVENT,
    listener
  );
}

export function removeAllOnMarkerDragEndedListeners() {
  emitter.removeAllListeners(MapsEventsNames.ON_MARKER_DRAG_ENDED_EVENT);
}

export function removeEventListener(subscription: Subscription) {
  emitter.removeSubscription(subscription);
}

export function removeAllListeners() {
  for (let event in MapsEventsNames) {
    emitter.removeAllListeners(MapsEventsNames[event]);
  }
}
