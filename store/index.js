import { createStore } from "redux";
// import { create } from 'zustand'
// si reduxi tha felo
// const useStore = create((set) => ({
//   searchValue: '',
//   lastName: '',
//   updateSearchValue: (searchValue) => set(() => ({ searchValue: searchValue })),
//   updateLastName: (lastName) => set(() => ({ lastName: lastName })),
// }))

const filterCategoriesReducer = (
  state = { category: "", searchValue: "", filterString: "", loggedUserId: "", loggedUser: {} },
  action
) => {
  if (action.type === "changeCategory") {
    return {
      category: action.category,
    };
  }
  if (action.type === "searchValue") {
    return {
      searchValue: action.searchValue,
    };
  }
  if (action.type === "filterString") {
    return {
      filterString: action.filterString,
    };
  }
  if (action.type === "loggedUserId") {
    return {
      loggedUserId: action.loggedUserId,
    };
  }
  if (action.type === "loggedUser") {
    return {
      loggedUser: action.loggedUser,
    };
  }
  return state;
};

const store = createStore(filterCategoriesReducer);

export default store;
// export default useStore;
