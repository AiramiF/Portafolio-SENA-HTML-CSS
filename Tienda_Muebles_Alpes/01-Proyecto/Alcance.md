# Alcance del Proyecto: Muebles los Alpes

Define explícitamente los límites del desarrollo actual para el portal de ventas de Muebles los Alpes. Qué se va a construir y, más importante aún, qué NO se va a construir bajo el stack tecnológico definido.

---

## Objetivo

Evitar el "feature creep" (crecimiento descontrolado del proyecto) y mantener al equipo enfocado en las metas acordadas utilizando tecnologías puras (Vanilla Web).

---

## Contenido

### 1. Dentro del Alcance (In Scope)

El sistema **INCLUYE** el desarrollo de:

- **Perfiles de Seguridad:** Acceso y funcionalidades diferenciadas para Clientes y Administradores.
- **Administración de Clientes:** Registro, consulta, actualización y eliminación lógica (si no hay compras).
- **Administración de Productos:** CRUD de muebles (referencia, nombre, descripción, tipo, material, dimensiones, color, peso, foto, precio y cantidad).
- **Proceso de Compra:** Catálogo visible, detalle de producto, carrito de compras, proceso de checkout y confirmación (simulada) con generación de número de orden y actualización de inventario.
- **Módulo de Reportes (Administrador):** Reportes de ventas diarias (por tipo de mueble), producto más vendido (por ciudad y periodo), y compras por cliente.
- **Stack Tecnológico:** HTML, CSS puro, y JavaScript puro (Vanilla).
- **Base de Datos:** Integración con Supabase.
- **Gestión de Imágenes:** Almacenamiento y entrega optimizada de fotos de muebles mediante Cloudinary (CDN externo).

### 2. Fuera del Alcance (Out of Scope)

El sistema **NO INCLUYE** en esta fase:

- Uso de frameworks o librerías de UI (como React, Angular, Vue, Tailwind CSS, Bootstrap).
- Conexión real con entidades bancarias o pasarelas de pago (se asumirá que los datos de pago son correctos para finalizar la compra).
- Despliegues automatizados mediante pipelines CI/CD.
- Aplicación móvil nativa (Android/iOS).

### 3. Restricciones Técnicas o de Negocio

- El despliegue de la aplicación web se realizará de manera **manual en Vercel**.
- Se asume disponibilidad infinita de inventario durante el proceso de compra según las reglas del taller, aunque el sistema debe manejar el descuento de unidades.
- Toda la manipulación del DOM y estilos deben hacerse sin herramientas o compiladores intermedios.

---

## Relación con otros documentos

El alcance determina directamente los [Requisitos Funcionales](../02-Requisitos/Funcionales.md).

- [Visión](Vision.md)

---

## Navegación

← [Visión](Vision.md)
↑ [Índice de la Carpeta](README.md)
→ [Índice de Requisitos](../02-Requisitos/README.md)

[MASTER](../MASTER.md)
