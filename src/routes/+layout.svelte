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
	<footer class="bg-gray-800 text-gray-300 mt-12 pt-12">
		<div class="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 pb-8">

			<div>
				<h4 class="text-white font-bold mb-4">Hacer compras</h4>
				<ul class="space-y-2 text-sm">
					<li><a href="/productos">Todos los Productos</a></li>
					<li><a href="/">Ofertas</a></li>
					<li><a href="/">Lo más vendido</a></li>
				</ul>
			</div>

			<div>
				<h4 class="text-white font-bold mb-4">Atención al Cliente</h4>
				<ul class="space-y-2 text-sm">
					<li>Contacto</li>
					<li>Devoluciones</li>
					<li>Centro de Ayuda</li>
				</ul>
			</div>

			<div>
				<h4 class="text-white font-bold mb-4">Acerca de</h4>
				<ul class="space-y-2 text-sm">
					<li>Nuestra Misión</li>
					<li>Experiencia</li>
					<li>Blog</li>
				</ul>
			</div>

			<!-- REDES PRO -->
			<div>
				<h4 class="text-white font-bold mb-4">Síguenos</h4>

				<ul class="space-y-3 text-sm">

					<li>
						<a href="https://www.facebook.com/share/1BH8LMTfNk/" target="_blank"
							class="flex items-center gap-3 hover:text-blue-400 transition">
							📘 Facebook
						</a>
					</li>

					<li>
						<a href="https://www.instagram.com/eze.chacon.17" target="_blank"
							class="flex items-center gap-3 hover:text-pink-400 transition">
							📸 Instagram
						</a>
					</li>

					<li>
						<a href="https://wa.me/50672529150?text=Hola,%20quiero%20información" target="_blank"
							class="flex items-center gap-3 hover:text-green-400 transition">
							💬 WhatsApp
						</a>
					</li>

				</ul>
			</div>

		</div>

		<div class="border-t border-gray-700 py-4 text-center text-sm">
			© 2026 PIXEL & TELAS
		</div>
	</footer>
</div>

<!-- BOTÓN FLOTANTE WHATSAPP -->
<a 
	href="https://wa.me/50672529150?text=Hola,%20quiero%20información"
	target="_blank"
	class="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-xl transition hover:scale-110 z-50"
>
	💬
</a>