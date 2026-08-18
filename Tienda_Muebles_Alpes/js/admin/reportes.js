// [RF-15, RF-16, RF-17] Módulo de Reportes — HU-008: Generar reportes de ventas
import { getSession, logout, supabase } from '../supabaseClient.js';

async function init() {
    const session = await getSession();
    if (!session || session.user.app_metadata?.role !== 'admin') {
        window.location.href = '../../index.html';
        return;
    }

    document.getElementById('user-email').textContent = session.user.email;
    document.getElementById('btn-logout').addEventListener('click', logout);

    document.getElementById('btn-generar-r1').addEventListener('click', generarReporteVentas);
    document.getElementById('btn-generar-r2').addEventListener('click', generarReporteTopProducto);
    document.getElementById('btn-generar-r3').addEventListener('click', generarReporteCliente);

    // Cargar KPIs del mes
    await loadKPIs();

    // Auto-ejecutar reporte de cliente si viene el param 'doc' en la URL
    const params = new URLSearchParams(window.location.search);
    const doc = params.get('doc');
    if (doc) {
        document.getElementById('r3-doc').value = doc;
        generarReporteCliente();
        
        // Scroll hacia la sección de reporte de clientes
        setTimeout(() => {
            document.getElementById('r3-doc').scrollIntoView({ behavior: 'smooth' });
        }, 500);
    }
}

// KPIs del mes actual
async function loadKPIs() {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59).toISOString();

    const { data: comprasMes } = await supabase
        .from('compras')
        .select('valor_total')
        .gte('fecha_compra', firstDay)
        .lte('fecha_compra', lastDay);

    const ventasMes = (comprasMes || []).reduce((sum, c) => sum + (parseFloat(c.valor_total) || 0), 0);
    const ordenesMes = (comprasMes || []).length;
    const ticketPromedio = ordenesMes > 0 ? Math.round(ventasMes / ordenesMes) : 0;

    const monthName = now.toLocaleDateString('es-CO', { month: 'long', year: 'numeric' });

    document.getElementById('kpi-ventas-mes').textContent = `$${ventasMes.toLocaleString('es-CO')}`;
    document.getElementById('kpi-ordenes-mes').textContent = ordenesMes;
    document.getElementById('kpi-ticket').textContent = `$${ticketPromedio.toLocaleString('es-CO')}`;
    document.getElementById('kpi-ventas-mes-label').textContent = monthName.charAt(0).toUpperCase() + monthName.slice(1);
}

// Utilidad: Exportar datos como CSV
function exportCSV(headers, rows, filename) {
    const csvContent = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    ].join('\n');

    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
}

// Utilidad: Badge de estado
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

// RF-15
async function generarReporteVentas() {
    const inicio = document.getElementById('r1-inicio').value;
    const fin = document.getElementById('r1-fin').value;
    const ciudad = document.getElementById('r1-ciudad').value.trim().toLowerCase();
    const container = document.getElementById('r1-results');

    container.innerHTML = '<p style="color: var(--text-secondary);">⏳ Calculando...</p>';

    // Obtener todas las compras con sus clientes
    let query = supabase.from('compras').select(`
        *,
        clientes ( ciudad, departamento, nombres )
    `);

    if (inicio) query = query.gte('fecha_compra', inicio + 'T00:00:00');
    if (fin) query = query.lte('fecha_compra', fin + 'T23:59:59');

    const { data: compras, error } = await query;

    if (error) {
        container.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
        return;
    }

    let filtradas = compras;
    if (ciudad) {
        filtradas = filtradas.filter(c => c.clientes?.ciudad?.toLowerCase().includes(ciudad));
    }

    if(filtradas.length === 0){
        container.innerHTML = '<p style="color: var(--text-secondary);">No se encontraron ventas para estos filtros.</p>';
        return;
    }

    // Agrupar por fecha
    let totalAcumulado = 0;
    const csvRows = [];

    const tabla = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-sm);">
            <span style="font-size: 0.85rem; color: var(--text-secondary);">${filtradas.length} resultados encontrados</span>
            <button class="btn btn-secondary" style="padding: 4px 14px; font-size: 0.75rem; flex: none; text-transform: none;" id="btn-export-r1">📥 Exportar CSV</button>
        </div>
        <table class="admin-table">
            <thead>
                <tr>
                    <th>Fecha / Orden</th>
                    <th>Cliente</th>
                    <th>Ubicación</th>
                    <th>Estado</th>
                    <th style="text-align: right;">Valor</th>
                </tr>
            </thead>
            <tbody>
                ${filtradas.map(c => {
                    totalAcumulado += parseFloat(c.valor_total);
                    csvRows.push([
                        new Date(c.fecha_compra).toLocaleDateString(),
                        c.num_orden,
                        c.clientes?.nombres || 'N/A',
                        c.clientes?.ciudad || 'N/A',
                        c.estado || 'N/A',
                        c.valor_total
                    ]);
                    return `
                    <tr>
                        <td>${new Date(c.fecha_compra).toLocaleDateString('es-CO')} — <span style="font-weight: 500;">${c.num_orden}</span></td>
                        <td>${c.clientes?.nombres || 'N/A'}</td>
                        <td>${c.clientes?.ciudad || 'N/A'}</td>
                        <td>${getStatusBadge(c.estado)}</td>
                        <td style="text-align: right; font-weight: 600;">$${parseFloat(c.valor_total).toLocaleString('es-CO')}</td>
                    </tr>
                    `;
                }).join('')}
                <tr style="background-color: #F9FAFB;">
                    <td colspan="4" style="text-align: right; font-weight: bold; border-top: 2px solid #E5E7EB;">Total Periodo:</td>
                    <td style="text-align: right; font-weight: bold; color: var(--color-secondary); font-size: 1.1rem; border-top: 2px solid #E5E7EB;">$${totalAcumulado.toLocaleString('es-CO')}</td>
                </tr>
            </tbody>
        </table>
    `;

    container.innerHTML = tabla;

    // Exportar CSV
    document.getElementById('btn-export-r1').addEventListener('click', () => {
        exportCSV(['Fecha', 'Orden', 'Cliente', 'Ciudad', 'Estado', 'Valor'], csvRows, 'ventas_periodo.csv');
    });
}

// RF-16
async function generarReporteTopProducto() {
    const container = document.getElementById('r2-results');
    container.innerHTML = '<p style="color: var(--text-secondary);">⏳ Calculando...</p>';

    // Para esto necesitaríamos idealmente un RPC en postgres, pero lo haremos en JS sumando
    const { data: detalles, error } = await supabase.from('det_compras').select(`
        cantidad,
        productos ( referencia, nombre )
    `);

    if (error) {
        container.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
        return;
    }

    if(detalles.length === 0){
        container.innerHTML = '<p>No hay ventas registradas.</p>';
        return;
    }

    const contadores = {};
    detalles.forEach(d => {
        if(d.productos) {
            const key = d.productos.nombre;
            const ref = d.productos.referencia;
            if (!contadores[key]) contadores[key] = { cantidad: 0, referencia: ref };
            contadores[key].cantidad += d.cantidad;
        }
    });

    // Ordenar por cantidad descendente y tomar top 5
    const sorted = Object.entries(contadores)
        .sort((a, b) => b[1].cantidad - a[1].cantidad)
        .slice(0, 5);

    const topProd = sorted[0];
    const maxCant = topProd[1].cantidad;

    container.innerHTML = `
        <div style="padding: var(--spacing-lg); background: linear-gradient(135deg, #ECFDF5, #D1FAE5); border: 1px solid #10B981; border-radius: var(--border-radius-md); text-align: center; margin-bottom: var(--spacing-lg);">
            <p style="font-size: 0.8rem; color: #065F46; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">🏆 Producto más vendido</p>
            <h3 style="color: #047857; margin: var(--spacing-sm) 0; font-size: 1.3rem;">${topProd[0]}</h3>
            <p style="font-size: 0.85rem; color: #065F46;">Ref: ${topProd[1].referencia} — <strong>${maxCant} unidades</strong> vendidas</p>
        </div>

        <h4 style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: var(--spacing-sm);">Top 5 Productos</h4>
        <table class="admin-table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Producto</th>
                    <th>Referencia</th>
                    <th style="text-align: right;">Unidades Vendidas</th>
                </tr>
            </thead>
            <tbody>
                ${sorted.map(([nombre, info], i) => `
                    <tr>
                        <td><span class="badge ${i === 0 ? 'badge-success' : 'badge-neutral'}">${i + 1}</span></td>
                        <td style="font-weight: 500;">${nombre}</td>
                        <td style="color: var(--text-secondary);">${info.referencia}</td>
                        <td style="text-align: right; font-weight: 600;">${info.cantidad}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

// RF-17
async function generarReporteCliente() {
    const doc = document.getElementById('r3-doc').value.trim();
    const container = document.getElementById('r3-results');

    if(!doc) {
        container.innerHTML = '<p style="color:red;">Ingresa un documento.</p>';
        return;
    }
    container.innerHTML = '<p style="color: var(--text-secondary);">⏳ Buscando...</p>';

    // 1. Buscar cliente
    const { data: clientes, error: errorC } = await supabase.from('clientes').select('id_cliente, nombres, ciudad').eq('num_documento', doc);
    
    if (errorC || clientes.length === 0) {
        container.innerHTML = '<p>Cliente no encontrado con ese documento.</p>';
        return;
    }

    const cliente = clientes[0];

    // 2. Buscar compras
    const { data: compras, error: errorComp } = await supabase.from('compras')
        .select('*')
        .eq('clientes_id_cliente', cliente.id_cliente)
        .order('fecha_compra', { ascending: false });

    if(compras.length === 0){
        container.innerHTML = `<p>El cliente <strong>${cliente.nombres}</strong> no tiene compras registradas.</p>`;
        return;
    }

    const totalGastado = compras.reduce((sum, c) => sum + parseFloat(c.valor_total), 0);
    const csvRows = compras.map(c => [
        new Date(c.fecha_compra).toLocaleDateString(), c.num_orden, c.metodo_pago, c.estado, c.valor_total
    ]);

    const tabla = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--spacing-md); flex-wrap: wrap; gap: var(--spacing-sm);">
            <div>
                <p style="font-weight: 600; font-size: 1.05rem; margin-bottom: 2px;">${cliente.nombres}</p>
                <p style="font-size: 0.85rem; color: var(--text-secondary);">${cliente.ciudad || ''} — ${compras.length} compras — Total gastado: <strong style="color: var(--color-secondary);">$${totalGastado.toLocaleString('es-CO')}</strong></p>
            </div>
            <button class="btn btn-secondary" style="padding: 4px 14px; font-size: 0.75rem; flex: none; text-transform: none;" id="btn-export-r3">📥 Exportar CSV</button>
        </div>
        <table class="admin-table">
            <thead>
                <tr>
                    <th>Fecha</th>
                    <th>Nº Orden</th>
                    <th>Método de Pago</th>
                    <th>Estado</th>
                    <th style="text-align: right;">Valor Total</th>
                </tr>
            </thead>
            <tbody>
                ${compras.map(c => `
                    <tr>
                        <td>${new Date(c.fecha_compra).toLocaleDateString('es-CO', { year: 'numeric', month: 'short', day: 'numeric' })}</td>
                        <td style="font-weight: 500;">${c.num_orden}</td>
                        <td>${c.metodo_pago || 'N/A'}</td>
                        <td>${getStatusBadge(c.estado)}</td>
                        <td style="text-align: right; font-weight: 600;">$${parseFloat(c.valor_total).toLocaleString('es-CO')}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;

    container.innerHTML = tabla;

    document.getElementById('btn-export-r3').addEventListener('click', () => {
        exportCSV(['Fecha', 'Orden', 'Método Pago', 'Estado', 'Valor'], csvRows, `compras_${doc}.csv`);
    });
}

document.addEventListener('DOMContentLoaded', init);
