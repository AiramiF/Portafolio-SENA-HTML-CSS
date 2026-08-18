# Requisitos Funcionales: Muebles los Alpes

Lista y descripción detallada de los comportamientos y acciones específicas que el portal de ventas de muebles debe poder realizar, divididos por procesos de negocio.

---

## Objetivo

Proveer a los desarrolladores y QA una guía exacta de las funcionalidades que deben construirse y probarse, basándose en los procesos de administración y compra.

---

## Contenido

### 1. Seguridad y Perfiles

- **RF-01:** El sistema debe soportar dos perfiles: Cliente y Administrador.
- **RF-02:** El perfil Cliente puede realizar compras, modificar sus datos y acceder a un perfil propio para ver su historial de compras.
- **RF-03:** El perfil Administrador puede gestionar muebles, clientes, precios y revisar reportes.

### 2. Proceso de Administración de Clientes

- **RF-04:** El sistema debe permitir el registro de clientes (persona natural o jurídica) con: Tipo de documento (obligatorio), Número de documento (obligatorio, único, o NIT si es jurídica), Nombre completo (obligatorio), Teléfono residencia (obligatorio), Teléfono celular, Dirección (obligatorio), Ciudad (obligatorio), Departamento (obligatorio), País (obligatorio), Profesión, Email (obligatorio).
- **RF-05:** Se debe permitir buscar, consultar y actualizar los clientes registrados.
- **RF-06:** Se debe permitir eliminar un cliente solo si no ha realizado ninguna compra, previa confirmación y mostrando tabla de resultados de búsqueda.

### 3. Proceso de Administración de Productos (Muebles)

- **RF-07:** El administrador debe poder crear muebles con: Referencia (obligatoria, única), Nombre (obligatorio), Descripción, Tipo (interior/exterior) (obligatorio), Categoría (Mesa, Silla, etc.) (obligatoria), Material, Dimensiones (obligatorio), Color, Peso (obligatorio) y Foto.
- **RF-08:** Se debe poder asignar y actualizar el precio (pesos colombianos) y cantidad existente de cada mueble en una pantalla adicional.
- **RF-09:** Se debe poder consultar (por referencia, nombre o tipo), modificar y eliminar muebles (solo si no han sido comprados).

### 4. Proceso de Compra

- **RF-10:** El portal debe mostrar una tabla/listado de muebles disponibles (referencia, nombre, material, foto).
- **RF-11:** El cliente puede seleccionar un mueble para ver toda su información y agregarlo al carrito de compras.
- **RF-12:** Para efectuar la compra, el cliente debe estar autenticado en el sistema.
- **RF-13:** El sistema debe validar la disponibilidad del producto (asumida siempre disponible para este taller, pero mostrando mensaje con cantidad existente si aplica) y disminuir las unidades tras la compra.
- **RF-14:** Al finalizar, se debe mostrar un resumen (productos, valor unitario, valor total), elegir forma de pago, generar número de orden y simular mensaje de correo y confirmación de compra exitosa.

### 5. Reportes

- **RF-15:** Reporte de ventas diarias: agrupadas por tipo de mueble, filtrables por fecha inicio, fecha fin y ciudad.
- **RF-16:** Reporte del producto más vendido: en un periodo de tiempo seleccionado por ciudad.
- **RF-17:** Reporte de compras por cliente: listado de compras realizadas por un cliente ordenadas por fecha.

---

## Relación con otros documentos

Los requisitos funcionales alimentan los [Casos de Prueba](../06-Calidad/Casos_Prueba.md).

- [Requisitos No Funcionales](No_Funcionales.md)

---

## Navegación

← [Índice de Requisitos](README.md)
↑ [Índice de la Carpeta](README.md)
→ [Requisitos No Funcionales](No_Funcionales.md)

[MASTER](../MASTER.md)
