# ResponseKit

## Breakpoints

ResponseKit handles breakpoints by firing an event when a breakpoint is hit. 

### Setup:
```javascript
rk.breakpoints({
  'small': 480,
  'medium': 750,      
  'large': 980,
});
```

### Example 1: 

Do something every time we hit the "medium" breakpoint: 

```javascript
$(window).on('changed.rk.mediaquery', function(e, newSize, oldSize) {
  if (newSize == 'small') {
    // Do something...
  }
});
```

### Example 2:

Do something every time we hit the "medium" breakpoint and only when resizing up:

```javascript
$(window).on('changed.rk.mediaquery', function(e, newSize, oldSize, direction) {
  if (newSize == 'small' && direction == 'up') {
    // Do something...
  }
});
```

### SASS media query declaration

This plugin borrows heavily from the Foundation 6 way of doing breakpoints in sass. Because of this, you can declare your breakpoints in sass and have them available in js. 

```scss
// _config.scss
$breakpoints: (
  small: 0,
  medium: 640px,
  large: 1024px,
  xlarge: 1200px,
  xxlarge: 1440px,
);
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