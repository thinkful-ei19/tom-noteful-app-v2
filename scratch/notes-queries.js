'use strict';
const knex = require('../knex');

//knex.select(1).then(res => console.log(res));

// knex.select('id', 'title', 'content')
//   .from('notes')
//   .where('title', 'like', '%cats%')
//   .then(results => {
//     console.log(results);
//   });


knex
  .select()
  .from('notes')
  .where({id:'1001'})
  .limit(5)
  .debug(true)
  .then(results => console.log(results));

