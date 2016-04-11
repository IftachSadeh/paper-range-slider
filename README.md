# paper-range-slider (v0.0.3)

`paper-range-slider` allows user to select a range of values within a given (possibly wider) range, by moving the position of two knobs, or by dragging the selected range of values within the allowed limits. [The demo is provided here.](http://IftachSadeh.github.io/paper-range-slider/components/paper-range-slider/demo/)

## Bower installation
Either do
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

Basic use:
```html
<paper-range-slider></paper-range-slider>
```

- Use `min` and `max` to specify the slider range.
- Use `value-min` and `value-max` to set the initial position of the two knobs.
- Use `value-diff-min` and `value-diff-max` to optionally set the minimal and maximal allowed value for the difference between the lower and upper values.
- Use `always-show-pin` to never hide the pins
- Some of the interface of paper-slider also apply (`snaps`, `pin`, `step`).
- The slider width must explicitly be set, using `slider-width` (Default is "200px").
```html
<paper-range-slider snaps pin step='1' min='0' max='100' value-diff-min="10" value-diff-max="50" value-min='30' value-max='60'></paper-range-slider>
```

- The position of the knobs may be accessed by setting up a listener to the "updateValues" event:
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
