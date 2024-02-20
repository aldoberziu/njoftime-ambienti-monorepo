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
// const filterSlice = createSlice({
//   name: "filterString",
//   initialState: { filterString: "" },
//   reducers: {
//     filter(state, action) {
//       state.filterString = action.payload;
//     },
//   },
// });
const initialFilter = {
  city: "",
  zone: "",
  structure: "",
  minP: 0,
  maxP: 0,
  minF: 0,
  maxF: 0,
  elevator: null,
};
const filterSlice = createSlice({
  name: "filterString",
  initialState: initialFilter,
  reducers: {
    filter(state, action) {
      switch (action.payload.type) {
        case "city": {
          state.filterString = { ...state.filterString, city: action.payload.payload };
          break;
        }
        case "zone": {
          state.filterString = { ...state.filterString, zone: action.payload.payload };
          break;
        }
        case "structure": {
          state.filterString = { ...state.filterString, structure: action.payload.payload };
          break;
        }
        case "minP": {
          state.filterString = { ...state.filterString, minP: action.payload.payload };
          break;
        }
        case "maxP": {
          state.filterString = { ...state.filterString, maxP: action.payload.payload };
          break;
        }
        case "minF": {
          state.filterString = { ...state.filterString, minF: action.payload.payload };
          break;
        }
        case "maxF": {
          state.filterString = { ...state.filterString, maxF: action.payload.payload };
          break;
        }
        case "elevator": {
          state.filterString = { ...state.filterString, elevator: action.payload.payload };
          break;
        }
        case "reset": {
          state.filterString = initialFilter;
          break;
        }
      }
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
      state.loggedUser = { ...action.payload };
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
