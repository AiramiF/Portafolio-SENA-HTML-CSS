# Índice de Diseño UI/UX

Este directorio contiene la documentación relacionada con el diseño visual de la interfaz de usuario (UI) y la experiencia de usuario (UX). Se documenta el esquema visual desde los componentes generales hasta los componentes "atómicos" o fundamentales.

## 1. Identidad y Branding

- [Identidad Visual y Tokens CSS](Identidad_Visual.md): Paleta de colores, tipografía, espaciado y definiciones globales (`:root`).

## 2. Guías de Componentes

- [Componentes Generales](Componentes_Generales.md): Estructuras de alto nivel (pantallas, layouts, secciones principales).
- [Componentes Atómicos](Componentes_Atomicos.md): Elementos fundamentales e indivisibles (botones, inputs, iconos).

## 3. Mapa y Vistas del Sistema

### Acceso y Autenticación
- [Inicio de Sesión (Login)](Vistas/Autenticacion/Login.md)
- [Registro de Clientes](Vistas/Autenticacion/Registro.md)

### Vistas del Cliente
- [Catálogo de Muebles](Vistas/Cliente/Catalogo.md)
- [Detalle de Producto](Vistas/Cliente/Detalle_Producto.md)
- [Carrito de Compras](Vistas/Cliente/Carrito.md)
- [Formulario de Pago](Vistas/Cliente/Pago.md)
- [Confirmación de Compra](Vistas/Cliente/Confirmacion.md)
- [Perfil y Compras](Vistas/Cliente/Perfil.md)

### Vistas de Administración
- [Dashboard de Administrador](Vistas/Administrador/Dashboard.md)
- [Gestión de Clientes](Vistas/Administrador/Gestion_Clientes.md)
- [Gestión de Muebles (Catálogo)](Vistas/Administrador/Gestion_Muebles.md)
- [Registro de Precios y Stock (Inventario)](Vistas/Administrador/Registro_Precios.md)
- [Reportes y Métricas](Vistas/Administrador/Reportes.md)

### Vistas de Error
- [Error 404: No Encontrado](Vistas/Errores/404.md)
- [Error 403: Acceso Denegado](Vistas/Errores/403.md)

---

## Formato de Documentación por Vista
Cada vista del sistema incluye:
1. **Esquema visual:** Representación gráfica en wireframe ASCII de la distribución y composición visual.
2. **Listado de Subelementos:**
   - **Código:** Identificador único (ej. `BTN-001`).
   - **Nombre:** Nombre del componente o elemento.
   - **Propósito:** Función que cumple dentro de la interfaz.

---

## Relación con otros documentos
- Reemplaza a la antigua carpeta de Planificación.
- Se basa en los [Requisitos](../02-Requisitos/README.md) y [Diseño](../03-Diseno/README.md).
- Determina la base visual para el código en [Desarrollo](../05-Desarrollo/README.md).

---

## Navegación
← [API de Supabase & Cloudinary](../03-Diseno/API.md)
↑ [MASTER](../MASTER.md)
→ [Identidad Visual](Identidad_Visual.md)
