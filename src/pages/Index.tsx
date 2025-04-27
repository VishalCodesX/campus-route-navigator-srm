
import React, { useState, useRef } from 'react';
import { toast } from "sonner";
import { useIsMobile } from '../hooks/use-mobile';
import CampusMap from '../components/CampusMap';
import Header from '../components/Header';
import RouteControls from '../components/RouteControls';
import RouteSummary from '../components/RouteSummary';
import { locations } from '../data/locations';
import { calculateOptimalRoute, calculateTime } from '../utils/routeCalculator';

const Index: React.FC = () => {
  const isMobile = useIsMobile();
  const mapRef = useRef<HTMLDivElement>(null);
  
  // Route state
  const [start, setStart] = useState<string | null>(null);
  const [end, setEnd] = useState<string | null>(null);
  const [checkpoints, setCheckpoints] = useState<string[]>([]);
  
  // Results state
  const [route, setRoute] = useState<string[] | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [time, setTime] = useState<number | null>(null);

  // Handle location selection from map
  const handleLocationSelect = (location: string) => {
    // If no start selected, set as start
    if (!start) {
      setStart(location);
      toast.success(`Start: ${location}`);
      return;
    }
    
    // If no end selected, set as end
    if (!end) {
      // Don't allow end to be the same as start
      if (location === start) {
        toast.error("Start and end locations must be different");
        return;
      }
      setEnd(location);
      toast.success(`End: ${location}`);
      return;
    }
    
    // If location is already start or end, do nothing
    if (location === start || location === end) {
      return;
    }
    
    // Toggle checkpoint selection
    if (checkpoints.includes(location)) {
      setCheckpoints(checkpoints.filter(cp => cp !== location));
      toast.info(`Removed checkpoint: ${location}`);
    } else {
      setCheckpoints([...checkpoints, location]);
      toast.success(`Added checkpoint: ${location}`);
    }
  };

  // Handle checkpoint toggle
  const handleCheckpointToggle = (location: string, checked: boolean) => {
    if (checked && !checkpoints.includes(location)) {
      setCheckpoints([...checkpoints, location]);
    } else if (!checked && checkpoints.includes(location)) {
      setCheckpoints(checkpoints.filter(cp => cp !== location));
    }
  };

  // Find optimal route
  const findRoute = () => {
    if (!start || !end) {
      toast.error("Please select both start and end points");
      return;
    }
    
    try {
      // Filter out invalid checkpoints (those that match start/end)
      const validCheckpoints = checkpoints.filter(
        cp => cp !== start && cp !== end
      );
      
      // Calculate route
      const { path, distance: routeDistance } = calculateOptimalRoute(
        start,
        end,
        validCheckpoints,
        locations
      );
      
      // Calculate time
      const routeTime = calculateTime(routeDistance);
      
      // Update state
      setRoute(path);
      setDistance(routeDistance);
      setTime(routeTime);
      
      toast.success("Route calculated successfully!");
      
      // Scroll to result on mobile
      if (isMobile) {
        setTimeout(() => {
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
          });
        }, 300);
      }
    } catch (error) {
      console.error("Error calculating route:", error);
      toast.error("Failed to calculate route. Please try again.");
    }
  };

  // Clear route and selections
  const clearRoute = () => {
    setStart(null);
    setEnd(null);
    setCheckpoints([]);
    setRoute(null);
    setDistance(null);
    setTime(null);
    toast.info("Route cleared");
  };

  // Export route as image
  const exportRoute = () => {
    if (!route || route.length < 2) {
      toast.error("No route to export");
      return;
    }

    // In a real implementation, this would generate an image for download
    // For now, we'll just show a toast
    toast.success("Route export feature will be implemented in the next version");
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-srm-gray-light">
      <Header />
      
      <main className="flex-1 container mx-auto p-4 md:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Controls and Summary Section */}
          <div className="lg:col-span-1 space-y-6">
            <RouteControls 
              start={start}
              end={end}
              checkpoints={checkpoints}
              onStartChange={setStart}
              onEndChange={setEnd}
              onCheckpointToggle={handleCheckpointToggle}
              onFindRoute={findRoute}
              onClearRoute={clearRoute}
              onExportRoute={exportRoute}
            />
            
            {route && (
              <RouteSummary 
                route={route}
                distance={distance}
                time={time}
              />
            )}
          </div>
          
          {/* Map Section */}
          <div 
            ref={mapRef}
            className="lg:col-span-2 bg-white rounded-lg shadow-lg overflow-hidden"
            style={{ height: isMobile ? '400px' : '650px' }}
          >
            <CampusMap
              start={start}
              end={end}
              checkpoints={checkpoints}
              route={route}
              onLocationSelect={handleLocationSelect}
            />
          </div>
        </div>
      </main>
      
    <footer className="bg-gradient-to-r from-blue-900 to-blue-700 p-4 md:p-6 text-white rounded-b-lg shadow-lg text-center py-4 text-sm rounded-t-lg shadow-inner">
      <p>SRM Campus Route Navigator | Developed with ❤️ for SRM University</p>
    </footer>
    </div>
  );
};

export default Index;
