const products = [
    {
        id: 1,
        title: "react.js",
        category: "frontend",
        createdAt: "2021-10-31T15:02:00.411Z",
        
    },
    {
        id: 2,
        title: "node.js",
        category: "backend",
        createdAt: "2021-10-31T15:03:23.556Z",
        
    },
    {
        id: 3,
        title: "vue.js",
        category: "frontend",
        createdAt: "2021-11-01T10:47:26.889Z",
        
    },
    
]

const catagories = [
    {
        id: 1,
        title: "frontend",
        description: "frontend of project",
        createAt: "2021-11-01T10:47:26.889Z",
    },
    {
        id: 2,
        title: "backend",
        description: "backend of project",
        createAt: "2021-10-01T10:47:26.889Z",
    },
]


export default class Storage {
    // add new cat
    // save cat
    // getAll cat

    static getAllCatagories() {
        // product , catagory =>localstorage
        const savedCatagories = JSON.parse(localStorage.getItem('category')) || [];
        const sortedCatagories = savedCatagories.sort((a, b) => {
            return new Date(a.createAt) > new Date(b.createAt) ? -1 : 1;
        })
        return sortedCatagories;
    }
    static saveCatagory(categoryToSave) {
        const savedCatagories = Storage.getAllCatagories();
        const existedItem = savedCatagories.find(cat => cat.id === categoryToSave.id);
        if (existedItem) {
            // edit senario
            existedItem.title = categoryToSave.title;
            existedItem.description = categoryToSave.description;
        }else {
            // new category
           
            categoryToSave.id = new Date().getTime();
            categoryToSave.createAt = new Date().toISOString();
            savedCatagories.push(categoryToSave)
        }
        localStorage.setItem('category', JSON.stringify(savedCatagories));
    }
    static saveProducts(productToSave) {

        const savedProducts = Storage.getAllProducts();
        const existedItem = savedProducts.find(p => p.id === productToSave.id);
        console.log(productToSave);
        if (existedItem) {
            // edit senario
            existedItem.title = productToSave.title;
            existedItem.quantity = productToSave.quantity;
            existedItem.category = productToSave.category;
        }else {
            // new category
            productToSave.id = new Date().getTime();
            productToSave.createdAt = new Date().toISOString();
            savedProducts.push(productToSave)
        }
        localStorage.setItem('products', JSON.stringify(savedProducts));
    }
    static getAllProducts(sort = "latest") {
        // product , catagory =>localstorage
        const savedProducts = JSON.parse(localStorage.getItem('products')) || [];

        return savedProducts.sort((a, b) => {

            if (sort === "latest") {
                return new Date(a.createdAt) > new Date(b.createdAt) ? -1 : 1;
            } else if(sort === "earliest") {
                return new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1;
            }
        })
    }
    static deleteProduct(id) {
        const savedProducts = Storage.getAllProducts();
        const filteredProducts = savedProducts.filter((p) => p.id !== parseFloat(id))
            localStorage.setItem('products', JSON.stringify(filteredProducts));
    }
    static editProduct(id) {

        const savedProducts = Storage.getAllProducts();
        const toBeEditedProduct = [...savedProducts].find((p) => p.id === parseFloat(id)); 
        const editInput = [...document.querySelectorAll('[name="input-edit"]')];

        if (toBeEditedProduct) {
            editInput.map((e) => {
               toBeEditedProduct.title = e.value;
            
            })
        }
        // localStorage.setItem('products', JSON.stringify(toBeEditedProduct));
    }

    static productInputValue(e, id) {
        const value = e.target.value; //what user is typing
        const savedProducts = Storage.getAllProducts(); // array(obj) of my products
        const toBeEditedProduct = [...savedProducts].find((p) => p.id === parseFloat(id));
        
        if (toBeEditedProduct) {
            toBeEditedProduct.title = value;
        }
        
        localStorage.setItem('products', JSON.stringify(savedProducts));
    }
}
