# Identidad Visual y Design Tokens (Variables CSS)

Este documento centraliza las definiciones visuales y el branding de la plataforma "Muebles los Alpes", gestionados a través de variables globales (`:root` en CSS) para asegurar escalabilidad y unificación visual.

---

## Objetivo

Establecer la única fuente de verdad para los "Design Tokens" (Variables CSS) que controlan el branding global de la aplicación. Esto asegura que la identidad se mantenga coherente en todo el desarrollo y permite modificar los lineamientos visuales desde un solo lugar sin afectar el código de los componentes individuales o módulos.

---

## Contenido

El sistema visual se compone de los siguientes valores base (Design Tokens). Todos estos valores deben declararse obligatoriamente en la pseudoclase `:root` del archivo CSS principal y consumirse mediante la función `var()` (ejemplo: `var(--color-primary)`).

### 1. Paleta de Colores
Colores corporativos y semánticos para uso general en interfaces, botones y estados.

- **Primarios y Secundarios:**
  - `--color-primary`: Color principal de la marca (ej. Azul corporativo o Madera oscura).
  - `--color-secondary`: Color de apoyo y acentos (ej. Tonos arena, dorado o complementario).
  - `--color-accent`: Color para llamados a la acción (CTA) destacados.
- **Fondos y Superficies:**
  - `--bg-main`: Fondo principal de la aplicación (ej. Blanco, gris muy claro).
  - `--bg-surface`: Fondo de tarjetas, modales y componentes elevados (ej. Blanco puro).
- **Textos:**
  - `--text-primary`: Texto principal para alta legibilidad (ej. Gris muy oscuro, casi negro).
  - `--text-secondary`: Texto secundario o de menor jerarquía (ej. Gris medio).
  - `--text-inverse`: Texto sobre fondos oscuros o primarios (ej. Blanco).
- **Alertas y Estados (Semánticos):**
  - `--color-success`: Acciones exitosas o confirmaciones (Verde).
  - `--color-warning`: Advertencias (Amarillo/Naranja).
  - `--color-error`: Errores o acciones destructivas (Rojo).
  - `--color-info`: Mensajes informativos (Azul claro).

### 2. Tipografía
Se definen las fuentes y una escala tipográfica estructurada.

- **Familias Tipográficas:**
  - `--font-family-base`: Fuente principal para lectura general (ej. 'Inter', 'Roboto', sans-serif).
  - `--font-family-heading`: Fuente para títulos destacando el branding (ej. 'Playfair Display', serif).
- **Escala de Tamaños:**
  - `--font-size-h1` a `--font-size-h6`: Escala estructurada para jerarquía de títulos.
  - `--font-size-body`: Tamaño estándar para párrafos.
  - `--font-size-small`: Tamaño para textos legales, etiquetas o detalles.
- **Pesos (Font Weight):**
  - `--font-weight-regular`: (ej. 400).
  - `--font-weight-medium`: (ej. 500 o 600).
  - `--font-weight-bold`: (ej. 700).

### 3. Espaciado y Grilla (Spacing)
Para mantener un ritmo visual armonioso, se evita el uso de píxeles al azar, empleando una escala basada en múltiplos (generalmente de 4 u 8 píxeles o valores `rem`).

- `--spacing-xs`: Separaciones mínimas (ej. entre icono y texto).
- `--spacing-sm`: Separaciones pequeñas (ej. márgenes internos de botones).
- `--spacing-md`: Separaciones medias (ej. márgenes internos de tarjetas).
- `--spacing-lg`: Separaciones grandes (ej. entre secciones o componentes).
- `--spacing-xl`: Espacios muy amplios (ej. márgenes de layouts completos).

### 4. Bordes y Sombras
Propiedades que definen la "dureza" de las formas y la profundidad o elevación de los elementos.

- **Radios de Borde (Border Radius):**
  - `--border-radius-sm`: Bordes ligeramente redondeados (botones, inputs).
  - `--border-radius-md`: Redondeo estándar (tarjetas, modales).
  - `--border-radius-full`: Círculos perfectos (avatares, badges).
- **Sombras y Elevación (Box Shadow):**
  - `--shadow-sm`: Sombra sutil para estado "hover" o elementos cercanos al fondo.
  - `--shadow-md`: Elevación estándar para tarjetas flotantes, dropdowns.
  - `--shadow-lg`: Elevación alta para modales y diálogos.

---

## Reglas de Uso e Implementación
- **NUNCA quemar valores (No Hardcoding):** Está estrictamente prohibido usar valores hexadecimales, px estáticos u otras propiedades visuales de diseño directamente en las clases de los componentes si existe una variable CSS equivalente.
- **Consumo Exclusivo:** Todo componente atómico (botones, tarjetas, etc.) debe construirse apoyándose **solamente** en el esquema aquí descrito.
- **Mantenibilidad:** Cualquier cambio de "theme" (tema claro a oscuro, o un rediseño de marca) debe ser resuelto modificando exclusivamente el archivo global donde habita el `:root`.

---

## Relación con otros documentos

- [Requisitos Funcionales](../02-Requisitos/Requisitos_Funcionales.md) (La UI debe suplir la necesidad funcional).
- [Componentes Generales](Componentes_Generales.md) (Hacen uso directo de estos Design Tokens).
- [Componentes Atómicos](Componentes_Atomicos.md) (Los elementos más pequeños que consumen estas variables CSS).
- [Convenciones de Código](../05-Desarrollo/Convenciones_Codigo.md) (Referencia sobre el nombrado de clases y estándares de desarrollo CSS/SCSS).

---

## Navegación

← [Índice de UI/UX](README.md)
↑ [Índice de la Carpeta](README.md)
→ [Componentes Generales](Componentes_Generales.md)

[MASTER](../MASTER.md)
