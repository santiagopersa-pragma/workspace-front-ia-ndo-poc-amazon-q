import { useState } from 'react';
import { Input } from '../../atoms/Input';
import { Button } from '../../atoms/Button';
import type { CreateUserRequest } from '../../../shared/interfaces/types';

interface VendedorFormProps {
  onSubmit: (data: CreateUserRequest) => void;
  loading?: boolean;
}

export const VendedorForm = ({ onSubmit, loading = false }: VendedorFormProps) => {
  const [formData, setFormData] = useState<CreateUserRequest>({
    nombre: '',
    apellido: '',
    documentoIdentidad: '',
    celular: '',
    fechaNacimiento: '',
    email: '',
    clave: ''
  });

  const validateAge = (birthDate: string): boolean => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age >= 18;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar edad antes de enviar
    if (!validateAge(formData.fechaNacimiento)) {
      alert('El usuario debe ser mayor de edad (18 años o más)');
      return;
    }
    
    onSubmit(formData);
    setFormData({
      nombre: '',
      apellido: '',
      documentoIdentidad: '',
      celular: '',
      fechaNacimiento: '',
      email: '',
      clave: ''
    });
  };

  const handleChange = (field: keyof CreateUserRequest) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Nombre"
          value={formData.nombre}
          onChange={handleChange('nombre')}
          required
          maxLength={50}
        />
        <Input
          label="Apellido"
          value={formData.apellido}
          onChange={handleChange('apellido')}
          required
          maxLength={50}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Documento de Identidad"
          value={formData.documentoIdentidad}
          onChange={handleChange('documentoIdentidad')}
          required
          pattern="[0-9]*"
          title="Solo se permiten números"
          onInput={(e) => {
            const target = e.target as HTMLInputElement;
            target.value = target.value.replace(/[^0-9]/g, '');
          }}
        />
        <Input
          label="Celular"
          value={formData.celular}
          onChange={handleChange('celular')}
          required
          maxLength={13}
          placeholder="+573001234567"
          pattern="[+]?[0-9]*"
          title="Solo se permiten números y el símbolo +"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Fecha de Nacimiento"
          type="date"
          value={formData.fechaNacimiento}
          onChange={handleChange('fechaNacimiento')}
          required
          max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]}
          title="Debe ser mayor de edad"
        />
        <Input
          label="Email"
          type="email"
          value={formData.email}
          onChange={handleChange('email')}
          required
        />
      </div>

      <Input
        label="Contraseña"
        type="password"
        value={formData.clave}
        onChange={handleChange('clave')}
        required
        minLength={6}
      />

      <Button
        type="submit"
        loading={loading}
        className="w-full md:w-auto"
      >
        Crear Vendedor
      </Button>
    </form>
  );
};