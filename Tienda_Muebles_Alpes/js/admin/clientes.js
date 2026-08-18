// [RF-09] Gestión de Clientes — HU-005: Administrar usuarios y roles
import { getSession, logout, supabase } from '../supabaseClient.js';

let allClientes = [];
let adminUserIds = new Set(); // Para rastrear qué usuarios tienen rol admin

// Utilidad: mostrar toast
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type === 'error' ? 'toast-error' : type === 'warning' ? 'toast-warning' : ''}`;
    toast.innerHTML = `<span class="toast-message">${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3200);
}

async function init() {
    const session = await getSession();
    if (!session || session.user.app_metadata?.role !== 'admin') {
        window.location.href = '../../index.html';
        return;
    }

    document.getElementById('user-email').textContent = session.user.email;
    document.getElementById('btn-logout').addEventListener('click', logout);
    document.getElementById('search-cliente').addEventListener('input', handleSearch);

    // Modal events
    document.getElementById('modal-close').addEventListener('click', closeModal);
    document.getElementById('btn-modal-cancel').addEventListener('click', closeModal);
    document.getElementById('btn-modal-save').addEventListener('click', saveClientEdit);
    document.getElementById('modal-editar').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) closeModal();
    });

    // Toggle admin badge preview
    document.getElementById('edit-admin-toggle').addEventListener('change', (e) => {
        const badge = document.getElementById('edit-role-badge');
        if (e.target.checked) {
            badge.innerHTML = '<span class="badge badge-success">● Administrador</span>';
        } else {
            badge.innerHTML = '<span class="badge badge-neutral">● Cliente</span>';
        }
    });

    // Event delegation for edit and delete buttons
    document.getElementById('tabla-clientes').addEventListener('click', (e) => {
        const btnEdit = e.target.closest('.btn-edit');
        if (btnEdit) {
            e.preventDefault();
            openEditModal(btnEdit.dataset.id);
        }
        
        const btnDelete = e.target.closest('.btn-delete');
        if (btnDelete) {
            e.preventDefault();
            deleteCliente(btnDelete.dataset.id);
        }
    });

    await loadClientes();
}

async function loadClientes() {
    const tbody = document.getElementById('tabla-clientes');

    // Traer clientes
    const { data, error } = await supabase.from('clientes').select('*');
    if (error) {
        tbody.innerHTML = `<tr><td colspan="7" style="color:red;">Error cargando datos</td></tr>`;
        return;
    }

    // Intentar obtener roles de admin de auth.users vía RPC o lógica
    // Como no podemos listar auth.users desde el cliente, usaremos un enfoque distinto:
    // Guardaremos en un set los IDs que sabemos son admin (consultando uno por uno si es necesario)
    // Por ahora, renderizamos sin info de rol directo — el toggle lo verificará al abrir el modal

    allClientes = data;
    renderClientes(allClientes);
}

function renderClientes(clientes) {
    const tbody = document.getElementById('tabla-clientes');
    
    if (clientes.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7">No hay clientes que coincidan con la búsqueda.</td></tr>`;
        return;
    }

    tbody.innerHTML = clientes.map(c => `
        <tr>
            <td><span style="font-weight: 500;">${c.tipo_documento} ${c.num_documento}</span></td>
            <td>${c.nombres}</td>
            <td><span class="badge badge-neutral">${c.tipo_persona || 'Natural'}</span></td>
            <td>${c.ciudad || ''}${c.departamento ? ' - ' + c.departamento : ''}</td>
            <td>${c.telefono_fijo || c.telefono_movil || '-'}</td>
            <td id="role-cell-${c.id_cliente}">
                <span class="badge badge-neutral">Cliente</span>
            </td>
            <td>
                <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                    <button class="btn btn-secondary btn-edit" data-id="${c.id_cliente}" style="padding: 4px 12px; font-size: 0.75rem; flex: none; text-transform: none;">
                        ✏️ Editar
                    </button>
                    <button class="btn btn-secondary btn-delete" data-id="${c.id_cliente}" style="padding: 4px 12px; font-size: 0.75rem; flex: none; text-transform: none; color: var(--color-error); border-color: var(--color-error);">
                        🗑 Eliminar
                    </button>
                    <a href="reportes.html?doc=${c.num_documento}" class="btn btn-secondary" style="padding: 4px 12px; font-size: 0.75rem; flex: none; text-transform: none; color: var(--color-secondary);">
                        📋 Historial
                    </a>
                </div>
            </td>
        </tr>
    `).join('');
}

function handleSearch(e) {
    const term = e.target.value.toLowerCase();
    const filtrados = allClientes.filter(c => 
        c.nombres.toLowerCase().includes(term) || 
        c.num_documento.toLowerCase().includes(term)
    );
    renderClientes(filtrados);
}

// Abrir modal de edición
window.openEditModal = async function(id_cliente) {
    try {
        const cliente = allClientes.find(c => c.id_cliente === id_cliente);
        if (!cliente) {
            console.error("Cliente no encontrado:", id_cliente);
            return;
        }

        document.getElementById('edit-id').value = id_cliente;
        document.getElementById('edit-documento').value = `${cliente.tipo_documento} ${cliente.num_documento}`;
        document.getElementById('edit-nombre').value = cliente.nombres || '';
        document.getElementById('edit-telefono').value = cliente.telefono_fijo || '';
        document.getElementById('edit-movil').value = cliente.telefono_movil || '';
        document.getElementById('edit-ciudad').value = cliente.ciudad || '';
        document.getElementById('edit-departamento').value = cliente.departamento || '';
        document.getElementById('edit-direccion').value = cliente.direccion || '';
        document.getElementById('edit-profesion').value = cliente.profesion || '';

        const toggle = document.getElementById('edit-admin-toggle');
        const badge = document.getElementById('edit-role-badge');
        
        let isAdmin = false;
        try {
            const { data: checkData } = await supabase.rpc('check_user_role', { target_user_id: id_cliente });
            isAdmin = checkData === 'admin';
        } catch (e) {
            console.error("Error al chequear rol", e);
        }
        
        toggle.checked = isAdmin;
        badge.innerHTML = isAdmin 
            ? '<span class="badge badge-success">● Administrador</span>' 
            : '<span class="badge badge-neutral">● Cliente</span>';

        toggle.dataset.originalAdmin = isAdmin ? 'true' : 'false';

        document.getElementById('modal-editar').classList.add('active');
    } catch (error) {
        console.error("Error en openEditModal:", error);
        alert("Ocurrió un error al intentar abrir el modal de edición. Revisa la consola.");
    }
}

function closeModal() {
    document.getElementById('modal-editar').classList.remove('active');
}

// Guardar edición
async function saveClientEdit() {
    const btn = document.getElementById('btn-modal-save');
    btn.disabled = true;
    btn.textContent = 'Guardando...';

    const id_cliente = document.getElementById('edit-id').value;
    const toggle = document.getElementById('edit-admin-toggle');
    const wasAdmin = toggle.dataset.originalAdmin === 'true';
    const isNowAdmin = toggle.checked;

    // 1. Actualizar datos del cliente en la tabla
    const updates = {
        nombres: document.getElementById('edit-nombre').value,
        telefono_fijo: document.getElementById('edit-telefono').value,
        telefono_movil: document.getElementById('edit-movil').value,
        ciudad: document.getElementById('edit-ciudad').value,
        departamento: document.getElementById('edit-departamento').value,
        direccion: document.getElementById('edit-direccion').value,
        profesion: document.getElementById('edit-profesion').value
    };

    const { error: updateError } = await supabase
        .from('clientes')
        .update(updates)
        .eq('id_cliente', id_cliente);

    if (updateError) {
        showToast(`Error al actualizar datos: ${updateError.message}`, 'error');
        btn.disabled = false;
        btn.textContent = 'Guardar Cambios';
        return;
    }

    // 2. Cambiar rol si cambió
    if (wasAdmin !== isNowAdmin) {
        if (isNowAdmin) {
            const { error: roleError } = await supabase.rpc('set_admin_role', { target_user_id: id_cliente });
            if (roleError) {
                showToast(`Error al asignar rol admin: ${roleError.message}`, 'error');
            } else {
                showToast('Rol de Administrador asignado correctamente.');
            }
        } else {
            const { error: roleError } = await supabase.rpc('remove_admin_role', { target_user_id: id_cliente });
            if (roleError) {
                showToast(`Error al revocar rol admin: ${roleError.message}`, 'error');
            } else {
                showToast('Rol de Administrador revocado.');
            }
        }
    }

    // Actualizar datos locales
    const idx = allClientes.findIndex(c => c.id_cliente === id_cliente);
    if (idx !== -1) {
        Object.assign(allClientes[idx], updates);
    }

    showToast('Cliente actualizado correctamente.');
    renderClientes(allClientes);
    closeModal();
    btn.disabled = false;
    btn.textContent = 'Guardar Cambios';
}

window.deleteCliente = async function(id_cliente) {
    if (confirm("¿Estás seguro de eliminar este cliente? Se eliminará de la base de datos si no tiene compras vinculadas.")) {
        const { error } = await supabase.from('clientes').delete().eq('id_cliente', id_cliente);
        if (error) {
            showToast(`No se pudo eliminar: ${error.message}`, 'error');
        } else {
            showToast('Cliente eliminado correctamente.');
            allClientes = allClientes.filter(c => c.id_cliente !== id_cliente);
            renderClientes(allClientes);
        }
    }
}

document.addEventListener('DOMContentLoaded', init);
