# Vista del Carrito de Compras

Muestra el listado de productos seleccionados por el cliente, permitiendo gestionar sus cantidades antes de proceder con el pago.

## Esquema Visual
```text
+-------------------------------------------------------------+
|  Mi Carrito de Compras                                      |
+-------------------------------------------------------------+
|  Producto         Cantidad          Precio Unit.    Total   |
|  ---------------------------------------------------------  |
|  Mesa Ovalada     [ 1 ] (INP-001)   $140.000        $140.00 |
|  Silla Avant      [ 2 ] (INP-001)   $180.000        $360.00 |
|                                                             |
|  ---------------------------------------------------------  |
|                                     Total Compra: $500.000  |
|                                                             |
|  [ Continuar Compra (BTN-001) ]                             |
|  [ Efectuar Compra (BTN-002) ]                              |
+-------------------------------------------------------------+
```

## Listado de Subelementos
| Código | Nombre | Propósito |
|---|---|---|
| `INP-001` | Entrada de Cantidad | Campo numérico para incrementar o reducir las unidades deseadas del producto. |
| `BTN-001` | Botón Continuar Compra | Redirige de vuelta a la página de inicio (catálogo) para agregar otros ítems. |
| `BTN-002` | Botón Efectuar Compra | Avanza a la pantalla de Checkout/Pago. Si el usuario no está logueado, le exige autenticarse antes. |

---

## Navegación
← [Detalle de Producto](Detalle_Producto.md)
↑ [Índice de Diseño UI/UX](../../README.md)
→ [Formulario de Pago](Pago.md)
