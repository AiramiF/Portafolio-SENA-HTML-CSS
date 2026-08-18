# Vista de Inicio de Sesión (Login)

Permite el ingreso al portal tanto para Clientes como para Administradores, validando sus credenciales contra Supabase Auth y redirigiéndolos a sus respectivos paneles.

## Esquema Visual
```text
+-------------------------------------------------------------+
|                                                             |
|                    Muebles Los Alpes                        |
|                                                             |
|                    +-------------------+                    |
|                    | Iniciar Sesión    |                    |
|                    +-------------------+                    |
|                                                             |
|                    Correo Electrónico                       |
|                    [ Correo (INP-001) ]                     |
|                                                             |
|                    Contraseña                               |
|                    [ Contraseña (INP-001) ]                 |
|                                                             |
|                    [ Iniciar Sesión (BTN-001) ]             |
|                                                             |
|                    ¿No tienes cuenta?                       |
|                    [ Regístrate aquí (LNK-001) ]            |
|                                                             |
+-------------------------------------------------------------+
```

## Listado de Subelementos
| Código | Nombre | Propósito |
|---|---|---|
| `INP-001` | Inputs de Login | Entrada de correo electrónico y contraseña. |
| `BTN-001` | Botón Iniciar Sesión | Autentica el usuario contra Supabase Auth. Si es admin, redirige al Dashboard de Administrador. Si es cliente, al catálogo. |
| `LNK-001` | Enlace de Registro | Redirige a la vista de creación de cuenta de cliente. |

---

## Navegación
← [Componentes Atómicos](../../Componentes_Atomicos.md)
↑ [Índice de Diseño UI/UX](../../README.md)
→ [Registro de Clientes](Registro.md)
