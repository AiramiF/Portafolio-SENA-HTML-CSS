# Vista de Gestión de Muebles (Productos)

Permite al administrador buscar, crear, editar y eliminar los productos del catálogo de muebles.

## Esquema Visual
```text
+-------------------------------------------------------------+
|  Administración de Muebles        [ Registrar Mueble (BTN) ] |
+-------------------------------------------------------------+
|  Buscar: [ Referencia/Nombre/Tipo ]     [ Buscar (BTN-001) ] |
+-------------------------------------------------------------+
|  Referencia    Nombre                 Tipo       Acciones   |
|  ---------------------------------------------------------  |
|  MESONAT001    Mesa Ovalada Griega    Interior   [Edit][Del]|
|  ---------------------------------------------------------  |
|                                                             |
|  Detalle/Formulario Mueble:                                 |
|  Referencia (*): [        ] Nombre (*):      [            ] |
|  Descripción:    [        ] Tipo (*):        [ Int/Ext v ]  |
|  Material:       [        ] Dimensiones (*): [            ] |
|  Color:          [        ] Peso (*):        [            ] |
|  Foto (URL):     [        ]                                 |
|                                                             |
|  [ Guardar Mueble (BTN-002) ]    [ Cancelar (BTN-003) ]     |
+-------------------------------------------------------------+
```

## Listado de Subelementos
| Código | Nombre | Propósito |
|---|---|---|
| `INP-001` | Buscador de Muebles | Filtros por referencia, nombre o tipo del producto. |
| `BTN-001` | Botón Buscar | Realiza la consulta del catálogo en Supabase. |
| `INP-002` | Campos de Mueble | Entradas obligatorias y opcionales para la ficha técnica del producto. |
| `BTN-002` | Botón Guardar | Inserta un nuevo mueble o actualiza uno existente en Supabase. |
| `BTN-003` | Botón Eliminar (Del) | Borra un producto si no ha sido comprado previamente. Pide confirmación al usuario. |

---

## Navegación
← [Gestión de Clientes](Gestion_Clientes.md)
↑ [Índice de Diseño UI/UX](../../README.md)
→ [Registro de Precios y Stock](Registro_Precios.md)
