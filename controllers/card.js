const Card = require('../models/card');
const NotFoundError = require('../middlewares/errors/not-found-err');
const ForbiddenErr = require('../middlewares/errors/rorbidden-err');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate('owner')
    .then((cards) => res.status(200).send({ data: cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Нет карточки с таким id');
      } else if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenErr('Невозможно удалить чужую карточку');
      } else {
        res.send({ data: card });
      }
    })
    .catch(next);
};
