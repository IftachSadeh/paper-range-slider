# paper-range-slider (v0.0.4)

`paper-range-slider` allows the user to select a range of values within a given (possibly wider) range. values are selected by moving the position of two knobs, or by dragging the selected range of values within the allowed limits. [A demo is provided here.](http://IftachSadeh.github.io/paper-range-slider/components/paper-range-slider/demo/)

## Bower installation
Do either
```bash
bower install IftachSadeh/paper-range-slider
```
or add the following to your `bower.json`:
```
"dependencies": {
  "paper-range-slider": "git://github.com/IftachSadeh/paper-range-slider"
},
```

## Examples:

### Basic use:
```html
<paper-range-slider></paper-range-slider>
```

### Additional options

- Use `min` and `max` to specify the limits of values for the slider.
- Use `value-min` and `value-max` to set the initial position of the two knobs (the selected range of values).
- Use `value-diff-min` and `value-diff-max` to set the minimal and maximal allowed difference between the lower and upper selected values.
- Use `always-show-pin` to never hide the pins.
- The following options apply, as for paper-slider: `snaps`, `pin`, `step`.
- The slider width must explicitly be set, using `slider-width` (the default is "200px").
```html
<paper-range-slider snaps pin step='1' min='0' max='100' value-diff-min="10" value-diff-max="50" value-min='30' value-max='60'></paper-range-slider>
```

- The current position of the knobs (selected range of values) may be accessed by setting up a listener to the `updateValues` event:
```html
<paper-range-slider id='myPaperRangeSliderId'></paper-range-slider>
<script>
   document.querySelector("#myPaperRangeSliderId").addEventListener('updateValues', function (customEvent) {
   console.log(' - current min/max values: ',this.valueMin,this.valueMax)
   });
</script>
```

## Styling

The following custom properties are available for styling:

Custom property | Description | Default
----------------|-------------|----------
`--paper-range-slider-lower-color` | color for range below selected range | var(--paper-grey-400);
`--paper-range-slider-active-color` | color of selected range | var(--google-blue-700);
`--paper-range-slider-higher-color` | color for range above selected range | var(--paper-grey-400);
`--paper-range-slider-knob-color` | color of knobs | var(--google-blue-700);
`--paper-range-slider-pin-color` | color of pins | var(--google-blue-700);


---

The license for this code is the The MIT License (MIT), as given in LICENSE.txt.

---
