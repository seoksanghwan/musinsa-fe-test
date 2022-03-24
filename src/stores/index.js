import FilterStore from "./FilterStore";
import ItemListStore from "./ItemListStore";

const stores = {
  filterStore: new FilterStore(this),
  itemListStore: new ItemListStore(this)
};

export default stores;