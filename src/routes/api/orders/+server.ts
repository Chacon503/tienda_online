import { json } from '@sveltejs/kit';
import { supabase } from '$lib/db';

export async function POST({ request }) {
	try {
		const data = await request.json();

		console.log('DATA RECIBIDA:', data);

		if (!data.items || data.items.length === 0) {
			throw new Error('No hay productos en la orden');
		}

		// USER
		const { data: existingUser } = await supabase
			.from('users')
			.select('id')
			.eq('email', data.email)
			.maybeSingle();

		let userId;

		if (existingUser) {
			userId = existingUser.id;
		} else {
			const { data: newUserData, error } = await supabase
				.from('users')
				.insert({
					email: data.email,
					full_name: data.full_name,
					phone: data.phone,
					address: data.address,
					city: data.city,
					postal_code: data.postal_code,
					country: data.country
				})
				.select();

			if (error) throw error;

			userId = newUserData[0].id;
		}

		// ORDER
		const orderNumber = `ORD-${Date.now()}`;

		const { data: orderData, error: orderError } = await supabase
			.from('orders')
			.insert({
				order_number: orderNumber,
				user_id: userId,
				email: data.email,
				full_name: data.full_name,
				phone: data.phone,
				address: data.address,
				city: data.city,
				postal_code: data.postal_code,
				country: data.country,
				total_amount: data.total_amount,
				status: 'pending',
				payment_method: data.payment_method // ✅ FIX
			})
			.select();

		if (orderError) throw orderError;

		const orderId = orderData[0].id;

		// ITEMS
		const orderItems = data.items.map(item => ({
			order_id: orderId,
			product_id: item.id,
			quantity: item.quantity,
			unit_price: item.price,
			subtotal: item.price * item.quantity
		}));

		const { error: itemsError } = await supabase
			.from('order_items')
			.insert(orderItems);

		if (itemsError) throw itemsError;

		return json({ success: true, orderNumber });

	} catch (error) {
		console.error(error);
		return json({ error: 'Error creating order', details: error.message }, { status: 500 });
	}
}