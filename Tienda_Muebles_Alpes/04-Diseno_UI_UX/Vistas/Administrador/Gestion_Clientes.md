# Vista de Gestión de Clientes

Permite a los administradores buscar, visualizar y eliminar perfiles de clientes registrados en el sistema.

## Esquema Visual
```text
+-------------------------------------------------------------+
|  Administración de Clientes                                 |
+-------------------------------------------------------------+
|  Buscar: [ Documento/Nombre/Email ]     [ Buscar (BTN-001) ] |
+-------------------------------------------------------------+
|  Nro Documento    Nombre                Email       Acción  |
|  ---------------------------------------------------------  |
|  1098765432       Carlos Rodríguez      c@ex.com    [Borrar]|
|  1234567890       Muebles & Cía (NIT)   m@ex.com    [Borrar]|
|  ---------------------------------------------------------  |
+-------------------------------------------------------------+
```

## Listado de Subelementos
| Código | Nombre | Propósito |
|---|---|---|
| `INP-001` | Input de Búsqueda | Permite filtrar por número de documento, nombre o dirección de correo electrónico. |
| `BTN-001` | Botón Buscar | Realiza la consulta de coincidencias en Supabase. |
| `BTN-002` | Botón Borrar | Valida si el cliente tiene compras asociadas. Si no tiene, despliega una confirmación y lo elimina. Si tiene, bloquea la acción. |

---

## Navegación
← [Dashboard de Administrador](Dashboard.md)
↑ [Índice de Diseño UI/UX](../../README.md)
→ [Gestión de Muebles](Gestion_Muebles.md)
