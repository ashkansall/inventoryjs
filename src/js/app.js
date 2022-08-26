import CatagoryView from "./CatagoryView.js";
import ProductView from "./ProductView.js";


document.addEventListener('DOMContentLoaded', () => {
    CatagoryView.setApp();
    ProductView.setApp();
    // create categories options
    CatagoryView.createCategoriesList();
    ProductView.createProductList(ProductView.products);
});

