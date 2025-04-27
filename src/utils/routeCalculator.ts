
import { Location } from '../types';

// Calculate distance between two points
export const calculateDistance = (a: Location, b: Location): number => {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return Math.sqrt(dx * dx + dy * dy);
};

// Calculate estimated walking time (assuming 1.4m/s walking speed)
export const calculateTime = (distance: number): number => {
  // Converting pixel distance to meters (approximation)
  // Assuming 100 pixels ≈ 50 meters
  const distanceInMeters = distance * 0.5;
  // Average walking speed: 1.4 m/s
  const timeInSeconds = distanceInMeters / 1.4;
  // Convert to minutes
  return timeInSeconds / 60;
};

// Traveling Salesman Problem (TSP) algorithm for optimal route
export const calculateOptimalRoute = (
  start: string,
  end: string,
  checkpoints: string[],
  locationMap: Record<string, Location>
): { path: string[]; distance: number } => {
  // If no checkpoints, direct route
  if (checkpoints.length === 0) {
    const distance = calculateDistance(locationMap[start], locationMap[end]);
    return { path: [start, end], distance };
  }

  let bestRoute: string[] = [];
  let bestDistance = Infinity;

  // Generate all permutations of checkpoints
  const permutations = getPermutations(checkpoints);

  // Find the shortest path through all checkpoints
  for (const perm of permutations) {
    const route = [start, ...perm, end];
    let totalDistance = 0;
    
    // Calculate total distance for this route
    for (let i = 0; i < route.length - 1; i++) {
      totalDistance += calculateDistance(locationMap[route[i]], locationMap[route[i + 1]]);
    }

    if (totalDistance < bestDistance) {
      bestDistance = totalDistance;
      bestRoute = route;
    }
  }

  return { path: bestRoute, distance: bestDistance };
};

// Helper function to generate all permutations
function getPermutations<T>(array: T[]): T[][] {
  if (array.length <= 1) return [array];
  
  const result: T[][] = [];
  
  for (let i = 0; i < array.length; i++) {
    const current = array[i];
    const remaining = [...array.slice(0, i), ...array.slice(i + 1)];
    const remainingPermutations = getPermutations(remaining);
    
    for (const perm of remainingPermutations) {
      result.push([current, ...perm]);
    }
  }
  
  return result;
}
