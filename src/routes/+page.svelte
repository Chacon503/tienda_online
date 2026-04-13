<script lang="ts">
	import { cart } from '$lib/stores/cart';
	import type { Product } from '$lib/types';

	const products: Product[] = [
		{ id: 1, name: 'Camisa', price: 29.99, image: '/images/camisa.png' },
		{ id: 2, name: 'Taza Cerámica', price: 15.99, image: '/images/taza.png' },
		{ id: 3, name: 'Gorra Embroider', price: 24.99, image: '/images/gorra.png' },
		{ id: 4, name: 'Sudadera Hoodie', price: 49.99, image: '/images/sueter.png' },
		{ id: 5, name: 'Funda iPhone', price: 19.99, image: '/images/funda (1).png' }
	];

</script>

<section class="py-12">
	<div class="container mx-auto px-30">
		<h1 class="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">PIXEL &amp; TELAS</h1>
		<p class="text-xl md:text-2xl text-center mb-12 text-gray-600 max-w-2xl mx-auto bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text">Impresiones con alma - Productos personalizados únicos</p>
		<p class="text-xl text-center mb-12 text-gray-600 max-w-2xl mx-auto">Descubre nuestros productos increíbles. ¡Agrega al carrito y compra ahora!</p>
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
			{#each products as product}
				<div class="bg-white border border-gray-100 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
					<div class="w-full h-75 bg-gray-100 overflow-hidden">
						<img src={product.image} alt={product.name} class="w-full h-full object-cover hover:scale-110 transition-transform duration-300" />
					</div>
					<div class="p-6">
						<h3 class="text-xl font-semibold mb-4">{product.name}</h3>
						<div class="flex items-center justify-between">
							<div class="text-2xl font-bold text-blue-600">${product.price}</div>
							<button 
								onclick={() => cart.addItem(product)}
								class="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-all font-medium shadow-md hover:shadow-lg"
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

<!-- Sección Misión y Visión -->
<section class="py-20 bg-gradient-to-b from-gray-50 to-white">
	<div class="container mx-auto px-30">
		<div class="grid md:grid-cols-2 gap-16 items-center">
			<div>
				<h2 class="text-3xl md:text-4xl font-bold mb-6 text-gray-800">Nuestra <span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Misión</span></h2>
				<p class="text-xl text-gray-600 leading-relaxed mb-8">
					Transformar ideas en productos tangibles con impresiones de alta calidad que capturan la esencia de cada diseño. 
					Brindamos soluciones personalizadas que conectan emocionalmente con tu audiencia.
				</p>
				<div class="space-y-4 text-lg text-gray-700">
					<div class="flex items-start space-x-3">
						<div class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
							<span class="text-white font-bold text-sm">✓</span>
						</div>
						<span>Impresión premium con tintas ecológicas</span>
					</div>
					<div class="flex items-start space-x-3">
						<div class="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
							<span class="text-white font-bold text-sm">✓</span>
						</div>
						<span>Personalización 100% a medida</span>
					</div>
					<div class="flex items-start space-x-3">
						<div class="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
							<span class="text-white font-bold text-sm">✓</span>
						</div>
						<span>Atención personalizada y rápida</span>
					</div>
				</div>
			</div>
			<div class="relative">
				<div class="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-12 shadow-2xl transform rotate-3 hover:rotate-0 transition-all duration-500">
					<h3 class="text-5xl font-black text-white text-center mb-6 drop-shadow-lg">✨</h3>
					<blockquote class="text-xl text-blue-100 italic text-center leading-relaxed drop-shadow-md">
						"Impresiones con alma que cuentan tu historia"
					</blockquote>
				</div>
			</div>
		</div>
		
		<div class="mt-20 pt-20 border-t-4 border-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 rounded-2xl p-12 bg-white shadow-2xl">
			<div class="text-center mb-12">
				<h2 class="text-3xl md:text-4xl font-bold mb-4 text-gray-800">Nuestra <span class="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Visión</span></h2>
				<p class="text-xl text-gray-600 max-w-3xl mx-auto">Ser el referente nacional en productos personalizados, combinando tecnología de punta con diseño creativo y servicio excepcional.</p>
			</div>
			<div class="grid md:grid-cols-3 gap-8">
				<div class="text-center p-8 hover:scale-105 transition-all duration-300">
					<div class="w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
						<span class="text-2xl font-bold text-white">🚀</span>
					</div>
					<h4 class="text-xl font-semibold mb-4 text-gray-800">Innovación</h4>
					<p class="text-gray-600">Tecnología de vanguardia en impresión</p>
				</div>
				<div class="text-center p-8 hover:scale-105 transition-all duration-300">
					<div class="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
						<span class="text-2xl font-bold text-white">🎨</span>
					</div>
					<h4 class="text-xl font-semibold mb-4 text-gray-800">Creatividad</h4>
					<p class="text-gray-600">Diseños únicos que inspiran</p>
				</div>
				<div class="text-center p-8 hover:scale-105 transition-all duration-300">
					<div class="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
						<span class="text-2xl font-bold text-white">💙</span>
					</div>
					<h4 class="text-xl font-semibold mb-4 text-gray-800">Conexión</h4>
					<p class="text-gray-600">Conectar marcas con personas</p>
				</div>
			</div>
		</div>
	</div>
</section>

