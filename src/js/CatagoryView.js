// title + des => {} => saveCatagory =>\
import Storage from "./Storage.js";

const categoryTitle = document.querySelector('#catagory-title');
const catDescription = document.querySelector('#catagory-description');
const addNewCatagoryBtn = document.querySelector('#add-new-category');
const toggleAddCategoryBtn = document.getElementById('toggle-add-category');
const categoryWrapper = document.getElementById('category-wrapper');
const cancelAddCategory = document.getElementById('cancel-category');

class CatagoryView {

    constructor() {
        addNewCatagoryBtn.addEventListener('click', (e) => this.addNewCategory(e));
        toggleAddCategoryBtn.addEventListener('click', (e) => this.toggleAddCategory(e));
        cancelAddCategory.addEventListener('click', (e) => this.cancelAddCategory(e));
        this.categories = [];
    }

    addNewCategory(e) {
        e.preventDefault();
        const title = categoryTitle.value;
        const description = catDescription.value;

        if (!title || !description) return;
        Storage.saveCatagory({title, description});
        this.categories = Storage.getAllCatagories();
        // we need to update dom / update selecOption
        this.createCategoriesList();
        catDescription.value = '';
        categoryTitle.value = '';
        // btn
        
    }
    setApp() {
        this.categories = Storage.getAllCatagories();
    }
    createCategoriesList() {

        let result = `<option class="bg-slate-500 text-slate-400" value="0">select a catagory</option>`;
        this.categories.forEach(element => {
            result += `<option class="bg-slate-500 text-slate-400" value=${element.id}>${element.title}</option>`;
        });

        const categoryDOM = document.querySelector('#product-catagory');
        categoryDOM.innerHTML = result;
        
    }
    toggleAddCategory(e) {
        e.preventDefault();
        categoryWrapper.classList.remove('hidden');
        toggleAddCategoryBtn.classList.add('hidden');
    }
    cancelAddCategory() {
        e.preventDefault();
        categoryWrapper.classList.add('hidden');
        toggleAddCategoryBtn.classList.remove('hidden');
    }
}


export default new CatagoryView();