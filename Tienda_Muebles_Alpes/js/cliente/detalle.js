import { getSession, logout, supabase } from '../supabaseClient.js';

let productoActual = null;

async function init() {
    // Configurar Auth
    const session = await getSession();
    if (session) {
        document.getElementById('btn-login').style.display = 'none';
        document.getElementById('user-email-display').textContent = session.user.email;
        document.getElementById('dropdown-user').style.display = 'inline-block';
        
        // Admin menu links
        if(session.user.app_metadata?.role === 'admin') {
            document.getElementById('admin-menu-items').innerHTML = `
                <a href="../admin/dashboard.html" style="color: var(--color-secondary); font-weight: bold; border-top: 1px solid #eee;">Panel Admin</a>
                <a href="../admin/muebles.html">Gestión Muebles</a>
            `;
        }

        document.getElementById('btn-logout').addEventListener('click', (e) => {
            e.preventDefault();
            logout();
        });
    }

    // Actualizar conteo del carrito
    updateCartCount();

    // Obtener ID de la URL
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    if (!id) {
        document.getElementById('loading-msg').style.display = 'none';
        document.getElementById('error-msg').style.display = 'block';
        return;
    }

    await loadProducto(id);
    setupEvents();
}

async function loadProducto(id) {
    const loading = document.getElementById('loading-msg');
    const container = document.getElementById('detalle-container');
    const errorMsg = document.getElementById('error-msg');
    
    // Consultar Supabase
    const { data, error } = await supabase
        .from('productos')
        .select('*')
        .eq('id_productos', id)
        .single();

    loading.style.display = 'none';

    if (error || !data) {
        errorMsg.style.display = 'block';
        return;
    }

    productoActual = data;
    container.style.display = 'block';

    // Poblar DOM
    document.getElementById('prod-categoria').textContent = data.tipo;
    // Cambiar color de etiqueta basado en tipo
    if(data.tipo === 'Exterior') {
        document.getElementById('prod-categoria').style.backgroundColor = 'var(--color-secondary)';
    }

    document.getElementById('prod-nombre').textContent = data.nombre;
    document.getElementById('prod-ref').textContent = data.referencia;
    document.getElementById('prod-precio').textContent = '$ ' + data.precio_venta.toLocaleString();
    document.getElementById('prod-desc').textContent = data.descripcion || 'Sin descripción detallada.';
    
    document.getElementById('prod-material').textContent = data.material || 'N/A';
    document.getElementById('prod-color').textContent = data.color || 'N/A';
    document.getElementById('prod-dims').textContent = `${data.alto_cm || 0} x ${data.ancho_cm || 0} x ${data.profundidad || 0}`;
    
    const stockEl = document.getElementById('prod-stock');
    if (data.stock > 0) {
        stockEl.textContent = `${data.stock} unidades disponibles`;
    } else {
        stockEl.textContent = 'Agotado';
        stockEl.style.color = 'var(--color-error)';
        document.getElementById('btn-add-cart').disabled = true;
        document.getElementById('btn-add-cart').style.backgroundColor = '#ccc';
        document.getElementById('btn-add-cart').textContent = 'Agotado';
    }

    // Imagen
    const imgContainer = document.getElementById('prod-image-container');
    if (data.foto_url) {
        imgContainer.innerHTML = `<img src="${data.foto_url}" alt="${data.nombre}">`;
    } else {
        imgContainer.innerHTML = `<div style="display:flex; height:100%; align-items:center; justify-content:center; color:#9ca3af;">Sin imagen disponible</div>`;
    }

    // Cargar recomendaciones
    await loadRecomendados(data.tipo, data.id_productos);
}

async function loadRecomendados(tipo, currentId) {
    const { data, error } = await supabase
        .from('productos')
        .select('*')
        .eq('tipo', tipo)
        .neq('id_productos', currentId)
        .limit(4);

    if (error || !data || data.length === 0) {
        document.querySelector('.recommended-section').style.display = 'none';
        return;
    }

    const grid = document.getElementById('recommended-grid');
    grid.innerHTML = data.map(p => `
        <div class="card">
            <div class="card-img-wrapper">
                ${p.foto_url ? `<img src="${p.foto_url}" alt="${p.nombre}">` : '<div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:#f3f4f6; color:#9ca3af;">Sin imagen</div>'}
            </div>
            <div class="card-content">
                <p class="cat">${p.tipo}</p>
                <h3>${p.nombre}</h3>
                <p class="price">$ ${p.precio_venta.toLocaleString()}</p>
                <div class="card-actions">
                    <a href="detalle.html?id=${p.id_productos}" class="btn btn-secondary" style="width: 100%;">Ver Detalle</a>
                </div>
            </div>
        </div>
    `).join('');
}

function setupEvents() {
    const inputQty = document.getElementById('input-qty');
    const btnMinus = document.getElementById('btn-minus');
    const btnPlus = document.getElementById('btn-plus');
    const btnAddCart = document.getElementById('btn-add-cart');

    btnMinus.addEventListener('click', () => {
        let val = parseInt(inputQty.value);
        if (val > 1) inputQty.value = val - 1;
    });

    btnPlus.addEventListener('click', () => {
        if (!productoActual) return;
        let val = parseInt(inputQty.value);
        if (val < productoActual.stock) {
            inputQty.value = val + 1;
        } else {
            showToast(`Solo hay ${productoActual.stock} unidades disponibles.`, 'error');
        }
    });

    btnAddCart.addEventListener('click', () => {
        if (!productoActual) return;
        const qty = parseInt(inputQty.value);
        addToCart(productoActual.id_productos, qty);
    });
}

function addToCart(id, qty) {
    if (!productoActual) return;

    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    const index = cart.findIndex(item => item.id_productos === id);
    if (index > -1) {
        if (cart[index].cantidad + qty <= productoActual.stock) {
            cart[index].cantidad += qty;
        } else {
            showToast("No hay suficiente stock para agregar esa cantidad.", 'error');
            return;
        }
    } else {
        if (qty > productoActual.stock) {
            showToast("No hay suficiente stock.", 'error');
            return;
        }
        cart.push({
            id_productos: productoActual.id_productos,
            nombre: productoActual.nombre,
            precio: productoActual.precio_venta,
            foto_url: productoActual.foto_url,
            cantidad: qty,
            max_stock: productoActual.stock
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // Feedback visual
    const btn = document.getElementById('btn-add-cart');
    btn.disabled = true;
    btn.textContent = '¡Agregado al Carrito!';
    btn.style.backgroundColor = 'var(--color-success)';
    
    setTimeout(() => {
        btn.disabled = false;
        btn.textContent = 'Agregar al Carrito';
        btn.style.backgroundColor = '';
    }, 2000);
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const total = cart.reduce((sum, item) => sum + item.cantidad, 0);
    document.getElementById('cart-count').textContent = total;
}

document.addEventListener('DOMContentLoaded', init);

// Utilidad: mostrar toast
window.showToast = function(message, type = 'success') {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = `toast ${type === 'error' ? 'toast-error' : type === 'warning' ? 'toast-warning' : ''}`;
    toast.innerHTML = `<span class="toast-message">${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3200);
}
