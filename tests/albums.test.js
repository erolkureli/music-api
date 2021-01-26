const express = require('express');
const app = express();
const supertest = require('supertest');
const request = supertest(app);

const albums = require('../routes/albums');
app.use('/api/albums', albums);

const { ViewModel } = require('../model/viewModel');


describe('Rest apis', () => {
    it('Should return views', async () => {
        ViewModel.find = jest.fn().mockResolvedValue([{
            _id: '5dbff32e367a343830cd2f49',
            collectionName: "collection",
            comment: 'comment1',
            liked: '0'
        }
        ]);

        const response = await request.get('/api/albums/views?collectionName=collection');
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0]['collectionName']).toBe('collection');
        expect(response.body[0]['comment']).toBe('comment1');
        expect(response.body[0]['liked']).toBe('0');
    });

    it('Should add a new view', async () => {
        ViewModel.save = jest.fn();

        const response = await request.get('/api/albums/add?collectionName=collection&newComment=newComment');
        expect(response.status).toBe(200);
        expect(response).not.toBeNull();
    });

    it('Should toggle a like', async () => {
        ViewModel.findOneAndUpdate = jest.fn().mockResolvedValue([{
            _id: '5dbff32e367a343830cd2f49',
            collectionName: "collection",
            comment: 'comment1',
            liked: '0'
        }
        ]);


        const response = await request.get('/api/albums/toggleLike?collectionName=collection&comment=newComment&liked=0');
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0]['collectionName']).toBe('collection');
        expect(response.body[0]['comment']).toBe('comment1');
        expect(response.body[0]['liked']).toBe('0');
    });

    it('Should update a comment', async () => {
        ViewModel.findOneAndUpdate = jest.fn().mockResolvedValue([{
            _id: '5dbff32e367a343830cd2f49',
            collectionName: "collection",
            comment: 'newComment',
            liked: '0'
        }
        ]);


        const response = await request.get('/api/albums/update?collectionName=collection&newComment=newComment&liked=0&oldComment=oldComment');
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0]['collectionName']).toBe('collection');
        expect(response.body[0]['comment']).toBe('newComment');
        expect(response.body[0]['liked']).toBe('0');
    });
});