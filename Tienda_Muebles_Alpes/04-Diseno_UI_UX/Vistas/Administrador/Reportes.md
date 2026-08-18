# Vista de Reportes Administrativos

Módulo de consulta para administradores y gerentes que desglosa la información financiera y de ventas del negocio.

## Esquema Visual
```text
+-------------------------------------------------------------+
|  Reportes del Sistema                                       |
+-------------------------------------------------------------+
|  Reporte de Ventas Diarias                                  |
|  Inicio: [ 2026-07-01 ]  Fin: [ 2026-07-28 ]                |
|  Ciudad: [ Todas / Bogotá v ]           [ Consultar (BTN) ] |
|  ---------------------------------------------------------  |
|  Tipo INTERIOR: Mesa Ovalada (1u, $140.000)                 |
|  Tipo EXTERIOR: Silla Avant  (2u, $360.000)                 |
|  TOTAL (en pesos): $500.000 COP                             |
+-------------------------------------------------------------+
|  Reporte de Producto Más Vendido                            |
|  Inicio: [ 2026-07-01 ]  Fin: [ 2026-07-28 ]  Ciudad: [ B.] |
|  [ Consultar (BTN) ]                                        |
|  Mueble: Silla Avant  | Tipo: Exterior                      |
+-------------------------------------------------------------+
```

## Listado de Subelementos
| Código | Nombre | Propósito |
|---|---|---|
| `DAT-001` | Inputs de Fecha | Calendario para seleccionar el rango de tiempo de consulta (Fecha Inicio y Fin). |
| `SEL-001` | Filtro de Ciudad | Selección de ciudad origen de las transacciones. |
| `BTN-001` | Botón Consultar | Ejecuta las consultas agregadas sobre las tablas de Supabase. |
| `TBL-001` | Tablas de Resultados | Desglosan las cantidades vendidas, montos unitarios, y sumas totales ordenadas según los requisitos (RF-15, RF-16). |

---

## Navegación
← [Registro de Precios y Stock](Registro_Precios.md)
↑ [Índice de Diseño UI/UX](../../README.md)
→ [Índice de Desarrollo](../../../05-Desarrollo/README.md)
