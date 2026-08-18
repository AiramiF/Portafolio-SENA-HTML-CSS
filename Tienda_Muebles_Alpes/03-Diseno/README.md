# 03 - Diseño: Muebles los Alpes

Esta carpeta contiene la documentación sobre cómo está diseñado y construido el sistema a nivel estructural, enfocándose en un Frontend estático puro (Vanilla JS), **Supabase** como Backend as a Service (Autenticación nativa y PostgreSQL con RLS) y **Cloudinary** para el almacenamiento de imágenes.

---

## Objetivo

Dar a los desarrolladores un mapa técnico claro de los componentes del sistema, la estructura de base de datos en Supabase, la integración de servicios de imágenes externas (Cloudinary) y el consumo de la API mediante el SDK cliente.

---

## Contenido

- **[Diseño del Sistema](Diseno_Sistema.md):** Arquitectura cliente-servidor, componentes principales (Vanilla JS + Supabase + Cloudinary).
- **[Entradas, Procesos y Salidas (IPO)](Entradas_Procesos_Salidas.md):** Trazabilidad de datos desde la UI (Vanilla JS) hasta el Backend (Supabase/Cloudinary).
- **[Base de Datos](Base_Datos.md):** Modelo relacional, integración con Supabase Auth (`auth.users`), políticas RLS, Triggers de control de stock y script DDL ejecutable.
- **[API](API.md):** Guía práctica de consumo del cliente Supabase JS, flujo de registro, subida/renderizado de imágenes con Cloudinary y registro transaccional de compras.

### Orden recomendado de lectura

1. [Diseño del Sistema](Diseno_Sistema.md) (para ver la imagen completa).
2. [Entradas, Procesos y Salidas (IPO)](Entradas_Procesos_Salidas.md) (para trazar los datos).
3. [Base de Datos](Base_Datos.md) (para entender la estructura relacional, seguridad y triggers).
4. [API](API.md) (para aprender a interactuar con los servicios desde JavaScript).

---

## Relación con otros documentos

La arquitectura soporta los [Requisitos](../02-Requisitos/README.md) y dicta los estándares para la etapa de [Desarrollo](../05-Desarrollo/README.md).

- [MASTER](../MASTER.md)

---

## Navegación

← [Flujos de Negocio](../02-Requisitos/Flujos_Negocio.md)
↑ [MASTER](../MASTER.md)
→ [Diseño del Sistema](Diseno_Sistema.md)
