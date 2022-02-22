import ControlsExample from '../screens/ControlsExample';
import GesturesExample from '../screens/GesturesExample';
import GoogleMapsStylingExample from '../screens/GoogleMapsStylingExample';
import MarkersExample from '../screens/MarkersExample';
import PolygonsExample from '../screens/PolygonsExample';
import PolylinesExample from '../screens/PolylinesExample';
import MapTypesExample from '../screens/MapTypesExample';
// TODO: Type this better
interface ConcreteExampleScreen {
  name:
    | 'Markers'
    | 'Polygons'
    | 'Polylines'
    | 'Controls'
    | 'Google Maps Styling'
    | 'Gestures'
    | 'Map Types';
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
];
