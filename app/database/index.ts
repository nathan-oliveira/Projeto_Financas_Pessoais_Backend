import { createConnection } from 'typeorm';

createConnection().catch(error => {
  console.log('Banco de dados OFF');
})
