/**
 * Copyright 2026 Evan Litwin
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "./insta-basic-description.js";
import "./insta-basic-slide.js";
import "./insta-basic-arrows.js";
import "./insta-basic-indicator.js";
import "./insta-basic-image.js";

/**
 * `insta-basic-project`
 * 
 * @demo index.html
 * @element insta-basic-project
 */
export class InstaBasicProject extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "insta-basic-project";
  }

  constructor() {
    super();
    this.title = "TOP LINE HEADING";
    this.currentIndex = 0;
    this.t = {
      title: "TOP LINE HEADING",
    };
    this.subHeading = "Slide 1, sub-heading";
    this.currentImage = "";
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      currentIndex: { type: Number },
      subHeading: { type: String },
      currentImage: { type: String },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-default-limestoneMaxLight);
        font-family: var(--ddd-font-navigation);
        margin: var(--ddd-spacing-4) 0;
        max-width: 900px;
        margin-left: auto;
        margin-right: auto;
        border-radius: var(--ddd-border-radius);
        box-shadow: var(--ddd-boxShadow-lg);
        position: relative;
        min-height: 400px;

      }

      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
        overflow-y: auto;
        border-radius: var(--ddd-border-radius);
        box-shadow: var(--ddd-shadow-elevation-2);
        max-height: 400px;
        max-width: 600px;
        margin-right: auto;
        padding-bottom: var(--ddd-spacing-6);
      }

      h3 span {
        font-size: var(--insta-basic-project-label-font-size, var(--ddd-font-size-s));
        color: var(--ddd-theme-default-skyBlue);
        text-transform: uppercase;
        margin-right: var(--ddd-spacing-2);
      }
      .indicator {
        position: absolute;
        bottom: 5px;
        left: 35px;
        transform: translateX(-50%);
      }

    `];
  }

  // Lit render the HTML
  render() {
    return html`
<div class="arrow-row">
  <insta-basic-arrows
    @prev-clicked="${this.prev}"
    @next-clicked="${this.next}">
  </insta-basic-arrows>
</div>

<insta-basic-description
  top-heading="${this.title}"
  second-heading="${this.subHeading}">
</insta-basic-description>

<insta-basic-image src="${this.currentImage}" alt="Description of the image"></insta-basic-image>




 
  <div class="indicator">
    <insta-basic-indicator
      .total="${this.slides ? this.slides.length : 0}"
      .currentIndex="${this.currentIndex}"
      @dot-clicked="${this._onDotClicked}"
      >
    </insta-basic-indicator>
  </div>`;
  }

next() {
  if (this.currentIndex < this.slides.length - 1) {
    this.currentIndex++;
    this._updateSlides();
  }
}


prev() {
  if (this.currentIndex > 0) {
    this.currentIndex--;
    this._updateSlides();
  }
}

firstUpdated() {
  this.slides = Array.from(this.querySelectorAll("insta-basic-slide"));
  this._updateSlides();
}

_updateSlides() {
  this.slides.forEach((slide, i) => {
    slide.style.display = i === this.currentIndex ? "block" : "none";
  });

  const currentSlide = this.slides[this.currentIndex];
  if (currentSlide) {
    this.title = currentSlide.getAttribute("top-heading");
    this.subHeading = currentSlide.getAttribute("second-heading");
    this.currentImage = currentSlide.getAttribute("image-src");
  }

}
_onDotClicked(e) {
  console.log("event received:", e.detail.index);
  this.currentIndex = e.detail.index;
  this._updateSlides(); 
}
}
globalThis.customElements.define(InstaBasicProject.tag, InstaBasicProject);