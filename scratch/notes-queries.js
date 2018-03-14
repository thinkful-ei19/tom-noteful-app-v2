'use strict';
const knex = require('../knex');

//knex.select(1).then(res => console.log(res));

// knex.select('id', 'title', 'content')
//   .from('notes')
//   .where('title', 'like', '%cats%')
//   .then(results => {
//     console.log(results);
//   });


// knex.select('id', 'title', 'content')
//   .from('notes')
//   .where({id:'1005'})
//   .limit(5)
//   .debug(true)
//   .then(results => console.log(results));

// 3/14/18

knex.select('notes.id', 'title', 'content', 'folders.id as folderId', 'folders.name as folderName')
  .from('notes')
  .leftJoin('folders', 'notes.folder_id', 'folders.id')
  .modify(function (queryBuilder) {
    if (searchTerm) {
      queryBuilder.where('title', 'like', `%${searchTerm}%`);
    }
  })
  .modify(function (queryBuilder) {
    if (folderId) {
      queryBuilder.where('folderId', folderId);
    }
  })
  .orderBy('notes.id')
  .then(results => {
    res.json(results);
  })
  .catch(err => next(err));