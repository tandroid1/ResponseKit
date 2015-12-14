!function($){
  "use strict";

  var rk = {};
  var $win = $(window);

  //===============================================
  // Breakpoints
  //===============================================

  (function($, rk, $win){
    var $base,
      bps = [],
      bpData = [],
      range = [];

    rk.breakpoints = function(breakpoints) {
      var initialized = false;
      $base = this;

      if (!breakpoints) {
        throw new Error('breakpoints object is required');
      } else {
        if (!initialized) {
          init(breakpoints);
        }
      }
    };

    function init(breakpoints) {
      var i = 0;
      $.each(breakpoints, function(key, val) {
        var data = {
          name: key,
          w: val, // width
          gt: isGreaterThan(val),
          lt: isLessThan(val),
          gte: isGreaterThanEqual(val),
          lte: isLessThanEqual(val)
        };

        bps[i] = val;
        bpData[i] = data;
        i++;
      });

      // sort arrays by width
      bps.sort(function(a, b) {
        return a - b;
      });

      bpData.sort(function(a, b) {
        return a.w - b.w;
      });

      setRange($win.width());

      handleResize();
    }

    function handleResize() {
      $win.resize(function() {
        var w = $win.width();

        if (w <= range[0] ) {
          updateRanges('low');
        }

        if (w > range[1]) {
          updateRanges('high');
        }
      });
    }

    function updateRanges(directionHit) {
      var iLow, iHigh;

      if (directionHit == 'low') {
        iLow = bps.indexOf(range[0]);
        iHigh = bps.indexOf(range[1]);

        if (iLow === 0 || iLow === -1) {
          range[0] = 1
        } else {
          range[0] = bps[iLow - 1];
        }

        if (iHigh === -1) {
          range[1] = bps[bps.length - 1];
        } else {
          range[1] = bps[iHigh - 1];
        }

        $win.trigger('bphit', getBpData(iLow, false));

      } else if (directionHit == 'high') {
        iLow = bps.indexOf(range[0]);
        iHigh = bps.indexOf(range[1]);

        if (iHigh === bps.length - 1 || iHigh === -1) {
          range[1] = 9999;
        } else {
          range[1] = bps[iHigh + 1];
        }

        if (iLow === -1) {
          range[0] = bps[0];
        } else {
          range[0] = bps[iLow + 1];
        }
        $win.trigger('bphit', getBpData(iHigh, true));
      }
    }

    function getBpData(index, isHigh) {
      if (isHigh) {
        bpData[index].lt = true;
        bpData[index].lte = true;
        bpData[index].maxWidth = false;
        bpData[index].minWidth = true;
      } else {
        bpData[index].gt = false;
        bpData[index].gte = false;
        bpData[index].maxWidth = true;
        bpData[index].minWidth = false;
      }


      return bpData[index];
    }

    function isGreaterThan(bp) {
      return bp < $win.width();
    }

    function isLessThan(bp) {
      return bp > $win.width();
    }

    function isGreaterThanEqual(bp) {
      return bp <= $win.width();
    }

    function isLessThanEqual(bp) {
      return bp >= $win.width();
    }

    function setRange(w) {
      $.each(bps, function(i, val) {
        var top = bps[i + 1] || 9999;
        if (w > bps[i] && w < top) {
          range = [bps[i], top];
        }
      });
    }
  })($, rk, $win);


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


  window.rk = rk;
}(jQuery);