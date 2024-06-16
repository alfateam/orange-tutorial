import map from './map.js';
const db = map.http(`http://localhost:3000/orange`);

// db.interceptors.request.use((config) => {    
//     config.headers.Authorization = 'Bearer 2';
//     return config;
// });

// db.interceptors.response.use(
//     response => response,
//     error => {
//         //check error.response.statuscheck and dispatch to login
//         return Promise.reject(error);
//     }
// );

getOrders();

async function getOrders() {
    const rows = await db.order.getAll({
        customer: true,
        deliveryAddress: true,
        lines: true
    });

    await rows.saveChanges();
    console.dir( rows, {depth: Infinity});
}

