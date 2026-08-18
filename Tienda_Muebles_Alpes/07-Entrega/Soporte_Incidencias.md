# Soporte e Incidencias: Muebles los Alpes

Protocolo para gestionar errores en producción o atención de bugs reportados por los usuarios en el portal web.

---

## Objetivo

Actuar rápido y de forma organizada cuando hay problemas en el e-commerce en vivo.

---

## Contenido

### 1. Clasificación de Incidencias

- **Crítica (P1):** El portal está caído, los usuarios no pueden pagar, o hay pérdida de datos en Supabase. Resolución inmediata.
- **Alta (P2):** Una funcionalidad core no funciona pero hay workaround (ej. filtros de catálogo rotos).
- **Media (P3):** Bug menor visual en CSS o funcionalidad secundaria. Va al próximo sprint.

### 2. Flujo de Resolución de un Bug (P1 / P2)

1. **Detectar/Reportar:** Se recibe alerta o reporte.
2. **Triaje:** Un desarrollador confirma la severidad.
3. **Hotfix:** Se crea rama `bugfix/...` desde `main` (ver [Flujo Git](../05-Desarrollo/Flujo_Git.md)).
4. **Prueba local:** Se verifica la solución localmente apuntando a la base de datos correcta.
5. **Despliegue urgente:** Se hace merge a `main` y se realiza un despliegue manual inmediato a Vercel según [Despliegue Manual](Despliegue_Manual.md).

### 3. Monitoreo Básico

Dado que no hay backend intermedio, la monitorización principal se realizará desde el panel de Supabase (Logs de BD/Auth) y el panel de Analytics/Logs de Vercel.

---

## Relación con otros documentos

La resolución de incidencias debe seguir el [Flujo Git](../05-Desarrollo/Flujo_Git.md) y tener cuidado con no romper la [Arquitectura](../03-Diseno/README.md).

- [Flujo Git](../05-Desarrollo/Flujo_Git.md)

---

## Navegación

← [Despliegue Manual](Despliegue_Manual.md)
↑ [Índice de la Carpeta](README.md)
→ [Índice de Plantillas](../Plantillas/README.md)

[MASTER](../MASTER.md)
