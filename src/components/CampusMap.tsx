
import React, { useRef, useState, useEffect } from 'react';
import { Location } from '../types';
import { locations } from '../data/locations';

interface CampusMapProps {
  start: string | null;
  end: string | null;
  checkpoints: string[];
  route: string[] | null;
  onLocationSelect: (location: string) => void;
}

const CampusMap: React.FC<CampusMapProps> = ({
  start,
  end,
  checkpoints,
  route,
  onLocationSelect,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [mapSize, setMapSize] = useState({ width: 800, height: 600 });

  // Update map size on window resize
  useEffect(() => {
    const updateMapSize = () => {
      if (mapRef.current) {
        setMapSize({
          width: mapRef.current.offsetWidth,
          height: mapRef.current.offsetHeight,
        });
      }
    };

    updateMapSize();
    window.addEventListener('resize', updateMapSize);
    return () => window.removeEventListener('resize', updateMapSize);
  }, []);

  // Handle location click
  const handleLocationClick = (locationName: string) => {
    onLocationSelect(locationName);
  };

  // Get marker class based on location status
  const getMarkerClass = (locationName: string) => {
    if (locationName === start) return 'marker-start';
    if (locationName === end) return 'marker-end';
    if (checkpoints.includes(locationName)) return 'marker-selected';
    return 'marker';
  };

  // Calculate scale factors for responsive mapping
  const scaleX = mapSize.width / 800;
  const scaleY = mapSize.height / 600;

  // Adjust position based on scale
  const getScaledPosition = (location: Location) => {
    return {
      x: location.x * scaleX,
      y: location.y * scaleY,
    };
  };

  return (
    <div
      ref={mapRef}
      className="relative w-full h-full rounded-lg overflow-hidden shadow-lg map-container animate-fade-in"
      style={{ minHeight: "480px" }}
    >
      {/* Campus Map Image */}
      <img 
        src="/lovable-uploads/f4b426e4-0925-49c6-8814-517b2460acae.png" 
        alt="SRM Campus Map" 
        className="w-full h-full object-cover"
      />

      {/* SVG overlay for routes and markers */}
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox={`0 0 ${mapSize.width} ${mapSize.height}`}
      >
        {/* Draw route if available */}
        {route && route.length > 1 && (
          <g>
            {route.map((locationName, index) => {
              if (index < route.length - 1) {
                const currentLoc = getScaledPosition(locations[locationName]);
                const nextLoc = getScaledPosition(locations[route[index + 1]]);
                
                return (
                  <line
                    key={`route-${index}`}
                    x1={currentLoc.x}
                    y1={currentLoc.y}
                    x2={nextLoc.x}
                    y2={nextLoc.y}
                    className="stroke-srm-purple-dark"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray={index % 2 === 0 ? "0" : "5,5"}
                  />
                );
              }
              return null;
            })}
          </g>
        )}
      </svg>

      {/* Interactive location markers */}
      <div className="absolute inset-0">
        {Object.entries(locations).map(([name, location]) => {
          const { x, y } = getScaledPosition(location);
          return (
            <div 
              key={name}
              className={`absolute transition-all duration-300 ${getMarkerClass(name)}`}
              style={{
                left: `${x}px`,
                top: `${y}px`,
                transform: 'translate(-50%, -50%)',
                zIndex: start === name || end === name ? 30 : checkpoints.includes(name) ? 20 : 10,
                pointerEvents: 'auto'
              }}
              onClick={() => handleLocationClick(name)}
              title={name}
            />
          );
        })}

        {/* Location labels */}
        {Object.entries(locations).map(([name, location]) => {
          const { x, y } = getScaledPosition(location);
          return (
            <div
              key={`label-${name}`}
              className="absolute bg-white/80 px-1 text-xs rounded shadow pointer-events-none"
              style={{
                left: `${x}px`,
                top: `${y + 10}px`,
                transform: 'translate(-50%, 0)',
                zIndex: 5,
              }}
            >
              {name}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CampusMap;
