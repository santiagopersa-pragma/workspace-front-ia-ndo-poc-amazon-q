import { useState } from 'react';
import { Input } from '../../atoms/Input';
import { Button } from '../../atoms/Button';
import type { CreateVisitaAgendadaRequest } from '../../../shared/interfaces/types';

interface AgendarVisitaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateVisitaAgendadaRequest) => void;
  horarioId: string;
  loading?: boolean;
}

export const AgendarVisitaModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  horarioId, 
  loading = false 
}: AgendarVisitaModalProps) => {
  const [email, setEmail] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      horarioDisponibleId: horarioId,
      compradorEmail: email
    });
    setEmail('');
  };

  const handleClose = () => {
    setEmail('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Agendar Visita
        </h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email del comprador"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="comprador@email.com"
          />
          
          <div className="flex justify-end space-x-3">
            <Button
              type="button"
              onClick={handleClose}
              variant="secondary"
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              loading={loading}
            >
              Agendar Visita
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};