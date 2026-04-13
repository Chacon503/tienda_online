# Configuración de Base de Datos - PIXEL & TELAS

## ✅ Archivos Creados

He creado todos los archivos necesarios para conectar PostgreSQL a tu proyecto:

### 1. **Archivos de Configuración**
- `.env.local` - Variables de entorno (necesita ser configurado)
- `src/lib/db.ts` - Conexión a la base de datos

### 2. **API Routes**
- `src/routes/api/products/+server.ts` - Obtiene productos de la BD
- `src/routes/api/orders/+server.ts` - Crea órdenes en la BD

### 3. **Páginas Actualizadas**
- `src/routes/productos/+page.svelte` - Ahora obtiene productos de la API
- `src/routes/checkout/+page.svelte` - Ahora envía pedidos a la API

### 4. **Tipos Actualizados**
- `src/lib/types.ts` - Interfaz Product ahora soporta fields de BD

### 5. **SQL de Datos de Ejemplo**
- `DATABASE_SETUP.sql` - Scripts para insertar datos iniciales

---

## 🔧 Pasos para Configurar

### 1. Editar `.env.local`
Abre el archivo `.env.local` y reemplaza con tu conexión PostgreSQL:

```
DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/tienda_online"
```

**Reemplaza:**
- `usuario` → tu usuario de PostgreSQL
- `contraseña` → tu contraseña
- `localhost` → servidor (si es remoto)
- `tienda_online` → nombre de tu BD

### 2. Crear las Tablas en PostgreSQL

Ejecuta cada tabla por separado en tu cliente PostgreSQL (pgAdmin, DBeaver, etc.):

```sql
-- Copiar y ejecutar cada CREATE TABLE del inicio del proyecto
```

### 3. Insertar Datos de Ejemplo

Ejecuta el archivo `DATABASE_SETUP.sql`:
```sql
-- Copiar el contenido de DATABASE_SETUP.sql en tu cliente PostgreSQL
```

### 4. Instalar Dependencias (Ya Hecho)
```bash
npm install pg dotenv
npm install -D @types/pg
```

### 5. Ejecutar el Proyecto
```bash
npm run dev
```

---

## 📋 Flujo de Datos

### Obtener Productos
1. Usuario navega a `/productos`
2. La página hace fetch a `/api/products`
3. API consulta tabla `products` de PostgreSQL
4. Productos se muestran en la página

### Crear Orden
1. Usuario completa el formulario en `/checkout`
2. Presiona "¡Realizar Pedido!"
3. Se envía POST a `/api/orders`
4. API inserta usuario en tabla `users`
5. API inserta orden en tabla `orders`
6. API inserta items en tabla `order_items`
7. Usuario recibe confirmación

---

## 🐛 Si hay Errores

### Error: `DATABASE_URL not found`
- Asegúrate de que `.env.local` existe en la raíz del proyecto
- Reinicia el servidor: `npm run dev`

### Error: `connection refused`
- Verifica que PostgreSQL esté ejecutándose
- Comprueba que los datos de conexión en `.env.local` sean correctos

### Error: `relation "products" does not exist`
- Ejecuta los CREATE TABLE antes de insertar datos
- Verifica que estés en la base de datos correcta (`tienda_online`)

---

## 💾 Estructura de la BD

```
users (clientes)
├─ id
├─ email
├─ full_name
├─ phone
├─ address
├─ city
├─ postal_code
└─ country

products (catálogo)
├─ id
├─ name
├─ price
├─ image_url
├─ category_id
├─ stock
└─ is_customizable

orders (pedidos)
├─ id
├─ order_number
├─ user_id
├─ total_amount
├─ status
└─ created_at

order_items (detalles de pedido)
├─ id
├─ order_id
├─ product_id
├─ quantity
├─ unit_price
└─ subtotal
```

---

## 🎉 Listo

Una vez configurados los archivos `.env.local` y creadas las tablas, tu tienda estará completamente funcional con base de datos PostgreSQL.

¿Necesitas ayuda con algo más?
