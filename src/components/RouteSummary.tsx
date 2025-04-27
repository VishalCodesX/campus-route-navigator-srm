
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Route as RouteIcon } from 'lucide-react';

interface RouteSummaryProps {
  route: string[] | null;
  distance: number | null;
  time: number | null;
}

const RouteSummary: React.FC<RouteSummaryProps> = ({ route, distance, time }) => {
  if (!route || route.length < 2) {
    return null;
  }

  return (
    <Card className="w-full animate-fade-in">
      <CardHeader className="bg-gradient-to-r from-srm-purple to-srm-purple-dark text-white">
        <CardTitle className="flex items-center text-lg">
          <RouteIcon className="mr-2 h-5 w-5" /> Route Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-3">
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-1">Route Path:</h3>
            <div className="flex flex-wrap gap-2 items-center">
              {route.map((location, index) => (
                <React.Fragment key={`summary-${location}-${index}`}>
                  <span className={`
                    px-2 py-1 rounded text-sm
                    ${index === 0 ? 'bg-green-500 text-white' : 
                      index === route.length - 1 ? 'bg-red-500 text-white' : 
                      'bg-srm-purple text-white'}
                  `}>
                    {location}
                  </span>
                  {index < route.length - 1 && (
                    <span className="text-muted-foreground">→</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground">Distance:</h3>
              <p className="text-xl font-bold">{distance ? distance.toFixed(1) : '--'} meters</p>
              <p className="text-xs text-muted-foreground">Approximate walking distance</p>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground">Estimated Time:</h3>
              <p className="text-xl font-bold">{time ? time.toFixed(1) : '--'} minutes</p>
              <p className="text-xs text-muted-foreground">Based on average walking speed</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RouteSummary;
