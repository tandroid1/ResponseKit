!function($){
  "use strict";

  window.rk = {};
  var $win = $(window);

  //===============================================
  // Breakpoints
  //===============================================

  (function($, rk, $win) {
    var $base,
      bps = [],
      bpValues = [],
      range = [];

    rk.breakpoints = function(breakpoints) {
      var initialized = false;
      $base = this;

      if (!breakpoints) {
        throw new Error('breakpoints object is required');
      } else {
        if (!initialized) {
          _init(breakpoints);
        }
      }
    };


    function _init(breakpoints) {
      var i = 0;
      $.each(breakpoints, function(key, val) {
        var data = {
          name: key,
          width: val
        };

        bps[i] = data;
        bpValues[i] = val;
        i++;
      });

      // sort arrays by width
      bpValues.sort(function(a, b) {
        return a - b;
      });

      bps.sort(function(a, b) {
        return a.w - b.w;
      });

      bpValues.push(9999);

      bps.push({
        name: 'rk-max-width',
        width: 9999
      });

      _setRange($win.width());
      _handleResize();
    }


    function _handleResize() {
      $win.resize(function() {
        var w = $win.width();

        if (w <= range[0] ) {
          _shiftRanges('down');
        }

        if (w > range[1]) {
          _shiftRanges('up');
        }
      });
    }

    function _shiftRanges(keyword) {
      var newBp, oldBp;
      var iHigh = bpValues.indexOf(range[1]);
      var iLow = bpValues.indexOf(range[0]);

      iHigh = iHigh > -1 ? iHigh : bpValues.length;
      oldBp = _getBpName(range[0]);

      if (keyword == 'down') {
        range[0] = bpValues[--iLow];
        range[1] = bpValues[--iHigh];
      } else if (keyword == 'up') {
        oldBp = _getBpName(range[0]);

        range[0] = bpValues[++iLow];
        range[1] = bpValues[++iHigh];
      }

      newBp = _getBpName(range[0]);

      _triggerEvents(newBp, oldBp, keyword);
    }
    
    function _triggerEvents(newBp, oldBp, direction) {
      $win.trigger('changed.rk.mediaquery', [newBp, oldBp, direction]);

      if (direction === 'up') {
        $win.trigger('up.rk.' + newBp);
        $win.trigger('up.rk.mediaquery', [newBp, oldBp]);
        $win.trigger('changed.rk.' + newBp, [direction]);
      }

      if (direction === 'down') {
        $win.trigger('down.rk.down' + oldBp);
        $win.trigger('down.rk.mediaquery', [newBp, oldBp]);
        $win.trigger('changed.rk.' + oldBp, [direction]);
      }
    }

    function _getBpWidth(name) {
      var width = -1;

      $.each(bps, function(i, val) {
        if (val.name == name) {
          width = val.width;
        }
      });

      return width;
    }

    function _getBpName(width) {
      var name = false;
      $.each(bps, function(i, val) {
        if (val.width === width) {
          name = val.name;
        }
      });

      return name;
    }

    function _setRange(w) {
      $.each(bpValues, function(i, val) {
        var top = bpValues[i + 1] || 9999;
        if (w > bpValues[i] && w < top) {
          range = [bpValues[i], top];
        }
      });
    }

    //
    // Public methods
    //

    rk.breakpoints.get = function(breakpoint) {
      return _getBpWidth(breakpoint);
    };

    rk.breakpoints.getAll = function() {
      return bps;
    };

    rk.breakpoints.isBpSet = function(keyword) {
      $.each(bps, function(i, val) {
        if (val.name == keyword) {
          return true;
        }
      });

      return false;
    };

    rk.breakpoints.atLeast = function(breakpoint) {
      var w = _getBpWidth(breakpoint);
      return $win.width() >= w;
    };

    rk.breakpoints.noGreaterThan = function(breakpoint) {
      var w = _getBpWidth(breakpoint);
      return $win.width() <= w;
    }

  })($, rk, $win);


  //===============================================
  // Get breakpoints from SASS
  //===============================================

  (function($, rk) {

    $('<meta class="rk-mq">').appendTo(document.head);

    var serializedBps = $('.rk-mq').css('font-family');

    if (serializedBps) {
      var extractedBps = parseStyleToObject(serializedBps);

      window.rk.breakpoints(extractedBps);
    }

    // Thank you: https://github.com/sindresorhus/query-string
    function parseStyleToObject(str) {
      var styleObject = {};

      if (typeof str !== 'string') {
        return styleObject;
      }

      str = str.trim().slice(1, -1); // browsers re-quote string style values

      if (!str) {
        return styleObject;
      }

      styleObject = str.split('&').reduce(function(ret, param) {
        var parts = param.replace(/\+/g, ' ').split('=');
        var key = parts[0];
        var val = parts[1];
        key = decodeURIComponent(key);

        // missing `=` should be `null`:
        // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
        val = val === undefined ? null : decodeURIComponent(val);

        if (!ret.hasOwnProperty(key)) {
          ret[key] = val;
        } else if (Array.isArray(ret[key])) {
          ret[key].push(val);
        } else {
          ret[key] = [ret[key], val];
        }
        return ret;
      }, {});

      return styleObject;
    }

  })($, rk);


  //===============================================
  // Element In View
  //===============================================

  (function($, rk){

    var $el, elTop, elHeight,
      winTop, winHeight,
      winBottom, elBottom;

    rk.elementInView = function (el, isFullyVisible) {
      isFullyVisible = isFullyVisible || false;
      $el = $.isPlainObject(el) ? el : $(el);
      $el = $el.first();

      if ($el.length > 0) {
        elTop = $el.offset().top;
        elHeight = $el.outerHeight();
        winTop = $win.scrollTop();
        winHeight = $win.height();
        winBottom = winTop + winHeight;
        elBottom = elTop + elHeight;

        if (isFullyVisible) {
          return winBottom > elBottom && winTop < elTop;
        } else {
          return winBottom > elTop && winTop < elBottom;
        }
      }
    };
  })($, rk, $win);
}(jQuery);