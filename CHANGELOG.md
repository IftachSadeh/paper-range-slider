# Changelog

## paper-range-slider 0.0.9 (6/05/2016)

- added `init()` function, which may be used to re-initialize properties, such as the slider-width, after these are dynamically changed.

## paper-range-slider 0.0.8 (28/05/2016)

- Fixed bug with for cases where a user sets a min value for the slider, where the max value is already set lower (or when a max value is set which is smaller than the pre-set min value).

## paper-range-slider 0.0.7 (24/05/2016)

- Added methods `setMin()`, `setMax()`, `setStep()`, `setValueDiffMin()`, and `setValueDiffMax()`.

- Added styling properties (matching the corresponding ones of `paper-slider`): `paper-range-slider-pin-start-color`, `paper-range-slider-knob-start-color` and `paper-range-slider-knob-start-border-color`.

- Fixed bug with the color of the slider for negative values of `valueMin`.

## paper-range-slider 0.0.6 (12/04/2016)

- Bug fix from range-difference settings

## paper-range-slider 0.0.5 (12/04/2016)

- Added the function `setValues()`, which can be used to programmatically set the selected range.
- Several bug fixes.

## paper-range-slider 0.0.4 (12/04/2016)

- Fixed jitter problem when moving knobs by keyboard.

## paper-range-slider 0.0.2/0.0.3 (11/04/2016)

- Fixed bug where the `_inputKeyDown()` function of `paper-slider` was not correctly taken into account.

## paper-range-slider 0.0.1 (11/04/2016)

- Initial version of `paper-range-slider`

