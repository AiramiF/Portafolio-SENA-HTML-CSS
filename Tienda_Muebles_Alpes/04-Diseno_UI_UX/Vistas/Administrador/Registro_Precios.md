# Vista de Registro de Precios y Stock (Inventario)

Pantalla adicional destinada a que el administrador asigne o actualice el precio de venta y la cantidad disponible de cada mueble en el inventario.

## Esquema Visual
```text
+-------------------------------------------------------------+
|  Control de Inventario (Precios y Cantidad)                 |
+-------------------------------------------------------------+
|  Referencia (*): [ MESONAT001 v ]                           |
|                                                             |
|  Nombre del Mueble: Mesa Ovalada Estilo Griego              |
|  Stock Actual:      2 unidades                              |
|  Precio Actual:     $140.000 COP                            |
|                                                             |
|  Nuevo Precio (*): [               ] (COP)                  |
|  Nueva Cantidad (*): [             ] (Unidades Enteras)     |
|                                                             |
|  [ Guardar Cambios (BTN-001) ]   [ Cancelar (BTN-002) ]     |
+-------------------------------------------------------------+
```

## Listado de Subelementos
| Código | Nombre | Propósito |
|---|---|---|
| `SEL-001` | Selector de Referencia | Desplegable para elegir el mueble a modificar. Al seleccionarlo, se cargan los datos actuales de la base de datos. |
| `INP-001` | Entrada de Precio | Campo numérico para definir el valor de venta al público en pesos colombianos. |
| `INP-002` | Entrada de Cantidad | Campo numérico (entero) para definir el inventario disponible de unidades. |
| `BTN-001` | Botón Guardar | Registra y actualiza la cantidad y precio en la base de datos de Supabase. |

---

## Navegación
← [Gestión de Muebles](Gestion_Muebles.md)
↑ [Índice de Diseño UI/UX](../../README.md)
→ [Reportes y Métricas](Reportes.md)
