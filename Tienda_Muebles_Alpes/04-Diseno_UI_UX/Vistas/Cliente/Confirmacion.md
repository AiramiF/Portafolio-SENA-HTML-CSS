# Vista de Confirmación de Compra

Informa al cliente que la compra ha sido exitosa, mostrando el resumen y detalles de la orden generada.

## Esquema Visual
```text
+-------------------------------------------------------------+
|  ¡Compra Exitosa!                                           |
+-------------------------------------------------------------+
|                                                             |
|  Tu orden ha sido procesada correctamente.                   |
|                                                             |
|  Número de Orden: ORD-1722189001                            |
|  Valor Total: $500.000 COP                                  |
|                                                             |
|  Se ha enviado un correo electrónico de confirmación con los|
|  detalles de tu pedido.                                     |
|                                                             |
|  [ Volver al Catálogo (BTN-001) ]                           |
|                                                             |
+-------------------------------------------------------------+
```

## Listado de Subelementos
| Código | Nombre | Propósito |
|---|---|---|
| `TXT-001` | Número de Orden | Identificador único y correlativo generado por el sistema de compras. |
| `BTN-001` | Botón Volver | Redirige al catálogo de muebles para seguir navegando. |

---

## Navegación
← [Formulario de Pago](Pago.md)
↑ [Índice de Diseño UI/UX](../../README.md)
→ [Perfil y Compras](Perfil.md)
