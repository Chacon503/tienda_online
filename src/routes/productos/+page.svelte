<script lang="ts">
	import { cart } from '$lib/stores/cart';
	import type { Product } from '$lib/types';

	const products: Product[] = [
		{ id: 1, name: 'Camisa Personalizada Blanca', price: 29.99, image: '/images/camisa-blanca.jpg', description: 'Camisa 100% algodón con impresión personalizada de alta calidad. Perfecta para regalos únicos.' },
		{ id: 2, name: 'Taza Cerámica Personalizada', price: 15.99, image: '/images/taza-personalizada.jpg', description: 'Taza de cerámica con capacidad 350ml y impresión duradera. Ideal para café o té.' },
		{ id: 3, name: 'Gorra Embroider Personalizada', price: 24.99, image: '/images/gorra-personalizada.jpg', description: 'Gorra ajustable con bordado personalizado. Material transpirable y diseño único.' },
		{ id: 4, name: 'Sudadera Hoodie Personalizada', price: 49.99, image: '/images/sudadera-hoodie.jpg', description: 'Sudadera con capucha de felpa suave, impresión frontal y mangas opcionales.' },
		{ id: 5, name: 'Funda iPhone Personalizada', price: 19.99, image: '/images/funda-iphone.jpg', description: 'Funda protectora para iPhone con impresión full color resistente a rayones.' },
		{ id: 6, name: 'Botella Termica Personalizada', price: 34.99, image: '/images/botella-termica.jpg', description: 'Botella térmica acero inoxidable 500ml mantiene bebidas frías 24h o calientes 12h.' },
		{ id: 7, name: 'Cuaderno Personalizado', price: 12.99, image: '/images/cuaderno-personalizado.jpg', description: 'Cuaderno espiral 100 hojas con portada impresa personalizada. Tapa dura.' },
		{ id: 8, name: 'Mouse Pad Personalizado', price: 18.99, image: '/images/mouse-pad.jpg', description: 'Mouse pad grande 90x40cm con impresión de alta calidad y superficie lisa.' }
	];
</script>

<section class="py-12">
	<div class="container mx-auto px-4">
		<h1 class="text-4xl font-bold text-center mb-12 text-gray-800">Todos los Productos</h1>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
			{#each products as product}
				<div class="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">
					<div class="aspect-square bg-gradient-to-br from-emerald-100 to-green-100 flex items-center justify-center p-8">
						<img src={product.image} alt={product.name} class="w-24 h-24 object-cover rounded-lg shadow-lg hover:scale-110 transition-transform duration-300" />
					</div>
					<div class="p-6">
						<h3 class="text-xl font-semibold mb-2">{product.name}</h3>
						<p class="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
						<div class="flex items-center justify-between">
							<div class="text-2xl font-bold text-emerald-600">${product.price}</div>
							<button 
								on:click={() => cart.addItem(product)}
								class="bg-emerald-600 text-white py-2 px-6 rounded-lg hover:bg-emerald-700 transition-all font-medium shadow-md hover:shadow-lg"
							>
								Agregar
							</button>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
