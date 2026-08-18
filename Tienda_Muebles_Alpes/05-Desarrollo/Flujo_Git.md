# Flujo Git y Control de Versiones

Metodología de trabajo para la creación de ramas, mensajes de commit y gestión de Pull Requests (PRs).

---

## Objetivo

Mantener el historial de Git limpio y organizado, y asegurar que el código nuevo pase por un proceso de revisión estándar.

---

## Contenido

### 1. Ramas (Branches)

- `main`: Rama de producción. Siempre estable. Su actualización dispara un nuevo despliegue manual o automático en Vercel.
- `develop`: Rama de integración. Aquí se unen las nuevas funcionalidades.
- `feature/<nombre>`: Ramas para nuevas características (ej: `feature/carrito-compras`).
- `bugfix/<nombre>`: Ramas para corrección de errores (ej: `bugfix/cálculo-total`).

### 2. Mensajes de Commit

Utilizamos el estándar *Conventional Commits*:
- `feat: agrega catálogo de muebles`
- `fix: corrige error de validación en registro de clientes`
- `docs: actualiza README de instalación`

### 3. Pull Requests (PR)

- Todo código debe integrarse mediante un PR hacia `develop`.
- Un PR requiere la revisión funcional manual (al no haber pruebas automatizadas en CI).
- No hacer PRs gigantes (máximo ~400 líneas de código cambiado).

---

## Relación con otros documentos

El flujo asegura que el código cumpla con las [Convenciones de Código](Convenciones_Codigo.md) y las [Estrategias de Pruebas](../06-Calidad/Estrategia_Pruebas.md).

- [Convenciones de Código](Convenciones_Codigo.md)

---

## Navegación

← [Convenciones de Código](Convenciones_Codigo.md)
↑ [Índice de la Carpeta](README.md)
→ [Índice de Pruebas](../06-Calidad/README.md)

[MASTER](../MASTER.md)
