define(['./ImageService', './FeedModule', './ImagePicker'], function (ImageService, FeedModule, ImagePicker) {

    var feed = new FeedModule('feedImages');
    var imageService = new ImageService(feed.renderFeed.bind(feed), feed.renderImage.bind(feed));
    var imagePicker = new ImagePicker('imagePicker', imageService);

});