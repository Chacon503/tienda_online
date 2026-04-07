<script lang="ts">
	import { cart } from '$lib/stores/cart';
	import type { Product } from '$lib/types';

	const products: Product[] = [
		{ id: 1, name: 'Camisa Personalizada Blanca', price: 29.99 },
		{ id: 2, name: 'Taza Cerámica Personalizada', price: 15.99 },
		{ id: 3, name: 'Gorra Embroider Personalizada', price: 24.99 },
		{ id: 4, name: 'Sudadera Hoodie Personalizada', price: 49.99 },
		{ id: 5, name: 'Funda iPhone Personalizada', price: 19.99 },
		{ id: 6, name: 'Botella Termica Personalizada', price: 34.99 },
		{ id: 7, name: 'Cuaderno Personalizado', price: 12.99 },
		{ id: 8, name: 'Mouse Pad Personalizado', price: 18.99 }
	];
</script>

<section class="py-12">
	<div class="container mx-auto px-4">
		<h1 class="text-4xl font-bold text-center mb-12 text-gray-800">Todos los Productos</h1>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
			{#each products as product}
				<div class="bg-white border border-gray-200 rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300">
					<h3 class="text-xl font-semibold mb-4">{product.name}</h3>
					<div class="flex items-center justify-between">
						<div class="text-2xl font-bold text-emerald-600">${product.price}</div>
						<button 
							onclick={() => cart.addItem(product)}
							class="bg-emerald-600 text-white py-2 px-6 rounded-lg hover:bg-emerald-700 transition-all font-medium shadow-md hover:shadow-lg"
						>
							Agregar
						</button>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
