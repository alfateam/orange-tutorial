import rdb from 'rdb';
import map from './map.js';
import init from './init.js';

const db = map.mssql('Server=mssql;Database=master;uid=sa;pwd=P@assword123;TrustServerCertificate=yes;Trusted_Connection=No');

await init(db);

rdb.on('query', console.dir);

const harry = await db.customer.insert({
    name: 'Harry'
});

const wolfgang = await db.customer.insert({
    name: 'Wolgang'
});

const hermine = await db.customer.insert({
    name: 'Hermine'
});

await db.order.insert([{
    customer: harry,
    orderDate: new Date(),
    deliveryAddress: {
        postalPlace: 'Surrey'
    },
    lines: [{
        product: 'tryllestav'
    }, {
        product: 'sopelime'
    }]
}, {
    customer: {
        id: wolfgang.id
    },
    orderDate: '1780-01-27T13:30:23',
    deliveryAddress: {
        postalPlace: 'Salzburg'
    },
    lines: [{
        product: 'tryllefløyte'
    }]
}, {
    orderDate: new Date(),
    customerId: hermine.id,
    deliveryAddress: {
        postalPlace: 'Hampstead'
    },
    lines: [{
        product: 'bok om monster'
    }]
}], { customer: true, deliveryAddress: true, lines: true });

const filter = db.order.customer.name.eq('Hermine');
const order = await db.order.getOne(filter, { lines: true })
order.lines.push({
    product: 'sopelime'
});
order.orderDate = new Date();
await order.saveChanges();

const filter2 = db.order.lines.all(x => x.product.contains('trylle')).not();
const orders = await db.order.getMany( filter2, { lines: true, deliveryAddress: true, customer: true});

console.dir(orders, { depth: Infinity });
