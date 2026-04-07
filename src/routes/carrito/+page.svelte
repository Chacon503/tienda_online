<script lang="ts">
	import { cart } from '$lib/stores/cart';
	import type { CartItem } from '$lib/types';
</script>

{#if $cart.items.length === 0}
	<section class="py-12">
		<div class="container mx-auto px-4 text-center">
			<h1 class="text-4xl font-bold mb-8 text-gray-800">Tu Carrito está Vacío</h1>
			<p class="text-xl mb-8 text-gray-600">Aún no has agregado productos. ¡Explora nuestra tienda!</p>
			<a href="/productos" class="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors">Ir a Productos</a>
		</div>
	</section>
{:else}
	<section class="py-12">
		<div class="container mx-auto px-4">
			<h1 class="text-4xl font-bold mb-12 text-gray-800 text-center">Carrito de Compras</h1>
			
			<div class="bg-white shadow-xl rounded-2xl overflow-hidden mb-12">
				<div class="p-8 border-b border-gray-200">
					<div class="flex justify-between items-center mb-4">
						<h2 class="text-2xl font-bold">Productos ({$cart.items.length})</h2>
						<button on:click={cart.clearCart} class="text-red-600 hover:text-red-800 font-medium">Vaciar Carrito</button>
					</div>
				</div>
				
				{#each $cart.items as item (item.id)}
					<div class="p-8 border-b border-gray-100 last:border-b-0 hover:bg-gray-50">
						<div class="flex items-center justify-between">
							<div class="flex-1">
								<h3 class="text-xl font-semibold mb-1">{item.name}</h3>
							</div>
							<div class="text-right">
								<div class="text-2xl font-bold text-gray-900 mb-2">${(item.price * item.quantity).toFixed(2)}</div>
								<div class="flex items-center space-x-2 justify-end">
									<button on:click={() => cart.removeItem(item.id)} class="text-red-600 hover:text-red-800 font-medium">-</button>
									<span class="w-12 text-center font-semibold">{item.quantity}</span>
									<button on:click={() => cart.addItem(item)} class="text-green-600 hover:text-green-800 font-medium">+</button>
								</div>
							</div>
						</div>
					</div>
				{/each}
				
				<div class="p-8 bg-gray-50 border-t border-gray-200">
					<div class="flex justify-between items-center text-2xl font-bold">
						<span>Total:</span>
						<span class="text-blue-600">${$cart.total.toFixed(2)}</span>
					</div>
					{#if $cart.total > 0}
						<div class="mt-6">
							<a href="/checkout" class="w-full block bg-green-600 text-white py-4 px-8 rounded-xl text-xl font-bold text-center hover:bg-green-700 transition-all duration-200 shadow-lg">
								Proceder al Checkout
							</a>
						</div>
					{/if}
				</div>
			</div>
		</div>
	</section>
{/if}
