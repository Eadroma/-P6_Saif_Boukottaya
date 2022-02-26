const fs = require('fs');
const Sauce = require('../models/Sauce');
const modelSauce = require('../models/Sauce');

exports.createSauce = (req, res, next) => {
    const sauceData = JSON.parse(req.body.sauce);
    delete sauceData._id;
    const sauce = new modelSauce({
        ...sauceData,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${
            req.file.filename
          }`,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: []
    });
    sauce.save()
        .then(() => {
            res.statust(201).json({
                message: 'Sauce created!'
            });
        })
        .catch((err) => {
            res.status(201).json({
                error: err
            });
        });
};

exports.updateSauce = (req, res, next) => {
    if (req.file) {
      modelSauce.findOne({ _id: req.params.id })
        .then((sauce) => {
          // Delete the previous image before saving the new one//
          const fileName = sauce.imageUrl.split('/images/')[1];
          fs.unlink(`images/${fileName}`, () => {
            const sauceObject = {
              ...JSON.parse(req.body.sauce),
              imageUrl: `${req.protocol}://${req.get('host')}/images/${
                req.file.filename
              }`,
            };
            sauce.updateOne(
              { _id: req.params.id },
              { ...sauceObject, _id: req.params.id }
            )
              .then(() =>
                res.status(200).json({ message: 'Sauce updated successfully.' })
              )
              .catch((error) => res.status(400).json({ error }));
          });
        })
        .catch((error) => res.status(500).json({ error }));
    } else {
      const sauceObject = { ...req.body };
      modelSauce.updateOne(
        { _id: req.params.id },
        { ...sauceObject, _id: req.params.id }
      )
        .then(() =>
          res.status(200).json({ message: 'Sauce updated successfully.' })
        )
        .catch((error) => res.status(400).json({ error }));
    }
  };

exports.deleteSauce = (req, res, next) => {
    modelSauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        modelSauce.deleteOne({ _id: req.params.id })
          .then(() =>
            res.status(200).json({ message: 'Sauce deleted successfully.' })
          )
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
}

exports.readSauce = (req, res, next) => {
    modelSauce.findOne({
            _id: req.params.id
        })
        .then((sauce) => res.status(200).json(sauce))
        .catch((err) => res.status(404).json({
            error: err
        }));
};

exports.readAllSauces = (req, res, next) => {
    modelSauce.find().then((sauces) => res.status(200).json(sauces))
}