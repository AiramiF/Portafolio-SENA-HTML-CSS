# Despliegue Manual: Muebles los Alpes

Guía paso a paso sobre cómo subir la aplicación a producción.

---

## Objetivo

Definir los pasos manuales para llevar la última versión del código a los usuarios finales, ya que no se utiliza integración ni despliegue continuo automatizado.

---

## Contenido

### 1. Pre-requisitos
- Contar con la última versión de la rama `main` probada localmente.
- Asegurarse de que los [Casos de Prueba](../06-Calidad/Casos_Prueba.md) esenciales han pasado exitosamente.
- Acceso a la cuenta de Vercel del proyecto.
- CLI de Vercel instalada (opcional, `npm i -g vercel`).

### 2. Pasos de Despliegue (Usando Vercel)
1. Iniciar sesión en [Vercel](https://vercel.com/).
2. Seleccionar el proyecto `muebles-los-alpes`.
3. Ir a la pestaña **Deployments**.
4. Dado que Vercel se integra con GitHub, al hacer push o merge a la rama `main`, Vercel intentará generar un build automático. Si la subida es manual mediante CLI:
   - Navegar al directorio raíz del proyecto.
   - Ejecutar `vercel --prod`.
   - Confirmar los datos solicitados en la terminal.
5. Esperar a que el estado del despliegue marque "Ready".
6. Visitar la URL de producción proporcionada para verificar visualmente que los cambios están en vivo.

### 3. Post-despliegue
- Realizar pruebas de humo (Smoke Tests) en producción: Login, visualizar catálogo, carrito de compras.
- Notificar al equipo sobre el éxito de la liberación.

---

## Relación con otros documentos

Este documento detalla el paso final que se apoya en la infraestructura y puede derivar en soporte.

- [Infraestructura](Infraestructura.md)
- [Soporte e Incidencias](Soporte_Incidencias.md)

---

## Navegación

← [Infraestructura](Infraestructura.md)
↑ [Índice de la Carpeta](README.md)
→ [Soporte e Incidencias](Soporte_Incidencias.md)

[MASTER](../MASTER.md)
