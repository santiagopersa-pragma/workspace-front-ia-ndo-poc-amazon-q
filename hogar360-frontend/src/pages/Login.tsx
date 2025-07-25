import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/atoms/Button';
import { Input } from '../components/atoms/Input';
import { useAuthStore } from '../shared/store/authStore';
import { authenticateUser } from '../shared/mocks/auth';

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'La contraseña es requerida')
});

type LoginForm = z.infer<typeof loginSchema>;

export const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const login = useAuthStore(state => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    setError(null);

    try {
      const user = await authenticateUser(data.email, data.password);
      login(user);
      navigate(user.rol === 'admin' ? '/admin/categories' : '/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error de autenticación');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded-lg border border-border">
        <h1 className="text-5xl font-poppins font-medium text-center mb-8">
          <span className="text-primary-600">Hogar</span>
          <span className="text-black">360</span>
        </h1>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-800 border border-red-200 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Email"
            type="email"
            placeholder="admin@hogar360.com"
            {...register('email')}
            error={errors.email?.message}
          />

          <Input
            label="Contraseña"
            type="password"
            placeholder="123456"
            {...register('password')}
            error={errors.password?.message}
          />

          <Button type="submit" loading={loading} className="w-full">
            Iniciar Sesión
          </Button>
        </form>

        <div className="mt-6 text-sm text-gray-600">
          <p className="font-medium">Usuarios de prueba:</p>
          <p>Admin: admin@hogar360.com / 123456</p>
          <p>Vendedor: vendedor@hogar360.com / 123456</p>
          <p>Comprador: comprador@hogar360.com / 123456</p>
        </div>
      </div>
    </div>
  );
};