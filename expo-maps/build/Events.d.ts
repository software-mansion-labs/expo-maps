import { Subscription } from 'expo-modules-core';
import { CameraPosition, MapCluster, Marker, Point, PointOfInterest } from './Common.types';
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
 * Represents data returned on click event.
 */
export declare type OnMapClickEvent = {
    /**
     * Coordinates the place where the user clicked.
     * Represented by {@link Point}
     */
    nativeEvent: Point;
};
/**
 * Type used for marker related events. eq. onMarkerClick, onMarkerDrag etc. contains marker's ID and position
 */
export declare type MarkerEvent = {
    nativeEvent: Marker;
};
/**
 * Represents data returned when a cluster press event is called
 */
export declare type ClusterPressEvent = {
    nativeEvent: MapCluster;
};
/**
 * Represents data returned on RegionChangeEvent
 */
export declare type OnRegionChangeEvent = {
    /**
     * Information on cameraPosition.
     * Represented by {@link CameraPosition}
     */
    nativeEvent: CameraPosition;
};
/**
 * Represents data returned on PoiClickEvent
 */
export declare type OnPoiClickEvent = {
    /**
     * Information on the clicked point of interest.
     * Represented by {@link PointOfInterest}
     */
    nativeEvent: PointOfInterest;
};
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
