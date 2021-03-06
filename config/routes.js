var express = require('express');
var CONFIG  = require('./config');
var request = require('../request');
var Thread  = require('../models/thread');
var Post    = require('../models/post');
var User    = require('../models/user');
var Guild   = require('../models/guild');
var __      = require('lodash');

var homeController     = require('../controllers/home');
var forumsController   = require('../controllers/forums');
var rosterController   = require('../controllers/roster');
var galleryController  = require('../controllers/gallery');
var settingsController = require('../controllers/settings');
var userController     = require('../controllers/user');

module.exports = function(app, passport) {

    // static content
    app.use('/public', express.static(__dirname + '/../public/'));

    // authentication
    app.get('/auth/bnet',           passport.authenticate('bnet') );

    app.get('/auth/bnet/callback',  passport.authenticate('bnet', {
        failureRedirect: '/500' }),
        function(req, res) {
            res.redirect('/account');
    });

    // logout
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // home/index
    app.get('/', homeController.getHomepage);


    /*
     * Forums
     */

    // view threads & topics
    app.get('/topics',         forumsController.getTopics);
    app.get('/threads/:topic', forumsController.getThreads);
    app.get('/thread/:id',     forumsController.getThread);
    app.get('/post/:id',       forumsController.getPost);

    // thread api
    app.post('/thread/create/:topic', forumsController.createThread);
    app.post('/thread/reply/:id',     forumsController.createPost);
    app.post('/thread/update',    forumsController.updateThread);
    app.post('/thread/delete',    forumsController.deleteThread);

    // post api
    app.post('/post/update',  forumsController.updatePost);
    app.post('/post/delete',  forumsController.deletePost);


    /*
     * Site
     */

    // roster
    app.get('/roster', rosterController.getRoster);

    // gallery
    app.get('/gallery', galleryController.getGallery);
    app.post('/gallery/upload', galleryController.uploadImage);
    app.post('/gallery/update', galleryController.updateImage);
    app.post('/gallery/delete', galleryController.deleteImage);


    /*
     * Settings
     */

    // admin
    app.get( '/admin', settingsController.getAdmin);
    app.post('/admin/update', settingsController.updateAdmin);

    // account
    app.get( '/account',        settingsController.getAccount);
    app.post('/account/update', userController.updateUser);


    /*
     * Error pages
     */

    // 403 unauthorized
    app.get('/unauthorized', function(req, res) {
        res.status(403);
        res.render('unauthorized', { message: 'You do not have permission to access this page.' });
    });

    // 404 page not found
    app.use(function(req, res, next) {
        res.status(404);
        res.render('404', { message: 'Page not found.' });
    });

    // 500 server error
    app.use(function(error, req, res, next) {
        console.log(error.stack);

        res.status(500);
        res.render('500', { message: 'Internal server error.', error: error });
    });
};