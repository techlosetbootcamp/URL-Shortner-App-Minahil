// import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// const initialState:  = [];

// export const wishlistSlice = createSlice({
//   name: "wishlist",
//   initialState,
//   reducers: {
//     add(state, action: PayloadAction<PRODUCT_ITEM>) {
//       const existingItem = state?.find(
//         (item) => item?.id === action?.payload.id
//       );
//       if (!existingItem) {
//         state.push(action?.payload);
//       }
//     },
//     remove(state, action: PayloadAction<PRODUCT_ITEM>) {
//       return state?.filter((item) => item?.id !== action?.payload.id);
//     },
//   },
// });

// export const { add, remove } = wishlistSlice?.actions;
// export default wishlistSlice?.reducer;
