import map from './map.js';
import init from './init.js';
const db = map.mssql('Server=mssql;Database=master;uid=sa;pwd=P@assword123;TrustServerCertificate=yes;Trusted_Connection=No');

await init(db);

