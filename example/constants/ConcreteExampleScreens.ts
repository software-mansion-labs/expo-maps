import ControlsExample from '../screens/ControlsExample';
import GesturesExample from '../screens/GesturesExample';
import GoogleMapsStylingExample from '../screens/GoogleMapsStylingExample';
import MarkersExample from '../screens/MarkersExample';
import PolygonsExample from '../screens/PolygonsExample';
import PolylinesExample from '../screens/PolylinesExample';
import CirclesExample from '../screens/CirclesExample';
import MapTypesExample from '../screens/MapTypesExample';
import TrafficExample from '../screens/TrafficExample';
import KMLExample from '../screens/KMLExample';
import GeoJsonExample from '../screens/GeoJsonExample';
import POIExample from '../screens/POIExample';

// TODO: Type this better
interface ConcreteExampleScreen {
  name:
    | 'Markers'
    | 'Polygons'
    | 'Polylines'
    | 'Circles'
    | 'Controls'
    | 'Google Maps Styling'
    | 'Gestures'
    | 'Map Types'
    | 'Traffic'
    | 'KML'
    | 'GeoJson'
    | 'POI';
  screen: (props: any) => JSX.Element;
}

export const CONCRETE_EXAMPLE_SCREENS: Array<ConcreteExampleScreen> = [
  {
    name: 'Markers',
    screen: MarkersExample,
  },
  {
    name: 'Polygons',
    screen: PolygonsExample,
  },
  {
    name: 'Polylines',
    screen: PolylinesExample,
  },
  {
    name: 'Circles',
    screen: CirclesExample,
  },
  {
    name: 'Controls',
    screen: ControlsExample,
  },
  {
    name: 'Google Maps Styling',
    screen: GoogleMapsStylingExample,
  },
  {
    name: 'Gestures',
    screen: GesturesExample,
  },
  {
    name: 'Map Types',
    screen: MapTypesExample,
  },
  {
    name: 'Traffic',
    screen: TrafficExample,
  },
  {
    name: 'KML',
    screen: KMLExample,
  },
  {
    name: 'GeoJson',
    screen: GeoJsonExample,
  },
  {
    name: 'POI',
    screen: POIExample,
  },
];
