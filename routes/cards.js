const cards = require('express').Router();
const { getCards, createCard, deleteCard } = require('../controllers/card');
const { createCardValidation, cardIdValidation } = require('../middlewares/validation');

cards.get('/', getCards);
cards.post('/', createCardValidation, createCard);
cards.delete('/:cardId', cardIdValidation, deleteCard);

module.exports = cards;
