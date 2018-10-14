import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import { GestureEventListeners } from '@polymer/polymer/lib/mixins/gesture-event-listeners.js';

import './paper-single-range-slider.js'
/**
 * `paper-range-slider`
 * A material design-style range-slider, composed of paper-slider elements
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class PaperRangeSlider extends GestureEventListeners(PolymerElement) {
    static get template() {
        return html`
        <style>
              /* local styles go here */
              :host {
                @apply --layout;
                @apply --layout-justified;
                @apply --layout-center;
  
                --paper-range-slider-width: 200px;
  
                --paper-range-slider-lower-color:             var(--paper-grey-400);
                --paper-range-slider-active-color:            var(--primary-color);
                --paper-range-slider-higher-color:            var(--paper-grey-400);
                --paper-range-slider-knob-color:              var(--primary-color);
                --paper-range-slider-pin-color:               var(--primary-color);
                --paper-range-slider-pin-start-color:         var(--paper-grey-400);
                --paper-range-slider-knob-start-color:        transparent;
                --paper-range-slider-knob-start-border-color: var(--paper-grey-400);
              }
  
              #sliderOuterDiv_0 {
                display: inline-block;
                width: var(--paper-range-slider-width);
              }
  
              #sliderOuterDiv_1 {
                position: relative;
                height: calc(30px + var(--paper-single-range-slider-height, 2px));
                margin-left: 0;
                margin-right: 0;
                margin-top: 0;
                margin-bottom: 0;
              }
  
              /* mimic the size of the #sliderKnob of paper-single-range-slider */
              .sliderKnobMinMax {
                position: absolute;
                left: 0;
                top: 0;
                margin-left: calc(-15px - var(--paper-single-range-slider-height, 2px)/2);
                width: calc(30px + var(--paper-single-range-slider-height, 2px));
                height: calc(30px + var(--paper-single-range-slider-height, 2px));
                /*background: #2196F3; opacity: 0.3;*/
              }
  
              .divSpanWidth {
                  position:absolute;
                  width:100%;
                  display:block;
                  top:0px;
              }
  
              #sliderMax {
                  line-height: normal;
                  --paper-single-range-slider-bar-color:               transparent;
                  --paper-single-range-slider-knob-color:              var(--paper-range-slider-knob-color);
                  --paper-single-range-slider-pin-color:               var(--paper-range-slider-pin-color);
                  --paper-single-range-slider-active-color:            var(--paper-range-slider-active-color);
                  --paper-single-range-slider-secondary-color:         var(--paper-range-slider-higher-color);
                  --paper-single-range-slider-pin-start-color:         var(--paper-range-slider-pin-start-color);
                  --paper-single-range-slider-knob-start-color:        var(--paper-range-slider-knob-start-color);
                  --paper-single-range-slider-knob-start-border-color: var(--paper-range-slider-knob-start-border-color);
              }
              #sliderMin {
                  line-height: normal;
                  --paper-single-range-slider-active-color:            var(--paper-range-slider-lower-color);
                  --paper-single-range-slider-secondary-color:         transparent;
                  --paper-single-range-slider-knob-color:              var(--paper-range-slider-knob-color);
                  --paper-single-range-slider-pin-color:               var(--paper-range-slider-pin-color);
                  --paper-single-range-slider-pin-start-color:         var(--paper-range-slider-pin-start-color);
                  --paper-single-range-slider-knob-start-color:        var(--paper-range-slider-knob-start-color);
                  --paper-single-range-slider-knob-start-border-color: var(--paper-range-slider-knob-start-border-color);
              }
          </style>
  
          <div id="sliderOuterDiv_0" style="[[mainDivStyle]]">
              <div id="sliderOuterDiv_1">
                <!-- style="background: #2196F3; opacity:0.2;" -->
                <div id='backDiv' class="divSpanWidth" on-down="_backDivDown" on-tap="_backDivTap"
                     on-up="_backDivUp" on-track="_backDivOnTrack" on-transitionend="_backDivTransEnd">
                    <!-- must have this in order to force width/height -->
                    <div id='backDivInner_0' style="line-height:200%;"><br></div>
                </div>
  
                <div class="divSpanWidth" style="pointer-events: none;">
                  <paper-single-range-slider id='sliderMax' display-function="[[displayFunction]]" disabled$="[[disabled]]" on-down="_sliderMaxDown"
                                on-up="_sliderMaxUp" step="[[step]]" min="[[min]]" max="[[max]]"
                                value="[[valueMax]]" secondary-progress='[[max]]' style="width:100%;">
                  </paper-single-range-slider>
                </div>
  
                <div class="divSpanWidth" style="pointer-events: none;">
                  <paper-single-range-slider id='sliderMin' display-function="[[displayFunction]]" disabled$="[[disabled]]" on-down="_sliderMinDown"
                                on-up="_sliderMinUp" noink step="[[step]]" min="[[min]]" max="[[max]]"
                                value="[[valueMin]]" style="width:100%;">
                  </paper-single-range-slider>
                </div>
  
                <!-- now add one real line -->
                <div id='backDivInner_1' style="line-height:100%;"><br></div>
              </div>
          </div>
      `;
    }
    static get is() { return 'paper-range-slider' }

    // -----------------------------------------------------------------------------------------------------------
    // properties
    // -----------------------------------------------------------------------------------------------------------
    static get properties() {
        return  {
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
             * the width of the element in pixels.
             */
            sliderWidth: {
                type: String,
                value: "",
                notify: true,
                reflectToAttribute: true
            },

            /**
             * the style attribute of the element.
             */
            mainDivStyle: {
                type: Object,
                value: function() {return {}},
                notify: true,
                reflectToAttribute: true
            },

            /**
             * the minimal value (lower range) of the slider.
             */
            min: {
                type: Number,
                value: 0,
                notify: true,
                reflectToAttribute: true
            },

            /**
             * the maximal value (upper range) of the slider.
             */
            max: {
                type: Number,
                value: 100,
                notify: true,
                reflectToAttribute: true
            },

            /**
             * the current value of the lower range of the slider.
             */
            valueMin: {
                type: Number,
                value: 0,
                notify: false,
                reflectToAttribute: true
            },

            /**
             * the current value of the upper range of the slider.
             */
            valueMax: {
                type: Number,
                value: 100,
                notify: false,
                reflectToAttribute: true
            },

            /**
             * the minimal step-change of a knob on the slider
             */
            step: {
                type: Number,
                value: 1,
                notify: true,
                reflectToAttribute: true
            },

            /**
             * optional minimal value for the difference between valueMin and valueMax
             * by default this is negative (valueDiffMin is ignored)
             */
            valueDiffMin: {
                type: Number,
                value: 0,
                notify: true,
                reflectToAttribute: true
            },

            /**
             * optional maximal value for the difference between valueMin and valueMax
             * by default this is negative (valueDiffMax is ignored)
             */
            valueDiffMax: {
                type: Number,
                value: 0,
                notify: true,
                reflectToAttribute: true
            },

            /**
             * if true, pins with numeric value label are shown when the slider thumb
             * is pressed. Use for settings for which users need to know the exact
             * value of the setting.
             */
            alwaysShowPin: {
                type: Boolean,
                value: false,
                notify: true
            },

            /**
             * if true, pins with numeric value label are shown when the slider thumb
             * is pressed. Use for settings for which users need to know the exact
             * value of the setting.
             */
            pin: {
                type: Boolean,
                value: false,
                notify: true
            },

            /**
             * if true, the slider thumb snaps to tick marks evenly spaced based
             * on the `step` property value.
             */
            snaps: {
                type: Boolean,
                value: false,
                notify: true
            },

            /**
             * if true, the slider is disabled.
             */
            disabled: {
                type: Boolean,
                value: false,
                notify: true
            },

            /**
             * an option to "revert" from the paper-range-slider to a single paper-single-range-slider.
             */
            singleSlider: {
                type: Boolean,
                value: false,
                notify: true
            },

            /**
             * time-window (in msec) to keep the slider._setTransiting(true) for the
             * two paper-single-range-slider elements, when using the _setValuesTrans() method to change the
             * selected range. This should be slightly higher than the transition time defined for the
             * paper-single-range-slider (which, as of paper-single-range-slider-v1.0.11, is 0.08s/0.18s).
             */
            transDuration: {
                type: Number,
                value: 250,
            },

            /**
             * if set to true, tapping the slider below or above the selected range
             * will update the selected range.
             */
            tapValueExtend: {
                type: Boolean,
                value: true,
                notify: true
            },

            /**
             * if set to true, tapping the slider inside the selected range
             * will update the selected range.
             */
            tapValueReduce: {
                type: Boolean,
                value: false,
                notify: true
            },

            /**
             * if set to true, tapping the slider will update the selected range,
             * while keeping the same difference between valueMin and valueMax.
             * tapValueMove supersedes tapValueExtend and tapValueReduce
             */
            tapValueMove: {
                type: Boolean,
                value: false,
                notify: true
            },
        }
    }


    // -----------------------------------------------------------------------------------------------------------
    // initial settings
    // -----------------------------------------------------------------------------------------------------------
    ready() {
        super.ready();
        this.inInit = true;

        var this_      = this;
        var nInitTries = 0;

        var sliderMin = this.shadowRoot.querySelector("#sliderMin");
        var sliderMax = this.shadowRoot.querySelector("#sliderMax");

        // initialization once the paper-single-range-slider elements have been rendered
        function _ready() {
            if(sliderMin.isReady && sliderMax.isReady) {
                this_.init();

                // setup listeners for updating everything whenever a knob is affected
                sliderMin.addEventListener('immediate-value-change', function(customEvent) {
                    this_._setValueMinMax(this_._getValuesMinMax(this.immediateValue,null),'immediate-value-change');
                });

                sliderMax.addEventListener('immediate-value-change', function(customEvent) {
                    this_._setValueMinMax(this_._getValuesMinMax(null,this.immediateValue),'immediate-value-change');
                });

                sliderMin.addEventListener('change', function(customEvent) {
                    this_._setValueMinMax(this_._getValuesMinMax(this.immediateValue,null),'change');

                    if(this_.alwaysShowPin) {
                        this_.$.sliderMin._expandKnob();
                    }
                });

                sliderMax.addEventListener('change', function(customEvent) {
                    this_._setValueMinMax(this_._getValuesMinMax(null,this.immediateValue),'change');

                    if(this_.alwaysShowPin) {
                        this_.$.sliderMax._expandKnob();
                    }
                });

                this_.inInit = false;
            }
            else {
                if(nInitTries < 1000) {
                    setTimeout(function() { _ready(); }, 10);
                }
                else {
                    console.error("could not properly initialize the underlying paper-single-range-slider elements ...");
                }
                nInitTries++;
            }
        }
        _ready();

        return;
    }

    /**
     * initialize basic properties (can be called again by the user)
     * @method init
     */
    init() {
        this.setSingleSlider(this.singleSlider);
        this.setDisabled(this.disabled);

        // some basic properties
        if(this.alwaysShowPin) { this.pin = true; }

        this.shadowRoot.querySelector("#sliderMin").pin   = this.pin;
        this.shadowRoot.querySelector("#sliderMax").pin   = this.pin;
        this.shadowRoot.querySelector("#sliderMin").snaps = this.snaps;
        this.shadowRoot.querySelector("#sliderMax").snaps = this.snaps;

        if(this.sliderWidth != "") {
            this.updateStyles({
                '--paper-range-slider-width': this.sliderWidth,
            });
        }

        // since the two single sliders are overlaid, we need to remove foreground color
        this.sliderBar = this.shadowRoot.querySelector("#sliderMin").getEle('#sliderBar');
        if(this.sliderBar) {
            this.progressContainer = this.sliderBar.shadowRoot.querySelector('#progressContainer');
            if(this.progressContainer) this.progressContainer.style.background = "transparent";
        }

        // internal variable to prevent unneeded fire on updates
        this._prevUpdateValues = [this.min, this.max];

        // set internal variables to control the minimal and maximal difference between selected values
        this._setValueDiff();

        // initial setting after verifying this._valueDiffMin, this._valueDiffMax
        this._setValueMinMax(this._getValuesMinMax(this.valueMin, this.valueMax),'init');

        // activate the pins, and never hide
        if(this.alwaysShowPin) {
            this.shadowRoot.querySelector("#sliderMin")._expandKnob();
            this.shadowRoot.querySelector("#sliderMax")._expandKnob();
        }

        return;
    }

    // internal variables for minimal/maximal difference between this.valueMin, this.valueMax
    // each one is between zero and the maximal difference available in the range, and
    // the this._valueDiffMin can not be larger than this._valueDiffMax
    _setValueDiff() {
        this._valueDiffMax = Math.max(this.valueDiffMax, 0);
        this._valueDiffMin = Math.max(this.valueDiffMin, 0);

        return;
    }

    // get a new set of min/max values, following predefined rules for overlap of the two
    _getValuesMinMax(valueMin,valueMax) {
        var hasMin = (valueMin != null && valueMin >= this.min && valueMin <= this.max);
        var hasMax = (valueMax != null && valueMax >= this.min && valueMax <= this.max);

        if(!hasMin && !hasMax) { return [this.valueMin,this.valueMax]; }

        var valueNowMin = hasMin ? valueMin : this.valueMin;
        var valueNowMax = hasMax ? valueMax : this.valueMax;

        valueNowMin = Math.min(Math.max(valueNowMin, this.min), this.max)
        valueNowMax = Math.min(Math.max(valueNowMax, this.min), this.max)

        var diffNow  = valueNowMax - valueNowMin;

        // the anchor is the valueMin if it is explicitly provided
        if(hasMin) {
            if(diffNow < this._valueDiffMin) {
                valueNowMax = Math.min(this.max, valueNowMin + this._valueDiffMin);
                diffNow  = valueNowMax - valueNowMin;
                if(diffNow < this._valueDiffMin) {
                    valueNowMin = valueNowMax - this._valueDiffMin;
                }
            }
            else if(diffNow > this._valueDiffMax && this._valueDiffMax > 0) {
                valueNowMax = valueNowMin + this._valueDiffMax;
            }
        }
        // if no valueMin given, decide the anchor is valueMax
        else {
            if(diffNow < this._valueDiffMin) {
                valueNowMin = Math.max(this.min, valueNowMax - this._valueDiffMin);
                diffNow  = valueNowMax - valueNowMin;
                if(diffNow < this._valueDiffMin) {
                    valueNowMax = valueNowMin + this._valueDiffMin;
                }
            }
            else if(diffNow > this._valueDiffMax && this._valueDiffMax > 0) {
                valueNowMin = valueNowMax - this._valueDiffMax;
            }
        }

        return [valueNowMin, valueNowMax];
    }

    // set the value of the low edge of the selected range
    _setValueMin(value) {
        value = Math.max(value, this.min);
        this.shadowRoot.querySelector("#sliderMin").value = value;
        this.valueMin = value;
        return;
    }

    // set the value of the high edge of the selected range
    _setValueMax(value) {
        value = Math.min(value, this.max);
        this.shadowRoot.querySelector("#sliderMax").value = value;
        this.valueMax               = value;

        return;
    }

    // set the values of the low/high edges of the selected range and broadcast the change
    _setValueMinMax(valuesMinMax, eventName) {
        this._setValueMin(valuesMinMax[0]);
        this._setValueMax(valuesMinMax[1]);

        // fire to indicate an update of this.valueMin and/or this.valueMax
        this.updateValues(eventName);

        return;
    }

    // set this.valueMin and/or this.valueMax (can input null values or out-of-range
    // values in order to set only one of the two)
    _setValuesNoTrans(valueMin,valueMax,eventName) {
        // some sanity checks/changes
        if(valueMin != null) {
            if(valueMin < this.min || valueMin > this.max) valueMin = null;
        }
        if(valueMax != null) {
            if(valueMax < this.min || valueMax > this.max) valueMax = null;
        }
        if(valueMin != null && valueMax != null) {
            valueMin = Math.min(valueMin,valueMax);
        }

        // now update the values
        this._setValueMinMax(this._getValuesMinMax(valueMin,valueMax), eventName);

        return;
    }

    // _setValuesNoTrans with a transition
    _setValuesTrans(valueMin,valueMax,eventName) {
        this.shadowRoot.querySelector("#sliderMin")._setTransiting(true);
        this.shadowRoot.querySelector("#sliderMax")._setTransiting(true);

        this._setValuesNoTrans(valueMin,valueMax,eventName);

        var this_ = this;
        setTimeout(function() {
            this_.$.sliderMin._setTransiting(false);
            this_.$.sliderMax._setTransiting(false);
        }, this_.transDuration);

        return;
    }

    // interface for functions to control the draggable invisible div which
    // spans the distance between the knobs
    _backDivOnTrack(event) {
        event.stopPropagation();

        switch (event.detail.state) {
            case 'start':
                this._backDivTrackStart(event);
                break;
            case 'track':
                this._backDivTrackDuring(event);
                break;
            case 'end':
                this._backDivTrackEnd();
                break;
        }

        return;
    }

    // place-holder function for possible later implementation
    _backDivTrackStart(event) { return; }

    // function to enable dragging both knobs by using the invisible
    // div which spans the distance in between
    _backDivTrackDuring(e) {
        var sliderMin = this.shadowRoot.querySelector("#sliderMin");
        var sliderMax = this.shadowRoot.querySelector("#sliderMax");

        this._x1_Min = this._x0_Min + e.detail.dx;
        var immediateValueMin = sliderMin._calcStep(this._getRatioPos(sliderMin, this._x1_Min/this._xWidth));

        this._x1_Max = this._x0_Max + e.detail.dx;
        var immediateValueMax = sliderMax._calcStep(this._getRatioPos(sliderMax, this._x1_Max/this._xWidth));

        if(immediateValueMin >= this.min && immediateValueMax <= this.max) {
            this._setValuesWithCurrentDiff(immediateValueMin, immediateValueMax, false);
        }

        return;
    }

    _setValuesWithCurrentDiff(valueMin, valueMax, useTrans) {
        var diffMin = this._valueDiffMin;
        var diffMax = this._valueDiffMax;

        this._valueDiffMin = this.valueMax - this.valueMin;
        this._valueDiffMax = this.valueMax - this.valueMin;

        if(useTrans) this._setValuesTrans(valueMin, valueMax, '_setValuesWithCurrentDiff');
        else         this._setValuesNoTrans(valueMin, valueMax, '_setValuesWithCurrentDiff');

        this._valueDiffMin = diffMin;
        this._valueDiffMax = diffMax;

        return;
    }

    // place-holder function for at the end of the dragging event, so the following
    _backDivTrackEnd() { return; }

    // _sliderMinDown, _sliderMaxDown, _sliderMinUp, _sliderMaxUp
    //      show/hide pins (if defined) for one knob, when the other knob is pressed
    _sliderMinDown() {
        this.shadowRoot.querySelector("#sliderMax")._expandKnob();

        return;
    }

    _sliderMaxDown(event) {
        if(!this.singleSlider) {
            this.shadowRoot.querySelector("#sliderMin")._expandKnob();
        }
        else {
            this._setValuesNoTrans(null,this._getEventValue(event),'_sliderMaxDown');
        }

        return;
    }

    _sliderMinUp() {
        if(this.alwaysShowPin) this.shadowRoot.querySelector("#sliderMin")._expandKnob();
        else                   this.shadowRoot.querySelector("#sliderMax")._resetKnob();

        return;
    }

    _sliderMaxUp() {
        if(this.alwaysShowPin) this.shadowRoot.querySelector("#sliderMax")._expandKnob();
        else {
            this.shadowRoot.querySelector("#sliderMin")._resetKnob();
            if(this.singleSlider) this.shadowRoot.querySelector("#sliderMax")._resetKnob();
        }

        return;
    }

    // function to calculate the value from an event
    _getEventValue(event) {
        var width = this.shadowRoot.querySelector("#sliderMax").getEle('#sliderContainer').offsetWidth;
        var rect  = this.shadowRoot.querySelector("#sliderMax").getEle('#sliderContainer').getBoundingClientRect();
        var ratio = (event.detail.x - rect.left) / width;
        var value = this.min + ratio * (this.max - this.min);

        return value;
    }


    // set the value if tapping the slider below or above the selected range
    _backDivTap(event) {
        this._setValueNow = function(valueMin,valueMax) {
            if(this.tapValueMove) { this._setValuesWithCurrentDiff(valueMin,valueMax,true); }
            else                  { this._setValuesTrans(valueMin,valueMax,'_backDivTap');  }
            return;
        };

        var value = this._getEventValue(event);
        if(value > this.valueMin && value < this.valueMax) {
            if(this.tapValueReduce) {
                var isLow = value < (this.valueMin + (this.valueMax - this.valueMin)/2);
                if(isLow) { this._setValueNow(value,null); }
                else      { this._setValueNow(null,value); }
            }
        }
        else if(this.tapValueExtend || this.tapValueMove) {
            if(value < this.valueMin) { this._setValueNow(value,null); }
            if(value > this.valueMax) { this._setValueNow(null,value); }
        }

        return;
    }

    // initialization before starting the dragging of the invisible
    // div which spans the distance in between
    _backDivDown(event) {
        // show pins if defined
        this._sliderMinDown();
        this._sliderMaxDown();

        // get the initial positions of knobs before dragging starts
        this._xWidth =  this.shadowRoot.querySelector("#sliderMin").getEle('#sliderBar').offsetWidth;
        this._x0_Min = (this.shadowRoot.querySelector("#sliderMin").ratio / 100.) * this._xWidth;
        this._x0_Max = (this.shadowRoot.querySelector("#sliderMax").ratio / 100.) * this._xWidth;

        return;
    }

    // finalization after ending the dragging of the invisible
    // div which spans the distance in between
    _backDivUp() {
        // hide pins if defined
        this._sliderMinUp();
        this._sliderMaxUp();

        return;
    }

    // place-holder function for possible later implementation
    _backDivTransEnd(event) { return; }

    // the position of the knob for a given single slider, for a given ratio
    _getRatioPos(slider, ratio) {
        return Math.max(slider.min, Math.min(slider.max, (slider.max - slider.min) * ratio + slider.min));
    }

    // helper function to cast to a boolean
    _toBool(valIn) { return (valIn === "false" || valIn === "0") ? false : Boolean(valIn); }

    /**
     * set this.valueMin and/or this.valueMax (can input null values or out-of-range
     * values in order to set only one of the two) - this is just a public
     * wrapper for this._setValuesNoTrans(), but including transition animation
     * @method _setValuesTrans
     */
    setValues(valueMin,valueMax,eventName) {
        var eventNameNow = eventName ? eventName : 'setValues';
        this._setValuesTrans(valueMin,valueMax,eventNameNow);
        return;
    }

    /**
     * fire whenever this.valueMin or this.valueMax are changed
     * @method updateValues
     */
    updateValues(eventName) {
        var isNewMin = (this._prevUpdateValues[0] !== this.valueMin);
        var isNewMax = (this._prevUpdateValues[1] !== this.valueMax);
        if(isNewMin || isNewMax) {
            this._prevUpdateValues = [this.valueMin, this.valueMax];

            // fire events
            if(!this.inInit) {
                this.dispatchEvent(new CustomEvent('updateValues', { bubbles:true, composed:true, detail:{this:this, eventName:eventName} }));

                if(isNewMin) {
                    this.dispatchEvent(
                        new CustomEvent('value-min-changed', { bubbles:true, composed:true, detail:{this:this, value:this.valueMin, eventName:eventName} })
                    );
                }
                if(isNewMax) {
                    this.dispatchEvent(
                        new CustomEvent('value-max-changed', { bubbles:true, composed:true, detail:{this:this, value:this.valueMax, eventName:eventName} })
                    );
                }
            }
        }
        return;
    }

    /**
     * set the minimal value (lower range) of the slider
     * @method setMin
     */
    setMin(minIn) {
        // paper-single-range-slider needs a safety check that the min value we are going to set is
        // not larger than the max value which is already set
        if(this.max < minIn) this.max = minIn;

        this.min = minIn;
        this._prevUpdateValues = [this.min, this.max];

        // update the selected value if it is now outside of the lower bound,
        // or just update the position of the overlay divs for the min/max knobs
        if(this.valueMin < this.min) this._setValuesNoTrans(this.min,null,'setMin');

        return;
    }

    /**
     * set the maximal value (upper range) of the slider
     * @method setMax
     */
    setMax(maxIn) {
        // paper-single-range-slider needs a safety check that the min value we are going to set is
        // not larger than the max value which is already set
        if(this.min > maxIn) this.min = maxIn;

        this.max = maxIn;
        this._prevUpdateValues = [this.min, this.max];

        // update the selected value if it is now outside of the upper bound,
        // or just update the position of the overlay divs for the min/max knobs
        if(this.valueMax > this.max) this._setValuesNoTrans(null,this.max,'setMax');

        return;
    }

    /**
     * set the minimal step-change of a knob on the slider
     * @method setMax
     */
    setStep(stepIn) {
        this.step = stepIn;
        return;
    }

    /**
     * get tne ratio (within [0,1]) corresponding to the min/max values
     * @method getRatio
     */
    getRatio() {
        var ratioMin = this.shadowRoot.querySelector("#sliderMin").ratio / 100.;
        var ratioMax = this.shadowRoot.querySelector("#sliderMax").ratio / 100.;
        return [ratioMin, ratioMax];
    }

    /**
     * set the minimal difference between selected values
     * @method setValueDiffMin
     */
    setValueDiffMin(valueDiffMin) {
        this._valueDiffMin = valueDiffMin;
        return;
    }

    /**
     * set the maximal difference between selected values
     * @method setValueDiffMax
     */
    setValueDiffMax(valueDiffMax) {
        this._valueDiffMax = valueDiffMax;
        return;
    }

    /**
     * set the tapValueExtend property
     * @method setValueDiffMax
     */
    setTapValueExtend(isTapValueExtend) {
        this.tapValueExtend = this._toBool(isTapValueExtend);
        return;
    }

    /**
     * set the tapValueReduce property
     * @method setValueDiffMax
     */
    setTapValueReduce(isTapValueReduce) {
        this.tapValueReduce = this._toBool(isTapValueReduce);
        return;
    }

    /**
     * set the tapValueMove property
     * @method setValueDiffMax
     */
    setTapValueMove(isTapValueMove) {
        this.tapValueMove = this._toBool(isTapValueMove);
        return;
    }

    /**
     * set the disabled parameter
     * @method setValueDiffMax
     */
    setDisabled(isDisabled) {
        this.disabled = this._toBool(isDisabled);
        var pointEvt  = this.disabled ? "none" : "auto";

        this.shadowRoot.querySelector("#sliderMax").getEle('#sliderKnob').style.pointerEvents = pointEvt;
        this.shadowRoot.querySelector("#sliderMin").getEle('#sliderKnob').style.pointerEvents = pointEvt;
        this.shadowRoot.querySelector("#sliderOuterDiv_1").style.pointerEvents                = pointEvt;

        return;
    }

    /**
     * change the slider between the default paper-range-slider and a paper-single-range-slider
     * @method setValueDiffMax
     */
    setSingleSlider(isSingle) {
        this.singleSlider = this._toBool(isSingle);

        var sliderMin = this.shadowRoot.querySelector("#sliderMin");
        var sliderMax = this.shadowRoot.querySelector("#sliderMax");
        var backDiv   = this.shadowRoot.querySelector("#backDiv");
        var knobMin   = sliderMin.getEle('#sliderKnob');
        var knobMax   = sliderMax.getEle('#sliderKnob');

        if(isSingle) {
            backDiv.style.display         = 'none';
            sliderMax.style.pointerEvents = 'auto';
            sliderMax.style.display       = '';
            sliderMin.style.display       = 'none';
            backDiv.style.cursor          = 'default';
            knobMax.style.cursor          = 'default';
            knobMin.style.cursor          = 'default';
        }
        else {
            backDiv.style.display         = 'block';
            sliderMax.style.pointerEvents = 'none';
            sliderMax.style.display       = '';
            sliderMin.style.display       = '';
            backDiv.style.cursor          = 'ew-resize';
            knobMax.style.cursor          = 'col-resize';
            knobMin.style.cursor          = 'col-resize';
        }

        // disable some of the interface of the two single sliders,
        // but keep the knobs active if not disabled
        sliderMax.getEle('#sliderContainer').style.pointerEvents = this.singleSlider ? "auto" : "none";
        sliderMin.getEle('#sliderContainer').style.pointerEvents = "none";

        return;
    }
}

window.customElements.define('paper-range-slider', PaperRangeSlider);
