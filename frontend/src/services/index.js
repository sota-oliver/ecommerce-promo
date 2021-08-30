import axios from 'axios'

let Service = axios.create({
    baseURL: 'http://localhost:3000/',
    timeout: 1000
})
let Items = {
    async getItems(){
        let response = await Service.get('/items')
        let data = response.data;
        return data;
    },
    async getOne(id){
        let response = await Service.get(`/items/${id}`);
        let doc = response.data;
        return {
                item_id: doc.item_id,
                item_name: doc.item_name,
                item_price: doc.item_price,
                item_image: doc.item_image
        };
    }
}
export { Service, Items }