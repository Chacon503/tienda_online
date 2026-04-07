<script lang="ts">
	import '../routes/layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { cart } from '$lib/stores/cart';
	import { page } from '$app/stores';

	let { children } = $props();

	let currentPath = $derived($page.url.pathname.slice(0, $page.url.pathname.length));
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<nav class="bg-blue-600 p-4 shadow-md">
	<div class="container mx-auto flex justify-between items-center">
		<div class="flex items-center space-x-3">

			<span class="text-xl md:text-2xl font-bold">PIXEL &amp; TELAS</span>
			<span class="text-sm md:text-base text-blue-200 block md:inline -mt-1 md:mt-0">impresiones con alma</span>
		</div>
		<div class="flex space-x-4">
			<a href="/" class:font-bold={currentPath === '/' || currentPath === ''} class="text-white hover:text-gray-200">Inicio</a>
			<a href="/productos" class:font-bold={currentPath === '/productos'} class="text-white hover:text-gray-200">Productos</a>
			<a href="/carrito" class:font-bold={currentPath === '/carrito'} class="text-white hover:text-gray-200">
				Carrito ({$cart.items.reduce((sum, item) => sum + item.quantity, 0)})
			</a>
			<a href="/checkout" class:font-bold={currentPath === '/checkout'} class="text-white hover:text-gray-200">Checkout</a>
		</div>
	</div>
</nav>

<div class="container mx-auto p-4 min-h-screen">
	{@render children()}
</div>
