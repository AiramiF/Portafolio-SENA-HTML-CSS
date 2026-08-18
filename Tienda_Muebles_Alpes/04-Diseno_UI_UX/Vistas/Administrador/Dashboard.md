# Vista de Panel de Control (Dashboard Admin)

Punto de entrada para los usuarios con perfil Administrador. Proporciona enlaces de navegación rápida hacia los módulos de gestión de catálogos, clientes y reportes.

## Esquema Visual
```text
+-------------------------------------------------------------+
|  Panel Admin    Resumen  Muebles  Clientes  Reportes        |
+-------------------------------------------------------------+
|                                                             |
|  Bienvenido al Panel de Control                             |
|                                                             |
|  +-----------------------+     +-----------------------+    |
|  | Muebles Registrados   |     | Clientes Registrados  |    |
|  | 5                     |     | 1                     |    |
|  | [ Administrar -> ]    |     | [ Ver Clientes -> ]   |    |
|  +-----------------------+     +-----------------------+    |
|                                                             |
|  +-----------------------+                                  |
|  | Órdenes Totales       |                                  |
|  | 3                     |                                  |
|  | [ Ver Reportes -> ]   |                                  |
|  +-----------------------+                                  |
|                                                             |
+-------------------------------------------------------------+
```

## Listado de Subelementos
| Código | Nombre | Propósito |
|---|---|---|
| `BTN-001` | Enlace Administrar Muebles | Redirige a la sección de búsqueda y edición de muebles. |
| `BTN-002` | Enlace Ver Clientes | Redirige al panel de administración de clientes. |
| `BTN-003` | Enlace Ver Reportes | Redirige al módulo de reportes. |
| `ADM-001` | Tarjetas de Resumen | Contenedor (`.admin-card`) que muestra los KPIs principales. |

---

## Navegación
← [Perfil y Compras](../Cliente/Perfil.md)
↑ [Índice de Diseño UI/UX](../../README.md)
→ [Gestión de Clientes](Gestion_Clientes.md)
