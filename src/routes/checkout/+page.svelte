<script lang="ts">
	import { cart } from '$lib/stores/cart';
</script>

<section class="py-12 bg-gradient-to-b from-blue-50 to-indigo-100 min-h-screen">
	<div class="container mx-auto px-4 max-w-4xl">
		<h1 class="text-4xl font-bold text-center mb-16 text-gray-800">
			Finalizar Compra
		</h1>

		{#if $cart.items.length === 0}
			<div class="text-center py-20">
				<h2 class="text-2xl font-semibold mb-4 text-gray-600">
					No hay productos en el carrito
				</h2>
				<a
					href="/productos"
					class="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700"
				>
					Continuar Comprando
				</a>
			</div>
		{:else}
			<div class="grid md:grid-cols-2 gap-12 items-start">
				<!-- Formulario de Checkout -->
				<div class="bg-white rounded-2xl shadow-2xl p-8">
					<h2 class="text-2xl font-bold mb-8">
						Información de Envío
					</h2>

					<form class="space-y-6">
						<div>
							<label class="block text-sm font-medium mb-2">
								Nombre Completo
							</label>
							<input
								type="text"
								class="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							/>
						</div>

						<div>
							<label class="block text-sm font-medium mb-2">
								Email
							</label>
							<input
								type="email"
								class="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							/>
						</div>

						<div class="grid md:grid-cols-2 gap-4">
							<div>
								<label class="block text-sm font-medium mb-2">
									Dirección
								</label>
								<input
									type="text"
									class="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								/>
							</div>

							<div>
								<label class="block text-sm font-medium mb-2">
									Ciudad
								</label>
								<input
									type="text"
									class="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								/>
							</div>
						</div>

						<div class="grid md:grid-cols-2 gap-4">
							<div>
								<label class="block text-sm font-medium mb-2">
									Código Postal
								</label>
								<input
									type="text"
									class="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								/>
							</div>

							<div>
								<label class="block text-sm font-medium mb-2">
									País
								</label>
								<select
									class="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								>
									<option>Argentina</option>
									<option>Otros países...</option>
								</select>
							</div>
						</div>
					</form>
				</div>

				<!-- Resumen de Orden -->
				<div class="bg-white rounded-2xl shadow-2xl p-8 sticky top-8">
					<h2 class="text-2xl font-bold mb-8">
						Resumen de Orden
					</h2>

					<div class="space-y-4 mb-8">
						{#each $cart.items as item}
							<div class="flex justify-between py-2">
								<div>
									<div class="font-semibold">
										{item.name}
									</div>
									<div class="text-sm text-gray-600">
										Cant: {item.quantity} x ${item.price}
									</div>
								</div>
								<div class="font-semibold">
									${(item.price * item.quantity).toFixed(2)}
								</div>
							</div>
						{/each}
					</div>

					<!-- Botones -->
					<button
						class="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-8 rounded-2xl text-xl font-bold hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
					>
						¡Realizar Pedido!
					</button>

					<button
						on:click={cart.clearCart}
						class="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-200 transition-colors mt-4"
					>
						Cambiar Algo
					</button>
				</div>
			</div>
		{/if}
	</div>
</section>

<style>
	button:not([class*="bg-"]):not([class*="text-"]) {
		cursor: pointer;
	}
</style>