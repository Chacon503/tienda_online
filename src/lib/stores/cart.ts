import { writable } from 'svelte/store';

// Interfaces movidas a src/lib/types.ts
import type { Product, CartItem } from '$lib/types';

function createCart() {
	const { subscribe, update } = writable<{ items: CartItem[]; total: number }>({ items: [], total: 0 });

	return {
		subscribe,
		addItem: (product: Product) => {
			update((cart) => {
				const existing = cart.items.find((item) => item.id === product.id);
				if (existing) {
					existing.quantity += 1;
				} else {
					cart.items.push({ ...product, quantity: 1 });
				}
				cart.total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
				return cart;
			});
		},
		removeItem: (id: number) => {
			update((cart) => {
				const index = cart.items.findIndex((item) => item.id === id);
				if (index !== -1) {
					cart.items.splice(index, 1);
					cart.total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
				}
				return cart;
			});
		},
		updateQuantity: (id: number, quantity: number) => {
			update((cart) => {
				const item = cart.items.find((i) => i.id === id);
				if (item) {
					item.quantity = quantity;
					if (quantity <= 0) {
						const index = cart.items.findIndex((i) => i.id === id);
						cart.items.splice(index, 1);
					}
					cart.total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
				}
				return cart;
			});
		},
		clearCart: () => {
			update(() => ({ items: [], total: 0 }));
		}
	};
}

export const cart = createCart();

