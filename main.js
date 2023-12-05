//1er desafio entregable backend

class ProductManager {
    static ultId = 0;

    //Desarrollamos el constructor con el elemento products
    
    constructor () {
        this.products = [];
    }

    addProduct(title, description, price, image, code, stock) {

        //Validamos que se coleten todos los campos
        if(!title || !description || !price || !image || !code || !stock) 
        {
            console.log("Todos los campos deben estar completos");
            return;
        }
        //Validamos que el codigo sea unico
        if(this.products.some(item => item.code === code)) {
            console.log("El codigo debe ser unico");
            return;
        }

        //Creamos un objeto nuevo con todos los datos
        const newProduct = {
            id: ++ProductManager.ultId,
            title,
            description,
            price,
            image,
            code,
            stock,            
        }
        //Se agrega al array
        this.products.push(newProduct);
    }

    getProducts() {
        console.log(this.products)

    }

    getProductById(id) {
        const product = this.products.find(item => item.id === id);
        if (!product) {
            console.log("Producto no encontrado");
        } else {
            console.log("Producto encontrado:", product);
        }
    }
}
//Se crea una instancia de la clase ProductManager
const manager = new ProductManager();

//GetProducts devuelve un arreglo vacio
manager.getProducts();

manager.addProduct("Producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);

manager.getProducts();

//Testing

//Se debe agregar el objeto sin repetir el Id
manager.addProduct("Producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);

//Todos los campos son obligatorios
manager.addProduct("Producto prueba", "Este es un producto prueba", "Sin imagen", "abc124", 25);

//El id se autoincrementa

manager.addProduct("Hamburguesa Paty", "100% carne vacuna", 200, "Sin imagen", "abc125", 25);

manager.addProduct("Hambuerguesa Swuift", "100% carne vacuna", 200, "Sin imagen", "abc126", 25);

//Se llamara al metodo getProducts nuevamente y debe aparecer el producto recien agregado

manager.getProducts();

//getProdutcsById debe devolver error si no encuentra el producto o el producto en caso de encontrarlo

manager.getProductById(2);

manager.getProductById(30);


