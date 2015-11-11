// Generated by CoffeeScript 1.10.0
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define(['jquery', 'modules/clean/image_viewer_annotation_interface', 'modules/clean/image_viewer_annotation_renderer', 'modules/clean/gandalf_util', 'modules/clean/image_preview_util'], function($j, ImageViewerAnnotationInterface, ImageViewerAnnotationRenderer, GandalfUtil, ImagePreviewUtil) {
  var ImageAnnotations;
  return ImageAnnotations = (function() {
    function ImageAnnotations() {
      this._onResize = bind(this._onResize, this);
      this._handleMessage = bind(this._handleMessage, this);
      this.isImagePreviewAnnotationCreationEnabled = GandalfUtil.getGandalfRule("dw-comments-annotation-image-previews");
      this.imagePreviewUtil = new ImagePreviewUtil();
    }

    ImageAnnotations.prototype.onImageLoad = function(switchPreviewCallback) {
      this.reset();
      this.switchPreviewCallback = switchPreviewCallback;
      this.$imageContainer = this.imagePreviewUtil.getPreviewImageContainer();
      this.$image = this.imagePreviewUtil.getPreviewImage();
      return this._prepareAnnotations();
    };

    ImageAnnotations.prototype._prepareAnnotations = function() {
      if (this.isImagePreviewAnnotationCreationEnabled) {
        this._prepareAnnotationInterface();
      }
      this.annotationRenderer = new ImageViewerAnnotationRenderer();
      window.addEventListener('resize', this._onResize);
      window.addEventListener('message', this._handleMessage);
      return this._postPageRendered();
    };

    ImageAnnotations.prototype._prepareAnnotationInterface = function() {
      var safeBodyEl, safeEmptyEl;
      safeBodyEl = $j(".preview-image-wrapper");
      safeEmptyEl = $j("<div class='db-annotation-creation-container' />");
      this.$annotationCreationContainer = safeEmptyEl.appendTo(safeBodyEl);
      this._resizeAnnotationCreationContainer();
      this.annotationInterface = new ImageViewerAnnotationInterface();
      window.addEventListener('mouseup', this.annotationInterface.onMouseUpCallback);
      window.addEventListener('mousedown', this.annotationInterface.onMouseDownCallback);
      return window.addEventListener('mousemove', this.annotationInterface.onMouseMoveCallback);
    };

    ImageAnnotations.prototype._handleMessage = function(message) {
      var callback, commentActivity, error, error1, messageJson, ref, ref1, ref2, ref3, ref4, ref5, ref6, thumbnailUrl;
      try {
        messageJson = JSON.parse(message.data);
      } catch (error1) {
        error = error1;
        return;
      }
      switch (messageJson.action) {
        case "draw-annotation":
          return (ref = this.annotationRenderer) != null ? ref.renderAnnotation(messageJson.parameters) : void 0;
        case "remove-annotation":
          commentActivity = messageJson.parameters.commentActivity;
          return (ref1 = this.annotationRenderer) != null ? ref1.removeAnnotation(commentActivity) : void 0;
        case "remove-all-annotations":
          return (ref2 = this.annotationRenderer) != null ? ref2.removeAllAnnotations() : void 0;
        case "enable-annotation-creation":
          return (ref3 = this.annotationInterface) != null ? ref3.enableAnnotations() : void 0;
        case "disable-annotation-creation":
          return (ref4 = this.annotationInterface) != null ? ref4.disableAnnotations() : void 0;
        case "hide-annotation":
          return (ref5 = this.annotationInterface) != null ? ref5.onHideAnnotation() : void 0;
        case "scroll-to-annotation":
          commentActivity = messageJson.parameters.commentActivity;
          return (ref6 = this.annotationRenderer) != null ? ref6.highlightAnnotation(commentActivity) : void 0;
        case "file-feedback-ui-ready":
          return this._postPageRendered();
        case "switch-preview":
          thumbnailUrl = messageJson.parameters.thumbnailUrl;
          commentActivity = messageJson.parameters.commentActivity;
          callback = (function(_this) {
            return function() {
              if (commentActivity) {
                return setTimeout(function() {
                  var ref7;
                  return (ref7 = _this.annotationRenderer) != null ? ref7.highlightAnnotation(commentActivity) : void 0;
                }, 300);
              }
            };
          })(this);
          return typeof this.switchPreviewCallback === "function" ? this.switchPreviewCallback(thumbnailUrl, callback) : void 0;
      }
    };

    ImageAnnotations.prototype._postPageRendered = function() {
      return window.postMessage(JSON.stringify({
        "action": "page-rendered"
      }), '*');
    };

    ImageAnnotations.prototype._onResize = function() {
      var ref;
      if ((ref = this.annotationRenderer) != null) {
        ref.removeAllAnnotations();
      }
      window.postMessage(JSON.stringify({
        "action": "scale-change"
      }), '*');
      clearTimeout(this.scaleChangeTimer);
      return this.scaleChangeTimer = setTimeout((function(_this) {
        return function() {
          var ref1;
          _this._resizeAnnotationCreationContainer();
          _this._postPageRendered();
          return (ref1 = _this.annotationInterface) != null ? ref1.onScaleChangeCallback() : void 0;
        };
      })(this), 100);
    };

    ImageAnnotations.prototype._resizeAnnotationCreationContainer = function() {
      var ref, ref1;
      if ((ref = this.$annotationCreationContainer) != null) {
        ref.height(this.$image.height());
      }
      return (ref1 = this.$annotationCreationContainer) != null ? ref1.width(this.$image.width()) : void 0;
    };

    ImageAnnotations.prototype.reset = function() {
      var ref, ref1, ref2, ref3, ref4;
      if ((ref = this.annotationRenderer) != null) {
        ref.reset();
      }
      if (this.isImagePreviewAnnotationCreationEnabled) {
        window.removeEventListener('mouseup', (ref1 = this.annotationInterface) != null ? ref1.onMouseUpCallback : void 0);
        window.removeEventListener('mousedown', (ref2 = this.annotationInterface) != null ? ref2.onMouseDownCallback : void 0);
        window.removeEventListener('mousemove', (ref3 = this.annotationInterface) != null ? ref3.onMouseMoveCallback : void 0);
        if ((ref4 = this.annotationInterface) != null) {
          ref4.reset();
        }
      }
      window.removeEventListener('resize', this._onResize);
      return window.removeEventListener('message', this._handleMessage);
    };

    return ImageAnnotations;

  })();
});

//# sourceMappingURL=image_annotations.js.map