'use strict';

const express = require('express');
const knex = require('../knex');
// Create an router instance (aka "mini-app")
const router = express.Router();

// Get All (and search by query)
/* ========== GET/READ ALL NOTES ========== */
router.get('/folders', (req, res, next) => {
  knex.select('id', 'name')
    .from('folders')
    .then(results => {
      res.json(results);
    })
    .catch(err => next(err));
});

/* ========== GET/READ SINGLE NOTES ========== */
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


module.exports = router;
