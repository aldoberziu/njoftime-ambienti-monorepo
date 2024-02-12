import { createSlice, configureStore } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "changeCategory",
  initialState: { category: "" },
  reducers: {
    category(state, action) {
      state.category = action.payload;
    },
  },
});
const searchSlice = createSlice({
  name: "searchValue",
  initialState: { searchValue: "" },
  reducers: {
    search(state, action) {
      state.searchValue = action.payload;
    },
  },
});
const filterSlice = createSlice({
  name: "filterString",
  initialState: { filterString: "" },
  reducers: {
    filter(state, action) {
      state.filterString = action.payload;
    },
  },
});
const loggedUserSlice = createSlice({
  name: "loggedUser",
  initialState: {
    _id: "",
    timeJoined: 0,
    emails: [],
    phoneNumbers: [],
    favorites: [],
  },
  reducers: {
    user(state, action) {
      state.loggedUser = {
        _id: action.payload._id,
        timeJoined: action.payload.timeJoined,
        emails: action.payload.emails,
        phoneNumbers: action.payload.phoneNumbers,
        favorites: action.payload.favorites,
      };
    },
    favorites(state, action) {
      if (!state.loggedUser.favorites.includes(action.payload)) {
        state.loggedUser.favorites = [...state.loggedUser.favorites, action.payload];
      } else {
        state.loggedUser.favorites = state.loggedUser.favorites.filter(
          (item) => item !== action.payload
        );
      }
    },
  },
});

const store = configureStore({
  reducer: {
    category: categorySlice.reducer,
    search: searchSlice.reducer,
    filter: filterSlice.reducer,
    user: loggedUserSlice.reducer,
  },
});
export const categoryActions = categorySlice.actions;
export const searchActions = searchSlice.actions;
export const filterActions = filterSlice.actions;
export const userActions = loggedUserSlice.actions;

export default store;
