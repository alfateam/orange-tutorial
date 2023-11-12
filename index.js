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

console.dir(wolfgang)
console.dir(harry);