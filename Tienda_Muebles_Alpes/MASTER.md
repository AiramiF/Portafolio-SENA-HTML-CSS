# MASTER.md - El Cerebro del Proyecto

Este documento es la única fuente de verdad sobre cómo funciona, se gestiona y evoluciona la documentación de este repositorio. **Si tienes alguna duda sobre qué hacer o cómo hacerlo, este es el lugar.**

---

> 🗺️ **MAPA DEL PROYECTO Y LEY DE DESARROLLO:** Si buscas el índice completo de archivos, guías paso a paso para desarrollar en cada fase y reglas de trazabilidad, dirígete directamente a [MAPA_PROYECTO.md](MAPA_PROYECTO.md).

---
## 1. Organización de la Documentación
La documentación sigue una estructura secuencial basada en el ciclo de vida del desarrollo de software:

1. `01-Proyecto/`
2. `02-Requisitos/`
3. `03-Diseno/`
4. `04-Diseno_UI_UX/`
5. `05-Desarrollo/`
6. `06-Calidad/`
7. `07-Entrega/`
8. `Plantillas/`

## 2. Contenido de las Carpetas
- **01-Proyecto:** Visión general, alcance y objetivos fundamentales.
- **02-Requisitos:** Expectativas del sistema (funcionales y no funcionales).
- **03-Diseno:** Arquitectura, base de datos, APIs y diagramas (antes llamado Arquitectura).
- **04-Diseno_UI_UX:** Diseño UI/UX, esquema visual, componentes generales y atómicos.
- **05-Desarrollo:** Configuración de entorno, convenciones de código y Git.
- **06-Calidad:** Estrategia de QA, pruebas automatizadas y casos de prueba (antes Pruebas).
- **07-Entrega:** Infraestructura, despliegues, manuales de mantenimiento e incidencias.
- **Plantillas:** Formatos obligatorios para homogeneizar los documentos.

## 3. Cómo Navegar
Todo documento forma parte de una red interconectada.
- Nunca dependas de las rutas del sistema operativo.
- Navega utilizando el bloque de "Navegación" que se encuentra al pie de página de CADA documento:
  - `← Anterior` (Documento previo en la secuencia lógica).
  - `↑ Índice` (El `README.md` de la carpeta actual).
  - `→ Siguiente` (El siguiente paso lógico de lectura).
- Puedes volver rápidamente aquí desde cualquier índice usando el enlace a `MASTER.md`.

## 4. Cómo Crear Nuevos Documentos
1. Entra a `Plantillas/` y copia el archivo `Plantilla_Base.md`.
2. Pega el archivo en la carpeta que corresponda (nunca en la raíz).
3. Renombra el archivo usando `Pascal_Case` o `snake_case`.
4. Añade un enlace al nuevo documento dentro del `README.md` de la carpeta correspondiente.
5. Actualiza los enlaces "Anterior" y "Siguiente" de los archivos circundantes para que el nuevo documento se integre a la cadena de lectura.

## 5. Reglas de Documentación
- **Claridad sobre cantidad:** Escribe lo mínimo necesario para ser comprendido. No redundes.
- **Sin huérfanos:** Ningún archivo debe existir sin estar enlazado por otro documento.
- **Uso estricto de plantillas:** No improvises formatos. Usa las bases existentes.
- **Actualización atómica:** Si cambias código que afecta a la documentación, actualiza la documentación en el MISMO commit.
- **Trazabilidad Obligatoria (Código a Documentación):** Todo código generado debe enlazarse obligatoriamente con la documentación a través de identificadores oficiales (RF-001, HU-001, etc.) en los comentarios. Lee la política completa en [Convenciones de Código](05-Desarrollo/Convenciones_Codigo.md).

## 6. Convenciones
- Los enlaces siempre deben ser **relativos** (ej. `[Alcance](../01-Proyecto/Alcance.md)`). Nunca absolutos.
- Los títulos principales se marcan con H1 (`#`). Solo un H1 por documento.
- Se debe utilizar **Markdown puro** (sin HTML, salvo necesidad técnica extrema).

## 7. Flujo de Trabajo
- Antes de iniciar un desarrollo, consulta `02-Requisitos` y `03-Diseno`.
- Durante el desarrollo, sigue las guías de `05-Desarrollo`.
- Antes de entregar, asegúrate de cumplir con `06-Calidad`.
- Al subir a producción, consulta `07-Entrega`.

## 8. Cómo debe trabajar la IA
Las herramientas de Inteligencia Artificial (Copilot, ChatGPT, etc.) **DEBEN considerar este archivo como el contexto primario**.
- **Regla IA 1:** Nunca crees un archivo nuevo sin inyectarle el bloque de navegación requerido por la Plantilla Base.
- **Regla IA 2:** Nunca sugieras cambios arquitectónicos sin verificar primero `03-Diseno`.
- **Regla IA 3:** Prioriza enlaces relativos al sugerir actualizaciones de READMEs.
- **Regla IA 4:** Si el usuario te pide crear documentación, consulta primero `Plantillas/Plantilla_Base.md`.
- **Regla IA 5 (Trazabilidad):** Si se te pide generar código, DEBES implementar el Estándar de Comentarios del Proyecto. Es decir, inyectarás el contexto funcional (Requisitos, Flujos, Pantallas) usando identificadores oficiales y no documentarás sintaxis simple.
Las IAs de este repositorio operan bajo la directiva estricta definida en `.agents/AGENTS.md`.

## 9. Cómo debe trabajar el equipo (Junior y Senior)
- **Desarrolladores Junior:** Su punto de entrada siempre será `README.md`, el cual los enviará inmediatamente aquí. No duden; toda respuesta sobre procesos está escrita aquí. Si falta algo, pregunten a un Senior y documenten la respuesta.
- **Desarrolladores Senior:** Son responsables de que en las Code Reviews se exija actualizar la documentación. No aprueben PRs que rompan la red de enlaces.

## 10. Archivos Intocables (Qué NUNCA debe modificarse)
- **`MASTER.md`:** Solo puede ser modificado tras un consenso del equipo líder. Ningún desarrollador junior o IA debe modificar este archivo por iniciativa propia.
- **`README.md` de la Raíz:** Debe mantenerse minimalista. No agregues tutoriales aquí.

## 11. Cómo Relacionar Documentos
- Usa la sección `## Relación con otros documentos` en cada archivo.
- Si un cambio en la API (`03-Diseno`) afecta a un Caso de Prueba (`06-Calidad`), ambos documentos deben referenciarse mutuamente.
- Cuando referencies a una sección concreta de otro documento, usa anclajes (ej. `[Instalación](../05-Desarrollo/Configuracion.md#instalación)`).

## 12. Registro de Cambios y Decisiones Recientes
- **Nuevas Funcionalidades (Sprint Actual):**
  - **Filtro y Categorización:** Se añadió la columna `CATEGORIA` a la tabla `PRODUCTOS` para permitir filtrar muebles por su tipo exacto (Mesa, Silla, etc.) separando esto del atributo `TIPO` (Interior/Exterior). Esto se ve reflejado en el panel de administrador y el catálogo del cliente.
  - **Búsqueda Resiliente:** La barra de búsqueda del catálogo ignora tildes (acentos) al buscar nombres o referencias, gracias a una normalización de cadenas de texto.
  - **Historial y Perfil:** Se documentó en los flujos funcionales el acceso del cliente a su perfil propio y su historial de transacciones. Adicionalmente, el Administrador ahora puede saltar directamente desde la lista de clientes al reporte de "Historial de Compras" presionando un solo botón.
  - **Gestión de Administradores:** Se añadió un botón "Hacer Admin" en el módulo de clientes (para el rol administrador). Esto ejecuta un RPC en base de datos (`set_admin_role`) que eleva los privilegios del usuario seleccionado directamente sobre la capa de autenticación (`auth.users`).

- **Mejoras UI/UX (Cliente y Admin):**
  - **Experiencia de Compra:** Sincronización global del contador del carrito y adición de acciones de "Compra rápida" (botón de añadir al carrito directamente desde las grillas).
  - **Layout de Catálogo:** Refactorización de la grilla de productos en `catalogo.html` usando `auto-fill` y media queries para asegurar visualización estricta de 3 columnas en pantallas grandes.
  - **Panel de Administración:** Estandarización de componentes visuales con la creación de las clases globales `.admin-card` (con padding consistente) y `.admin-table` en `styles.css`. Además, se corrigió el conflicto de herencia en `.app-main` que forzaba a las vistas de admin a perder sus márgenes laterales.
