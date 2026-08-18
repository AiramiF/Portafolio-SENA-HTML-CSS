# Vista de Registro de Clientes

Permite a los usuarios crear una cuenta de cliente en el sistema. Soporta el registro tanto de personas naturales como jurídicas (en cuyo caso se debe suministrar el NIT).

## Esquema Visual
```text
+-------------------------------------------------------------+
|                                                             |
|                     Registro de Cliente                     |
|                                                             |
|   Tipo de Persona: ( ) Natural  ( ) Jurídica                |
|                                                             |
|   Tipo Documento: [ CC/NIT ]   Nro Documento (*): [       ] |
|   Nombre Completo (*): [                                  ] |
|   Teléfono Residencia (*): [    ] Celular: [              ] |
|   Dirección (*): [                                        ] |
|   Ciudad (*): [             ] Departamento (*): [         ] |
|   País (*): [               ] Profesión: [                ] |
|   Email (*): [                                            ] |
|                                                             |
|   [ Registrarse (BTN-001) ]   [ Cancelar (BTN-002) ]        |
|                                                             |
+-------------------------------------------------------------+
```

## Listado de Subelementos
| Código | Nombre | Propósito |
|---|---|---|
| `RAD-001` | Tipo de Persona | Botones de opción para elegir entre Persona Natural o Jurídica (afecta visibilidad/validación de NIT). |
| `SEL-001` | Tipo de Documento | Selector obligatorio del tipo de identificación (CC, CE, NIT, etc.). |
| `INP-001` | Datos Personales | Inputs obligatorios y opcionales según los requisitos del cliente. |
| `BTN-001` | Botón Registrarse | Envía los datos a Supabase Auth y crea el perfil en la tabla `CLIENTES`. |
| `BTN-002` | Botón Cancelar | Regresa al inicio de sesión. |

---

## Navegación
← [Inicio de Sesión](Login.md)
↑ [Índice de Diseño UI/UX](../../README.md)
→ [Catálogo de Muebles](../Cliente/Catalogo.md)
