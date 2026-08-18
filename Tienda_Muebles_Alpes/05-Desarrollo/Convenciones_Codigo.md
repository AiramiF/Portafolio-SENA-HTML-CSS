# Convenciones de Código y Trazabilidad Obligatoria

En este proyecto, el código **NO solamente implementa funcionalidades**, sino que es la representación técnica de requisitos, flujos, historias de usuario y decisiones arquitectónicas. 

**Estas reglas son obligatorias y tienen prioridad sobre cualquier estilo habitual de programación.**

---

## 1. La Regla de Oro: Prohibido comentar el "Cómo"
No uses comentarios para explicar sintaxis (ej. `// iterar array`, `// guarda en BD`). El código debe ser autodescriptivo.
**Comenta SIEMPRE el "Por qué" y el "Qué", usando el contexto funcional:**
- Qué requisito implementa.
- Qué historia de usuario satisface.
- Qué flujo representa o pantalla pertenece.
- Qué documento describe este comportamiento.

---

## 2. Identificadores Oficiales Permitidos
Nunca inventes identificadores en los comentarios. Usa los definidos en la documentación:
- **RF-xxx:** Requisito Funcional
- **RNF-xxx:** Requisito No Funcional

- **FL-xxx:** Flujo (Ver [Flujos de Negocio](../02-Requisitos/Flujos_Negocio.md) e [IPO](../03-Diseno/Entradas_Procesos_Salidas.md))
- **UX-xxx / UI-xxx:** Diseño o Componente Visual
- **API-xxx / DB-xxx:** Endpoints o Base de datos
- **ARQ-xxx / DEC-xxx:** Decisiones de Arquitectura

*Si un identificador no existe, deja un `TODO` indicando que debe crearse en la documentación.*

---

## 3. Alineación y Nomenclatura para Desarrollo (HTML, CSS, JS)

Para garantizar la trazabilidad de los flujos de negocio (FL-xxx) y el modelo Entradas-Procesos-Salidas (IPO) dentro del código fuente, se deben seguir estas reglas:

### A. Nomenclatura HTML
- **IDs de Componentes Principales:** Deben incluir el prefijo del flujo visual, por ejemplo: `id="ui-fl003-carrito"`.
- **Comentarios:** Cada bloque funcional mayor debe indicar qué flujo implementa usando el identificador oficial.

### B. Nomenclatura CSS
- Utilizar la metodología BEM (Block Element Modifier) anclada a la estructura de la UI definida en HTML.
- Ejemplo: `.carrito__boton-comprar`, `.producto__tarjeta--agotado`.

### C. Nomenclatura JavaScript (Vanilla)
- **Funciones y Métodos:** Usar `camelCase` con nombres descriptivos que reflejen la acción del proceso IPO. Ejemplos: `procesarCompraCliente()`, `validarFormularioRegistro()`.

---

## 4. Estructura Obligatoria de Comentarios y Módulos

Al usar Vanilla JS, el código debe separarse lógicamente. Se sugiere usar ES Modules (`export`/`import`) y agrupar la lógica en carpetas como `js/controllers`, `js/services`, etc.

### A. Módulos y Archivos (Javascript)
Todo módulo importante debe comenzar con un encabezado de trazabilidad:

```javascript
/******************************************************************************
 * MÓDULO / ARCHIVO
 * clientes.controller.js
 *
 * Propósito: Gestionar operaciones del DOM y eventos relacionados con clientes.
 *
 * Implementa:
 * RF-04
 * RF-05
 *
 * Relacionado con:
 * UI-RegistroCliente, DB-Clientes
 *
 * Documentación:
 * ../02-Requisitos/Funcionales.md#rf-04
 ******************************************************************************/
```

### B. Funciones y Métodos
```javascript
/**
 * Flujo: FL-001 | IPO: Validación de Cliente
 * Descripción: Valida los datos antes de registrar un cliente.
 * @param {Object} data - Entradas: Datos del formulario de registro.
 * @returns {boolean} - Salida: Verdadero si es válido.
 * 
 * Documentación:
 * ../03-Diseno/Entradas_Procesos_Salidas.md#fl-001
 */
function validarRegistroCliente(data) { ... }
```

### C. Eventos
```javascript
/**
 * Evento: Guardar Cliente
 * Flujo: FL-001
 * Pantalla: UI-004
 */
boton.addEventListener('click', () => { ... });
```

### D. Procesos (Varios Pasos)
```javascript
/**
 * PROCESO: Registrar Cliente
 * Flujo: FL-001
 * Pasos:
 * 1 Validar datos
 * 2 Verificar duplicados (Supabase)
 * 3 Guardar (Supabase)
 * 4 Actualizar DOM
 */
```

### E. HTML y Componentes UI
No comentes cada `div`. Comenta secciones funcionales completas:

```html
<!--
Pantalla: UI-004
Implementa: RF-10
Documentación: ../02-Requisitos/Funcionales.md#rf-10
-->
<section id="registro-cliente">...</section>
```

### F. CSS / Estilos
```css
/*
UI-004 - Botón Principal
Design System: ../Plantillas/Design-System.md
Colores: ../Plantillas/Colores.md
*/
.btn-principal { ... }
```

---

## 5. Rutas Relativas Exclusivamente
Toda referencia a la documentación dentro del código **debe utilizar rutas relativas**. Ejemplo:
`../02-Requisitos/Funcionales.md#rf-04`
*NUNCA utilices rutas absolutas.*

---

## 6. Prohibiciones Absolutas
Se rechazará cualquier Pull Request que contenga:
- Comentarios redundantes de sintaxis (`// inicia variable`, `// if true`).
- Código funcional nuevo sin su bloque de trazabilidad hacia `RF-xxx` o `FL-xxx`.
- Ruptura de la trazabilidad (modificar comportamiento sin actualizar documentación o los enlaces del código).
- Uso de herramientas o frameworks externos para el renderizado (Todo debe ser Vanilla Web).

---

## Navegación

← [Índice de Desarrollo](README.md)
↑ [Índice de la Carpeta](README.md)
→ [Flujo Git](Flujo_Git.md)

[MASTER](../MASTER.md)
