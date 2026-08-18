# Componentes Generales

Este documento define los componentes de alto nivel, como estructuras de página y layouts principales, que componen la interfaz de usuario.

## 1. Layout Principal (App Layout)

### Esquema Visual
```text
+---------------------------------------------------+
|                   Header (HD-001)                 |
+---------------------------------------------------+
|               Hero Carousel (HERO-001)            |
+---------------------------------------------------+
|                                                   |
|            Contenido Principal                    |
|            (MAIN-001)                             |
|                                                   |
+---------------------------------------------------+
|                   Footer (FT-001)                 |
+---------------------------------------------------+
```

### Listado de Subelementos
| Código | Nombre | Propósito |
|---|---|---|
| `HD-001` | Header | Barra de navegación superior (Navbar), contiene logo, enlaces principales, buscador, perfil del usuario y carrito. Reemplaza por completo el menú lateral. |
| `HERO-001` | Hero Carousel | Bloque principal dinámico (carrusel) debajo del Header, utilizado para resaltar promociones o colecciones. |
| `MAIN-001` | Contenido Principal | Área dinámica donde se renderizan las distintas vistas. |
| `FT-001` | Footer | Pie de página masivo (4 columnas) con enlaces legales, ayuda, información corporativa y redes sociales. |

---

## 2. Componentes de Administración

### Listado de Subelementos
| Código | Nombre | Propósito |
|---|---|---|
| `ADM-001` | Tarjeta de Administrador (`.admin-card`) | Contenedor principal para módulos, formularios y KPIs en el panel de control. Diseñado con márgenes interiores amplios (padding xl) y sombras de superficie para evitar desbordamientos. |
| `ADM-002` | Tabla de Administración (`.admin-table`) | Estructura de tabla enriquecida para listar inventarios o clientes. Incluye cabeceras con fondo gris sutil, tipografía en mayúsculas pequeñas, y filas con efecto *hover* para mejorar la legibilidad de datos masivos. |

---

## Relación con otros documentos
- Define la estructura base que alojará los [Componentes Atómicos](Componentes_Atomicos.md).

---

## Navegación
← [Identidad Visual](Identidad_Visual.md)
↑ [Índice de Diseño UI/UX](README.md)
→ [Componentes Atómicos](Componentes_Atomicos.md)
