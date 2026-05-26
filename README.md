# 🎞️ GifsApp — Buscador de Gifs

> Proyecto de la **Sección 6** del curso [**React de 0 a Experto**](https://www.udemy.com/course/react-cero-experto/) de Fernando Herrera en Udemy.

Aplicación web para buscar GIFs en tiempo real usando la API de [Giphy](https://developers.giphy.com/). Permite escribir un término de búsqueda, ver resultados animados y mantener un historial de búsquedas previas.

---

## 📦 Tecnologías utilizadas

| Tecnología  | Versión | Rol                               |
| ----------- | ------- | --------------------------------- |
| React       | 19      | Librería de UI                    |
| TypeScript  | 6       | Tipado estático                   |
| Vite        | 8       | Bundler y servidor de desarrollo  |
| Axios       | 1.16    | Cliente HTTP para consumir la API |
| Giphy API   | v1      | Proveedor de GIFs                 |
| CSS vanilla | —       | Estilos globales                  |

---

## 🗂️ Estructura del proyecto

```
src/
├── main.tsx                              # Punto de entrada de la app
├── GifsApp.tsx                           # Componente principal (orquestador)
├── index.css                             # Estilos globales
│
├── gifs/                                 # Módulo de GIFs
│   ├── api/
│   │   └── giphy.Api.ts                  # Instancia de Axios configurada para Giphy
│   ├── actions/
│   │   └── get-gifs-by-query.action.ts   # Acción que busca GIFs y mapea la respuesta
│   ├── interfaces/
│   │   ├── gif.interface.ts              # Interfaz simplificada de un GIF
│   │   └── giphy.response.ts            # Tipos completos de la respuesta de Giphy
│   └── components/
│       ├── GifList.tsx                   # Renderiza la grilla de GIFs
│       └── PreviousSearches.tsx          # Muestra las búsquedas anteriores
│
├── shared/                               # Componentes compartidos / reutilizables
│   └── components/
│       ├── CustomHeader.tsx              # Header con título y descripción
│       └── SearchBar.tsx                 # Barra de búsqueda con debounce
│
└── mock-data/
    └── gifs.mock.ts                      # Datos de prueba (GIFs hardcodeados)
```

---

## ⚙️ Configuración

### Variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

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
```

---

## 🧠 Conceptos aprendidos en esta sección

- **useState** — Manejo de estado local en componentes funcionales
- **useEffect** — Efectos secundarios (debounce en el SearchBar)
- **Axios** — Cliente HTTP, instancias preconfiguradas con `axios.create()`
- **TypeScript interfaces/enums** — Tipado fuerte de la respuesta de la API
- **Variables de entorno** — Uso de `import.meta.env` con Vite
- **Componentes reutilizables** — CustomHeader, SearchBar
- **Props con TypeScript** — Tipado de props con `interface Props`
- **Async/Await** — Llamadas asíncronas a la API dentro de handlers
- **Mapeo de datos** — Transformar la respuesta cruda de la API a una interfaz propia
- **Debounce** — Técnica para evitar llamadas excesivas a la API mientras el usuario escribe
