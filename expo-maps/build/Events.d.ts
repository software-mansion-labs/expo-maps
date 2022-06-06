import { Subscription } from 'expo-modules-core';
/**
 * Type of an argument of CameraMoveStarted and CameraMoveEnded listeners.
 */
export declare type CameraEvent = {
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
export declare type MarkerClickEvent = {
    /**
     * Id of the marker that was clicked.
     */
    id: string;
};
/**
 * Type of an argument of MarkerDragEnded listener.
 */
export declare type MarkerDragEndedEvent = {
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
export declare type MarkerDragStartedEvent = {
    /**
     * Id of the marker that was dragged.
     */
    id: string;
};
/**
 * Adds a new listener to be called when camera starts moving.
 * @returns Subscription which can be used later to remove this particular listener.
 */
export declare function addOnCameraMoveStartedListener(listener: (event: CameraEvent) => void): Subscription;
/**
 * Removes all listeners registered to listen for CameraMoveStarted event.
 */
export declare function removeAllOnCameraMoveStartedListeners(): void;
/**
 * Adds a new listener to be called when camera stops moving.
 * @returns Subscription which can be used later to remove this particular listener.
 */
export declare function addOnCameraMoveEndedListener(listener: (event: CameraEvent) => void): Subscription;
/**
 * Removes all listeners registered to listen for CameraMoveEnded event.
 */
export declare function removeAllOnCameraMoveEndedListeners(): void;
/**
 * Adds a new listener to be called when a marker or cluster is clicked.
 * @returns Subscription which can be used later to remove this particular listener.
 */
export declare function addOnMarkerClickListener(listener: (event: MarkerClickEvent) => void): Subscription;
/**
 * Removes all listeners registered to listen for MarkerClick event.
 */
export declare function removeAllOnMarkerClickListeners(): void;
/**
 * Adds a new listener to be called when a user starts dragging a marker.
 * Does not work for markers which are children of Cluster.
 * @returns Subscription which can be used later to remove this particular listener.
 */
export declare function addOnMarkerDragStartedListener(listener: (event: MarkerDragStartedEvent) => void): Subscription;
/**
 * Removes all listeners registered to listen for MarkerDragStarted event.
 */
export declare function removeAllOnMarkerDragStartedListeners(): void;
/**
 * Adds a new listener to be called when a user drops a marker.
 * Does not work for markers which are children of Cluster.
 * @returns Subscription which can be used later to remove this particular listener.
 */
export declare function addOnMarkerDragEndedListener(listener: (event: MarkerDragEndedEvent) => void): Subscription;
/**
 * Removes all listeners registered to listen for MarkerDragEnded event.
 */
export declare function removeAllOnMarkerDragEndedListeners(): void;
/**
 * Removes particular listener, which was earlier registered.
 */
export declare function removeEventListener(subscription: Subscription): void;
/**
 * Removes all registered listeners.
 */
export declare function removeAllListeners(): void;
