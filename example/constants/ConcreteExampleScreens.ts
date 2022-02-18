import Controls from '../screens/Controls';
import Gestures from '../screens/Gestures';
import GoogleMapsStyling from '../screens/GoogleMapsStyling';
import Markers from '../screens/Markers';
import Polygons from '../screens/Polygons';
import Polylines from '../screens/Polylines';

// TODO: Type this better
interface ConcreteExampleScreen {
  name:
    | 'Markers'
    | 'Polygons'
    | 'Polylines'
    | 'Controls'
    | 'Google Maps Styling'
    | 'Gestures';
  screen: (props: any) => JSX.Element;
}

export const CONCRETE_EXAMPLE_SCREENS: Array<ConcreteExampleScreen> = [
  {
    name: 'Markers',
    screen: Markers,
  },
  {
    name: 'Polygons',
    screen: Polygons,
  },
  {
    name: 'Polylines',
    screen: Polylines,
  },
  {
    name: 'Controls',
    screen: Controls,
  },
  {
    name: 'Google Maps Styling',
    screen: GoogleMapsStyling,
  },
  {
    name: 'Gestures',
    screen: Gestures,
  },
];
