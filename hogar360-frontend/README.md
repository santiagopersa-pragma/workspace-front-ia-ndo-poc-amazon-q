# 🏠 **Hogar360 Frontend**

> **Plataforma inmobiliaria moderna** construida con React 18 + TypeScript + Vite + Tailwind CSS

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

---

## 🚀 **Inicio Rápido**

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

**🌐 Aplicación disponible en:** `http://localhost:5173`

---

## 📋 **Descripción**

**Hogar360** es una plataforma web que conecta compradores, vendedores y administradores en el mercado inmobiliario, facilitando la gestión de propiedades y el agendamiento de visitas.

### **🎯 Características Principales**
- **Sistema de roles**: Admin, Vendedor, Comprador
- **Gestión de propiedades**: CRUD completo con filtros avanzados
- **Agendamiento de visitas**: Sistema completo de reservas
- **Responsive design**: Mobile-first approach
- **Autenticación segura**: Login con roles y permisos

---

## 🏗️ **Arquitectura**

### **Stack Tecnológico**
```
⚛️  React 18          - UI Library
📘  TypeScript        - Type Safety
⚡  Vite             - Build Tool
🎨  Tailwind CSS     - Styling
🐻  Zustand          - State Management
📝  React Hook Form  - Form Handling
✅  Zod              - Schema Validation
🧭  React Router     - Navigation
🎭  Font Awesome     - Icons
```

### **Estructura del Proyecto**
```
src/
├── components/           # Atomic Design Components
│   ├── atoms/           # Button, Input, Label, etc.
│   ├── molecules/       # SearchBar, FormField, etc.
│   └── organisms/       # Sidebar, Header, DataTable
├── pages/               # Application Pages
│   ├── Home.tsx
│   ├── Login.tsx
│   ├── Casas.tsx
│   └── Horarios.tsx
├── shared/              # Business Logic
│   ├── interfaces/      # TypeScript Types
│   ├── mocks/          # Mock Services
│   ├── store/          # Global State (Zustand)
│   └── constants/      # App Constants
└── styles/             # Global Styles
```

---

## 🔐 **Sistema de Autenticación**

### **Roles y Permisos**

| Rol | Permisos |
|-----|----------|
| **👤 Admin** | • Crear categorías<br>• Gestionar ubicaciones<br>• Crear usuarios vendedor<br>• Ver todas las propiedades |
| **🏪 Vendedor** | • Publicar casas<br>• Gestionar horarios de visita<br>• Ver propiedades propias |
| **🛒 Comprador** | • Buscar propiedades<br>• Agendar visitas<br>• Ver horarios disponibles |

### **Credenciales de Prueba**
```typescript
// Administrador
email: admin@hogar360.com
password: admin123

// Vendedor
email: vendedor@hogar360.com
password: vendedor123

// Comprador
email: comprador@hogar360.com
password: comprador123
```

---

## 🧩 **Componentes Principales**

### **Atoms (Componentes Básicos)**
```typescript
<Button variant="primary" size="lg" loading={isLoading}>
  Guardar
</Button>

<Input
  label="Email"
  type="email"
  placeholder="usuario@email.com"
  error={errors.email?.message}
/>
```

### **Molecules (Agrupaciones Funcionales)**
```typescript
<SearchBar
  placeholder="Buscar propiedades..."
  onSearch={handleSearch}
  filters={availableFilters}
/>

<Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={handlePageChange}
/>
```

### **Organisms (Estructuras Complejas)**
```typescript
<DataTable
  data={properties}
  columns={tableColumns}
  loading={isLoading}
  onEdit={handleEdit}
  onDelete={handleDelete}
/>
```

---

## 📱 **Funcionalidades por Página**

### **🏠 Gestión de Casas**
- **Crear/Editar**: Formulario completo con validaciones
- **Listar**: Tabla con filtros, paginación y ordenamiento
- **Filtros**: Por ubicación, categoría, precio, fecha
- **Estados**: Borrador, Publicado, Archivado

### **📅 Horarios de Visita**
- **Crear horarios** (Vendedores): Fechas disponibles para visitas
- **Listar disponibles** (Todos): Horarios con cupo disponible
- **Agendar visitas** (Compradores): Reservar cita con email
- **Disponibilidad**: Contador visual (X/2 compradores)

### **⚙️ Administración**
- **Categorías**: CRUD de tipos de inmuebles
- **Ubicaciones**: Gestión de ciudades y departamentos
- **Usuarios**: Creación de vendedores

---

## 🎨 **Sistema de Diseño**

### **Principios de UI/UX**
- **Mobile First**: Diseño responsive desde 320px
- **Accesibilidad**: ARIA labels, navegación por teclado
- **Consistencia**: Design tokens con Tailwind CSS
- **Performance**: Loading states y optimizaciones

### **Breakpoints**
```css
/* Mobile First Approach */
sm: 640px   /* Tablet */
md: 768px   /* Desktop Small */
lg: 1024px  /* Desktop */
xl: 1280px  /* Desktop Large */
```

### **Colores Principales**
```css
--primary: #3B82F6     /* Blue */
--secondary: #6B7280   /* Gray */
--success: #10B981     /* Green */
--warning: #F59E0B     /* Yellow */
--error: #EF4444       /* Red */
```

---

## 🔧 **Configuración de Desarrollo**

### **Scripts Disponibles**
```json
{
  "dev": "vite",                    // Servidor de desarrollo
  "build": "tsc && vite build",     // Build para producción
  "preview": "vite preview",        // Preview del build
  "lint": "eslint . --ext ts,tsx"   // Linting del código
}
```

### **Variables de Entorno**
```bash
# .env.local
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=Hogar360
VITE_APP_VERSION=1.0.0
```

### **Configuración de Vite**
```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

---

## 📊 **Estado de la Aplicación**

### **Gestión de Estado (Zustand)**
```typescript
// Auth Store
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

// Usage
const { user, login, logout } = useAuthStore();
```

### **Formularios (React Hook Form + Zod)**
```typescript
// Schema validation
const createCasaSchema = z.object({
  nombre: z.string().min(1, 'Nombre requerido'),
  precio: z.number().positive('Precio debe ser positivo'),
  categoriaId: z.string().min(1, 'Categoría requerida'),
});

// Form hook
const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(createCasaSchema)
});
```

---

## 🧪 **Servicios Mock**

### **Estructura de Datos**
```typescript
// Mock Services (sin backend)
src/shared/mocks/
├── auth.ts          # Autenticación
├── casas.ts         # Propiedades
├── categories.ts    # Categorías
├── cities.ts        # Ubicaciones
├── horarios.ts      # Horarios de visita
├── users.ts         # Usuarios
└── visitas.ts       # Visitas agendadas
```

### **Validaciones de Negocio**
```typescript
// Ejemplo: Validación de horarios
- Máximo 3 semanas de anticipación
- No solapamiento de horarios por vendedor
- Solo horarios de casas propias
- Máximo 2 compradores por horario
```

---

## 🚀 **Despliegue**

### **Build de Producción**
```bash
# Generar build optimizado
npm run build

# Los archivos se generan en /dist
# Listos para servir desde cualquier servidor web
```

### **Opciones de Hosting**
- **Vercel**: Deploy automático desde Git
- **Netlify**: Hosting estático con CI/CD
- **AWS S3 + CloudFront**: Distribución global
- **GitHub Pages**: Hosting gratuito

---

## 📚 **Recursos Adicionales**

### **Documentación**
- [React 18 Docs](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Zustand](https://github.com/pmndrs/zustand)

### **Herramientas de Desarrollo**
- **React DevTools**: Debug de componentes
- **TypeScript**: IntelliSense y type checking
- **ESLint**: Linting automático
- **Prettier**: Formateo de código

---

## 🤝 **Contribución**

### **Estándares de Código**
- **TypeScript**: Tipado fuerte, sin `any`
- **Naming**: PascalCase para componentes, camelCase para variables
- **Imports**: Orden específico (React → Third-party → App → Relative)
- **Components**: Atomic Design + LIFT methodology

### **Flujo de Desarrollo**
```bash
# 1. Crear rama feature
git checkout -b feature/nueva-funcionalidad

# 2. Desarrollar con commits descriptivos
git commit -m "feat: agregar filtro por precio en casas"

# 3. Push y crear PR
git push origin feature/nueva-funcionalidad
```

---

**🏠 Hogar360 - Plataforma inmobiliaria del futuro**

*Desarrollado con ❤️ usando las mejores prácticas de React y TypeScript*
