import { getSession, logout, supabase } from '../supabaseClient.js';

let isEditing = false;

async function init() {
    const session = await getSession();
    if (!session || session.user.app_metadata?.role !== 'admin') {
        window.location.href = '../../index.html';
        return;
    }

    document.getElementById('user-email').textContent = session.user.email;
    document.getElementById('btn-logout').addEventListener('click', logout);

    // Bind events
    document.getElementById('form-mueble').addEventListener('submit', handleSaveMueble);
    document.getElementById('btn-cancel').addEventListener('click', resetForm);

    loadMuebles();
}

async function loadMuebles() {
    const tbody = document.getElementById('tabla-muebles');
    
    const { data, error } = await supabase
        .from('productos')
        .select('*')
        .order('id_productos', { ascending: false });

    if (error) {
        tbody.innerHTML = `<tr><td colspan="8" style="color:red;">Error cargando datos</td></tr>`;
        return;
    }

    if (data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8">No hay muebles registrados.</td></tr>`;
        return;
    }

    tbody.innerHTML = data.map(p => `
        <tr>
            <td>
                ${p.foto_url 
                    ? `<img src="${p.foto_url}" class="img-preview" alt="Foto">` 
                    : `<div style="width:50px; height:50px; background:#ccc; border-radius:4px;"></div>`}
            </td>
            <td>${p.referencia}</td>
            <td>${p.nombre}</td>
            <td>${p.tipo}</td>
            <td>${p.categoria || '-'}</td>
            <td>$${p.precio_venta}</td>
            <td>${p.stock}</td>
            <td>
                <button onclick="editMueble(${p.id_productos})" style="cursor:pointer; color: blue; background: none; border:none;">Editar</button> |
                <button onclick="deleteMueble(${p.id_productos})" style="cursor:pointer; color: red; background: none; border:none;">Eliminar</button>
            </td>
        </tr>
    `).join('');
}

async function handleSaveMueble(e) {
    e.preventDefault();
    const btn = document.getElementById('btn-save');
    btn.disabled = true;
    const initialBtnText = btn.textContent;

    const fileInput = document.getElementById('foto_file');
    const file = fileInput.files[0];
    let fotoUrlFinal = document.getElementById('foto_url').value || null;

    if (file) {
        const uploadStatus = document.getElementById('upload-status');
        uploadStatus.style.display = 'block';
        btn.textContent = 'Subiendo imagen...';
        
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'tienda_muebles');
        
        try {
            const res = await fetch('https://api.cloudinary.com/v1_1/dhglinxve/image/upload', {
                method: 'POST',
                body: formData
            });
            const data = await res.json();
            
            if (data.secure_url) {
                fotoUrlFinal = data.secure_url;
                document.getElementById('foto_url').value = fotoUrlFinal;
            } else {
                throw new Error(data.error?.message || 'Error al subir imagen a Cloudinary');
            }
        } catch (error) {
            uploadStatus.style.display = 'none';
            btn.disabled = false;
            btn.textContent = initialBtnText;
            showMessage(`Error al subir imagen: ${error.message}`, false);
            return;
        }
        uploadStatus.style.display = 'none';
        btn.textContent = 'Guardando...';
    }

    const mueble = {
        referencia: document.getElementById('referencia').value,
        nombre: document.getElementById('nombre').value,
        descripcion: document.getElementById('descripcion').value || null,
        tipo: document.getElementById('tipo').value,
        categoria: document.getElementById('categoria').value,
        material: document.getElementById('material').value || null,
        color: document.getElementById('color').value || null,
        alto_cm: parseFloat(document.getElementById('alto_cm').value),
        ancho_cm: parseFloat(document.getElementById('ancho_cm').value),
        profundidad: parseFloat(document.getElementById('profundidad').value),
        peso: parseInt(document.getElementById('peso').value),
        precio_venta: parseFloat(document.getElementById('precio_venta').value),
        stock: parseInt(document.getElementById('stock').value),
        foto_url: fotoUrlFinal,
    };

    const id = document.getElementById('mueble-id').value;

    let errorResult = null;
    
    if (isEditing && id) {
        const { error } = await supabase.from('productos').update(mueble).eq('id_productos', id);
        errorResult = error;
    } else {
        const { error } = await supabase.from('productos').insert([mueble]);
        errorResult = error;
    }

    if (errorResult) {
        showMessage(`Error: ${errorResult.message}`, false);
    } else {
        showMessage(`Mueble ${isEditing ? 'actualizado' : 'registrado'} correctamente.`, true);
        resetForm();
        loadMuebles();
    }
    
    btn.disabled = false;
}

function showMessage(msg, isSuccess) {
    const box = document.getElementById('msg-box');
    box.style.display = 'block';
    box.textContent = msg;
    box.style.backgroundColor = isSuccess ? '#D1FAE5' : '#FEE2E2';
    box.style.color = isSuccess ? '#065F46' : '#991B1B';
    setTimeout(() => { box.style.display = 'none'; }, 3000);
}

function resetForm() {
    document.getElementById('form-mueble').reset();
    document.getElementById('mueble-id').value = '';
    document.getElementById('foto_file').value = '';
    isEditing = false;
    document.getElementById('btn-save').textContent = 'Guardar Producto';
    document.getElementById('btn-cancel').style.display = 'none';
}

// Global functions for inline HTML event handlers
window.editMueble = async function(id) {
    const { data, error } = await supabase.from('productos').select('*').eq('id_productos', id).single();
    if (data) {
        document.getElementById('mueble-id').value = data.id_productos;
        document.getElementById('referencia').value = data.referencia;
        document.getElementById('nombre').value = data.nombre;
        document.getElementById('descripcion').value = data.descripcion || '';
        document.getElementById('tipo').value = data.tipo;
        document.getElementById('categoria').value = data.categoria || 'Otro';
        document.getElementById('material').value = data.material || '';
        document.getElementById('color').value = data.color || '';
        document.getElementById('alto_cm').value = data.alto_cm;
        document.getElementById('ancho_cm').value = data.ancho_cm;
        document.getElementById('profundidad').value = data.profundidad;
        document.getElementById('peso').value = data.peso;
        document.getElementById('precio_venta').value = data.precio_venta;
        document.getElementById('stock').value = data.stock;
        document.getElementById('foto_url').value = data.foto_url || '';
        document.getElementById('foto_file').value = '';
        
        isEditing = true;
        document.getElementById('btn-save').textContent = 'Actualizar Producto';
        document.getElementById('btn-cancel').style.display = 'inline-block';
        window.scrollTo(0,0);
    }
}

window.deleteMueble = async function(id) {
    if (confirm("¿Estás seguro de eliminar este mueble? (Solo se eliminará si no ha sido comprado)")) {
        const { error } = await supabase.from('productos').delete().eq('id_productos', id);
        if (error) {
            alert(`No se pudo eliminar: ${error.message}`);
        } else {
            loadMuebles();
        }
    }
}

document.addEventListener('DOMContentLoaded', init);
