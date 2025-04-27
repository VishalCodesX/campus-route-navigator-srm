import React from 'react';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '../components/ui/select';
import { Checkbox } from '../components/ui/checkbox';
import { MapPin, Route } from 'lucide-react';
import { locationNames } from '../data/locations';

interface RouteControlsProps {
  start: string | null;
  end: string | null;
  checkpoints: string[];
  onStartChange: (value: string) => void;
  onEndChange: (value: string) => void;
  onCheckpointToggle: (location: string, checked: boolean) => void;
  onFindRoute: () => void;
  onClearRoute: () => void;
  onExportRoute: () => void;
}

const RouteControls: React.FC<RouteControlsProps> = ({
  start,
  end,
  checkpoints,
  onStartChange,
  onEndChange,
  onCheckpointToggle,
  onFindRoute,
  onClearRoute,
  onExportRoute,
}) => {
  return (
    <div className="flex flex-col space-y-4 p-4 bg-white rounded-lg shadow-md animate-fade-in">
      <h2 className="text-lg font-semibold text-srm-purple-dark">Plan Your Route</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Start Point Selection */}
        <div className="space-y-1.5">
          <Label htmlFor="start-point" className="text-sm font-medium">
            <MapPin className="inline-block w-4 h-4 mr-1" />
            Start Point
          </Label>
          <Select value={start || ""} onValueChange={onStartChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select starting point" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {locationNames.map((name) => (
                  <SelectItem key={`start-${name}`} value={name}>
                    {name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* End Point Selection */}
        <div className="space-y-1.5">
          <Label htmlFor="end-point" className="text-sm font-medium">
            <MapPin className="inline-block w-4 h-4 mr-1" />
            End Point
          </Label>
          <Select value={end || ""} onValueChange={onEndChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select destination" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {locationNames.map((name) => (
                  <SelectItem key={`end-${name}`} value={name}>
                    {name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Checkpoints Section */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Checkpoints</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {locationNames
            .filter((name) => name !== start && name !== end)
            .map((name) => (
              <div key={`checkpoint-${name}`} className="flex items-center space-x-2">
                <Checkbox 
                  id={`checkpoint-${name}`}
                  checked={checkpoints.includes(name)}
                  onCheckedChange={(checked) => 
                    onCheckpointToggle(name, Boolean(checked))
                  }
                />
                <label
                  htmlFor={`checkpoint-${name}`}
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {name}
                </label>
              </div>
            ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2 justify-between pt-2">
        <Button
          onClick={onFindRoute}
          className="bg-srm-purple hover:bg-srm-purple-dark"
          disabled={!start || !end}
        >
          <Route className="mr-2 h-4 w-4" />
          Find Optimal Route
        </Button>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={onClearRoute}
          >
            Clear
          </Button>
          
          <Button 
            variant="outline"
            onClick={onExportRoute}
            className="border-srm-purple text-srm-purple hover:bg-srm-purple hover:text-white"
          >
            Export Route
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RouteControls;
