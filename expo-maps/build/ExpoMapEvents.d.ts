import { Subscription } from 'expo-modules-core';
export declare type CameraEvent = {
    latitude: number;
    longitude: number;
};
export declare type MarkerClickEvent = {
    id: string;
};
export declare type MarkerDragEndedEvent = {
    id: string;
    latitude: number;
    longitude: number;
};
export declare type MarkerDragStartedEvent = {
    id: string;
};
export declare function addOnCameraMoveStartedListener(listener: (event: CameraEvent) => void): Subscription;
export declare function removeAllOnCameraMoveStartedListeners(): void;
export declare function addOnCameraMoveEndedListener(listener: (event: CameraEvent) => void): Subscription;
export declare function removeAllOnCameraMoveEndedListeners(): void;
export declare function addOnMarkerClickListener(listener: (event: MarkerClickEvent) => void): Subscription;
export declare function removeAllOnMarkerClickListeners(): void;
export declare function addOnMarkerDragStartedListener(listener: (event: MarkerDragStartedEvent) => void): Subscription;
export declare function removeAllOnMarkerDragStartedListeners(): void;
export declare function addOnMarkerDragEndedListener(listener: (event: MarkerDragEndedEvent) => void): Subscription;
export declare function removeAllOnMarkerDragEndedListeners(): void;
export declare function removeEventListener(subscription: Subscription): void;
export declare function removeAllListeners(): void;
