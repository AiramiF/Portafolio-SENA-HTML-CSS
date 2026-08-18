import { getSession, logout, supabase } from '../supabaseClient.js';

let currentUser = null;
let cart = [];
let totalApagar = 0;

async function init() {
    const session = await getSession();
    if (!session) {
        window.location.href = '../login.html';
        return;
    }

    currentUser = session.user;
    
    // Actualizar nav
    const emailDisplay = document.getElementById('user-email-display');
    if (emailDisplay) emailDisplay.textContent = currentUser.email;
    
    const dropUser = document.getElementById('dropdown-user');
    if (dropUser) dropUser.style.display = 'inline-block';

    const btnLogout = document.getElementById('btn-logout');
    if (btnLogout) {
        btnLogout.addEventListener('click', (e) => {
            e.preventDefault();
            logout();
        });
    }

    cart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (cart.length === 0) {
        window.location.href = 'carrito.html';
        return;
    }

    await loadClienteInfo();
    renderSummary();

    document.getElementById('btn-confirmar').addEventListener('click', procesarCompra);
}

async function loadClienteInfo() {
    const { data, error } = await supabase
        .from('clientes')
        .select('*')
        .eq('id_cliente', currentUser.id)
        .single();
    
    const divInfo = document.getElementById('envio-info');
    if (error || !data) {
        divInfo.innerHTML = `<span style="color:red;">Error cargando datos del cliente. Por favor contacte soporte.</span>`;
        document.getElementById('btn-confirmar').disabled = true;
        return;
    }

    divInfo.innerHTML = `
        <strong>${data.nombres}</strong><br>
        ${data.direccion}<br>
        ${data.ciudad}, ${data.departamento} - ${data.pais}<br>
        Tel: ${data.telefono_fijo} ${data.telefono_movil ? ' / ' + data.telefono_movil : ''}
    `;
}

function renderSummary() {
    const container = document.getElementById('checkout-items');
    let subtotal = 0;

    container.innerHTML = cart.map(item => {
        const itemTotal = item.cantidad * item.precio;
        subtotal += itemTotal;
        return `
            <div class="summary-item">
                <span>${item.cantidad}x ${item.nombre}</span>
                <span>$${itemTotal.toLocaleString()}</span>
            </div>
        `;
    }).join('');

    totalApagar = subtotal;
    document.getElementById('checkout-subtotal').textContent = `$${subtotal.toLocaleString()}`;
    document.getElementById('checkout-total').textContent = `$${subtotal.toLocaleString()}`;
}

async function procesarCompra() {
    const btn = document.getElementById('btn-confirmar');
    const msgBox = document.getElementById('msg-box');
    
    btn.disabled = true;
    btn.textContent = 'Procesando Transacción...';
    
    const metodoPago = document.querySelector('input[name="metodo_pago"]:checked').value;
    const descripcion = document.getElementById('descripcion').value || '';

    // Generar un número de orden (simulado corto)
    const numOrden = 'ORD-' + Date.now().toString().slice(-6) + Math.floor(Math.random() * 1000);
    const cantidadTotal = cart.reduce((acc, item) => acc + item.cantidad, 0);

    // 1. Insertar en COMPRAS
    const { data: compraData, error: compraError } = await supabase
        .from('compras')
        .insert([{
            cantidad: cantidadTotal,
            num_orden: numOrden,
            valor_total: totalApagar,
            metodo_pago: metodoPago,
            descripcion: descripcion,
            clientes_id_cliente: currentUser.id
        }])
        .select()
        .single();

    if (compraError) {
        showError(`Error al crear la orden: ${compraError.message}`);
        btn.disabled = false;
        btn.textContent = 'Confirmar Pago';
        return;
    }

    const idCompra = compraData.id_compras;

    // 2. Preparar DET_COMPRAS
    // [RF-13] Disminuir stock y validar.
    // Ojo: En Postgres creamos un trigger que descuenta el stock automáticamente 
    // y lanza error si no hay stock suficiente, haciendo que la inserción falle.
    const detalles = cart.map(item => ({
        cantidad: item.cantidad,
        valor_historico: item.precio,
        compras_id_compras: idCompra,
        productos_id_productos: item.id_productos
    }));

    // Insertar DET_COMPRAS (el Trigger en la BD se encargará de restar el stock en productos)
    const { error: detError } = await supabase
        .from('det_compras')
        .insert(detalles);

    if (detError) {
        // Falló (posiblemente por falta de stock según el Trigger o error relacional)
        // Como no tenemos transacciones ACID explícitas desde el cliente JS sin RPC,
        // deberíamos idealmente borrar la compra principal si falla el detalle para mantener limpieza.
        await supabase.from('compras').delete().eq('id_compras', idCompra);

        showError(`La compra falló: ${detError.message} (Podría deberse a falta de stock de algún producto).`);
        btn.disabled = false;
        btn.textContent = 'Confirmar Pago';
        return;
    }

    // 3. Éxito
    // [RF-14] Mostrar resumen y confirmación simulada
    localStorage.removeItem('cart');
    
    document.getElementById('orden-numero').textContent = numOrden;
    document.getElementById('modal-success').style.display = 'flex';
}

function showError(msg) {
    const box = document.getElementById('msg-box');
    box.style.display = 'block';
    box.textContent = msg;
    box.style.backgroundColor = '#FEE2E2';
    box.style.color = '#991B1B';
}

document.addEventListener('DOMContentLoaded', init);
