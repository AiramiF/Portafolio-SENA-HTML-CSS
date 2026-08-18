# Documentación de la API (Supabase & Cloudinary)

Especificaciones sobre cómo el frontend (Vanilla JS) se comunica con **Supabase JS Client** para autenticación, base de datos y cómo consume las imágenes desde **Cloudinary**.

---

## Objetivo

Proveer una guía práctica con ejemplos de código en JavaScript ES6+ para la realización de operaciones de autenticación (Supabase Auth), manipulación de datos (PostgreSQL con RLS) y uso de imágenes hospedadas en Cloudinary CDN.

---

## Contenido

### 1. Estándares Generales

- **Cliente Supabase:** Se inicializa en el Frontend mediante `@supabase/supabase-js`:
  ```javascript
  import { createClient } from '@supabase/supabase-js';
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  ```
- **Autenticación Nativa:** Gestionada a través de `supabase.auth`. El token JWT devuelto adjunta automáticamente el identificador del usuario (`auth.uid()`) en cada consulta, validado por las políticas Row Level Security (RLS).
- **Gestión de Imágenes:** Las imágenes de los productos se almacenan en **Cloudinary**. La base de datos solo almacena la URL pública resultante en el campo `FOTO_URL`.

---

### 2. Ejemplos de Uso Principales

#### 2.1 Registro e Inicio de Sesión (Supabase Auth & Tabla CLIENTES)

```javascript
// 1. Registro de usuario en Supabase Auth
const { data: authData, error: authError } = await supabase.auth.signUp({
  email: 'cliente@ejemplo.com',
  password: 'PasswordSeguro123!'
});

if (authError) console.error('Error Auth:', authError);

// 2. Creación del perfil del cliente (asociado mediante UUID authData.user.id)
const { data: cliente, error: clienteError } = await supabase
  .from('CLIENTES')
  .insert([
    {
      ID_CLIENTE: authData.user.id, // Vincula directamente con auth.users
      NOMBRES: 'Carlos Rodríguez',
      TIPO_DOCUMENTO: 'CC',
      NUM_DOCUMENTO: '1098765432',
      TIPO_PERSONA: 'Natural',
      TELEFONO_FIJO: '6012345678',
      TELEFONO_MOVIL: '3109876543',
      DIRECCION: 'Carrera 15 #80-45',
      CIUDAD: 'Bogotá',
      DEPARTAMENTO: 'Cundinamarca',
      PAIS: 'Colombia',
      PROFESION: 'Arquitecto'
    }
  ]);
```

#### 2.2 Obtención de Productos e Imágenes de Cloudinary

```javascript
// Consultar catálogo de productos disponibles
const { data: productos, error } = await supabase
  .from('PRODUCTOS')
  .select('*')
  .gt('STOCK', 0);

// Ejemplo de renderizado en HTML con CDN de Cloudinary
productos.forEach(producto => {
  const cardHTML = `
    <div class="product-card">
      <img src="${producto.FOTO_URL}" alt="${producto.NOMBRE}" loading="lazy" />
      <h3>${producto.NOMBRE}</h3>
      <p>Material: ${producto.MATERIAL} | Color: ${producto.COLOR}</p>
      <span>Precio: $${producto.PRECIO_VENTA}</span>
      <small>Disponibles: ${producto.STOCK}</small>
    </div>
  `;
  document.getElementById('catalog-container').insertAdjacentHTML('beforeend', cardHTML);
});
```

#### 2.3 Subida de Imagen de Producto a Cloudinary (Admin/Dashboard)

```javascript
// Función helper para subir imagen a Cloudinary mediante su API REST (Unsigned Upload)
async function subirImagenACloudinary(fileInput) {
  const formData = new FormData();
  formData.append('file', fileInput.files[0]);
  formData.append('upload_preset', 'muebles_preset'); // Configurado en Cloudinary

  const res = await fetch('https://api.cloudinary.com/v1_1/TU_CLOUD_NAME/image/upload', {
    method: 'POST',
    body: formData
  });

  const data = await res.json();
  return data.secure_url; // Retorna la URL HTTPS de Cloudinary para guardar en FOTO_URL
}
```

#### 2.4 Registro de Compra (Descuento Automático de Stock vía Trigger PostgreSQL)

```javascript
// 1. Obtener usuario autenticado
const user = (await supabase.auth.getUser()).data.user;

// 2. Insertar cabecera de la compra
const { data: compra, error: errCompra } = await supabase
  .from('COMPRAS')
  .insert([
    {
      NUM_ORDEN: `ORD-${Date.now()}`,
      CANTIDAD: 2,
      VALOR_TOTAL: 2500000.00,
      METODO_PAGO: 'Tarjeta de Crédito',
      DESCRIPCION: 'Entrega prioritaria',
      CLIENTES_ID_CLIENTE: user.id
    }
  ])
  .select();

// 3. Insertar detalle de la compra
// Al insertar en DET_COMPRAS, el Trigger PostgreSQL 'trg_descontar_stock' 
// descuenta automáticamente las unidades del campo STOCK en PRODUCTOS.
const { data: detalle, error: errDetalle } = await supabase
  .from('DET_COMPRAS')
  .insert([
    {
      COMPRAS_ID_COMPRAS: compra[0].ID_COMPRAS,
      PRODUCTOS_ID_PRODUCTOS: 3, // ID del mueble
      CANTIDAD: 2,
      VALOR_HISTORICO: 1250000.00
    }
  ]);
```

---

## Relación con otros documentos

Los consumos a Supabase y Cloudinary corresponden a la implementación técnica de los [Requisitos Funcionales](../02-Requisitos/Funcionales.md) y siguen las directrices de la [Base de Datos](Base_Datos.md) y el [Diseño del Sistema](Diseno_Sistema.md).

- [Diseño del Sistema](Diseno_Sistema.md)
- [Base de Datos](Base_Datos.md)

---

## Navegación

← [Base de Datos](Base_Datos.md)
↑ [Índice de la Carpeta](README.md)
→ [Índice de Diseño UI/UX](../04-Diseno_UI_UX/README.md)

[MASTER](../MASTER.md)
