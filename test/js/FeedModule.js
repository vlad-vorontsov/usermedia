define([], function () {

    function FeedModule(feedContainerId) {
        this.container = document.getElementById(feedContainerId);
    }

    FeedModule.prototype.renderFeed = function (images) {
        for (var i = 0; i < images.length; i++) {
            this.renderImage(images[i]);
        }
    };

    FeedModule.prototype.renderImage = function (image) {
        var imgItem = document.createElement('div');
        imgItem.classList.add('image-item');
        var img = document.createElement('img');
        img.src = image.image;
        imgItem.appendChild(img);
        this.container.appendChild(imgItem);
    };

    return FeedModule;

});