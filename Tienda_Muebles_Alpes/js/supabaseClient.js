import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
import { SUPABASE_URL, SUPABASE_KEY } from './config.js';

// Inicialización del cliente de Supabase
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Función de utilidad para comprobar el estado de autenticación actual
export async function getSession() {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
        console.error("Error obteniendo sesión:", error);
        return null;
    }
    return data.session;
}

// Función para cerrar sesión globalmente
export async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) console.error("Error al cerrar sesión:", error);
    window.location.href = '/index.html';
}
