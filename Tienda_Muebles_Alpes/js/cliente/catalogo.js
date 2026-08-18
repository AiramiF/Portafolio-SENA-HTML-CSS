import { getSession, logout, supabase } from '../supabaseClient.js';

let allProductos = [];

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

    // Eventos de filtros estáticos
    document.getElementById('filter-stock')?.addEventListener('change', filterProducts);
    document.getElementById('btn-apply-price')?.addEventListener('click', filterProducts);
    document.getElementById('price-min')?.addEventListener('keyup', (e) => { if(e.key === 'Enter') filterProducts(); });
    document.getElementById('price-max')?.addEventListener('keyup', (e) => { if(e.key === 'Enter') filterProducts(); });

    // Eventos sugerencias de precios
    document.querySelectorAll('.btn-price-suggestion').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.getElementById('price-min').value = e.target.dataset.min || '';
            document.getElementById('price-max').value = e.target.dataset.max || '';
            filterProducts();
        });
    });

    // Cargar productos
    await loadProductos();
    
    // Poblar filtros dinámicos
    populateDynamicFilters();

    // Leer URL Params e inicializar filtros
    const params = new URLSearchParams(window.location.search);
    const tipoParam = params.get('tipo');
    const q = params.get('q');
    
    if (tipoParam) {
        const catCheckbox = document.querySelector(`input[name="cat"][value="${tipoParam}"]`);
        if(catCheckbox) catCheckbox.checked = true;
    }
    
    const searchInput = document.getElementById('search-mueble');
    if (searchInput) {
        if (q) searchInput.value = q;
        searchInput.addEventListener('input', filterProducts);
    }
    
    // Aplicar filtros iniciales
    filterProducts();
}

async function loadProductos() {
    const grid = document.getElementById('catalogo-grid');
    const loading = document.getElementById('loading-msg');
    
    // Obtener TODO el inventario (incluyendo agotados para los nuevos filtros)
    const { data, error } = await supabase
        .from('productos')
        .select('*')
        .order('id_productos', { ascending: false });

    loading.style.display = 'none';

    if (error) {
        grid.innerHTML = `<p style="color:red; text-align:center; grid-column:1/-1;">Error cargando productos.</p>`;
        return;
    }

    allProductos = data;
}

function populateDynamicFilters() {
    // Extraer valores únicos
    const tipos = [...new Set(allProductos.map(p => p.tipo).filter(Boolean))];
    const categorias = [...new Set(allProductos.map(p => p.categoria).filter(Boolean))];
    const materiales = [...new Set(allProductos.map(p => p.material).filter(Boolean))];

    // Contenedores
    const catContainer = document.getElementById('filter-categories-container');
    const categoriaContainer = document.getElementById('filter-categoria-container');
    const matContainer = document.getElementById('filter-materials-container');

    // Poblar Categorías
    if (catContainer) {
        catContainer.innerHTML = tipos.map(t => `
            <label class="filter-option">
                <input type="checkbox" name="cat" value="${t}"> ${t}
            </label>
        `).join('');
    }

    // Poblar Categorías de Mueble (Silla, Mesa...)
    if (categoriaContainer) {
        categoriaContainer.innerHTML = categorias.map(c => `
            <label class="filter-option">
                <input type="checkbox" name="categoria" value="${c}"> ${c}
            </label>
        `).join('');
    }

    // Poblar Materiales
    if (matContainer) {
        matContainer.innerHTML = materiales.map(m => `
            <label class="filter-option">
                <input type="checkbox" name="mat" value="${m}"> ${m}
            </label>
        `).join('');
    }

    // Añadir eventos a los checkboxes creados
    document.querySelectorAll('input[name="cat"]').forEach(cb => cb.addEventListener('change', filterProducts));
    document.querySelectorAll('input[name="categoria"]').forEach(cb => cb.addEventListener('change', filterProducts));
    document.querySelectorAll('input[name="mat"]').forEach(cb => cb.addEventListener('change', filterProducts));
}

function renderProductos(productos) {
    const grid = document.getElementById('catalogo-grid');
    
    if (productos.length === 0) {
        grid.innerHTML = `<p style="text-align:center; grid-column:1/-1; padding: 40px; color:var(--text-secondary);">No hay productos que coincidan con los filtros seleccionados.</p>`;
        return;
    }

    // Renderizar con el nuevo diseño, badge de agotado y botón "Ver Detalles"
    grid.innerHTML = productos.map(p => {
        const outOfStock = p.stock <= 0;
        const outOfStockStyle = outOfStock ? 'opacity: 0.7; filter: grayscale(50%);' : '';
        const outOfStockBadge = outOfStock ? `<div style="position: absolute; top: 10px; right: 10px; background-color: var(--color-error); color: white; padding: 4px 10px; font-size: 0.75rem; font-weight: bold; border-radius: var(--border-radius-sm); text-transform: uppercase;">Agotado</div>` : '';

        return `
        <div class="card" style="${outOfStockStyle}">
            <div class="card-img-wrapper">
                ${p.foto_url 
                    ? `<img src="${p.foto_url}" alt="${p.nombre}">` 
                    : `<div style="width:100%; height:100%; display:flex; align-items:center; justify-content:center; color:#999; background:#eee;">Sin Imagen</div>`}
                <div class="card-badge" style="${p.tipo === 'Exterior' ? 'background:var(--color-secondary)' : ''}">${p.tipo}</div>
                ${outOfStockBadge}
            </div>
            <div class="card-content">
                <p class="cat">${p.categoria || p.material || 'Estándar'}</p>
                <h3>${p.nombre}</h3>
                <p class="price">$ ${p.precio_venta.toLocaleString()}</p>
                <div class="card-actions" style="flex-wrap: wrap;">
                    <a href="detalle.html?id=${p.id_productos}" class="btn btn-secondary" style="flex: 1 1 100%; margin-bottom: 5px;">Ver Detalles</a>
                    <button onclick="addToCartFast(${p.id_productos}, '${p.nombre.replace(/'/g, "\\'")}', ${p.precio_venta}, '${p.foto_url || ''}', ${p.stock})" class="btn btn-primary" style="flex: 1 1 100%;" ${outOfStock ? 'disabled style="background-color: #ccc;"' : ''}>Añadir al Carrito</button>
                </div>
            </div>
        </div>
        `;
    }).join('');
}

// Utilidad para quitar acentos
const normalizeString = (str) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

function filterProducts() {
    let filtrados = allProductos;

    // Filtro Búsqueda (Sin acentos)
    const searchInput = document.getElementById('search-mueble');
    const term = searchInput ? normalizeString(searchInput.value) : '';
    if (term) {
        filtrados = filtrados.filter(p => 
            normalizeString(p.nombre).includes(term) || 
            normalizeString(p.referencia).includes(term)
        );
    }

    // Filtro Disponibilidad
    const hideOutOfStock = document.getElementById('filter-stock')?.checked;
    if (hideOutOfStock) {
        filtrados = filtrados.filter(p => p.stock > 0);
    }

    // Filtro Categorías de Entorno (Checkbox Multi-Select)
    const selectedCats = Array.from(document.querySelectorAll('input[name="cat"]:checked')).map(cb => cb.value);
    if (selectedCats.length > 0) {
        filtrados = filtrados.filter(p => selectedCats.includes(p.tipo));
    }

    // Filtro Tipo de Mueble (Checkbox Multi-Select)
    const selectedCategorias = Array.from(document.querySelectorAll('input[name="categoria"]:checked')).map(cb => cb.value);
    if (selectedCategorias.length > 0) {
        filtrados = filtrados.filter(p => selectedCategorias.includes(p.categoria));
    }

    // Filtro Materiales (Checkbox Multi-Select)
    const selectedMats = Array.from(document.querySelectorAll('input[name="mat"]:checked')).map(cb => cb.value);
    if (selectedMats.length > 0) {
        filtrados = filtrados.filter(p => selectedMats.includes(p.material));
    }

    // Filtro Precio
    const minPrice = parseFloat(document.getElementById('price-min')?.value);
    const maxPrice = parseFloat(document.getElementById('price-max')?.value);

    if (!isNaN(minPrice)) {
        filtrados = filtrados.filter(p => p.precio_venta >= minPrice);
    }
    if (!isNaN(maxPrice)) {
        filtrados = filtrados.filter(p => p.precio_venta <= maxPrice);
    }

    renderProductos(filtrados);
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const total = cart.reduce((sum, item) => sum + item.cantidad, 0);
    const countEl = document.getElementById('cart-count');
    if(countEl) countEl.textContent = total;
}

// Toast Notification System
window.showToast = function(message, type = 'success') {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.right = '20px';
    toast.style.backgroundColor = type === 'success' ? 'var(--color-success)' : 'var(--color-error)';
    toast.style.color = 'white';
    toast.style.padding = '12px 24px';
    toast.style.borderRadius = 'var(--border-radius-md)';
    toast.style.boxShadow = 'var(--shadow-lg)';
    toast.style.zIndex = '9999';
    toast.style.fontWeight = 'bold';
    toast.style.transition = 'opacity 0.3s ease';
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
};

window.addToCartFast = function(id, nombre, precio, foto_url, stock) {
    if (stock <= 0) {
        showToast("Producto agotado.", "error");
        return;
    }
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const index = cart.findIndex(item => item.id_productos === id);
    
    if (index > -1) {
        if (cart[index].cantidad + 1 <= stock) {
            cart[index].cantidad += 1;
        } else {
            showToast("No hay suficiente stock para agregar otra unidad.", "error");
            return;
        }
    } else {
        cart.push({
            id_productos: id,
            nombre: nombre,
            precio: precio,
            foto_url: foto_url,
            cantidad: 1,
            max_stock: stock
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    showToast("¡Producto añadido al carrito!");
}

document.addEventListener('DOMContentLoaded', init);
