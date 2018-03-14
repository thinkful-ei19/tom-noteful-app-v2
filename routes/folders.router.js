'use strict';

const express = require('express');
const knex = require('../knex');
// Create an router instance (aka "mini-app")
const router = express.Router();

// Get All (and search by query)
/* ========== GET/READ ALL FOLDERS ========== */
router.get('/folders', (req, res, next) => {
  knex.select('id', 'name')
    .from('folders')
    .then(results => {
      res.json(results);
    })
    .catch(err => next(err));
});

/* ========== GET/READ SINGLE FOLDERS ========== */
router.get('/folders/:id', (req, res, next) => {
  const noteId = req.params.id;
  knex.select('id', 'title', 'content')
    .from('folders')
    .where('folders.id', noteId)
    .debug(true)
    .then(([item]) => {
      if (item) {
        res.json(item);
      } else {
        next();
      }
    })
    .catch(next);
});

/* ========== POST/CREATE FOlDER ========== */
// router.post('/folders', (req, res, next) => {
//   const {id, name} = req.body; 
//   const newFolder = { id, name };
//   /***** Never trust users - validate input *****/
//   if (!newFolder.title) {
//     const err = new Error('Missing `title` in request body');
//     err.status = 400;
//     return next(err);
//   }
//   const update = {
//     id,
//     name
//   };
//   let foldersID;
//   knex.insert(foldersID)
//     .into('folders')
//     .returning('id')
//     .then(([result]) => {
//       res.location(`${req.originalUrl}/${result.id}`).status(201).json(result);
//     })
//     .catch(err => next(err));
// });




module.exports = router;