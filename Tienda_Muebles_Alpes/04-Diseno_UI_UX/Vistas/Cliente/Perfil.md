# Vista de Perfil y Mis Pedidos del Cliente

Permite a los clientes registrados actualizar su información personal y revisar el histórico ("Mis Pedidos") de sus compras ordenadas de manera cronológica. (Alineado con [FL-005](../../02-Requisitos/Flujos_Negocio.md#fl-005-gestión-de-perfil-de-usuario-e-historial)).

## Esquema Visual
```text
+-------------------------------------------------------------+
|  Mi Perfil                                                  |
+-------------------------------------------------------------+
|  Nombres: [ Carlos R.     ]  Teléfono Celular: [ 31098... ] |
|  Dirección: [ Calle 80... ]  Ciudad: [ Bogotá             ] |
|  [ Guardar Cambios (BTN-001) ]                              |
+-------------------------------------------------------------+
|  Mis Pedidos / Historial de Compras                         |
|  ---------------------------------------------------------  |
|  Fecha        Orden           Total       Muebles Incluidos |
|  28/07/2026   ORD-1722189001  $500.000    Mesa Ovalada (1)  |
|                                           Silla Avant (2)   |
|  ---------------------------------------------------------  |
+-------------------------------------------------------------+
```

## Listado de Subelementos
| Código | Nombre | Propósito |
|---|---|---|
| `INP-001` | Campos de Perfil | Permiten modificar los datos personales (Dirección, Teléfono, Ciudad, etc.). |
| `BTN-001` | Botón Guardar Cambios | Actualiza la información del perfil en la tabla `CLIENTES` de Supabase. |
| `TBL-001` | Tabla Historial | Muestra un listado cronológico de compras realizadas con fecha, orden, valor e ítems incluidos. |

---

## Navegación
← [Confirmación de Compra](Confirmacion.md)
↑ [Índice de Diseño UI/UX](../../README.md)
→ [Dashboard de Administrador](../Administrador/Dashboard.md)
