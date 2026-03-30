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
import "./insta-basic-like.js";
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
    this.slideData = []
    this.author = {};
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      currentIndex: { type: Number },
      subHeading: { type: String },
      currentImage: { type: String },
      slideData: { type: Array},
      author: { type: Object},

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
        bottom: var(--ddd-spacing-2);
        left: var(--ddd-spacing-9);
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
  second-heading="${this.subHeading}"
  author-name="${this.author?.name}"
  author-photo="${this.author?.photo}"
  author-username="${this.author?.username}">


</insta-basic-description>

<insta-basic-image .src="${this.currentImage}" alt="Random Fox Image"></insta-basic-image>

<insta-basic-like .index="${this.currentIndex}"></insta-basic-like>

 
  <div class="indicator">
    <insta-basic-indicator
      .total="${this.slideData ? this.slideData.length : 0}"
      .currentIndex="${this.currentIndex}"
      @dot-clicked="${this._onDotClicked}"
      >
    </insta-basic-indicator>
  </div>`;
  }
updateQueryParam(key, value) {
  const currentUrl = new URL(window.location.href);
  currentUrl.searchParams.set(key, value);
  history.pushState(null, '', currentUrl.toString());

}
next() {
  if (this.currentIndex < this.slideData.length - 1) {
    this.currentIndex++;
    this.updateQueryParam('activeIndex', this.currentIndex);
    this._updateSlides();
  }
}

prev() {
  if (this.currentIndex > 0) {
    this.currentIndex--;
    this.updateQueryParam('activeIndex', this.currentIndex);
    this._updateSlides();
  }
}

async firstUpdated() {
  const urlParams = new URLSearchParams(window.location.search);
  const indexFromUrl = urlParams.get('activeIndex');
  if (indexFromUrl !== null) {
    this.currentIndex = parseInt(indexFromUrl)
  }

  const dataUrl = new URL("./data.json", import.meta.url).href;
  const response = await fetch(dataUrl);
  const data = await response.json();
  this.slideData = data.slides;
  this._updateSlides();
}

_updateSlides() {
  const slide = this.slideData?.[this.currentIndex];
  if (slide) {
    this.title = slide.topHeading;
    this.subHeading = slide.subHeading;
    this.currentImage = slide.photo;
    this.author = slide.author;
  }
}

_onDotClicked(e) {
  this.currentIndex = e.detail.index;
  this.updateQueryParam('activeIndex', this.currentIndex);
  this._updateSlides(); 
  }
}

globalThis.customElements.define(InstaBasicProject.tag, InstaBasicProject);