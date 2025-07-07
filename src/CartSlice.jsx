import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
        // Check if the item already exists in the cart
        const existing = state.items.find(
        (item) => item.name === action.payload.name);
        if (existing) {
            // If it exists, increase its quantity
            existing.quantity += 1;
        } else {
            // Otherwise, add it with quantity = 1
            state.items.push({ ...action.payload, quantity: 1 });
        }
    },
    removeItem: (state, action) => {
      // Remove item by name
      state.items = state.items.filter(
        (item) => item.name !== action.payload.name
      );
    },
    updateQuantity: (state, action) => {
        // Update quantity for a specific item
      const { name, quantity } = action.payload;
      const existing = state.items.find((item) => item.name === name);
      if (existing) {
        existing.quantity = quantity;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
