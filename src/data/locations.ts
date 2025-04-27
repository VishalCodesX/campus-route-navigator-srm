
import { Location } from '../types';

// Convert coordinates from the Python application to web coordinates
const locationData: Record<string, [number, number]> = {
  'TRP': [60, 350],
  'Block 3': [250, 200],
  'BMS': [400, 200],
  'Hospital': [570, 200],
  'Admin': [400, 350],
  'New Admin': [500, 350],
  'Food Court': [270, 350],
  'Bus Bay': [100, 60],
  'MLCP': [330, 60],
  'Gallery Hall 1,2,3': [520, 60],
  'Sports Complex': [660, 160],
  'Easwari Entrance': [180, 450],
  'SRM Main Entrance': [580, 450]
};

// Convert the data to our Location type
export const locations: Record<string, Location> = Object.entries(locationData).reduce(
  (acc, [name, [x, y]]) => {
    acc[name] = { name, x, y };
    return acc;
  },
  {} as Record<string, Location>
);

// Export location names for dropdowns
export const locationNames = Object.keys(locations);
