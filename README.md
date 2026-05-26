# 🎞️ GifsApp — Buscador de Gifs

> Proyecto del curso **React de 0 a Experto** de Fernando Herrera.

Aplicación web para buscar GIFs en tiempo real usando la API de [Giphy](https://developers.giphy.com/). Permite escribir un término de búsqueda, ver resultados animados y mantener un historial de búsquedas previas.

---

## 📦 Tecnologías utilizadas

| Tecnología             | Versión | Rol                                              |
| ---------------------- | ------- | ------------------------------------------------ |
| React                  | ^19.2   | Librería de UI                                   |
| TypeScript             | ~6.0    | Tipado estático                                  |
| Vite                   | ^8.0    | Bundler y servidor de desarrollo                 |
| Axios                  | ^1.16   | Cliente HTTP para consumir la API                |
| Giphy API              | v1      | Proveedor de GIFs                                |
| Vitest                 | ^4.1    | Framework de testing (nativo con Vite)           |
| @testing-library/react | ^16.3   | Renderizado y queries de componentes React       |
| CSS vanilla            | —       | Estilos globales del proyecto                    |

---

## 🎨 Estilos CSS

El archivo [`index.css`](./src/index.css) aplica los estilos globales de la aplicación:

- 🌑 **Fondo oscuro** (`#242424`) con texto blanco
- 🔤 **Tipografía** con Google Fonts — [Montserrat Alternates](https://fonts.google.com/specimen/Montserrat+Alternates) (light, regular y bold)
- 📐 **Layout** con Flexbox (header, barra de búsqueda, búsquedas previas) y CSS Grid (grilla de GIFs)
- 📱 **Diseño responsivo** con media queries: 2 columnas (móvil), 3 (768px), 4 (1024px), 5 (1280px+)
- 🖱️ **Transiciones** suaves en hover para botones y chips de búsqueda

---

## 🧪 Testing

El proyecto cuenta con una suite de tests unitarios e integración usando **Vitest** y **Testing Library**.

### Herramientas de testing

| Herramienta            | Versión | Rol                                        |
| ---------------------- | ------- | ------------------------------------------ |
| Vitest                 | ^4.1    | Framework de testing integrado con Vite    |
| @testing-library/react | ^16.3   | Renderizado y queries de componentes React |
| @testing-library/dom   | ^10.4   | Utilidades DOM para tests                  |
| @vitest/ui             | ^4.1    | Interfaz visual para explorar los tests    |
| @vitest/coverage-v8    | ^4.1    | Cobertura de código con V8                 |
| axios-mock-adapter     | ^2.1    | Mock de peticiones HTTP con Axios          |
| jsdom                  | ^29.1   | Entorno DOM simulado para tests            |

### Scripts de testing

```bash
# Ejecutar tests en modo watch (desarrollo)
npm run test

# Ejecutar tests una sola vez (sin watch)
npm run test:only

# Abrir la UI visual de Vitest
npm run test:ui

# Generar reporte de cobertura
npm run coverage
```

> ⚠️ El script `npm run build` ejecuta los tests automáticamente antes de compilar. Si algún test falla, el build se detiene.

### Archivos de test

Los tests están colocados junto a su archivo fuente (**co-located**), siguiendo la convención `*.test.tsx` / `*.test.ts`:

| Archivo de test                                 | Qué prueba                               |
| ----------------------------------------------- | ---------------------------------------- |
| `GifsApp.test.tsx`                              | Componente raíz de la aplicación         |
| `gifs/actions/get-gifs-by-query.action.test.ts` | Acción de búsqueda con mock de Axios     |
| `gifs/components/GifList.test.tsx`              | Renderizado de la grilla de GIFs         |
| `gifs/components/PreviousSearches.test.tsx`     | Listado del historial de búsquedas       |
| `gifs/hooks/useGifs.test.tsx`                   | Custom hook `useGifs` (estado y efectos) |
| `shared/components/CustomHeader.test.tsx`       | Header (con snapshot testing)            |
| `shared/components/SearchBar.test.tsx`          | Barra de búsqueda (eventos y debounce)   |

Los datos mockeados para los tests se encuentran en `test/mock/`:

- `gifs.data.ts` — GIFs ficticios con la estructura de la interfaz interna
- `giphy.response.data.ts` — Respuesta completa mockeada de la API de Giphy

---


## 🗂️ Estructura del proyecto

```
src/
├── main.tsx                                     # Punto de entrada de la app
├── GifsApp.tsx                                  # Componente principal (orquestador)
├── GifsApp.test.tsx                             # Test del componente raíz
├── index.css                                    # Estilos globales
│
├── gifs/                                        # Módulo de GIFs
│   ├── api/
│   │   └── giphy.Api.ts                         # Instancia de Axios configurada para Giphy
│   ├── actions/
│   │   ├── get-gifs-by-query.action.ts          # Acción que busca GIFs y mapea la respuesta
│   │   └── get-gifs-by-query.action.test.ts     # Test de la acción (mock de Axios)
│   ├── hooks/
│   │   ├── useGifs.tsx                          # Custom hook que gestiona el estado de búsqueda
│   │   └── useGifs.test.tsx                     # Test del custom hook
│   ├── interfaces/
│   │   ├── gif.interface.ts                     # Interfaz simplificada de un GIF
│   │   └── giphy.response.ts                   # Tipos completos de la respuesta de Giphy
│   └── components/
│       ├── GifList.tsx                          # Renderiza la grilla de GIFs
│       ├── GifList.test.tsx
│       ├── PreviousSearches.tsx                 # Muestra las búsquedas anteriores
│       └── PreviousSearches.test.tsx
│
├── shared/                                      # Componentes compartidos / reutilizables
│   └── components/
│       ├── CustomHeader.tsx                     # Header con título y descripción
│       ├── CustomHeader.test.tsx                # Test con snapshot
│       ├── SearchBar.tsx                        # Barra de búsqueda con debounce
│       └── SearchBar.test.tsx
│
└── mock-data/
    └── gifs.mock.ts                             # Datos de prueba (GIFs hardcodeados)

test/
└── mock/
    ├── gifs.data.ts                             # Mock de GIFs para tests
    └── giphy.response.data.ts                   # Mock completo de respuesta de Giphy
```

---

## ⚙️ Configuración

### Variables de entorno

Crear un archivo `.env` en la raíz del proyecto a partir del template incluido:

```bash
cp .env.template .env
```

Luego completar los valores:

```env
VITE_GIPHY_API_KEY=tu_api_key_de_giphy
```

> La API key se obtiene registrándose en [Giphy Developers](https://developers.giphy.com/).

### Instalación y ejecución

```bash
# Instalar dependencias
npm install

# Iniciar en modo desarrollo
npm run dev

# Ejecutar tests en modo watch
npm run test

# Ejecutar tests una sola vez
npm run test:only

# Ver cobertura de tests
npm run coverage

# Generar build de producción (incluye tests automáticamente)
npm run build

# Preview del build
npm run preview
```

---

## 🧠 Conceptos aprendidos en esta sección

- **useState** — Manejo de estado local en componentes funcionales
- **useEffect** — Efectos secundarios (debounce en el SearchBar)
- **Axios** — Cliente HTTP, instancias preconfiguradas con `axios.create()`
- **TypeScript interfaces** — Tipado fuerte de la respuesta de la API
- **Variables de entorno** — Uso de `import.meta.env` con Vite
- **Componentes reutilizables** — CustomHeader, SearchBar
- **Props con TypeScript** — Tipado de props con `interface Props`
- **Async/Await** — Llamadas asíncronas a la API dentro de handlers
- **Mapeo de datos** — Transformar la respuesta cruda de la API a una interfaz propia
- **Debounce** — Técnica para evitar llamadas excesivas a la API mientras el usuario escribe
- **Custom Hooks** — Extracción de lógica reutilizable en hooks propios (`useGifs`)
- **useRef** — Referencia a valores mutables sin provocar re-renders (caché de resultados)
- **Manejo de caché** — Almacenamiento de resultados previos para evitar llamadas repetidas a la API
- **Vitest** — Framework de testing integrado con Vite
- **Testing Library** — Queries y eventos para testear componentes React
- **Snapshot testing** — Validación de la estructura renderizada de un componente
- **Mocking con axios-mock-adapter** — Simulación de peticiones HTTP en tests
- **Co-located tests** — Organización de tests junto a sus archivos fuente

---

## 📝 Licencia

Proyecto educativo — sin licencia comercial.
