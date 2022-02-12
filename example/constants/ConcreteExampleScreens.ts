import Markers from '../screens/Markers';
import Polygons from '../screens/Polygons';
import Polylines from '../screens/Polylines';

// TODO: Type this better
interface ConcreteExampleScreen {
  name: 'Markers' | 'Polygons' | 'Polylines';
  screen: () => JSX.Element;
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
];
