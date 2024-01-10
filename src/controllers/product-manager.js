const fs = require("fs").promises;

class ProductManager {
    static ultId = 0;
    
    constructor(path) {
        this.products = [];
        this.path = path;
    }
    //Metodos

    async addProduct(newObject) {
        let {title, description, price, img, code, stock, status = true, category,} = newObject;
 
        if(!title || !description || !price || !img || !code || !stock || !status || !category) {
            console.log("Todos los campos deben estar completos");
            return;
        }
        
        if(this.products.some(item => item.code === code)) {
            console.log("El codigo debe ser unico");
            return;
        }
   
        const newProduct = {
            id: ++ProductManager.ultId,
            title,
            description,
            price,
            img,
            code,
            stock,
            status,
            category            
        }
        

        this.products.push(newProduct);

        //Guardo el array en el archivo

        await this.saveFile(this.products);

    }

    async getProducts() {
        try {
            //Debe tener un método getProducts, el cual debe leer el archivo de productos y devolver todos los productos en formato de arreglo.

            const arrayProducts = this.readFile();
            return arrayProducts;
        } catch (error) {
            console.log("Error al leer el archivo", error);
        }

    }


    async getProductById(id) {
        try {
            const arrayProducts = await this.readFile();
            const found = arrayProducts.find(item => item.id === id);

                if(!found) {
                    console.log("Producto no encontrado");
                } else {
                    console.log("Producto encontrado");
                    return found;
                }

        } catch (error) {
            console.log("Error al leer archivo", error);
        }
        
    }

    //Nuevos metodos desafio 2

    async readFile() {
        try {
            const responce = await fs.readFile(this.path, "utf-8");
            const arrayProducts = JSON.parse(responce);
            return arrayProducts;

        }catch (error) {
            console.log("Error al leer archivo", error);
        }
    }

    async saveFile(arrayProducts){
        try{
            await fs.writeFile(this.path, JSON.stringify(arrayProducts, null, 2))
        } catch (error) {
            console.log("Error al guardar archivo", error);
        }
    }

    //Se actualiza algun producto
    async updateProduct(id, productUpdated) {
        try {
            const arrayProducts = await this.readFile();

            const index = arrayProducts.findIndex(item=> item.id === id);

            if(index !== -1) {
                //Array splice reemplaza el objeto en la posicion del index
                arrayProducts.splice(index, 1, productUpdated);
                await this.saveFile(arrayProducts);
            } else {
                console.log("No se encontró el producto");
            }

        } catch (error) {
            console.log("Error al actualizar", error);
        }
    }


    async deleteProduct(id) {
        try {
            const arrayProducts = await this.readFile();

            const index = arrayProducts.findIndex(item=> item.id === id);

            if(index !== -1) {
                //Array splice reemplaza el objeto en la posicion del index
                arrayProducts.splice(index, 1);
                await this.saveFile(arrayProducts);
            } else {
                console.log("No se encontró el producto");
            }

        } catch (error) {
            console.log("Error al eliminar", error);
        }
    }

}

module.exports = ProductManager;