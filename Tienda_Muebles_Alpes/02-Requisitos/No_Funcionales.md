# Requisitos No Funcionales: Muebles los Alpes

Especifica los criterios técnicos, de calidad y las restricciones tecnológicas bajo las cuales debe operar el portal web de Muebles los Alpes.

---

## Objetivo

Asegurar que el sistema no solo funcione, sino que opere bajo los estándares tecnológicos definidos (Vanilla Web) y de experiencia de usuario aceptables.

---

## Contenido

### 1. Restricciones Tecnológicas

- **RNF-01 (Frontend):** Todo el desarrollo del lado del cliente debe realizarse estrictamente con HTML, CSS y JavaScript puros (Vanilla JS). Está prohibido el uso de frameworks o librerías de UI como React, Angular, Vue, Bootstrap o Tailwind CSS.
- **RNF-02 (Backend/BaaS):** Como backend y base de datos se utilizará exclusivamente Supabase.
- **RNF-03 (Despliegue):** El despliegue de la aplicación será completamente manual en Vercel, subiendo los archivos estáticos o enlazando el repositorio sin configurar pipelines de CI/CD automatizados.

### 2. Rendimiento y Usabilidad

- **RNF-04:** El portal debe presentar los productos en el catálogo y carrito de compras de manera fluida y amigable para el comprador, sin recargas innecesarias de página cuando sea posible usando JS.

### 3. Seguridad e Integración

- **RNF-05:** La pasarela de pagos no será real; se asumirá que los datos bancarios ingresados son correctos, simulando la conexión y aprobando el pago internamente.
- **RNF-06:** El acceso a Supabase desde el cliente debe estar protegido mediante las Row Level Security (RLS) policies adecuadas o asumiendo el riesgo controlado del taller.

---

## Relación con otros documentos

Los requisitos no funcionales impactan fuertemente en las decisiones de [Arquitectura](../03-Diseno/Diseno_Sistema.md) y [Despliegue](../07-Entrega/Infraestructura.md).

- [Requisitos Funcionales](Funcionales.md)

---

## Navegación

← [Requisitos Funcionales](Funcionales.md)
↑ [Índice de la Carpeta](README.md)
→ [Flujos de Negocio](Flujos_Negocio.md)

[MASTER](../MASTER.md)
