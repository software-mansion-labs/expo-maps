import ControlsExample from '../screens/ControlsExample';
import GesturesExample from '../screens/GesturesExample';
import GoogleMapsStylingExample from '../screens/GoogleMapsStylingExample';
import MarkersExample from '../screens/MarkersExample';
import PolygonsExample from '../screens/PolygonsExample';
import PolylinesExample from '../screens/PolylinesExample';
import CirclesExample from '../screens/CirclesExample';
import MapTypesExample from '../screens/MapTypesExample';
import CameraPositionExample from '../screens/CameraPositionExample';
import TrafficExample from '../screens/TrafficExample';
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
    | 'Camera Position'
    | 'Traffic';
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
    name: 'Camera Position',
    screen: CameraPositionExample,
  },
  {
    name: 'Traffic',
    screen: TrafficExample,
  },
];
