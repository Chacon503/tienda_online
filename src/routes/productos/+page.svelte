<script lang="ts">
	import { cart } from '$lib/stores/cart';
	import type { Product } from '$lib/types';
	import { page } from '$app/stores';

	let products: Product[] = $state([]);
	let loading = $state(true);

	let searchTerm = $derived(
		$page.url.searchParams.get('search')?.toLowerCase() || ''
	);

	async function loadProducts() {
		try {
			const res = await fetch('/api/products');
			products = await res.json();
		} catch (error) {
			console.error(error);
		} finally {
			loading = false;
		}
	}

	$effect(() => {
		loadProducts();
	});

	let filteredProducts = $derived(
		products.filter(product =>
			product.name.toLowerCase().includes(searchTerm)
		)
	);
</script>

<section class="py-12">
	<div class="container mx-auto px-6">

		<h1 class="text-3xl font-bold text-center mb-8">
			Todos los Productos
		</h1>

		{#if loading}
			<p class="text-center">Cargando...</p>

		{:else if filteredProducts.length === 0}
			<p class="text-center text-gray-500">
				No se encontraron productos
			</p>

		{:else}
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
				{#each filteredProducts as product}
					<div class="bg-white border rounded-lg shadow p-4">

						<!-- IMAGEN CORREGIDA -->
						<div class="w-full h-48 bg-gray-100 rounded overflow-hidden mb-4">
							<img 
								src={product.image_url || product.image || '/images/placeholder.png'} 
								alt={product.name}
								class="w-full h-full object-cover"
								onerror={(e) => e.currentTarget.src = '/images/placeholder.png'}
								loading="lazy"
							/>
						</div>

						<h2 class="font-bold">{product.name}</h2>

						<p class="text-green-600 font-semibold">
							${product.price}
						</p>

						<button
							onclick={() => cart.addItem(product)}
							class="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
						>
							Agregar
						</button>

					</div>
				{/each}
			</div>
		{/if}

	</div>
</section>