import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import { IronA11yKeysBehavior } from '@polymer/iron-a11y-keys-behavior/iron-a11y-keys-behavior.js'
import { IronFormElementBehavior } from '@polymer/iron-form-element-behavior/iron-form-element-behavior.js'
import { PaperInkyFocusBehavior, PaperInkyFocusBehaviorImpl } from '@polymer/paper-behaviors/paper-inky-focus-behavior.js'
import { IronRangeBehavior } from '@polymer/iron-range-behavior/iron-range-behavior.js'

import '@polymer/paper-progress/paper-progress.js'
import '@polymer/paper-input/paper-input.js'
/**
 * `paper-single-range-slider`
 *
 *
 * @customElement
 * @polymer
 */
class PaperSingleRangeSlider extends
    mixinBehaviors([ IronA11yKeysBehavior,
                     IronFormElementBehavior,
                     PaperInkyFocusBehavior,
                     PaperInkyFocusBehaviorImpl,
                     IronRangeBehavior ], PolymerElement) {

    static get template() {
        return html`
            <!--<template strip-whitespace> -->
                <style>
                  :host {
                    @apply --layout;
                    @apply --layout-justified;
                    @apply --layout-center;
                    width: 200px;
                    cursor: default;
                    -webkit-user-select: none;
                    -moz-user-select: none;
                    -ms-user-select: none;
                    user-select: none;
                    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
                    --paper-progress-active-color: var(--paper-single-range-slider-active-color, var(--google-blue-700));
                    --paper-progress-secondary-color: var(--paper-single-range-slider-secondary-color, var(--google-blue-300));
                    --paper-progress-disabled-active-color: var(--paper-single-range-slider-disabled-active-color, var(--paper-grey-400));
                    --paper-progress-disabled-secondary-color: var(--paper-single-range-slider-disabled-secondary-color, var(--paper-grey-400));
                    --calculated-paper-single-range-slider-height: var(--paper-single-range-slider-height, 2px);
                  }
            
                  /* focus shows the ripple */
                  :host(:focus) {
                    outline: none;
                  }
            
                  /** 
                   * NOTE(keanulee): Though :host-context is not universally supported, some pages
                   * still rely on paper-single-range-slider being flipped when dir="rtl" is set on body. For full
                   * compatability, dir="rtl" must be explicitly set on paper-single-range-slider.
                   */
                  :host-context([dir="rtl"]) #sliderContainer {
                    -webkit-transform: scaleX(-1);
                    transform: scaleX(-1);
                  }
            
                  /** 
                   * NOTE(keanulee): This is separate from the rule above because :host-context may
                   * not be recognized.
                   */
                  :host([dir="rtl"]) #sliderContainer {
                    -webkit-transform: scaleX(-1);
                    transform: scaleX(-1);
                  }
            
                  /** 
                   * NOTE(keanulee): Needed to override the :host-context rule (where supported)
                   * to support LTR sliders in RTL pages.
                   */
                  :host([dir="ltr"]) #sliderContainer {
                    -webkit-transform: scaleX(1);
                    transform: scaleX(1);
                  }
            
                  #sliderContainer {
                    position: relative;
                    width: 100%;
                    height: calc(30px + var(--calculated-paper-single-range-slider-height));
                    margin-left: calc(15px + var(--calculated-paper-single-range-slider-height)/2);
                    margin-right: calc(15px + var(--calculated-paper-single-range-slider-height)/2);
                  }
            
                  #sliderContainer:focus {
                    outline: 0;
                  }
            
                  #sliderContainer.editable {
                    margin-top: 12px;
                    margin-bottom: 12px;
                  }
            
                  .bar-container {
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    overflow: hidden;
                  }
            
                  .ring > .bar-container {
                    left: calc(5px + var(--calculated-paper-single-range-slider-height)/2);
                    transition: left 0.18s ease;
                  }
            
                  .ring.expand.dragging > .bar-container {
                    transition: none;
                  }
            
                  .ring.expand:not(.pin) > .bar-container {
                    left: calc(8px + var(--calculated-paper-single-range-slider-height)/2);
                  }
            
                  #sliderBar {
                    padding: 15px 0;
                    width: 100%;
                    background-color: var(--paper-single-range-slider-bar-color, transparent);
                    --paper-progress-container-color: var(--paper-single-range-slider-container-color, var(--paper-grey-400));
                    --paper-progress-height: var(--calculated-paper-single-range-slider-height);
                  }
            
                  .slider-markers {
                    position: absolute;
                    top: calc(14px + var(--paper-single-range-slider-height,2px)/2);
                    height: var(--calculated-paper-single-range-slider-height);
                    left: 0;
                    right: -1px;
                    box-sizing: border-box;
                    pointer-events: none;
                    @apply --layout-horizontal;
                  }
            
                  .slider-marker {
                    @apply --layout-flex;
                  }
                  .slider-markers::after,
                  .slider-marker::after {
                    content: "";
                    display: block;
                    margin-left: -1px;
                    width: 2px;
                    height: var(--calculated-paper-single-range-slider-height);
                    border-radius: 50%;
                    background-color: var(--paper-single-range-slider-markers-color, #000);
                  }
            
                  .slider-knob {
                    position: absolute;
                    left: 0;
                    top: 0;
                    margin-left: calc(-15px - var(--calculated-paper-single-range-slider-height)/2);
                    width: calc(30px + var(--calculated-paper-single-range-slider-height));
                    height: calc(30px + var(--calculated-paper-single-range-slider-height));
                  }
            
                  .transiting > .slider-knob {
                    transition: left 0.08s ease;
                  }
            
                  .slider-knob:focus {
                    outline: none;
                  }
            
                  .slider-knob.dragging {
                    transition: none;
                  }
            
                  .snaps > .slider-knob.dragging {
                    transition: -webkit-transform 0.08s ease;
                    transition: transform 0.08s ease;
                  }
            
                  .slider-knob-inner {
                    margin: 10px;
                    width: calc(100% - 20px);
                    height: calc(100% - 20px);
                    background-color: var(--paper-single-range-slider-knob-color, var(--google-blue-700));
                    border: 2px solid var(--paper-single-range-slider-knob-color, var(--google-blue-700));
                    border-radius: 50%;
            
                    -moz-box-sizing: border-box;
                    box-sizing: border-box;
            
                    transition-property: -webkit-transform, background-color, border;
                    transition-property: transform, background-color, border;
                    transition-duration: 0.18s;
                    transition-timing-function: ease;
                  }
            
                  .expand:not(.pin) > .slider-knob > .slider-knob-inner {
                    -webkit-transform: scale(1.5);
                    transform: scale(1.5);
                  }
            
                  .ring > .slider-knob > .slider-knob-inner {
                    background-color: var(--paper-single-range-slider-knob-start-color, transparent);
                    border: 2px solid var(--paper-single-range-slider-knob-start-border-color, var(--paper-grey-400));
                  }
            
                  .slider-knob-inner::before {
                    background-color: var(--paper-single-range-slider-pin-color, var(--google-blue-700));
                  }
            
                  .pin > .slider-knob > .slider-knob-inner::before {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: 50%;
                    margin-left: -13px;
                    width: 26px;
                    height: 26px;
                    border-radius: 50% 50% 50% 0;
            
                    -webkit-transform: rotate(-45deg) scale(0) translate(0);
                    transform: rotate(-45deg) scale(0) translate(0);
                  }
            
                  .slider-knob-inner::before,
                  .slider-knob-inner::after {
                    transition: -webkit-transform .18s ease, background-color .18s ease;
                    transition: transform .18s ease, background-color .18s ease;
                  }
            
                  .pin.ring > .slider-knob > .slider-knob-inner::before {
                    background-color: var(--paper-single-range-slider-pin-start-color, var(--paper-grey-400));
                  }
            
                  .pin.expand > .slider-knob > .slider-knob-inner::before {
                    -webkit-transform: rotate(-45deg) scale(1) translate(17px, -17px);
                    transform: rotate(-45deg) scale(1) translate(17px, -17px);
                  }
            
                  .pin > .slider-knob > .slider-knob-inner::after {
                    content: attr(value);
                    position: absolute;
                    top: 0;
                    left: 50%;
                    margin-left: -16px;
                    width: 32px;
                    height: 26px;
                    text-align: center;
                    color: var(--paper-single-range-slider-font-color, #fff);
                    font-size: 10px;
            
                    -webkit-transform: scale(0) translate(0);
                    transform: scale(0) translate(0);
                    @apply paper-single-range-slider-knob-inner-text;
                  }
            
                  .pin.expand > .slider-knob > .slider-knob-inner::after {
                    -webkit-transform: scale(1) translate(0, -17px);
                    transform: scale(1) translate(0, -17px);
                  }
            
                  /* paper-input */
                  .slider-input {
                    width: 50px;
                    overflow: hidden;
                    --paper-input-container-input: {
                      text-align: center;
                    };
                    @apply --paper-single-range-slider-input;
                  }
            
                  /* disabled state */
                  #sliderContainer.disabled {
                    pointer-events: none;
                  }
            
                  .disabled > .slider-knob > .slider-knob-inner {
                    background-color: var(--paper-single-range-slider-disabled-knob-color, var(--paper-grey-400));
                    border: 2px solid var(--paper-single-range-slider-disabled-knob-color, var(--paper-grey-400));
                    -webkit-transform: scale3d(0.75, 0.75, 1);
                    transform: scale3d(0.75, 0.75, 1);
                  }
            
                  .disabled.ring > .slider-knob > .slider-knob-inner {
                    background-color: var(--paper-single-range-slider-knob-start-color, transparent);
                    border: 2px solid var(--paper-single-range-slider-knob-start-border-color, var(--paper-grey-400));
                  }
            
                  paper-ripple {
                    color: var(--paper-single-range-slider-knob-color, var(--google-blue-700));
                  }
                </style>
            
                <div id="sliderContainer"
                  class$="[[_getClassNames(disabled, pin, snaps, immediateValue, min, expand, dragging, transiting, editable)]]">
                  <div class="bar-container">
                    <paper-progress
                      disabled$="[[disabled]]"
                      id="sliderBar"
                      aria-hidden="true"
                      min="[[min]]"
                      max="[[max]]"
                      step="[[step]]"
                      value="[[immediateValue]]"
                      secondary-progress="[[secondaryProgress]]"
                      on-down="_bardown"
                      on-up="_resetKnob"
                      on-track="_onTrack">
                    </paper-progress>
                  </div>
            
                  <template is="dom-if" if="[[snaps]]">
                    <div class="slider-markers">
                      <template is="dom-repeat" items="[[markers]]">
                        <div class="slider-marker"></div>
                      </template>
                    </div>
                  </template>
            
                  <div id="sliderKnob"
                    class="slider-knob"
                    on-down="_knobdown"
                    on-up="_resetKnob"
                    on-track="_onTrack"
                    on-transitionend="_knobTransitionEnd">
                      <div class="slider-knob-inner" value$="[[displayFunction(immediateValue)]]"></div>
                  </div>
                </div>
            
                <template is="dom-if" if="[[editable]]">
                  <paper-input
                    id="input"
                    type="number"
                    step="[[step]]"
                    min="[[min]]"
                    max="[[max]]"
                    class="slider-input"
                    disabled$="[[disabled]]"
                    value="[[immediateValue]]"
                    on-change="_changeValue"
                    on-keydown="_inputKeyDown"
                    no-label-float>
                  </paper-input>
                </template>
              </template>
        `;
    }
    static get is() { return 'paper-single-range-slider' }

    static get properties() {
        return{
            /**
             * Used to customize the displayed value of the pin. E.g. the value can be prefixed with a '$' like '$99'
             */
            displayFunction: {
                type: Function,
                value: function () {
                    return function (value) {
                        return value;
                    }
                }
            },

            /**
             * If true, the slider thumb snaps to tick marks evenly spaced based
             * on the `step` property value.
             */
            snaps: {
                type: Boolean,
                value: false,
                notify: true
            },

            /**
             * If true, a pin with numeric value label is shown when the slider thumb
             * is pressed. Use for settings for which users need to know the exact
             * value of the setting.
             */
            pin: {
                type: Boolean,
                value: false,
                notify: true
            },

            /**
             * The number that represents the current secondary progress.
             */
            secondaryProgress: {
                type: Number,
                value: 0,
                notify: true,
                observer: '_secondaryProgressChanged'
            },

            /**
             * If true, an input is shown and user can use it to set the slider value.
             */
            editable: {
                type: Boolean,
                value: false
            },

            /**
             * The immediate value of the slider.  This value is updated while the user
             * is dragging the slider.
             */
            immediateValue: {
                type: Number,
                value: 0,
                readOnly: true,
                notify: true
            },

            /**
             * The maximum number of markers
             */
            maxMarkers: {
                type: Number,
                value: 0,
                notify: true
            },

            /**
             * If true, the knob is expanded
             */
            expand: {
                type: Boolean,
                value: false,
                readOnly: true
            },

            /**
             * True when the user is dragging the slider.
             */
            dragging: {
                type: Boolean,
                value: false,
                readOnly: true
            },

            transiting: {
                type: Boolean,
                value: false,
                readOnly: true
            },

            markers: {
                type: Array,
                readOnly: true,
                value: function() {
                    return [];
                }
            },
            keyBindings: {
                'left': '_leftKey',
                'right': '_rightKey',
                'down pagedown home': '_decrementKey',
                'up pageup end': '_incrementKey'
            }
        }

    }

    static get observers() {
        return [
            '_updateKnob(value, min, max, snaps, step)',
            '_valueChanged(value)',
            '_immediateValueChanged(immediateValue)',
            '_updateMarkers(maxMarkers, min, max, snaps)'
        ]
    }

    constructor(){
        super();

        this._ensureAttribute('role','slider');
        this._ensureAttribute('tabindex','0');
        //this.sliderKnob = this.shadowRoot.querySelector('#sliderKnob');
    }

    ready() {
        super.ready();
        this.isReady = true;
        this.sliderKnob = this.shadowRoot.querySelector('#sliderKnob');
    }

    /**
     * Increases value by `step` but not above `max`.
     * @method increment
     */
    increment() {
        this.value = this._clampValue(this.value + this.step);
    }

    /**
     * Decreases value by `step` but not below `min`.
     * @method decrement
     */
    decrement() {
        this.value = this._clampValue(this.value - this.step);
    }

    _updateKnob(value, min, max, snaps, step) {
        this.setAttribute('aria-valuemin', min);
        this.setAttribute('aria-valuemax', max);
        this.setAttribute('aria-valuenow', value);

        this._positionKnob(this._calcRatio(value) * 100);
    }

    _valueChanged() {
        this.fire('value-change', {composed: true});
    }

    _immediateValueChanged() {
        if (this.dragging) {
            this.fire('immediate-value-change', {composed: true});
        } else {
            this.value = this.immediateValue;
        }
    }

    _secondaryProgressChanged() {
        this.secondaryProgress = this._clampValue(this.secondaryProgress);
    }

    _expandKnob() {
        this._setExpand(true);
    }

    _resetKnob() {
        this.cancelDebouncer('expandKnob');
        this._setExpand(false);
    }

    _positionKnob(ratio) {
        this._setImmediateValue(this._calcStep(this._calcKnobPosition(ratio)));
        this._setRatio(this._calcRatio(this.immediateValue) * 100);

        this.sliderKnob = this.shadowRoot.querySelector('#sliderKnob');
        this.sliderKnob.style.left = this.ratio + '%';
        if (this.dragging) {
            this._knobstartx = (this.ratio * this._w) / 100;
            this.translate3d(0, 0, 0, this.sliderKnob);
        }
    }

    _calcKnobPosition(ratio) {
        return (this.max - this.min) * ratio / 100 + this.min;
    }

    _onTrack(event) {
        event.stopPropagation();
        switch (event.detail.state) {
            case 'start':
                this._trackStart(event);
                break;
            case 'track':
                this._trackX(event);
                break;
            case 'end':
                this._trackEnd();
                break;
        }
    }

    _trackStart(event) {
        this._setTransiting(false);
        this._w = this.$.sliderBar.offsetWidth;
        this._x = this.ratio * this._w / 100;
        this._startx = this._x;
        this._knobstartx = this._startx;
        this._minx = - this._startx;
        this._maxx = this._w - this._startx;
        this.sliderKnob = this.shadowRoot.querySelector('#sliderKnob');
        this.sliderKnob.classList.add('dragging');
        this._setDragging(true);
    }

    _trackX(event) {
        if (!this.dragging) {
            this._trackStart(event);
        }

        var direction = this._isRTL ? -1 : 1;
        var dx = Math.min(
            this._maxx, Math.max(this._minx, event.detail.dx * direction));
        this._x = this._startx + dx;

        var immediateValue = this._calcStep(this._calcKnobPosition(this._x / this._w * 100));
        this._setImmediateValue(immediateValue);

        // update knob's position
        this.sliderKnob = this.shadowRoot.querySelector('#sliderKnob');
        var translateX = ((this._calcRatio(this.immediateValue) * this._w) - this._knobstartx);
        this.translate3d(translateX + 'px', 0, 0, this.sliderKnob);
    }

    _trackEnd() {
        this.sliderKnob = this.shadowRoot.querySelector('#sliderKnob');
        var s = this.sliderKnob.style;

        this.sliderKnob.classList.remove('dragging');
        this._setDragging(false);
        this._resetKnob();
        this.value = this.immediateValue;

        s.transform = s.webkitTransform = '';

        this.fire('change', {composed: true});
    }

    _knobdown(event) {
        this._expandKnob();

        // cancel selection
        event.preventDefault();

        // set the focus manually because we will called prevent default
        this.focus();
    }

    _bardown(event) {
        this._w = this.$.sliderBar.offsetWidth;
        var rect = this.$.sliderBar.getBoundingClientRect();
        var ratio = (event.detail.x - rect.left) / this._w * 100;
        if (this._isRTL) {
            ratio = 100 - ratio;
        }
        var prevRatio = this.ratio;

        this._setTransiting(true);

        this._positionKnob(ratio);

        this.debounce('expandKnob', this._expandKnob, 60);

        // if the ratio doesn't change, sliderKnob's animation won't start
        // and `_knobTransitionEnd` won't be called
        // Therefore, we need to manually update the `transiting` state

        if (prevRatio === this.ratio) {
            this._setTransiting(false);
        }

        this.async(function() {
            this.fire('change', {composed: true});
        });

        // cancel selection
        event.preventDefault();

        // set the focus manually because we will called prevent default
        this.focus();
    }

    _knobTransitionEnd(event) {
        this.sliderKnob = this.shadowRoot.querySelector('#sliderKnob');
        if (event.target === this.sliderKnob) {
            this._setTransiting(false);
        }
    }

    _updateMarkers(maxMarkers, min, max, snaps) {
        if (!snaps) {
            this._setMarkers([]);
        }
        var steps = Math.round((max - min) / this.step);
        if (steps > maxMarkers) {
            steps = maxMarkers;
        }
        if (steps < 0 || !isFinite(steps)) {
            steps = 0;
        }
        this._setMarkers(new Array(steps));
    }

    _mergeClasses(classes) {
        return Object.keys(classes).filter(
            function(className) {
                return classes[className];
            }).join(' ');
    }

    _getClassNames() {
        return this._mergeClasses({
            disabled: this.disabled,
            pin: this.pin,
            snaps: this.snaps,
            ring: this.immediateValue <= this.min,
            expand: this.expand,
            dragging: this.dragging,
            transiting: this.transiting,
            editable: this.editable
        });
    }

    get _isRTL() {
        if (this.__isRTL === undefined) {
            this.__isRTL = window.getComputedStyle(this)['direction'] === 'rtl';
        }
        return this.__isRTL;
    }

    _leftKey(event) {
        if (this._isRTL)
            this._incrementKey(event);
        else
            this._decrementKey(event);
    }

    _rightKey(event) {
        if (this._isRTL)
            this._decrementKey(event);
        else
            this._incrementKey(event);
    }

    _incrementKey(event) {
        if (!this.disabled) {
            if (event.detail.key === 'end') {
                this.value = this.max;
            } else {
                this.increment();
            }
            this.fire('change');
            event.preventDefault();
        }
    }

    _decrementKey(event) {
        if (!this.disabled) {
            if (event.detail.key === 'home') {
                this.value = this.min;
            } else {
                this.decrement();
            }
            this.fire('change');
            event.preventDefault();
        }
    }

    _changeValue(event) {
        this.value = event.target.value;
        this.fire('change', {composed: true});
    }

    _inputKeyDown(event) {
        event.stopPropagation();
    }

    // create the element ripple inside the `sliderKnob`
    _createRipple() {
        this.sliderKnob = this.shadowRoot.querySelector('#sliderKnob');
        this._rippleContainer = this.sliderKnob;
        return PaperInkyFocusBehaviorImpl._createRipple.call(this);//.call(this);
    }

    // Hide the ripple when user is not interacting with keyboard.
    // This behavior is different from other ripple-y controls, but is
    // according to spec: https://www.google.com/design/spec/components/sliders.html
    _focusedChanged(receivedFocusFromKeyboard) {
        if (receivedFocusFromKeyboard) {
            this.ensureRipple();
        }
        if (this.hasRipple()) {
            // note, ripple must be un-hidden prior to setting `holdDown`
            if (receivedFocusFromKeyboard) {
                this._ripple.style.display = '';
            } else {
                this._ripple.style.display = 'none';
            }
            this._ripple.holdDown = receivedFocusFromKeyboard;
        }
    }

    getEle(tag) { return this.shadowRoot.querySelector(tag); }

    /**
     * Fired when the slider's value changes.
     *
     * @event value-change
     */

    /**
     * Fired when the slider's immediateValue changes. Only occurs while the
     * user is dragging.
     *
     * To detect changes to immediateValue that happen for any input (i.e.
     * dragging, tapping, clicking, etc.) listen for immediate-value-changed
     * instead.
     *
     * @event immediate-value-change
     */

    /**
     * Fired when the slider's value changes due to user interaction.
     *
     * Changes to the slider's value due to changes in an underlying
     * bound variable will not trigger this event.
     *
     * @event change
     */
}

window.customElements.define('paper-single-range-slider', PaperSingleRangeSlider);
