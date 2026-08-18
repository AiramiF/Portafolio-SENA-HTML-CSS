# Vista del Catálogo de Muebles

Muestra a los clientes la lista de todos los muebles que están disponibles para la venta (con stock mayor a cero).

## Esquema Visual
```text
+-------------------------------------------------------------+
|  Muebles Los Alpes                  [ Carrito (3) (BTN-003) ] |
+-------------------------------------------------------------+
|  Buscar: [               ] Tipo: [ Todos/Int/Ext ]           |
+-------------------------------------------------------------+
|                                                             |
|  +-----------------------+     +-----------------------+    |
|  | Foto Mueble (IMG-001) |     | Foto Mueble (IMG-001) |    |
|  |                       |     |                       |    |
|  | Mesa Ovalada Griega   |     | Silla Avant           |    |
|  | Material: Madera      |     | Material: Aluminio    |    |
|  | Precio: $140.000      |     | Precio: $180.000      |    |
|  |                       |     |                       |    |
|  | [ Detalle (BTN-001) ] |     | [ Detalle (BTN-001) ] |    |
|  | [ Agregar (BTN-002) ] |     | [ Agregar (BTN-002) ] |    |
|  +-----------------------+     +-----------------------+    |
|                                                             |
+-------------------------------------------------------------+
```

## Listado de Subelementos
| Código | Nombre | Propósito |
|---|---|---|
| `BTN-001` | Botón Ver Detalle | Redirige al cliente a la vista detallada del producto. |
| `BTN-002` | Botón Agregar | Agrega una unidad del mueble al carrito de compras actual. |
| `BTN-003` | Botón Carrito | Muestra la cantidad actual de productos agregados y redirige a la vista del carrito. |
| `INP-001` | Barra de Búsqueda | Permite buscar dinámicamente por nombre o referencia. |
| `SEL-001` | Filtro por Tipo | Permite clasificar la vista por muebles de interior o exterior. |

---

## Navegación
← [Registro de Clientes](../Autenticacion/Registro.md)
↑ [Índice de Diseño UI/UX](../../README.md)
→ [Detalle de Producto](Detalle_Producto.md)
