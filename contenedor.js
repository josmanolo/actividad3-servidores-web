const fs = require('fs');

class Contenedor {
    constructor(route) {
        this.route = route;
    }

    async getAll() {
        try {
            const getProducts = await fs.promises.readFile(this.route, 'utf8');
            const productsParse = JSON.parse(getProducts);

            return productsParse;
        } catch (error) {
            return error;
        }
    }

    async save(product) {
        try {
            const getProducts = await fs.promises.readFile(this.route, 'utf8');
            const productsParse = JSON.parse(getProducts);
            const productsLength = productsParse.length;

            productsLength 
                ? await fs.promises.writeFile(this.route, JSON.stringify([...productsParse, {...product, id: productsParse[productsLength - 1].id + 1 }], null, 2))
                : await fs.promises.writeFile(this.route, JSON.stringify([{...product, id: 1}], null, 2));

            return productsLength + 1;
            
        } catch (error) {
            return error;
        }
    }

    async deleteById(id) {
        try {
            const getProducts = await fs.promises.readFile(this.route, 'utf8');
            const productsParse = JSON.parse(getProducts);
            const findProduct = productsParse.find(prod => prod.id === id);

            if(findProduct) {
                const newProducts = productsParse.filter(product => product.id !== id);
                await fs.promises.writeFile(this.route, JSON.stringify(newProducts, null, 2));
            } else {
                return "No se encontró el producto"
            }
            
        } catch (error) {
            return error;
        }
        
    }
    
    async getById(id) {
        try {
            const getProducts = await fs.promises.readFile(this.route, 'utf8');
            const productsParse = JSON.parse(getProducts);
            const findProduct = productsParse.find(prod => prod.id === id);

            return findProduct ? findProduct : null;
        } catch (error) {
            return error;
        }
    }

    async deleteAll() {
        try {
            await fs.promises.writeFile(this.route, JSON.stringify([], null, 2));
        } catch (error) {
            return error;
        }
    }
}

module.exports = Contenedor;

