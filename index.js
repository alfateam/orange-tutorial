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

console.dir(wolfgang)
console.dir(harry);
console.dir(hermine);