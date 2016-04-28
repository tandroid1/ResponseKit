# ResponseKit

## Breakpoints - JavaScript

ResponseKit handles breakpoints by firing an event when a breakpoint is hit. 

### Setup:
```javascript
rk.breakpoints({
  'small': 0,
  'medium': 640,      
  'large': 960
});
```

### Events

#### `changed.rk.mediaquery`

Triggered every time any media query is hit sizing up or down.

***Parameters***
- newBp 
- oldBp
- direction

#### `changed.rk.[breakpoint name]`

Triggered every time the specified breakpoint is hit sizing up or down.

***Parameters***
- newBp

#### `up.rk.mediaquery`

Triggered every time a media query is hit sizing up.

***Parameters***
- newBp
- oldBp

#### `down.rk.mediaquery`

Triggered every time a media query is hit sizing down.

***Parameters***
- newBp
- oldBp

#### `up.rk.[breakpoint name]`

Triggered every time the specified breakpoint is hit sizing up.

#### `down.rk.[breakpoint name]`

Triggered every time the specified breakpoint is hit sizing down.

### Example 1: 

Do something every time we hit the "medium" breakpoint: 

```javascript
$(window).on('changed.rk.medium', function(e, newSize) {
  // Do something...
});
```

### Example 2:

Do something every time we hit the "medium" breakpoint and only when resizing up:

```javascript
$(window).on('up.rk.medium', function() {
  // Do something...
});
```

## Breakpoints - SASS

### Media query declaration

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

### Basic Usage

```scss
@include bp(medium) {
  // Do something...
}
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