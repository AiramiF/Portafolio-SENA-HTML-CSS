# Casos de Prueba: Muebles los Alpes

Catálogo de pruebas específicas que QA o los desarrolladores deben ejecutar manualmente para validar una funcionalidad.

---

## Objetivo

Proveer pasos exactos para reproducir escenarios de uso y asegurar que los [Requisitos Funcionales](../02-Requisitos/Funcionales.md) se cumplan sin excepciones.

---

## Contenido

### CP-01: Registro de Cliente Exitoso (RF-04)
- **Precondición:** El usuario no está autenticado.
- **Pasos:**
  1. Navegar a `/registro.html`.
  2. Ingresar todos los campos obligatorios (Documento, Nombre, Dirección, etc.).
  3. Clic en "Registrar".
- **Resultado Esperado:** El cliente es guardado en Supabase, la vista se actualiza y redirige al catálogo.

### CP-02: Eliminar Cliente con Compras Previas (RF-06)
- **Precondición:** Existe un cliente (Admin logueado). El cliente ya realizó una compra.
- **Pasos:**
  1. Navegar al panel "Administrar Clientes".
  2. Buscar el cliente.
  3. Hacer clic en "Eliminar".
- **Resultado Esperado:** El sistema debe denegar la eliminación y mostrar una alerta al administrador indicando que el cliente tiene compras asociadas.

### CP-03: Flujo de Compra Completo (RF-11 a RF-14)
- **Precondición:** Cliente autenticado y con sesión activa. Existen muebles con cantidad > 0.
- **Pasos:**
  1. Navegar al catálogo.
  2. Clic en "Ver" sobre un mueble.
  3. Clic en "Agregar al Carrito".
  4. Clic en "Continuar compra" (volver al catálogo) o "Efectuar compra".
  5. En el checkout, elegir forma de pago y "Pagar".
- **Resultado Esperado:** Se genera número de orden, se muestra mensaje de confirmación exitosa, y en Supabase se reduce el `STOCK` del mueble.

---

### CP-04: Registro con Correo Duplicado (FL-001)
- **Precondición:** Existe un cliente registrado con `test@mail.com`.
- **Pasos:**
  1. Navegar a `/registro.html`.
  2. Ingresar todos los datos, utilizando el correo `test@mail.com`.
  3. Clic en "Registrar".
- **Resultado Esperado:** El sistema deniega el registro y muestra un mensaje de error inline (MSG-001) indicando que el correo ya está en uso.

### CP-05: Creación de Mueble con Referencia Duplicada (FL-002)
- **Precondición:** Existe un mueble con referencia `MUE-001`. Admin logueado.
- **Pasos:**
  1. Navegar a creación de productos.
  2. Llenar el formulario usando la referencia `MUE-001`.
  3. Clic en "Guardar Mueble".
- **Resultado Esperado:** El sistema previene la creación y alerta de la duplicidad mediante un mensaje inline (MSG-001) o Toast (TST-001).

### CP-06: Checkout sin Login (FL-003)
- **Precondición:** Cliente anónimo.
- **Pasos:**
  1. Navegar al catálogo y agregar un mueble al carrito.
  2. Abrir carrito y dar clic en "Efectuar compra".
- **Resultado Esperado:** El usuario es redirigido a la vista de Autenticación. Tras loguearse exitosamente, es devuelto al carrito con sus productos intactos.

### CP-07: Compra Denegada por Falta de Stock (FL-003)
- **Precondición:** Mueble "X" tiene stock de 1 unidad. Cliente A y Cliente B tienen el mueble en el carrito. Cliente B ya lo pagó.
- **Pasos:**
  1. Cliente A da clic en "Pagar" para comprar 1 unidad.
- **Resultado Esperado:** La transacción es denegada. Se muestra un Modal de Alerta (MOD-001) informando que el stock actual es 0.

### CP-08: Actualización de Datos de Cliente (RF-05)
- **Precondición:** El usuario (Cliente o Admin) está autenticado. Existe un cliente en el sistema.
- **Pasos:**
  1. Navegar al perfil del cliente o a la vista de administración de clientes.
  2. Modificar uno o varios campos permitidos (ej. teléfono, dirección).
  3. Clic en "Actualizar" o "Guardar cambios".
- **Resultado Esperado:** Los datos se actualizan exitosamente en la base de datos (Supabase) y la interfaz refleja los nuevos valores.

### CP-09: Eliminar Cliente sin Compras (RF-06)
- **Precondición:** Existe un cliente (Admin logueado). El cliente NO tiene compras asociadas.
- **Pasos:**
  1. Navegar al panel "Administrar Clientes".
  2. Buscar el cliente.
  3. Hacer clic en "Eliminar".
  4. Confirmar la eliminación en el cuadro de diálogo.
- **Resultado Esperado:** El cliente es eliminado exitosamente de Supabase, desapareciendo de la tabla de resultados.

### CP-10: Creación de Mueble y Asignación de Stock (RF-07, RF-08)
- **Precondición:** Admin logueado.
- **Pasos:**
  1. Navegar a la gestión de productos.
  2. Registrar un nuevo mueble con referencia única, nombre, material, tipo, foto, etc.
  3. Proceder a asignar el precio y la cantidad en stock inicial.
  4. Clic en "Guardar Mueble".
- **Resultado Esperado:** El mueble se guarda correctamente en Supabase, apareciendo inmediatamente en el catálogo y listas de gestión.

### CP-11: Actualización de Producto (RF-09)
- **Precondición:** Existe al menos un mueble. Admin logueado.
- **Pasos:**
  1. En el panel de gestión, seleccionar un mueble existente.
  2. Modificar el precio o el stock actual.
  3. Clic en "Actualizar".
- **Resultado Esperado:** El sistema actualiza los valores del producto en tiempo real, mostrándose reflejados en el catálogo para futuros compradores.

### CP-12: Eliminar Mueble sin Ventas (RF-09)
- **Precondición:** Existe un mueble en catálogo. El mueble NO ha sido comprado por nadie. Admin logueado.
- **Pasos:**
  1. Desde la administración de productos, seleccionar el mueble.
  2. Clic en "Eliminar".
  3. Confirmar la alerta.
- **Resultado Esperado:** El sistema permite la eliminación. El mueble desaparece tanto del catálogo como de la base de datos de productos activos.

### CP-13: Reporte de Ventas Diarias (RF-15)
- **Precondición:** Existen ventas registradas en diferentes fechas y ciudades. Admin logueado.
- **Pasos:**
  1. Ir al módulo de reportes y seleccionar "Ventas Diarias".
  2. Ingresar un rango de fecha (inicio - fin).
  3. Aplicar filtro de ciudad (opcional).
- **Resultado Esperado:** El sistema muestra una tabla con el total de ventas agrupadas por tipo de mueble para ese rango, correspondiendo exactamente con los registros de Supabase.

### CP-14: Reporte de Producto Más Vendido (RF-16)
- **Precondición:** Existen ventas previas. Admin logueado.
- **Pasos:**
  1. Ir a la vista de "Producto más vendido".
  2. Seleccionar un rango de fechas y una ciudad específica.
- **Resultado Esperado:** El sistema devuelve la información del mueble que registra la mayor cantidad de unidades vendidas bajo esos criterios.

### CP-15: Reporte de Compras por Cliente (RF-17)
- **Precondición:** Existen clientes con historial de compras. Admin logueado.
- **Pasos:**
  1. Ir al reporte de compras por cliente.
  2. Buscar al cliente mediante documento o nombre.
- **Resultado Esperado:** Se lista cronológicamente el historial de compras del usuario, mostrando fechas, órdenes y valores totales, coherentes con la base de datos.

### CP-16: Autenticación Fallida (Seguridad)
- **Precondición:** Usuario anónimo en vista de Login.
- **Pasos:**
  1. Ingresar credenciales incorrectas (correo no registrado o contraseña inválida).
  2. Clic en "Ingresar".
- **Resultado Esperado:** El acceso es denegado y se muestra un mensaje de error claro (ej. "Credenciales inválidas"), sin exponer datos sensibles del sistema.

---

## Relación con otros documentos

Cada Caso de Prueba debe trazar directamente a un [Requisito Funcional](../02-Requisitos/Funcionales.md) o a un [Flujo de Negocio](../02-Requisitos/Flujos_Negocio.md).

- [Estrategia de Pruebas](Estrategia_Pruebas.md)
- [Flujos de Negocio](../02-Requisitos/Flujos_Negocio.md)
- [Componentes Atómicos (MOD-001, TST-001, MSG-001)](../04-Diseno_UI_UX/Componentes_Atomicos.md)

---

## Navegación

← [Estrategia de Pruebas](Estrategia_Pruebas.md)
↑ [Índice de la Carpeta](README.md)
→ [Índice de Despliegue](../07-Entrega/README.md)

[MASTER](../MASTER.md)
