import { createConnection } from 'typeorm';

createConnection()
  .then(connection => {
    console.log('Banco de dados ON')
  })
  .catch(error => {
    console.log('Banco de dados OFF')
  })
