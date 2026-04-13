<script lang="ts">
	import '../routes/layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { cart } from '$lib/stores/cart';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	let { children } = $props();
	let searchQuery = $state('');

	let currentPath = $derived($page.url.pathname);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<!-- HEADER -->
<header class="bg-gradient-to-b from-gray-800 to-gray-900 shadow-lg">
	
	<nav class="py-4">
		<div class="container mx-auto px-4 flex items-center gap-4">
			
			<!-- Logo -->
			<a href="/" class="flex items-center flex-shrink-0 hover:opacity-80">
				<div class="h-12 w-12 rounded-full overflow-hidden bg-white p-1">
					<img src="/images/logo.png" alt="Logo" class="h-full w-full object-cover" />
				</div>
				<div class="ml-2">
					<span class="text-lg font-bold text-white block">PIXEL & TELAS</span>
					<span class="text-xs text-gray-400">impresiones con alma</span>
				</div>
			</a>

			<!-- SEARCH -->
			<div class="flex-1 mx-6">
				<div class="flex bg-white rounded-md overflow-hidden">
					<input
						type="text"
						bind:value={searchQuery}
						placeholder="Buscar productos..."
						class="flex-1 px-4 py-2 outline-none text-gray-800"
						onkeydown={(e) => {
							if (e.key === 'Enter' && searchQuery.trim() !== '') {
								goto('/productos?search=' + encodeURIComponent(searchQuery));
							}
						}}
					/>
					<button
						onclick={() => {
							if (searchQuery.trim() !== '') {
								goto('/productos?search=' + encodeURIComponent(searchQuery));
							}
						}}
						class="bg-orange-400 hover:bg-orange-500 text-white px-6 font-semibold"
					>
						🔍
					</button>
				</div>
			</div>

			<!-- Carrito -->
			<a href="/carrito" class="flex items-center hover:opacity-80">
				<div class="relative">
					<span class="text-white text-2xl">🛒</span>
					{#if $cart.items.length > 0}
						<span class="absolute -top-2 -right-2 bg-orange-400 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
							{$cart.items.reduce((sum, item) => sum + item.quantity, 0)}
						</span>
					{/if}
				</div>
			</a>

		</div>
	</nav>

	<!-- MENÚ -->
	<div class="bg-gray-700 py-2 border-t border-gray-600">
		<div class="container mx-auto px-4 flex items-center gap-8 text-sm text-white">

			<a href="/" class="hover:text-gray-300" class:font-bold={currentPath === '/'}>
				🏠 Inicio
			</a>

			<a href="/productos" class="hover:text-gray-300" class:font-bold={currentPath === '/productos'}>
				📦 Todos los Productos
			</a>

			<a href="/checkout" class="hover:text-gray-300" class:font-bold={currentPath === '/checkout'}>
				💳 Checkout
			</a>

		</div>
	</div>

</header>

<!-- CONTENIDO -->
<div class="min-h-screen flex flex-col">
	<main class="flex-1">
		{@render children()}
	</main>

	<!-- FOOTER -->
	<footer class="bg-gray-800 text-gray-300 mt-12 pt-8 pb-4">
	<div class="container mx-auto px-4 flex flex-col items-center">

		<!-- REDES CENTRALES -->
		<div class="text-center mb-6">
			<h4 class="text-white font-bold mb-4">Síguenos</h4>

			<div class="flex justify-center gap-10">

				<!-- Facebook -->
				<a 
					href="https://www.facebook.com/share/1BH8LMTfNk/" 
					target="_blank"
					class="w-12 h-12 flex items-center justify-center rounded-full shadow-lg hover:scale-110 transition"
					style="background-color: #1877F2;"
				>
					<!-- Facebook SVG -->
					<svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
						<path d="M22 12a10 10 0 1 0-11.5 9.9v-7H8v-3h2.5V9.5A3.5 3.5 0 0 1 14 6h2v3h-2c-.6 0-1 .4-1 1V12h3l-.5 3H13v7A10 10 0 0 0 22 12z"/>
					</svg>
				</a>

				<!-- Instagram -->
				<a 
					href="https://www.instagram.com/eze.chacon.17" 
					target="_blank"
					class="w-12 h-12 flex items-center justify-center rounded-full shadow-lg hover:scale-110 transition"
					style="background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%);"
				>
					<!-- Instagram SVG -->
					<svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
						<path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2c1.7 0 3 1.3 3 3s-1.3 3-3 3-3-1.3-3-3 1.3-3 3-3zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10z"/>
					</svg>
				</a>

				<!-- WhatsApp -->
				<a 
					href="https://wa.me/50672529150?text=Hola,%20quiero%20información" 
					target="_blank"
					class="w-12 h-12 flex items-center justify-center rounded-full shadow-lg hover:scale-110 transition"
					style="background-color: #25D366;"
				>
					<!-- WhatsApp SVG -->
					<svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
						<path d="M20.5 3.5A11.8 11.8 0 0 0 12 0C5.4 0 .1 5.3.1 11.9c0 2.1.6 4.1 1.7 5.9L0 24l6.3-1.7a12 12 0 0 0 5.7 1.4c6.6 0 12-5.3 12-11.9 0-3.2-1.3-6.2-3.5-8.3z"/>
					</svg>
				</a>

			</div>
		</div>
	</div>

	<!-- BARRA INFERIOR MÁS SEPARADA -->
	<div class="border-t border-gray-700 py-4 text-center text-xs flex justify-center gap-16">
		<a href="https://www.facebook.com/share/1BH8LMTfNk/" target="_blank" class="hover:text-blue-400 transition">
			Facebook
		</a>

		<a href="https://www.instagram.com/eze.chacon.17" target="_blank" class="hover:text-pink-400 transition">
			Instagram
		</a>

		<a href="https://wa.me/50672529150?text=Hola,%20quiero%20información" target="_blank" class="hover:text-green-400 transition">
			WhatsApp
		</a>
	</div>
</footer>
</div>

<!-- BOTONES FLOTANTES (UNO DEBAJO DEL OTRO) -->
<div class="fixed bottom-6 right-6 flex flex-col gap-3 z-50">

	<!-- Facebook -->
	<a 
		href="https://www.facebook.com/share/1BH8LMTfNk/" 
		target="_blank"
		class="w-12 h-12 flex items-center justify-center rounded-full shadow-lg hover:scale-110 transition"
		style="background-color: #1877F2;"
	>
		<svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
			<path d="M22 12a10 10 0 1 0-11.5 9.9v-7H8v-3h2.5V9.5A3.5 3.5 0 0 1 14 6h2v3h-2c-.6 0-1 .4-1 1V12h3l-.5 3H13v7A10 10 0 0 0 22 12z"/>
		</svg>
	</a>

	<!-- Instagram -->
	<a 
		href="https://www.instagram.com/eze.chacon.17" 
		target="_blank"
		class="w-12 h-12 flex items-center justify-center rounded-full shadow-lg hover:scale-110 transition"
		style="background: radial-gradient(circle at 30% 107%, #fdf497 0%, #fd5949 45%, #d6249f 60%, #285AEB 90%);"
	>
		<svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
			<path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2c1.7 0 3 1.3 3 3s-1.3 3-3 3-3-1.3-3-3 1.3-3 3-3zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10z"/>
		</svg>
	</a>

	<!-- WhatsApp -->
	<a 
		href="https://wa.me/50672529150?text=Hola,%20quiero%20información" 
		target="_blank"
		class="w-12 h-12 flex items-center justify-center rounded-full shadow-lg hover:scale-110 transition"
		style="background-color: #25D366;"
	>
		<svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
			<path d="M20.5 3.5A11.8 11.8 0 0 0 12 0C5.4 0 .1 5.3.1 11.9c0 2.1.6 4.1 1.7 5.9L0 24l6.3-1.7a12 12 0 0 0 5.7 1.4c6.6 0 12-5.3 12-11.9 0-3.2-1.3-6.2-3.5-8.3z"/>
		</svg>
	</a>

</div>