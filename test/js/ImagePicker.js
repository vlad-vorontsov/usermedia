define([], function () {

    function ImagePicker(videoContainerId, manager) {
        this.container = document.getElementById(videoContainerId);
        this.manager = manager;

        _createVideoElement(this.container);
        _createSaveButton(this.container);
        _createCanvasElement(this.container, this.width, this.height);

        this.video = document.getElementById('video');
        this.canvas = document.getElementById('canvas');

        this.savePhotoBtn = document.getElementById('saveImg');
        this.savePhotoBtn.addEventListener('click', this.takePhoto.bind(this));

        _setUpVideo();

    }

    function _createVideoElement(parent) {
        var video = document.createElement('video');
        video.setAttribute('id', 'video');
        video.autoplay = true;
        parent.appendChild(video);
    }

    function _createSaveButton(parent) {
        var button = document.createElement('div');
        button.setAttribute('id', 'saveImg');
        button.innerHTML = 'Take photo';
        parent.appendChild(button);
    }

    function _createCanvasElement(parent, width, height) {
        var canvas = document.createElement('canvas');
        canvas.setAttribute('id', 'canvas');
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        parent.appendChild(canvas);
    }

    function _setUpVideo() {
        navigator.getMedia = ( navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia);

        if (!navigator.getMedia) {
            console.log("Your browser doesn't have support for the navigator.getUserMedia interface.");
        }
        else {
            navigator.getMedia(
                {
                    video: true
                },
                // Success Callback
                function (stream) {
                    video.src = window.URL.createObjectURL(stream);
                    video.play();
                },
                // Error Callback
                function (err) {
                    console.log('There was an error with accessing the camera stream');
                }
            );

        }
    }

    ImagePicker.prototype.takePhoto = function () {
        var context = this.canvas.getContext('2d');
        var width = this.video.videoWidth,
            height = this.video.videoHeight;
        this.canvas.width = width;
        this.canvas.height = height;
        context.drawImage(this.video, 0, 0, width, height);
        var image = this.canvas.toDataURL('image/png');
        this.manager.addImage({image: image});
    };

    return ImagePicker;

});