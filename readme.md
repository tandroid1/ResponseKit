# ResponseKit

## Breakpoints

ResponseKit handles breakpoints by firing an event when a breakpoint is hit. 

### Setup:
```javascript
rk.breakpoints({
  'bp-sm': 480,
  'bp-md': 750,      
  'bp-xl': 980,
});
```

### Example 1: 

Do something every time we hit the "bp-md" breakpoint: 

```javascript
$(window).on('bphit', function(e, bp) {
  if (bp.name == 'bp-md') {
    // Do something...
  }
});
```

### Example 2:

Do something every time we hit the "bp-md" breakpoint and only when resizing up:

```javascript
$(window).on('bphit', function(e, bp) {
  if (bp.name == 'bp-md' && bp.minWidth) {
    // Do something...
  }
});
```

## Element In View

Simple function to check if an element is in view. 

### Example 1:

Check if the element is at least partially visible.

```javascript
$(window).scroll(function() {
  if (rk.elementInView('#myItem')) {
    // Do stuff when element is in view...
  }
});
```

### Example 2:

Check if the element is fully visible.

```javascript
$(window).scroll(function() {
  if (rk.elementInView('#myItem'), true) {
    // Do stuff when element is fully in view...
  }
});
```