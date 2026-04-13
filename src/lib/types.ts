export interface Product {
	id: number;
	name: string;
	price: number;
	image?: string;
	image_url?: string; // Legacy
	description?: string;
	category_id?: number;
	stock?: number;
	is_customizable?: boolean;
}

export interface CartItem extends Product {
	quantity: number;
}

