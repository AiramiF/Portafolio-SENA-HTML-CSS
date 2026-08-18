import { supabase } from './supabaseClient.js';

/**
 * Inicia sesión con correo y contraseña.
 * [RF-12] Autenticación para compras
 */
export async function loginUser(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });
    return { data, error };
}

/**
 * Registra un nuevo usuario en Auth y luego guarda su perfil en la tabla CLIENTES.
 * [RF-04] Registro de clientes.
 */
export async function registerUser(email, password, clientData) {
    // 1. Crear el usuario en Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password
    });

    if (authError) {
        return { data: null, error: authError };
    }

    if (!authData.user) {
        return { data: null, error: { message: "Error desconocido al crear usuario" }};
    }

    // 2. Insertar los datos adicionales en la tabla CLIENTES
    // El ID de Auth debe ser el ID_CLIENTE
    const insertData = {
        id_cliente: authData.user.id,
        tipo_documento: clientData.tipo_documento,
        num_documento: clientData.num_documento,
        tipo_persona: clientData.tipo_persona,
        nombres: clientData.nombres,
        telefono_fijo: clientData.telefono_fijo,
        telefono_movil: clientData.telefono_movil || null,
        direccion: clientData.direccion,
        ciudad: clientData.ciudad,
        departamento: clientData.departamento,
        pais: clientData.pais,
        profesion: clientData.profesion || null
    };

    const { data: dbData, error: dbError } = await supabase
        .from('clientes')
        .insert([insertData]);

    if (dbError) {
        // En caso de fallo en BD, podríamos borrar el auth user, pero requeriría privilegios de admin.
        // Lo dejamos así pero retornamos el error.
        return { data: null, error: dbError };
    }

    return { data: authData, error: null };
}
