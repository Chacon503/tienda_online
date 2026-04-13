import { json } from '@sveltejs/kit';
import { supabase } from '$lib/db';

export async function GET() {
	try {
		const { data, error } = await supabase
			.from('products')
			.select('*')
			.order('id', { ascending: true });

		if (error) throw error;

		return json(data);
	} catch (error) {
		console.error('Error fetching products:', error);
		return json({ error: 'Error fetching products' }, { status: 500 });
	}
}
