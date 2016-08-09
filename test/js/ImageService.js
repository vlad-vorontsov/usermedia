define([], function () {

    function ImageService(renderAllCallback, renderSingleCallback) {
        var _images = JSON.parse(localStorage.getItem('images'));
        this.images = _images ? _images : [];
        this.renderAllCallback = renderAllCallback;
        this.renderSingleCallback = renderSingleCallback;
        this.renderAllCallback(this.images);
    }

    ImageService.prototype.addImage = function (image) {
        this.images.push(image);
        localStorage.setItem('images', JSON.stringify(this.images));
        this.renderSingleCallback(image);
    };

    return ImageService;

});