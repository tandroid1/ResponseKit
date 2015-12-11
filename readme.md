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

### Usage 

Do something every time we hit the "bp-md" breakpoint: 

```javascript
$(document).on('bphit', function(e, bp) {
  if (bp.name == 'bp-md') {
    // Do something...
  }
});
```

Do something every time we hit the "bp-md" breakpoint and only when resizing up:

```javascript
$(document).on('bphit', function(e, bp) {
  if (bp.name == 'bp-md' && bp.minWidth) {
    // Do something...
  }
});
```
