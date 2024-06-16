import orange from 'orange-orm';
import db from './db.js';
import init from './init.js';

await init(db);

orange.on('query', console.dir);

const harry = await db.customer.insert({
    name: 'Harry'
});

const wolfgang = await db.customer.insert({
    name: 'Wolgang'
});

const hermine = await db.customer.insert({
    name: 'Hermine'
});

const orders = await db.order.insert([{
    customer: harry,
    orderDate: new Date(),
    deliveryAddress: {
        postalPlace: 'Surrey'
    },
    lines: [{
        product: 'magic wand'
    }, {
        product: 'broomstick'
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
        product: 'magic flute'
    }]
}, {
    orderDate: new Date(),
    customerId: hermine.id,
    deliveryAddress: {
        postalPlace: 'Hampstead'
    },
    lines: [{
        product: 'boof of monsters'
    }]
}], {customer: true, deliveryAddress: true, lines: true});

console.dir(orders, { depth: Infinity });
