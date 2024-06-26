import orange from 'orange-orm';
import init from './init.js';
import db from './db.js';

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

await db.order.insertAndForget([{
    customer: harry,
    orderDate: new Date(),
    deliveryAddress: {
        postalPlace: 'Surrey'
    },
    lines: [{
        product: 'magic wand',
        amount: 100,
    }, {
        product: 'broomstick',
        amount: 200
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
        product: 'magic flute',
        amount: 300
    }]
}, {
    orderDate: new Date(),
    customerId: hermine.id,
    deliveryAddress: {
        postalPlace: 'Hampstead'
    },
    lines: [{
        product: 'book of monsters',
        amount: 400
    }]
}]);

const order = await db.order.getOne(undefined, {
    where: x => x.customer.name.eq('Hermine'),
    lines: true
})
order.lines.push({
    product: 'broomstick',
    amount: 200
});
order.orderDate = new Date();
await order.saveChanges();

const orders = await db.order.getAll({
    totalAmount: x => x.sum( x => x.lines.amount),
    avgAmount: x => x.avg( x => x.lines.amount),
    noLines: x => x.count( x => x.lines.amount),
    deliveryAddress: true,
    customerName: x => x.customer.name,
    orderBy: 'orderDate desc'    
});

console.dir(orders, { depth: Infinity });

const aggregate = await db.order.aggregate({
    customerName: x => x.customer.name,
    postalPlace: x => x.deliveryAddress.postalPlace,
    total: x => x.sum(x => x.lines.amount),
    avg: x => x.avg(x => x.lines.amount),
    max: x => x.max(x => x.lines.amount),
    min: x => x.min(x => x.lines.amount),
    noLines: x => x.count(x => x.lines.amount)
});

console.dir(aggregate, { depth: Infinity});

