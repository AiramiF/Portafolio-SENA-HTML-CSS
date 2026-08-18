// [RF-10, RF-11] Perfil del Cliente — HU-006: Ver y editar datos personales, HU-007: Ver historial de pedidos
import { getSession, logout, supabase } from '../supabaseClient.js';

let currentUser = null;

// Utilidad: mostrar toast
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast ${type === 'error' ? 'toast-error' : type === 'warning' ? 'toast-warning' : ''}`;
    toast.innerHTML = `<span class="toast-message">${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3200);
}

// Utilidad: generar iniciales
function getInitials(name) {
    if (!name) return '??';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return parts[0].substring(0, 2).toUpperCase();
}

// Utilidad: badge de estado
function getStatusBadge(estado) {
    const map = {
        'Pendiente': 'badge-warning',
        'Procesando': 'badge-info',
        'Enviado': 'badge-purple',
        'Entregado': 'badge-success',
        'Cancelado': 'badge-error'
    };
    return `<span class="badge ${map[estado] || 'badge-neutral'}">${estado || 'N/A'}</span>`;
}

// Utilidad: renderizar stepper de estado
function renderStepper(estado) {
    const steps = ['Pendiente', 'Procesando', 'Enviado', 'Entregado'];
    const isCancelled = estado === 'Cancelado';
    const currentIdx = steps.indexOf(estado);

    // Calcular ancho de la barra de progreso
    let progressPercent = 0;
    if (currentIdx > 0) progressPercent = (currentIdx / (steps.length - 1)) * 100;
    if (isCancelled) progressPercent = 0;

    const checkSvg = `<svg viewBox="0 0 24 24" fill="none" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
    const xSvg = `<svg viewBox="0 0 24 24" fill="none" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;

    if (isCancelled) {
        return `
            <div class="stepper" style="max-width: 400px; margin: var(--spacing-md) auto;">
                <div class="stepper-progress" style="width: 0%;"></div>
                <div class="stepper-step cancelled">
                    <div class="stepper-dot">${xSvg}</div>
                    <span class="stepper-label" style="color: var(--color-error);">Cancelado</span>
                </div>
            </div>
        `;
    }

    return `
        <div class="stepper" style="max-width: 500px; margin: var(--spacing-md) auto;">
            <div class="stepper-progress" style="width: ${progressPercent}%;"></div>
            ${steps.map((step, i) => {
                let cls = '';
                if (i < currentIdx) cls = 'completed';
                else if (i === currentIdx) {
                    cls = step === 'Entregado' ? 'completed' : 'active';
                }
                return `
                    <div class="stepper-step ${cls}">
                        <div class="stepper-dot">${checkSvg}</div>
                        <span class="stepper-label">${step}</span>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

async function init() {
    // 1. Configurar Auth
    const session = await getSession();
    if (session) {
        currentUser = session.user;
        document.getElementById('btn-login').style.display = 'none';
        
        const emailDisplay = document.getElementById('user-email-display');
        if (emailDisplay) emailDisplay.textContent = session.user.email;
        
        const dropUser = document.getElementById('dropdown-user');
        if (dropUser) dropUser.style.display = 'inline-block';
        
        // Admin menu links
        if(session.user.app_metadata?.role === 'admin') {
            const adminMenu = document.getElementById('admin-menu-items');
            if (adminMenu) {
                adminMenu.innerHTML = `
                    <a href="../admin/dashboard.html" style="color: var(--color-secondary); font-weight: bold; border-top: 1px solid #eee;">Panel Admin</a>
                    <a href="../admin/muebles.html">Gestión Muebles</a>
                `;
            }
        }

        const btnLogout = document.getElementById('btn-logout');
        if (btnLogout) {
            btnLogout.addEventListener('click', (e) => {
                e.preventDefault();
                logout();
            });
        }
    } else {
        // Redirigir al login si no hay sesión
        window.location.href = '../login.html';
        return;
    }

    // Actualizar conteo del carrito
    updateCartCount();

    // 2. Cargar Perfil
    await loadProfile();

    // 3. Cargar Pedidos
    await loadOrders();

    // 4. Configurar eventos y Tabs
    document.getElementById('perfil-form').addEventListener('submit', saveProfile);

    const tabPerfil = document.getElementById('tab-perfil');
    const tabPedidos = document.getElementById('tab-pedidos');
    const secPerfil = document.getElementById('seccion-perfil');
    const secPedidos = document.getElementById('seccion-pedidos');

    tabPerfil.addEventListener('click', (e) => {
        e.preventDefault();
        tabPerfil.style.backgroundColor = '#f9fafb';
        tabPerfil.style.borderLeft = '4px solid var(--color-primary)';
        tabPerfil.style.fontWeight = '500';
        
        tabPedidos.style.backgroundColor = 'transparent';
        tabPedidos.style.borderLeft = '4px solid transparent';
        tabPedidos.style.fontWeight = '400';
        
        secPerfil.style.display = 'block';
        secPedidos.style.display = 'none';
    });

    tabPedidos.addEventListener('click', (e) => {
        e.preventDefault();
        tabPedidos.style.backgroundColor = '#f9fafb';
        tabPedidos.style.borderLeft = '4px solid var(--color-primary)';
        tabPedidos.style.fontWeight = '500';
        
        tabPerfil.style.backgroundColor = 'transparent';
        tabPerfil.style.borderLeft = '4px solid transparent';
        tabPerfil.style.fontWeight = '400';
        
        secPedidos.style.display = 'block';
        secPerfil.style.display = 'none';
    });

    // Auto-switch to pedidos tab if URL param is present
    const params = new URLSearchParams(window.location.search);
    if (params.get('tab') === 'pedidos') {
        tabPedidos.click();
    }
}

async function loadProfile() {
    const loading = document.getElementById('profile-loading');
    const form = document.getElementById('perfil-form');
    
    // Obtener datos del cliente usando el ID de la sesión
    const { data, error } = await supabase
        .from('clientes')
        .select('*')
        .eq('id_cliente', currentUser.id)
        .single();

    loading.style.display = 'none';

    if (error || !data) {
        showToast('Error al cargar los datos del perfil. Verifica tu cuenta.', 'error');
        return;
    }

    // Sidebar avatar & name
    const avatarEl = document.getElementById('profile-avatar');
    const sidebarName = document.getElementById('sidebar-name');
    const sidebarEmail = document.getElementById('sidebar-email');
    
    if (avatarEl) avatarEl.textContent = getInitials(data.nombres);
    if (sidebarName) sidebarName.textContent = data.nombres || 'Mi Cuenta';
    if (sidebarEmail) sidebarEmail.textContent = currentUser.email;

    // Llenar formulario
    document.getElementById('perfil-email').value = currentUser.email || '';
    document.getElementById('perfil-tipo-doc').value = data.tipo_documento || '';
    document.getElementById('perfil-documento').value = data.num_documento || '';
    document.getElementById('perfil-nombre').value = data.nombres || '';
    document.getElementById('perfil-telefono').value = data.telefono_fijo || '';
    document.getElementById('perfil-movil').value = data.telefono_movil || '';
    document.getElementById('perfil-ciudad').value = data.ciudad || '';
    document.getElementById('perfil-departamento').value = data.departamento || '';
    document.getElementById('perfil-direccion').value = data.direccion || '';
    document.getElementById('perfil-profesion').value = data.profesion || '';
    
    form.style.display = 'block';
}

async function saveProfile(e) {
    e.preventDefault();
    const btn = document.getElementById('btn-guardar');
    
    btn.disabled = true;
    btn.textContent = 'Guardando...';

    const updates = {
        nombres: document.getElementById('perfil-nombre').value,
        telefono_fijo: document.getElementById('perfil-telefono').value,
        telefono_movil: document.getElementById('perfil-movil').value,
        ciudad: document.getElementById('perfil-ciudad').value,
        departamento: document.getElementById('perfil-departamento').value,
        direccion: document.getElementById('perfil-direccion').value,
        profesion: document.getElementById('perfil-profesion').value
    };

    const { error } = await supabase
        .from('clientes')
        .update(updates)
        .eq('id_cliente', currentUser.id);

    btn.disabled = false;
    btn.textContent = 'Guardar Cambios';

    if (error) {
        showToast('Error al actualizar el perfil.', 'error');
    } else {
        showToast('¡Perfil actualizado con éxito!');
        // Actualizar sidebar
        const avatarEl = document.getElementById('profile-avatar');
        const sidebarName = document.getElementById('sidebar-name');
        if (avatarEl) avatarEl.textContent = getInitials(updates.nombres);
        if (sidebarName) sidebarName.textContent = updates.nombres;
    }
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const total = cart.reduce((sum, item) => sum + item.cantidad, 0);
    const countEl = document.getElementById('cart-count');
    if(countEl) countEl.textContent = total;
}

async function loadOrders() {
    const loading = document.getElementById('pedidos-loading');
    const content = document.getElementById('pedidos-content');

    const { data, error } = await supabase
        .from('compras')
        .select('*')
        .eq('clientes_id_cliente', currentUser.id)
        .order('fecha_compra', { ascending: false });

    loading.style.display = 'none';
    content.style.display = 'block';

    if (error) {
        content.innerHTML = '<p style="color: var(--color-error);">Error al cargar los pedidos.</p>';
        console.error("Error cargando pedidos:", error);
        return;
    }

    if (!data || data.length === 0) {
        content.innerHTML = `
            <div style="text-align: center; padding: 40px 20px;">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ccc" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 15px;"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                <p style="color: #666; font-size: 1.1rem; margin-bottom: 20px;">Aún no has realizado ninguna compra.</p>
                <a href="catalogo.html" class="btn btn-primary">Ir al Catálogo</a>
            </div>
        `;
        return;
    }

    // Pre-cargar detalles de todos los pedidos
    const compraIds = data.map(c => c.id_compras);
    const { data: allDetalles } = await supabase
        .from('det_compras')
        .select('*, productos ( nombre, referencia, foto_url )')
        .in('compras_id_compras', compraIds);

    // Agrupar detalles por compra
    const detallesPorCompra = {};
    (allDetalles || []).forEach(d => {
        if (!detallesPorCompra[d.compras_id_compras]) detallesPorCompra[d.compras_id_compras] = [];
        detallesPorCompra[d.compras_id_compras].push(d);
    });

    let html = `<div style="display: flex; flex-direction: column; gap: var(--spacing-md);">`;

    data.forEach(compra => {
        const date = new Date(compra.fecha_compra).toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' });
        const total = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(compra.valor_total);
        const detalles = detallesPorCompra[compra.id_compras] || [];

        html += `
            <div class="admin-card" style="padding: 0; overflow: hidden; cursor: pointer;" onclick="this.querySelector('.order-detail').classList.toggle('open'); this.querySelector('.expand-icon').classList.toggle('rotated');">
                <!-- Header del Pedido -->
                <div style="display: flex; justify-content: space-between; align-items: center; padding: var(--spacing-md) var(--spacing-lg); flex-wrap: wrap; gap: var(--spacing-sm);">
                    <div style="display: flex; align-items: center; gap: var(--spacing-lg); flex-wrap: wrap;">
                        <div>
                            <span style="font-size: 0.75rem; color: var(--text-secondary); text-transform: uppercase;">Orden</span>
                            <p style="font-weight: 600; margin: 0;">${compra.num_orden}</p>
                        </div>
                        <div>
                            <span style="font-size: 0.75rem; color: var(--text-secondary); text-transform: uppercase;">Fecha</span>
                            <p style="margin: 0;">${date}</p>
                        </div>
                        <div>
                            <span style="font-size: 0.75rem; color: var(--text-secondary); text-transform: uppercase;">Total</span>
                            <p style="font-weight: 700; color: var(--color-secondary); margin: 0;">${total}</p>
                        </div>
                    </div>
                    <div style="display: flex; align-items: center; gap: var(--spacing-md);">
                        ${getStatusBadge(compra.estado)}
                        <svg class="expand-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="transition: transform 0.3s;"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </div>
                </div>

                <!-- Detalle Expandible -->
                <div class="order-detail" style="display: none; border-top: 1px solid #E5E7EB; padding: var(--spacing-lg); background: #FAFBFC;">
                    <!-- Stepper Timeline -->
                    ${renderStepper(compra.estado)}

                    <!-- Productos -->
                    ${detalles.length > 0 ? `
                        <h4 style="font-size: 0.85rem; color: var(--text-secondary); margin: var(--spacing-md) 0 var(--spacing-sm); text-transform: uppercase;">Productos en este pedido</h4>
                        <table class="detail-products-table">
                            <thead>
                                <tr>
                                    <th>Producto</th>
                                    <th>Cantidad</th>
                                    <th style="text-align: right;">Precio Unitario</th>
                                    <th style="text-align: right;">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${detalles.map(d => `
                                    <tr>
                                        <td style="font-weight: 500;">${d.productos?.nombre || 'Producto eliminado'}</td>
                                        <td>${d.cantidad}</td>
                                        <td style="text-align: right;">$${parseFloat(d.valor_historico).toLocaleString('es-CO')}</td>
                                        <td style="text-align: right; font-weight: 600;">$${(d.cantidad * parseFloat(d.valor_historico)).toLocaleString('es-CO')}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    ` : '<p style="color: var(--text-secondary); font-size: 0.9rem;">No se encontraron detalles de productos.</p>'}

                    <div style="margin-top: var(--spacing-md); padding-top: var(--spacing-sm); border-top: 1px solid #E5E7EB; text-align: right;">
                        <span style="font-size: 0.8rem; color: var(--text-secondary);">Método de pago: <strong>${compra.metodo_pago || 'N/A'}</strong></span>
                    </div>
                </div>
            </div>
        `;
    });

    html += `</div>`;
    content.innerHTML = html;

    // CSS for expand toggle and open state
    const style = document.createElement('style');
    style.textContent = `
        .expand-icon.rotated { transform: rotate(180deg); }
        .order-detail.open { display: block !important; }
    `;
    document.head.appendChild(style);
}

document.addEventListener('DOMContentLoaded', init);
