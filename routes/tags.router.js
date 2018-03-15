'use strict';

const express = require('express');
const knex = require('../knex');
// Create an router instance (aka "mini-app")
const router = express.Router();

// Get All (and search by query)
/* ========== GET/READ ALL TAGS ========== */
router.get('/tags', (req, res, next) => {
  knex.select('id', 'name')
    .from('tags')
    .then(results => {
      res.json(results);
    })
    .catch(err => next(err));
});

/* ========== GET/READ SINGLE TAGS ========== */
router.get('/tags/:id', (req, res, next) => {
  const tagsId = req.params.id;
  knex.select('name')
    .from('tags')
    .where('tags.id', tagsId)
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


/* ========== POST TAGS ========== */
router.post('/tags', (req, res, next) => {
  const { name } = req.body;

  /***** Never trust users. Validate input *****/
  if (!name) {
    const err = new Error('Missing `name` in request body');
    err.status = 400;
    return next(err);
  }

  const newItem = { name };

  knex.insert(newItem)
    .into('tags')
    .returning(['id', 'name'])
    .then((results) => {
      // Uses Array index solution to get first item in results array
      const result = results[0];
      res.location(`${req.originalUrl}/${result.id}`).status(201).json(result);
    })
    .catch(err => next(err));
});

/* ========== PUT/UPDATE A SINGLE FOLDER ========== */
router.put('/tags/:id', (req, res, next) => {
  const tagsId = req.params.id;
  /***** Never trust users - validate input *****/
  const updateObj = {};
  const updateableFields = ['name'];

  updateableFields.forEach(field => {
    if (field in req.body) {
      updateObj[field] = req.body[field];
    }
  });
  /***** Never trust users - validate input *****/
  if (!updateObj.name) {
    const err = new Error('Missing `name` in request body');
    err.status = 400;
    return next(err);
  }
  knex('tags')
    .where({ id: tagsId })
    .update({
      name: req.body.name,
    }, ['id', 'name'])
    .then(results => res.json(results))
    .catch(err => next(err));
});


/* ========== DELETE/REMOVE A SINGLE FOLDER ========== */
router.delete('/tags/:id', (req, res, next) => {
  const tagsId = req.params.id;

  knex('tags')
    .where({ id: tagsId })
    .del()
    .then(results => res.json(results))
    .catch(next);
});






module.exports = router;