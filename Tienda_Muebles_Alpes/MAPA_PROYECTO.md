# 🗺️ Mapa del Proyecto y Ley de Desarrollo

Este documento es la **ley de desarrollo y mapa oficial** del proyecto "Muebles los Alpes". Su propósito es guiar tanto a **humanos como a Inteligencias Artificiales (IAs)** a lo largo de cada fase del desarrollo, asegurando la trazabilidad, coherencia y calidad del software.

---

## 🔗 1. Índice Maestro de Documentación (El Mapa)

*Úsalo como buscador central. Si necesitas saber dónde está algo, haz clic aquí.*

### Fase 1: Proyecto (Estrategia y Visión)
- [Visión General](01-Proyecto/Vision.md) - *El "Por qué" del proyecto.*
- [Alcance](01-Proyecto/Alcance.md) - *Límites y entregables.*

### Fase 2: Requisitos (El "Qué" vamos a hacer)
- [Funcionales](02-Requisitos/Funcionales.md) - *Catálogo de RFs (Requisitos Funcionales).*
- [No Funcionales](02-Requisitos/No_Funcionales.md) - *Catálogo de RNFs (Rendimiento, seguridad).*
- [Flujos de Negocio](02-Requisitos/Flujos_Negocio.md) - *Cómo interactúa el usuario con el sistema (paso a paso).*

### Fase 3: Diseño Técnico (El "Cómo" en el Backend)
- [Diseño del Sistema](03-Diseno/Diseno_Sistema.md) - *Arquitectura general.*
- [Base de Datos](03-Diseno/Base_Datos.md) - *Tablas, relaciones y diccionario de datos.*
- [API](03-Diseno/API.md) - *Endpoints y contratos de comunicación.*
- [Entradas, Procesos, Salidas](03-Diseno/Entradas_Procesos_Salidas.md) - *Lógica detallada.*

### Fase 4: Diseño UI/UX (El "Cómo" en el Frontend)
- [Identidad Visual](04-Diseno_UI_UX/Identidad_Visual.md) - *Colores, tipografía (El `root` de CSS).*
- [Componentes Átomicos](04-Diseno_UI_UX/Componentes_Atomicos.md) - *Botones, inputs.*
- [Componentes Generales](04-Diseno_UI_UX/Componentes_Generales.md) - *Navbars, footers, modales.*
- **Vistas (Pantallas completas):**
  - Autenticación: [Login](04-Diseno_UI_UX/Vistas/Autenticacion/Login.md) | [Registro](04-Diseno_UI_UX/Vistas/Autenticacion/Registro.md)
  - Cliente: [Catálogo](04-Diseno_UI_UX/Vistas/Cliente/Catalogo.md) | [Carrito](04-Diseno_UI_UX/Vistas/Cliente/Carrito.md) | [Pago](04-Diseno_UI_UX/Vistas/Cliente/Pago.md) | [Perfil](04-Diseno_UI_UX/Vistas/Cliente/Perfil.md) | [Confirmación](04-Diseno_UI_UX/Vistas/Cliente/Confirmacion.md) | [Detalle Producto](04-Diseno_UI_UX/Vistas/Cliente/Detalle_Producto.md)
  - Administrador: [Dashboard](04-Diseno_UI_UX/Vistas/Administrador/Dashboard.md) | [Gestión Clientes](04-Diseno_UI_UX/Vistas/Administrador/Gestion_Clientes.md) | [Gestión Muebles](04-Diseno_UI_UX/Vistas/Administrador/Gestion_Muebles.md) | [Registro Precios](04-Diseno_UI_UX/Vistas/Administrador/Registro_Precios.md) | [Reportes](04-Diseno_UI_UX/Vistas/Administrador/Reportes.md)
  - Errores: [403](04-Diseno_UI_UX/Vistas/Errores/403.md) | [404](04-Diseno_UI_UX/Vistas/Errores/404.md)

### Fase 5: Desarrollo (Reglas de Construcción)
- [Convenciones de Código](05-Desarrollo/Convenciones_Codigo.md) - *Reglas estrictas de nomenclatura y comentarios.*
- [Flujo de Git](05-Desarrollo/Flujo_Git.md) - *Reglas para ramas y commits.*

### Fase 6: Calidad (Validación)
- [Estrategia de Pruebas](06-Calidad/Estrategia_Pruebas.md) - *Cómo y qué probamos.*
- [Casos de Prueba](06-Calidad/Casos_Prueba.md) - *Lista de CP-XXX alineados a los RF-XXX.*

### Fase 7: Entrega (Operaciones)
- [Despliegue Manual](07-Entrega/Despliegue_Manual.md) - *Paso a paso para producción.*
- [Infraestructura](07-Entrega/Infraestructura.md) - *Hardware y servidores requeridos.*
- [Soporte e Incidencias](07-Entrega/Soporte_Incidencias.md) - *Qué hacer si algo falla.*

---

## ⚙️ 2. Guía de Ejecución (Ley para Humanos e IAs)

Cada vez que vayas a realizar una tarea de desarrollo, debes seguir este flujo estricto:

1. **Planificación:** 
   - Busca el Requisito en [Funcionales.md](02-Requisitos/Funcionales.md).
   - Revisa la vista asociada en la carpeta [Vistas](04-Diseno_UI_UX/Vistas).
   - Consulta las tablas afectadas en [Base de Datos](03-Diseno/Base_Datos.md) y los endpoints en [API](03-Diseno/API.md).
2. **Ejecución (Programación):**
   - Sigue estrictamente las [Convenciones de Código](05-Desarrollo/Convenciones_Codigo.md).
   - Inyecta el ID del requerimiento (ej. `[RF-001]`) en los comentarios del código.
3. **Validación:**
   - Asegúrate de que el código generado pasa los [Casos de Prueba](06-Calidad/Casos_Prueba.md).
   - Si creas un flujo nuevo, documenta su prueba.
4. **Cierre de Ciclo:**
   - El commit debe seguir el [Flujo de Git](05-Desarrollo/Flujo_Git.md) (ej. `feat: [RF-001] Añade login`).

---

## 🧵 3. Trazabilidad Obligatoria (Hilo Conductor)

Todo en este proyecto está atado. La trazabilidad significa que un requerimiento nunca debe "perderse" durante la construcción. 

- **Requisito (RF-XXX)** origina un...
- **Flujo de Negocio** y una **Vista**, lo cual requiere una...
- **Estructura de Base de Datos y API**, que se implementa en...
- **Código Fuente** (Con comentario `// [RF-XXX] Implementación de...`), el cual se valida en un...
- **Caso de Prueba (CP-XXX)** (Enlazado explicitamente a `RF-XXX`), que finalmente se sube mediante un...
- **Commit (`feat: [RF-XXX] ...`)**.

**Regla de Oro:** Si un bloque de código, un diseño, o una prueba no puede rastrearse de regreso a un `RF` en la carpeta `02-Requisitos`, **no debe existir**.

---

<div align="center">
  <b>Navegación</b><br>
  <a href="MASTER.md">← Volver a MASTER.md</a> | <a href="README.md">🏠 Inicio</a>
</div>
