<script lang="ts">
	import { jsPDF } from 'jspdf';
	import { cart } from '$lib/stores/cart';

	let countries = [
		{ name: 'Costa Rica', code: '+506' },
		{ name: 'México', code: '+52' },
		{ name: 'Colombia', code: '+57' },
		{ name: 'Argentina', code: '+54' },
		{ name: 'Chile', code: '+56' },
		{ name: 'Estados Unidos', code: '+1' },
		{ name: 'España', code: '+34' }
	];

	let formData = $state({
		full_name: '',
		email: '',
		phone: '',
		address: '',
		city: '',
		postal_code: '',
		country: 'Costa Rica',
		country_code: '+506',
		payment_method: ''
	});

	let sinpeImage: File | null = null;
	let loading = $state(false);

	function updateCountryCode(countryName) {
		const selected = countries.find(c => c.name === countryName);
		if (selected) formData.country_code = selected.code;
	}

	function validateForm() {
		const phoneValid = /^[0-9]{8,12}$/.test(formData.phone);

		if (!phoneValid) {
			alert('Número de teléfono inválido');
			return false;
		}

		if (formData.payment_method === 'SINPE' && !sinpeImage) {
			alert('Debes subir el comprobante SINPE');
			return false;
		}

		return (
			formData.full_name &&
			formData.email &&
			formData.phone &&
			formData.address &&
			formData.city &&
			formData.postal_code &&
			formData.payment_method
		);
	}

	// ✅ PDF REAL
	function downloadInvoice(orderNumber) {
		const doc = new jsPDF();

		let y = 10;

		doc.setFontSize(16);
		doc.text('FACTURA', 10, y);

		y += 10;
		doc.setFontSize(10);

		doc.text(`Orden: ${orderNumber}`, 10, y);
		y += 6;
		doc.text(`Cliente: ${formData.full_name}`, 10, y);
		y += 6;
		doc.text(`Tel: ${formData.country_code}${formData.phone}`, 10, y);
		y += 6;
		doc.text(`País: ${formData.country}`, 10, y);
		y += 6;
		doc.text(`Pago: ${formData.payment_method}`, 10, y);

		y += 10;
		doc.text('-----------------------------', 10, y);

		y += 6;

		$cart.items.forEach(item => {
			doc.text(
				`${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`,
				10,
				y
			);
			y += 6;
		});

		y += 6;
		doc.text('-----------------------------', 10, y);

		y += 8;
		doc.setFontSize(12);
		doc.text(`TOTAL: $${$cart.total.toFixed(2)}`, 10, y);

		doc.save(`factura_${orderNumber}.pdf`);
	}

	async function submitOrder() {
		if (!validateForm()) return;

		loading = true;

		try {
			const response = await fetch('/api/orders', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					...formData,
					phone: formData.country_code + formData.phone,
					items: $cart.items,
					total_amount: $cart.total,
					sinpe_image: sinpeImage ? sinpeImage.name : null
				})
			});

			const result = await response.json();

			if (!response.ok) {
				console.error(result);
				alert('Error: ' + (result.details || result.error));
				return;
			}

			alert('Compra exitosa');

			downloadInvoice(result.orderNumber);

			cart.clearCart();
			window.location.href = '/';

		} catch (error) {
			console.error(error);
			alert('Error al procesar la compra');
		} finally {
			loading = false;
		}
	}
</script>

<section class="py-12 bg-gradient-to-b from-blue-50 to-indigo-100 min-h-screen">
	<div class="max-w-4xl mx-auto px-4">

		<h1 class="text-3xl font-bold mb-8 text-center">
			Finalizar Compra
		</h1>

		<div class="grid md:grid-cols-2 gap-8">

			<!-- FORM -->
			<div class="bg-white p-6 rounded-xl shadow">

				<input placeholder="Nombre completo" bind:value={formData.full_name} class="input" />
				<input type="email" placeholder="Email" bind:value={formData.email} class="input" />

				<select bind:value={formData.country} onchange={(e) => updateCountryCode(e.target.value)} class="input">
					{#each countries as c}
						<option value={c.name}>{c.name}</option>
					{/each}
				</select>

				<!-- TELÉFONO -->
				<div class="flex gap-2 items-center">
					<input 
						value={formData.country_code} 
						readonly 
						class="px-2 py-2 border rounded bg-gray-100 text-center text-sm"
						style="width: 65px; flex-shrink: 0;"
					/>

					<input 
						type="tel"
						placeholder="Teléfono"
						bind:value={formData.phone}
						class="flex-1 px-3 py-2 border rounded"
						oninput={(e) => formData.phone = e.target.value.replace(/\D/g, '')}
					/>
				</div>

				<input placeholder="Dirección" bind:value={formData.address} class="input" />
				<input placeholder="Ciudad" bind:value={formData.city} class="input" />
				<input placeholder="Código Postal" bind:value={formData.postal_code} class="input" />

				<select bind:value={formData.payment_method} class="input">
	<option value="">Método de pago</option>
	<option value="Efectivo">Efectivo</option>
	<option value="SINPE">SINPE</option>
	<option value="Tarjeta">Tarjeta</option>
</select>

{#if formData.payment_method === 'SINPE'}

	<!-- INFO SINPE -->
	<div class="bg-green-50 border border-green-300 text-green-800 p-4 rounded-lg mt-3 text-sm">
		<p class="font-semibold mb-1">Pago por SINPE Móvil</p>
		<p><strong>Nombre:</strong> Roberto Ezequiel Chacón Rosales</p>
		<p><strong>Teléfono:</strong> +506 7252 9150</p>
		<p class="text-xs mt-2">Realiza el pago y sube el comprobante abajo, gracias por preferirnos.</p>
	</div>

	<!-- SUBIR COMPROBANTE -->
	<input 
		type="file" 
		accept="image/*" 
		onchange={(e) => sinpeImage = e.target.files[0]} 
		class="input mt-3"
	/>

{/if}
			</div>

			<!-- RESUMEN -->
			<div class="bg-white p-6 rounded-xl shadow">

				{#each $cart.items as item}
					<div class="flex justify-between mb-2">
						<span>{item.name} x{item.quantity}</span>
						<span>${(item.price * item.quantity).toFixed(2)}</span>
					</div>
				{/each}

				<hr class="my-4"/>

				<div class="flex justify-between font-bold text-lg">
					<span>Total</span>
					<span>${$cart.total.toFixed(2)}</span>
				</div>

				<button onclick={submitOrder} class="w-full mt-6 bg-green-600 text-white py-3 rounded">
					{loading ? 'Procesando...' : 'Comprar'}
				</button>

			</div>

		</div>
	</div>
</section>

<style>
	.input {
		width: 100%;
		padding: 10px;
		margin-bottom: 10px;
		border: 1px solid #ddd;
		border-radius: 6px;
	}
</style>