<script lang="ts">
	import { cart } from '$lib/stores/cart';
	import type { CartItem } from '$lib/types';
</script>

{#if $cart.items.length === 0}
	<section class="py-12">
		<div class="max-w-3xl mx-auto px-4 text-center">
			<h1 class="text-4xl font-bold mb-6 text-gray-800">
				Tu Carrito está Vacío
			</h1>
			<p class="text-lg mb-6 text-gray-600">
				Aún no has agregado productos. ¡Explora nuestra tienda!
			</p>
			<a 
				href="/productos" 
				class="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
			>
				Ir a Productos
			</a>
		</div>
	</section>

{:else}
	<section class="py-12">
		<div class="max-w-4xl mx-auto px-4"> <!-- 👈 MÁS ANGOSTO -->
			
			<h1 class="text-3xl font-bold mb-10 text-gray-800 text-center">
				Carrito de Compras
			</h1>
			
			<div class="bg-white shadow-lg rounded-xl overflow-hidden">
				
				<!-- HEADER -->
				<div class="p-6 border-b flex justify-between items-center">
					<h2 class="text-xl font-bold">
						Productos ({$cart.items.length})
					</h2>

					<button 
						onclick={cart.clearCart}
						class="text-red-500 hover:text-red-700 font-semibold"
					>
						Vaciar carrito
					</button>
				</div>

				<!-- ITEMS -->
				{#each $cart.items as item (item.id)}
					<div class="p-6 border-b last:border-b-0">
						<div class="flex items-center gap-4">

							<!-- IMAGEN (CORREGIDA) -->
							<div class="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
								<img 
									src={item.image_url || item.image || '/images/placeholder.png'} 
									alt={item.name} 
									class="w-full h-full object-cover"
								/>
							</div>

							<!-- INFO -->
							<div class="flex-1">
								<h3 class="font-semibold">{item.name}</h3>
								<p class="text-gray-500 text-sm">
									${item.price.toFixed(2)} c/u
								</p>
							</div>

							<!-- CONTROLES -->
							<div class="flex items-center gap-3">
								
								<button 
									onclick={() => cart.removeItem(item.id)}
									class="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
								>
									-
								</button>

								<span class="font-semibold w-6 text-center">
									{item.quantity}
								</span>

								<button 
									onclick={() => cart.addItem(item)}
									class="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
								>
									+
								</button>

							</div>

							<!-- PRECIO -->
							<div class="text-right font-bold w-20">
								${(item.price * item.quantity).toFixed(2)}
							</div>

						</div>
					</div>
				{/each}

				<!-- TOTAL -->
				<div class="p-6 bg-gray-50">
					<div class="flex justify-between text-xl font-bold mb-4">
						<span>Total:</span>
						<span class="text-blue-600">
							${$cart.total.toFixed(2)}
						</span>
					</div>

					<a 
						href="/checkout" 
						class="block w-full bg-green-600 text-white py-3 rounded-lg text-center font-semibold hover:bg-green-700 transition"
					>
						Proceder al Checkout
					</a>
				</div>

			</div>
		</div>
	</section>
{/if}