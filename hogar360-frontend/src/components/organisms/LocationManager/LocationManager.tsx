import { useState } from 'react';
import { LocationForm } from '../../molecules/LocationForm';
import { createLocation } from '../../../shared/mocks/locations';
import type { CreateLocationRequest, Location } from '../../../shared/interfaces/types';

interface LocationManagerProps {
  onLocationCreated?: () => void;
}

export const LocationManager = ({ onLocationCreated }: LocationManagerProps) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleCreateLocation = async (data: CreateLocationRequest) => {
    setLoading(true);
    setMessage(null);

    try {
      const newLocation: Location = await createLocation(data);
      setMessage({
        type: 'success',
        text: `Ubicación "${newLocation.ciudad}, ${newLocation.departamento}" creada exitosamente`
      });
      onLocationCreated?.();
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Error al crear la ubicación'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg border border-border">
      {message && (
        <div className={`mb-4 p-3 rounded-lg ${
          message.type === 'success' 
            ? 'bg-green-50 text-green-800 border border-green-200' 
            : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {message.text}
        </div>
      )}

      <LocationForm onSubmit={handleCreateLocation} loading={loading} />
    </div>
  );
};