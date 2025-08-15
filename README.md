# 🏠 **HOGAR360 - Prueba de Concepto (POC)**

> **Plataforma web inmobiliaria** desarrollada con React 18 + TypeScript + Vite + Tailwind CSS

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

---

## 📋 **Descripción del Proyecto**

**Hogar360** es una plataforma inmobiliaria que conecta **compradores**, **vendedores** y **administradores** para la gestión integral de propiedades y agendamiento de visitas.

### **🎯 Objetivos de la POC**
- Validar la arquitectura frontend con tecnologías modernas
- Implementar un sistema de roles y permisos robusto
- Crear una experiencia de usuario fluida y responsive
- Establecer patrones de desarrollo escalables

---

## 🏗️ **Arquitectura del Proyecto**

### **Stack Tecnológico**
```
Frontend Framework: React 18 + TypeScript
Build Tool: Vite
Styling: Tailwind CSS
State Management: Zustand
Forms: React Hook Form + Zod
Routing: React Router DOM
Icons: Font Awesome
Architecture: Atomic Design + LIFT
```

### **Estructura de Carpetas**
```
workspace-front-ia-ndo/
├── poc/                          # Documentación de la POC
│   └── analisis-proyecto.md      # Análisis técnico completo
├── hogar360-frontend/            # Aplicación principal
│   ├── src/
│   │   ├── components/           # Atomic Design
│   │   │   ├── atoms/           # Componentes básicos
│   │   │   ├── molecules/       # Agrupaciones funcionales
│   │   │   └── organisms/       # Estructuras complejas
│   │   ├── pages/               # Páginas de la aplicación
│   │   ├── shared/              # Lógica de negocio
│   │   │   ├── interfaces/      # TypeScript types
│   │   │   ├── mocks/          # Servicios mock
│   │   │   ├── store/          # Estado global
│   │   │   └── constants/      # Constantes globales
│   │   └── styles/             # Estilos globales
│   └── .amazonq/               # Reglas de desarrollo
└── README.md                   # Este archivo
```

---

## 🚀 **Funcionalidades Implementadas**

### **📊 Dashboard por Roles**
- **👤 Administrador**: Gestión de categorías, ubicaciones y usuarios
- **🏪 Vendedor**: Publicación de propiedades y gestión de horarios
- **🛒 Comprador**: Búsqueda de propiedades y agendamiento de visitas

### **🏠 Gestión de Propiedades**
- CRUD completo de casas con validaciones
- Filtros avanzados (ubicación, precio, categoría)
- Paginación y ordenamiento
- Estados de publicación

### **📅 Sistema de Visitas**
- Creación de horarios disponibles (vendedores)
- Agendamiento de visitas (compradores)
- Límite de 2 compradores por horario
- Validaciones de fechas y solapamientos

### **🔐 Autenticación & Autorización**
- Login seguro con roles diferenciados
- Protección de rutas por permisos
- Estado de autenticación persistente

---

## 📈 **Historias de Usuario Completadas**

| HU | Descripción | Rol | Estado |
|----|-------------|-----|--------|
| HU-01 | Crear categorías de inmuebles | Admin | ✅ |
| HU-02 | Listar categorías | Todos | ✅ |
| HU-03 | Crear ubicaciones | Admin | ✅ |
| HU-04 | Buscar ubicaciones | Todos | ✅ |
| HU-05 | Crear usuario vendedor | Admin | ✅ |
| HU-06 | Publicar casa | Vendedor | ✅ |
| HU-07 | Listar casas | Todos | ✅ |
| HU-08 | Autenticación del sistema | Todos | ✅ |
| HU-09 | Disponibilizar horarios de visitas | Vendedor | ✅ |
| HU-10 | Listar horarios disponibles | Todos | ✅ |
| HU-11 | Agendar visitas | Comprador | ✅ |

---

## 🛠️ **Estándares de Desarrollo**

### **Convenciones de Código**
- **TypeScript**: Tipado fuerte, interfaces bien definidas
- **Naming**: PascalCase para componentes, camelCase para variables
- **Imports**: Orden específico (React → Third-party → App → Relative)
- **Exports**: Named exports con barrel files (index.ts)

### **Arquitectura de Componentes**
```typescript
// Estructura estándar de componente
ComponentName/
├── ComponentName.tsx    # Componente principal
└── index.ts            # Barrel export

// Patrón de implementación
export const ComponentName = ({ prop1, prop2 }: Props) => {
  // 1. Hooks y estado
  // 2. Lógica del componente
  // 3. Return JSX
};
```

### **Gestión de Estado**
```typescript
// Zustand store pattern
interface AuthState {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  // State y actions
}));
```

---

## 🎨 **Sistema de Diseño**

### **Principios UI/UX**
- **Mobile First**: Diseño responsive desde 320px
- **Atomic Design**: Componentes reutilizables y escalables
- **Accesibilidad**: ARIA labels, navegación por teclado
- **Consistencia**: Design system con Tailwind CSS

### **Componentes Base**
```typescript
// Atoms
Button, Input, Label, Icon, Badge

// Molecules  
SearchBar, FormField, Pagination, Modal

// Organisms
Sidebar, Header, DataTable, FormContainer
```

---

## 📊 **Métricas de Calidad**

### **Cobertura Técnica**
- ✅ **100% TypeScript** - Sin uso de `any`
- ✅ **0 errores** de compilación
- ✅ **Mobile responsive** - Breakpoints completos
- ✅ **Accesibilidad** - HTML semántico + ARIA
- ✅ **Performance** - Loading states + optimizaciones

### **Arquitectura**
- ✅ **SOLID principles** aplicados
- ✅ **DRY** - Componentes reutilizables
- ✅ **Separation of concerns** - Capas bien definidas
- ✅ **Scalable structure** - Preparado para crecimiento

---

## 🔧 **Configuración del Entorno**

### **Requisitos**
- Node.js 18+
- npm/yarn/pnpm
- Git

### **Instalación**
```bash
# Clonar repositorio
git clone <repository-url>
cd workspace-front-ia-ndo

# Instalar dependencias
cd hogar360-frontend
npm install

# Ejecutar en desarrollo
npm run dev

# Build para producción
npm run build
```

### **Scripts Disponibles**
```json
{
  "dev": "vite",
  "build": "tsc && vite build",
  "preview": "vite preview",
  "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0"
}
```

---

## 📚 **Documentación Técnica**

### **Archivos Clave**
- [`/poc/analisis-proyecto.md`](./poc/analisis-proyecto.md) - Análisis técnico completo
- [`/hogar360-frontend/README.md`](./hogar360-frontend/README.md) - Documentación del proyecto
- [`/.amazonq/rules/`](./hogar360-frontend/.amazonq/rules/) - Estándares de desarrollo

### **Patrones Implementados**
- **Repository Pattern**: Servicios mock organizados
- **Custom Hooks**: Lógica reutilizable encapsulada
- **Compound Components**: Componentes complejos modulares
- **Error Boundaries**: Manejo robusto de errores

---

## 🚀 **Próximos Pasos**

### **Fase 2 - Backend Integration**
- [ ] Integración con API REST
- [ ] Autenticación JWT
- [ ] Manejo de archivos/imágenes
- [ ] Base de datos real

### **Fase 3 - Features Avanzadas**
- [ ] Sistema de notificaciones
- [ ] Chat en tiempo real
- [ ] Geolocalización
- [ ] Pagos integrados

### **Fase 4 - Production Ready**
- [ ] Testing (Unit + E2E)
- [ ] CI/CD Pipeline
- [ ] Monitoring & Analytics
- [ ] Performance optimization

---

## 👥 **Equipo de Desarrollo**

**Desarrollado siguiendo estándares enterprise y mejores prácticas de la industria.**

### **Tecnologías Evaluadas**
- ✅ React 18 con TypeScript
- ✅ Vite como build tool
- ✅ Tailwind CSS para styling
- ✅ Zustand para state management
- ✅ React Hook Form + Zod para formularios

---

## 📄 **Licencia**

Este proyecto es una **Prueba de Concepto (POC)** desarrollada para validar la arquitectura y funcionalidades de la plataforma Hogar360.

---

**🏠 Hogar360 POC - Conectando compradores y vendedores de manera inteligente**