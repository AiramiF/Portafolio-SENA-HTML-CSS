# Estrategia de Pruebas: Muebles los Alpes

Enfoque general sobre cómo el equipo abordará el control de calidad (QA) del portal web estático, respetando las restricciones del proyecto.

---

## Objetivo

Definir un modelo de pruebas ágil enfocado en la validación manual funcional del e-commerce.

---

## Contenido

### 1. Enfoque de Pruebas

Dado que el proyecto utiliza Vanilla HTML/CSS/JS y prohíbe frameworks de UI pesados o CI/CD automatizado, la estrategia de pruebas descartará el Unit Testing clásico con Jest y se centrará en:
- **Pruebas Manuales Funcionales (E2E Manual):** Validar en el navegador (Chrome/Firefox/Edge) todos los flujos de usuario (compra, administración, seguridad).
- **Pruebas de Integración Manuales:** Verificar que las transacciones y lecturas hacia la API de Supabase se reflejen correctamente en el Dashboard del Administrador.
- **Validación de Integridad de Reportes:** Se cruzará la información mostrada en los reportes (ventas diarias, productos más vendidos) directamente contra los registros en crudo de Supabase para confirmar la exactitud de los filtros.

### 2. Criterios de Aceptación

- No deben existir errores en la consola del navegador durante el flujo crítico (ej. "Comprar", "Generar Reporte").
- Todo nuevo requisito funcional debe tener asociado un [Caso de Prueba](Casos_Prueba.md) validado manualmente en local antes del Push a `main`.

### 3. Entornos de Prueba

- **Local:** Cada desarrollador prueba en su máquina (`http-server` / `Live Server`).
- **Producción (Vercel):** Al desplegar manualmente, se debe realizar una "Prueba de Humo" (Smoke Test) sobre la URL pública.

---

## Relación con otros documentos

La estrategia se implementa verificando los [Requisitos](../02-Requisitos/README.md) mediante los [Casos de Prueba](Casos_Prueba.md).

- [Casos de Prueba](Casos_Prueba.md)

---

## Navegación

← [Índice de Pruebas](README.md)
↑ [Índice de la Carpeta](README.md)
→ [Casos de Prueba](Casos_Prueba.md)

[MASTER](../MASTER.md)
