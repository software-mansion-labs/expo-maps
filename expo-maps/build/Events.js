import { Platform } from 'react-native';
import { EventEmitter, } from 'expo-modules-core';
import { NativeExpoAppleMapsModule, NativeExpoGoogleMapsModule, } from './ExpoMaps';
var module;
if (Platform.OS == 'ios') {
    module = NativeExpoAppleMapsModule;
}
else {
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
export function addOnCameraMoveStartedListener(listener) {
    return emitter.addListener(MapsEventsNames.ON_CAMERA_MOVE_STARTED_EVENT, listener);
}
export function removeAllOnCameraMoveStartedListeners() {
    emitter.removeAllListeners(MapsEventsNames.ON_CAMERA_MOVE_STARTED_EVENT);
}
export function addOnCameraMoveEndedListener(listener) {
    return emitter.addListener(MapsEventsNames.ON_CAMERA_MOVE_ENDED_EVENT, listener);
}
export function removeAllOnCameraMoveEndedListeners() {
    emitter.removeAllListeners(MapsEventsNames.ON_CAMERA_MOVE_ENDED_EVENT);
}
export function addOnMarkerClickListener(listener) {
    return emitter.addListener(MapsEventsNames.ON_MARKER_CLICK_EVENT, listener);
}
export function removeAllOnMarkerClickListeners() {
    emitter.removeAllListeners(MapsEventsNames.ON_MARKER_CLICK_EVENT);
}
export function addOnMarkerDragStartedListener(listener) {
    return emitter.addListener(MapsEventsNames.ON_MARKER_DRAG_STARTED_EVENT, listener);
}
export function removeAllOnMarkerDragStartedListeners() {
    emitter.removeAllListeners(MapsEventsNames.ON_MARKER_DRAG_STARTED_EVENT);
}
export function addOnMarkerDragEndedListener(listener) {
    return emitter.addListener(MapsEventsNames.ON_MARKER_DRAG_ENDED_EVENT, listener);
}
export function removeAllOnMarkerDragEndedListeners() {
    emitter.removeAllListeners(MapsEventsNames.ON_MARKER_DRAG_ENDED_EVENT);
}
export function removeEventListener(subscription) {
    emitter.removeSubscription(subscription);
}
export function removeAllListeners() {
    for (let event in MapsEventsNames) {
        emitter.removeAllListeners(MapsEventsNames[event]);
    }
}
//# sourceMappingURL=Events.js.map