import { getSession, logout } from '../supabaseClient.js';

let currentUser = null;

async function init() {
    // Configurar Auth
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
    }

    renderCart();

    document.getElementById('btn-checkout').addEventListener('click', () => {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        if(cart.length === 0){
            showToast("El carrito está vacío", 'warning');
            return;
        }

        // [RF-12] Validar autenticación para compra
        if(!currentUser) {
            document.getElementById('auth-warning').style.display = 'block';
            return;
        }

        window.location.href = 'checkout.html';
    });
}

function renderCart() {
    const container = document.getElementById('cart-items-container');
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Update count in sidebar
    const totalItems = cart.reduce((sum, item) => sum + item.cantidad, 0);
    document.getElementById('cart-count').textContent = totalItems;

    if (cart.length === 0) {
        container.innerHTML = '<p>Tu carrito está vacío. <a href="catalogo.html">Ir al catálogo</a></p>';
        document.getElementById('summary-subtotal').textContent = '$0';
        document.getElementById('summary-total').textContent = '$0';
        document.getElementById('btn-checkout').disabled = true;
        return;
    }

    document.getElementById('btn-checkout').disabled = false;

    let subtotal = 0;
    
    container.innerHTML = cart.map((item, index) => {
        const itemTotal = item.cantidad * item.precio;
        subtotal += itemTotal;
        return `
        <div class="cart-item">
            <div style="display: flex; align-items: center;">
                ${item.foto_url ? `<img src="${item.foto_url}" class="cart-item-img">` : `<div class="cart-item-img"></div>`}
                <div class="cart-item-info">
                    <h3 style="font-size: var(--font-size-h6); margin-bottom: 4px;">${item.nombre}</h3>
                    <p style="color: var(--color-primary); font-weight: bold;">$${item.precio.toLocaleString()}</p>
                </div>
            </div>
            <div style="display: flex; align-items: center; gap: var(--spacing-sm);">
                <button class="btn btn-secondary" onclick="updateQty(${index}, -1)" style="padding: 4px 10px;">-</button>
                <span style="font-weight: bold;">${item.cantidad}</span>
                <button class="btn btn-secondary" onclick="updateQty(${index}, 1)" style="padding: 4px 10px;">+</button>
                <button onclick="removeItem(${index})" style="background: none; border: none; color: var(--color-error); cursor: pointer; margin-left: var(--spacing-md);">Eliminar</button>
            </div>
        </div>
        `;
    }).join('');

    document.getElementById('summary-subtotal').textContent = `$${subtotal.toLocaleString()}`;
    document.getElementById('summary-total').textContent = `$${subtotal.toLocaleString()}`;
}

window.updateQty = function(index, delta) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    if(cart[index]){
        const newQty = cart[index].cantidad + delta;
        if(newQty > 0 && newQty <= cart[index].max_stock) {
            cart[index].cantidad = newQty;
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        } else if (newQty > cart[index].max_stock) {
            showToast(`Solo hay ${cart[index].max_stock} unidades disponibles de este producto.`, 'error');
        }
    }
}

window.removeItem = function(index) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
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
