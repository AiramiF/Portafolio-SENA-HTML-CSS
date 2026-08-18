// [RF-NEW] Gestión de Pedidos — Trazabilidad de estado de pedidos desde el administrador
import { getSession, logout, supabase } from '../supabaseClient.js';

let allPedidos = [];

// Utilidad: mostrar toast
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type === 'error' ? 'toast-error' : type === 'warning' ? 'toast-warning' : ''}`;
    toast.innerHTML = `<span class="toast-message">${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3200);
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

// Utilidad: stepper de estado para modal
function renderStepper(estado) {
    const steps = ['Pendiente', 'Procesando', 'Enviado', 'Entregado'];
    const isCancelled = estado === 'Cancelado';
    const currentIdx = steps.indexOf(estado);
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
    const session = await getSession();
    if (!session || session.user.app_metadata?.role !== 'admin') {
        window.location.href = '../../index.html';
        return;
    }

    document.getElementById('user-email').textContent = session.user.email;
    document.getElementById('btn-logout').addEventListener('click', logout);

    // Filtros
    document.getElementById('filter-estado').addEventListener('change', applyFilters);
    document.getElementById('filter-desde').addEventListener('change', applyFilters);
    document.getElementById('filter-hasta').addEventListener('change', applyFilters);
    document.getElementById('filter-search').addEventListener('input', applyFilters);
    document.getElementById('btn-limpiar-filtros').addEventListener('click', clearFilters);

    // Modal
    document.getElementById('modal-close').addEventListener('click', closeModal);
    document.getElementById('btn-modal-cerrar').addEventListener('click', closeModal);
    document.getElementById('modal-detalle').addEventListener('click', (e) => {
        if (e.target === e.currentTarget) closeModal();
    });

    // Event delegation for status change and view details
    document.getElementById('tabla-pedidos').addEventListener('change', (e) => {
        if (e.target.classList.contains('status-select')) {
            changeStatus(e.target.dataset.id, e.target.value);
        }
    });
    
    document.getElementById('tabla-pedidos').addEventListener('click', (e) => {
        const btnVer = e.target.closest('.btn-ver');
        if (btnVer) {
            e.preventDefault();
            openDetail(btnVer.dataset.id);
        }
    });

    await loadPedidos();
}

async function loadPedidos() {
    const { data, error } = await supabase
        .from('compras')
        .select('*, clientes ( nombres, ciudad, departamento, num_documento )')
        .order('fecha_compra', { ascending: false });

    if (error) {
        document.getElementById('tabla-pedidos').innerHTML = `<tr><td colspan="8" style="color:red; text-align: center;">Error cargando pedidos: ${error.message}</td></tr>`;
        return;
    }

    // Custom sort: Pendiente first, then date descending
    const priority = { 'Pendiente': 1, 'Procesando': 2, 'Enviado': 3, 'Entregado': 4, 'Cancelado': 5 };
    const sortedData = (data || []).sort((a, b) => {
        const pA = priority[a.estado] || 99;
        const pB = priority[b.estado] || 99;
        if (pA !== pB) return pA - pB;
        return new Date(b.fecha_compra) - new Date(a.fecha_compra);
    });

    allPedidos = sortedData;
    updateKPIs();
    renderPedidos(allPedidos);
}

function updateKPIs() {
    const counts = { Pendiente: 0, Procesando: 0, Enviado: 0, Entregado: 0 };
    allPedidos.forEach(p => {
        if (counts[p.estado] !== undefined) counts[p.estado]++;
    });
    document.getElementById('kpi-pendientes').textContent = counts.Pendiente;
    document.getElementById('kpi-procesando').textContent = counts.Procesando;
    document.getElementById('kpi-enviados').textContent = counts.Enviado;
    document.getElementById('kpi-entregados').textContent = counts.Entregado;
}

function renderPedidos(pedidos) {
    const tbody = document.getElementById('tabla-pedidos');
    const countEl = document.getElementById('pedidos-count');

    countEl.textContent = `${pedidos.length} pedido${pedidos.length !== 1 ? 's' : ''}`;

    if (pedidos.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; padding: 30px; color: var(--text-secondary);">No se encontraron pedidos con los filtros aplicados.</td></tr>`;
        return;
    }

    const estados = ['Pendiente', 'Procesando', 'Enviado', 'Entregado', 'Cancelado'];

    tbody.innerHTML = pedidos.map(p => `
        <tr id="row-${p.id_compras}" style="transition: background-color 0.5s;">
            <td>${new Date(p.fecha_compra).toLocaleDateString('es-CO', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
            <td style="font-weight: 600;">${p.num_orden}</td>
            <td>
                <div style="font-weight: 500;">${p.clientes?.nombres || 'N/A'}</div>
                <div style="font-size: 0.75rem; color: var(--text-secondary);">${p.clientes?.num_documento || ''}</div>
            </td>
            <td>${p.clientes?.ciudad || ''}${p.clientes?.departamento ? ' - ' + p.clientes.departamento : ''}</td>
            <td style="text-align: right; font-weight: 600;">$${parseFloat(p.valor_total).toLocaleString('es-CO')}</td>
            <td>${getStatusBadge(p.estado)}</td>
            <td>
                <select class="status-select" data-id="${p.id_compras}">
                    ${estados.map(e => `<option value="${e}" ${p.estado === e ? 'selected' : ''}>${e}</option>`).join('')}
                </select>
            </td>
            <td>
                <button class="btn btn-secondary btn-ver" data-id="${p.id_compras}" style="padding: 4px 12px; font-size: 0.75rem; flex: none; text-transform: none;">
                    👁 Ver
                </button>
            </td>
        </tr>
    `).join('');
}

function applyFilters() {
    const estado = document.getElementById('filter-estado').value;
    const desde = document.getElementById('filter-desde').value;
    const hasta = document.getElementById('filter-hasta').value;
    const search = document.getElementById('filter-search').value.toLowerCase().trim();

    let filtered = allPedidos;

    if (estado) {
        filtered = filtered.filter(p => p.estado === estado);
    }
    if (desde) {
        filtered = filtered.filter(p => p.fecha_compra >= desde + 'T00:00:00');
    }
    if (hasta) {
        filtered = filtered.filter(p => p.fecha_compra <= hasta + 'T23:59:59');
    }
    if (search) {
        filtered = filtered.filter(p =>
            p.num_orden.toLowerCase().includes(search) ||
            (p.clientes?.nombres || '').toLowerCase().includes(search) ||
            (p.clientes?.num_documento || '').toLowerCase().includes(search)
        );
    }

    renderPedidos(filtered);
}

function clearFilters() {
    document.getElementById('filter-estado').value = '';
    document.getElementById('filter-desde').value = '';
    document.getElementById('filter-hasta').value = '';
    document.getElementById('filter-search').value = '';
    renderPedidos(allPedidos);
}

// Cambiar estado de un pedido
window.changeStatus = async function(id_compras, newStatus) {
    const { error } = await supabase
        .from('compras')
        .update({ estado: newStatus })
        .eq('id_compras', id_compras);

    if (error) {
        showToast(`Error al cambiar estado: ${error.message}`, 'error');
        return;
    }

    // Actualizar en memoria
    const id_num = Number(id_compras);
    const pedido = allPedidos.find(p => p.id_compras === id_num || p.id_compras == id_compras);
    if (pedido) pedido.estado = newStatus;

    // Animación de fila
    const row = document.getElementById(`row-${id_compras}`);
    if (row) {
        row.style.backgroundColor = '#ECFDF5';
        setTimeout(() => { row.style.backgroundColor = ''; }, 1500);
    }

    // Actualizar badge en la tabla
    updateKPIs();
    applyFilters(); // Re-render con filtros actuales

    showToast(`Estado actualizado a "${newStatus}"`);
}

// Ver detalle de pedido
window.openDetail = async function(id_compras) {
    const modal = document.getElementById('modal-detalle');
    const body = document.getElementById('modal-body');
    const titulo = document.getElementById('modal-titulo');

    const pedido = allPedidos.find(p => p.id_compras == id_compras);
    if (!pedido) return;

    titulo.textContent = `Pedido ${pedido.num_orden}`;
    body.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">Cargando productos...</p>';
    modal.classList.add('active');

    // Cargar productos del pedido
    const { data: detalles, error } = await supabase
        .from('det_compras')
        .select('*, productos ( nombre, referencia, foto_url )')
        .eq('compras_id_compras', id_compras);

    if (error) {
        body.innerHTML = `<p style="color: red;">Error cargando detalles: ${error.message}</p>`;
        return;
    }

    const fecha = new Date(pedido.fecha_compra).toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });

    body.innerHTML = `
        <!-- Info del pedido -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-md); margin-bottom: var(--spacing-lg);">
            <div>
                <span style="font-size: 0.75rem; color: var(--text-secondary); text-transform: uppercase;">Cliente</span>
                <p style="font-weight: 600; margin: 2px 0;">${pedido.clientes?.nombres || 'N/A'}</p>
                <p style="font-size: 0.85rem; color: var(--text-secondary);">${pedido.clientes?.ciudad || ''}${pedido.clientes?.departamento ? ' - ' + pedido.clientes.departamento : ''}</p>
            </div>
            <div style="text-align: right;">
                <span style="font-size: 0.75rem; color: var(--text-secondary); text-transform: uppercase;">Fecha</span>
                <p style="margin: 2px 0;">${fecha}</p>
                <p style="font-size: 0.85rem; color: var(--text-secondary);">Pago: ${pedido.metodo_pago || 'N/A'}</p>
            </div>
        </div>

        <!-- Stepper -->
        ${renderStepper(pedido.estado)}

        <!-- Productos -->
        <h4 style="font-size: 0.85rem; color: var(--text-secondary); margin: var(--spacing-lg) 0 var(--spacing-sm); text-transform: uppercase; border-top: 1px solid #E5E7EB; padding-top: var(--spacing-md);">Productos</h4>
        ${detalles && detalles.length > 0 ? `
            <table class="detail-products-table">
                <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Ref</th>
                        <th>Cantidad</th>
                        <th style="text-align: right;">Precio Unit.</th>
                        <th style="text-align: right;">Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    ${detalles.map(d => `
                        <tr>
                            <td style="font-weight: 500;">${d.productos?.nombre || 'Producto eliminado'}</td>
                            <td style="color: var(--text-secondary); font-size: 0.85rem;">${d.productos?.referencia || '-'}</td>
                            <td>${d.cantidad}</td>
                            <td style="text-align: right;">$${parseFloat(d.valor_historico).toLocaleString('es-CO')}</td>
                            <td style="text-align: right; font-weight: 600;">$${(d.cantidad * parseFloat(d.valor_historico)).toLocaleString('es-CO')}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        ` : '<p style="color: var(--text-secondary);">No se encontraron detalles de productos.</p>'}

        <!-- Total -->
        <div style="margin-top: var(--spacing-md); padding-top: var(--spacing-md); border-top: 2px solid #E5E7EB; text-align: right;">
            <span style="font-size: 1.1rem; font-weight: 700; color: var(--color-secondary);">Total: $${parseFloat(pedido.valor_total).toLocaleString('es-CO')}</span>
        </div>

        ${pedido.descripcion ? `
            <div style="margin-top: var(--spacing-md); padding: var(--spacing-md); background: #F9FAFB; border-radius: var(--border-radius-sm); font-size: 0.85rem;">
                <strong>Notas:</strong> ${pedido.descripcion}
            </div>
        ` : ''}
    `;
}

function closeModal() {
    document.getElementById('modal-detalle').classList.remove('active');
}

document.addEventListener('DOMContentLoaded', init);
