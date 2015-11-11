// Generated by CoffeeScript 1.10.0
define(['jquery'], function($j) {
  var exports, installVisibilityListener, isVisible;
  exports = {};
  isVisible = function() {
    return document.hasFocus();
  };
  installVisibilityListener = function(listener) {
    return $j(window).one('focus', listener);
  };
  exports.when = function() {
    var deferred, onVisibility;
    deferred = new $j.Deferred();
    onVisibility = function() {
      return deferred.resolve();
    };
    if (isVisible()) {
      onVisibility();
    } else {
      installVisibilityListener(onVisibility);
    }
    return deferred.promise();
  };
  return exports;
});

//# sourceMappingURL=visibility.js.map
