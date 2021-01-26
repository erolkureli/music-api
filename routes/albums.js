const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://erol:erol@nodecourse.mdb7j.mongodb.net/musicStore?retryWrites=true&w=majority')
    .then(() => ('Connected to mongodb'))
    .catch(err => console.error('Could not connect to MongoDB ...', err));

const express = require('express');
const router = express.Router();

const {ViewModel} = require('../model/viewModel');


router.get('/views', async (req, res) => {
    const collectionName = req.query.collectionName;

    const views = await ViewModel
        .find({ collectionName: collectionName });

    res.send(views);
});

router.get('/add', async (req, res) => {
    const collectionName = req.query.collectionName;
    const newComment = req.query.newComment;

    const view = new ViewModel({
        collectionName: collectionName,
        comment: newComment,
        liked: "0"
    });
    await view.save();
    res.send(view);

});

router.get('/toggleLike', async (req, res) => {
    const collectionName = req.query.collectionName;
    const comment = req.query.comment;
    const liked = req.query.liked;


    const updateComment = await ViewModel.findOneAndUpdate({ collectionName: collectionName, comment: comment },
        {
            collectionName: collectionName,
            comment: comment,
            liked: liked
        }, { new: true });

    res.send(updateComment);

});

router.get('/update', async (req, res) => {
    const collectionName = req.query.collectionName;
    const newComment = req.query.newComment;
    const oldComment = req.query.oldComment;
    const liked = req.query.liked;


    const updateComment = await ViewModel.findOneAndUpdate({ collectionName: collectionName, comment: oldComment },
        {
            collectionName: collectionName,
            comment: newComment,
            liked: liked
        }, { new: true });

    res.send(updateComment);

});

module.exports = router;