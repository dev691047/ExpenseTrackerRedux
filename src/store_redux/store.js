import { createSlice } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";

const initialAuthState = {
  isAuthenticated: false,
  localId: "",
  token: "",
};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.localId = action.payload.userId;
      state.token = action.payload.token;
      console.log(action);
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = "";
      state.localId = "";
    },
  },
});

const initialListState = {
  items: [],
};

const listItemsSlice = createSlice({
  name: "listItems",
  initialState: initialListState,
  reducers: {
    addItems(state, action) {
      state.items = [...state.items, action.payload];
      console.log(state.items);
    },
  },
});

const store = configureStore({
  reducer: { items: listItemsSlice.reducer, auth: authSlice.reducer },
});
export const authActions = authSlice.actions;
export const listActions = listItemsSlice.actions;
export default store;
