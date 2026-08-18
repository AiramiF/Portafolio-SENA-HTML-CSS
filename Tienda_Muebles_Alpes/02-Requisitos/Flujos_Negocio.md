# Flujos de Negocio

Define los flujos principales de los usuarios dentro del portal de ventas, documentando las acciones desde el punto de vista del usuario (Qué y Quién) y sirviendo como puente hacia el diseño técnico del sistema.

---

## Objetivo

Establecer identificadores únicos (`FL-xxx`) para cada proceso de negocio, de modo que sirvan como ancla para la trazabilidad entre el código (HTML/CSS/JS) y los requerimientos funcionales, asegurando que cada componente técnico tenga un propósito de negocio claro.

---

## Contenido

### [FL-001] Registro y Gestión de Clientes
Flujo para la creación, consulta, actualización y eliminación de clientes en el sistema.

- **Actores:** Cliente / Administrador.
- **Pasos:**
  1. El usuario ingresa a la vista de Registro de Clientes.
  2. Completa los datos obligatorios del formulario (Tipo/Número de documento, Nombre, Teléfonos, Dirección, Email, etc.).
  3. Envía el formulario para su validación.
  4. El sistema guarda la información y confirma el registro exitoso.
  5. Desde la vista de gestión, el Administrador puede buscar y eliminar un cliente si este no ha realizado ninguna compra.
- **Excepciones y Flujos Alternos:**
  - **A. Correo o Documento Duplicado:** Si el cliente intenta registrarse con un email o número de documento ya existente, el sistema aborta el registro y resalta el error.
  - **B. Eliminación Denegada:** Si el administrador intenta eliminar a un cliente que ya tiene compras asociadas, el sistema bloquea la acción para mantener la integridad de los reportes de ventas.

### [FL-002] Administración de Productos (Muebles)
Flujo para la gestión del inventario y catálogo de muebles.

- **Actores:** Administrador.
- **Pasos:**
  1. El Administrador accede a la gestión de productos.
  2. Registra un nuevo mueble llenando la referencia, nombre, características (dimensiones, material) y adjuntando una foto.
  3. Asigna en un paso adicional (o vista secundaria) el precio y la cantidad en stock.
  4. El catálogo se actualiza automáticamente.
  5. Puede consultar un mueble específico, modificar sus datos o eliminarlo (si no ha sido vendido).
- **Excepciones y Flujos Alternos:**
  - **A. Referencia Duplicada:** Si se ingresa una referencia de mueble que ya existe, el sistema previene la creación.
  - **B. Fallo en Subida de Imagen:** Si la imagen es muy pesada o falla la conexión (Cloudinary), se alerta al administrador antes de guardar en base de datos.
  - **C. Eliminación Restringida:** No se permite borrar un mueble si ya forma parte del historial de compras de algún cliente (se debe deshabilitar o poner stock en cero en su lugar).

### [FL-003] Proceso de Compra
Flujo central de adquisición de muebles por parte de un cliente registrado.

- **Actores:** Cliente.
- **Pasos:**
  1. El Cliente visualiza el catálogo de muebles disponibles.
  2. Selecciona un mueble y revisa su información en detalle.
  3. Agrega el mueble al carrito de compras.
  4. Repite el proceso o procede al Checkout ("efectuar compra").
  5. Visualiza el resumen del pedido (productos y valor total), elige forma de pago y confirma la compra.
  6. El sistema disminuye el inventario y genera un número de orden.
- **Excepciones y Flujos Alternos:**
  - **A. Carrito sin Loguearse:** El sistema permite agregar muebles al carrito de manera anónima (el carrito persiste localmente).
  - **B. Intento de Pago sin Login:** Al presionar "efectuar compra", si no hay sesión activa, se redirige a Autenticación (Login/Registro). Una vez logueado, retorna al checkout conservando el carrito.
  - **C. Falta de Stock:** Si durante el pago la cantidad solicitada excede el inventario real en base de datos, el sistema detiene la transacción y notifica las unidades disponibles.

### [FL-004] Visualización de Reportes
Flujo para la toma de decisiones gerenciales basadas en las ventas.

- **Actores:** Administrador.
- **Pasos:**
  1. El Administrador entra al módulo de reportes.
  2. Selecciona el tipo de reporte (Ventas diarias, Producto más vendido, o Compras por cliente).
  3. Ingresa los filtros de búsqueda (Fechas, Ciudad, Tipo de mueble).
  4. El sistema genera una tabla detallada con los resultados solicitados.

### [FL-005] Gestión de Perfil de Usuario e Historial
Flujo para que el cliente consulte y gestione sus datos personales y revise su historial de compras.

- **Actores:** Cliente.
- **Pasos:**
  1. El Cliente inicia sesión en el sistema.
  2. Accede a la opción "Mi Perfil" desde el menú desplegable de usuario.
  3. El sistema muestra sus datos personales y una tabla con el historial de compras realizadas.
  4. El cliente puede revisar los detalles y fechas de sus transacciones.

---

## Relación con otros documentos

Este documento traduce los Requisitos Funcionales en pasos de uso y sirve de entrada obligatoria para definir el sistema de Entradas-Procesos-Salidas (IPO) y la Trazabilidad en el código.

- [Requisitos Funcionales](Funcionales.md)
- [Entradas, Procesos y Salidas (IPO)](../03-Diseno/Entradas_Procesos_Salidas.md)
- [Convenciones de Código](../05-Desarrollo/Convenciones_Codigo.md)

---

## Navegación

← [Requisitos No Funcionales](No_Funcionales.md)
↑ [Índice de la Carpeta](README.md)
→ [Índice de Diseño](../03-Diseno/README.md)

[MASTER](../MASTER.md)
