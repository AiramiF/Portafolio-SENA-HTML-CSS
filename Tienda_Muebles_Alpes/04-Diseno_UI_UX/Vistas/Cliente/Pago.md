# Vista de Pago (Checkout)

Permite al cliente seleccionar el método de pago y completar los datos obligatorios que hagan falta para registrar la compra.

## Esquema Visual
```text
+-------------------------------------------------------------+
|  Resumen y Pago de Compra                                    |
+-------------------------------------------------------------+
|  Detalle de Compra:                                         |
|  - 1x Mesa Ovalada ($140.000)                               |
|  - 2x Silla Avant ($360.000)                                |
|  ---------------------------------------------------------  |
|  Total a Pagar: $500.000 COP                                |
|                                                             |
|  Forma de Pago (*):                                         |
|  ( ) Tarjeta Crédito   ( ) Débito PSE   ( ) Efectivo        |
|                                                             |
|  Dirección de Envío (*): [                                ] |
|  Descripción/Notas:      [                                ] |
|                                                             |
|  [ Pagar (BTN-001) ]            [ Cancelar (BTN-002) ]      |
+-------------------------------------------------------------+
```

## Listado de Subelementos
| Código | Nombre | Propósito |
|---|---|---|
| `RAD-001` | Formas de Pago | Botón de selección exclusiva para elegir el método de transacción. |
| `INP-001` | Campo Dirección | Permite al cliente especificar o modificar el lugar físico de entrega. |
| `BTN-001` | Botón Pagar | Finaliza el flujo de compra. Descuenta stock, genera la orden y almacena el registro en Supabase. |
| `BTN-002` | Botón Cancelar | Regresa al carrito de compras sin procesar el pago. |

---

## Navegación
← [Carrito de Compras](Carrito.md)
↑ [Índice de Diseño UI/UX](../../README.md)
→ [Confirmación de Compra](Confirmacion.md)
