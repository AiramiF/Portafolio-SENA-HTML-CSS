# Componentes Atómicos

Este documento detalla los elementos más pequeños e indivisibles de la interfaz de usuario, los cuales se combinan para formar componentes más complejos.

## 1. Botones

### Esquema Visual
```text
[ (Icono opcional) Texto del Botón ]
```

### Listado de Subelementos
| Código | Nombre | Propósito |
|---|---|---|
| `BTN-001` | Botón Primario | Acción principal de un formulario o vista (ej. "Guardar"). |
| `BTN-002` | Botón Secundario | Acción alternativa (ej. "Cancelar"). |
| `BTN-003` | Botón de Icono | Acción representada únicamente por un icono (ej. "Eliminar" con icono de papelera). |

## 2. Entradas de Texto (Inputs)

### Esquema Visual
```text
Label del Input
+----------------------------------+
| Placeholder / Texto ingresado    |
+----------------------------------+
Mensaje de error (opcional)
```

### Listado de Subelementos
| Código | Nombre | Propósito |
|---|---|---|
| `INP-001` | Input de Texto Base | Ingreso de texto corto (nombres, títulos). |
| `INP-002` | Área de Texto (Textarea) | Ingreso de textos largos (descripciones). |
| `INP-003` | Select (Desplegable) | Selección de una opción entre varias predefinidas. |

## 3. Elementos de Feedback y Errores

### Esquema Visual
```text
[ MODAL ]               [ TOAST ]
+---------------+       +------------------+
| Título        |       | (i) Mensaje      |
| Mensaje...    |       +------------------+
| [Aceptar]     |
+---------------+

[ MENSAJE INLINE ]
(Input Field)
* Error en texto rojo debajo
```

### Listado de Subelementos
| Código | Nombre | Propósito |
|---|---|---|
| `MOD-001` | Modal de Alerta | Mostrar errores críticos o bloqueantes (Ej. Sin stock, confirmación de borrado). Requiere interacción del usuario para cerrarse. |
| `TST-001` | Toast de Notificación | Mensajes efímeros en una esquina de la pantalla (Ej. Éxito al guardar, advertencias menores). Desaparece solo. |
| `MSG-001` | Mensaje Inline | Texto rojo pequeño debajo de un input para mostrar errores de validación (Ej. Correo duplicado). |

---

## Relación con otros documentos
- Estos componentes son utilizados en los [Componentes Generales](Componentes_Generales.md).

---

## Navegación
← [Componentes Generales](Componentes_Generales.md)
↑ [Índice de Diseño UI/UX](README.md)
→ [Inicio de Sesión](Vistas/Autenticacion/Login.md)
