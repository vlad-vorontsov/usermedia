define([], function () {

    function ImagePicker(videoContainerId, manager) {
        this.container = document.getElementById(videoContainerId);
        this.manager = manager;
        this.width = 320;
        this.height = 240;

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
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({video: true}).then(function (stream) {
                this.video.src = window.URL.createObjectURL(stream);
                this.video.play();
            });
        } else if (navigator.getUserMedia) { // Standard
            navigator.getUserMedia(
                {
                    video: true
                },
                function (stream) {
                    this.video.src = window.URL.createObjectURL(stream);
                    video.play();
                },
                function (err) {
                    console.log("The following error occurred: " + err.name);
                }
            )
        } else {
            console.log("getUserMedia not supported");
        }
    }

    ImagePicker.prototype.takePhoto = function () {
        var context = this.canvas.getContext('2d');
        context.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
        var image = this.canvas.toDataURL('image/png');
        this.manager.addImage({image: image});
    };

    return ImagePicker;

});