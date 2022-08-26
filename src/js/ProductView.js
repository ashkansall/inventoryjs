import Storage from "./Storage.js";


const addNewProductBtn = document.getElementById('add-new-product');
const searchInput = document.getElementById('search-input');
const selectedSort = document.getElementById('sort-products');
// const deleteProduct = document.getSelection('delete-product');

class ProductView {
    constructor() {
        addNewProductBtn.addEventListener('click', (e) => this.addNewProduct(e));
        searchInput.addEventListener('input', (e) => this.searchProducts(e));
        selectedSort.addEventListener('change', (e) => this.sortProdcuts(e));
        this.products = [];
    }

    setApp() {
        this.products = Storage.getAllProducts();
    }
    addNewProduct(e) {
        e.preventDefault();
        const title = document.querySelector('#product-title').value;
        const quantity = document.querySelector('#product-quantity').value;
        const category = document.querySelector('#product-catagory').value;

        if (!title || !category || !quantity) return;
        Storage.saveProducts({title, category, quantity });
        this.products = Storage.getAllProducts();
        this.createProductList(this.products);
        console.log(this.products);
    }
    createProductList(products) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const prodcutsDOM = document.getElementById('products-list');
        let result = '';
        products.forEach((item) => {
            const selectedCategory = Storage.getAllCatagories().find((c) => c.id == item.category);
            
            result += `<div class="flex justify-between items-center">
            <input data-input-id=${item.id} class="text-slate-400 bg-transparent rounded-xl" type="text" name="input-edit" value=${item.title} />
            <div class="flex items-center gap-x-3 mb-4">
                <span class="text-slate-400" id="edit-title">${new Date().toLocaleDateString('fa-Ir', options)}</span>
                <span class="block px-3 py-0.5 border border-slate-400 rounded-xl text-slate-400 text-sm">${selectedCategory.title}</span>
                <span class="flex items-center justify-center w-7 h-7 rounded-full bg-slate-500 text-slate-300 border-slate-400 border-2">${item.quantity}</span>
                <button data-id=${item.id} class="delete-product border px-2 py-0.5 border-red-400 rounded-xl text-red-400 hover:bg-red-400 hover:text-white transition-all duration-100" id="delete-product">Delete</button>
                <button data-edit-id=${item.id} class="edit-product border px-2 py-0.5 border-yellow-300 rounded-xl text-yellow-400 hover:bg-yellow-300 hover:text-slate-800 transition-all duration-100">Edit</button>
            </div>
        </div>`;
        })
        prodcutsDOM.innerHTML = result;

        const deleteBtns = [...document.querySelectorAll('.delete-product')];
        // console.log(deleteBtns);
        deleteBtns.forEach(element => {
            element.addEventListener('click', (e) => this.deleteProduct(e));
        });


        // edit btns
        const editBtns = [...document.querySelectorAll('.edit-product')];
        editBtns.forEach(item => {
            item.addEventListener('click', (e) => this.editProducts(e));
        });

        // edit input value
        const editInput = [...document.querySelectorAll('[name="input-edit"]')];
        editInput.forEach(element => {
            element.addEventListener('change', (e) => this.editInputValue(e));
        });

        
    }
    searchProducts(e) {
        const value = e.target.value.trim().toLowerCase();
        // console.log(value);
        const filteredProdcuts = this.products.filter((p) => p.title.toLowerCase().includes(value));
        console.log(this.products);
        this.createProductList(filteredProdcuts);
    }
    sortProdcuts(e) {
        const value = e.target.value;
        console.log({value});
        this.products = Storage.getAllProducts(value);
        this.createProductList(this.products);
    }
    deleteProduct(e) {
        const productId = e.target.dataset.id;
        // console.log(e.target.dataset.id);
        Storage.deleteProduct(productId);
        this.products = Storage.getAllProducts();
        this.createProductList(this.products);
    }
    editProducts(e) {
        const productId = e.target.dataset.editId;
        Storage.editProduct(productId);
        this.products = Storage.getAllProducts();
        this.createProductList(this.products); 
    }
    editInputValue(e) {
        const inputId = e.target.dataset.inputId;
        Storage.productInputValue(e, inputId);
    
    }
    
}



export default new ProductView();



