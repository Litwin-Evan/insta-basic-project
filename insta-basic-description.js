/// This will be the file for the playlist description, which will be used to display the description of the playlist in the playlist component.
/**
 * Copyright 2026 Evan Litwin
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `insta-basic-description`
 * 
 * @demo index.html
 * @element insta-basic-description
 */
export class InstaBasicDescription extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "insta-basic-description";
  }

  constructor() {
    super();
    this.topHeading = "TOP LINE HEADING";
    this.subHeading = "Slide 1, sub-heading";
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      topHeading: { type: String, attribute: "top-heading" },
      subHeading: { type: String, attribute: "second-heading" },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }
      h3 span {
        font-size: var(--insta-basic-description-label-font-size, var(--ddd-font-size-s));
      }
       .blue-line {
        border: none;
        height: 2px;
        width: 75px;
        background-color: var(--ddd-theme-default-skyBlue);
        margin-left: var(--ddd-spacing-8);
          margin-top: var(--ddd-spacing-6);
      }
      .top-heading {
        font-size: var(--insta-basic-description-top-heading-font-size, var(--ddd-font-size-m));
        text-transform: uppercase;
        color: var(--ddd-theme-default-skyBlue);
        margin-bottom: var(--ddd-spacing-2);
        margin-left: var(--ddd-spacing-8);
      }
      .second-heading {
        font-size: var(--insta-basic-description-second-heading-font-size, var(--ddd-font-size-l));
        text-transform: uppercase;
        color: var(--ddd-theme-default-beaverBlue);
        margin-left: var(--ddd-spacing-8);
        }
      .content {
        overflow-y: auto;
        max-height: 250px;
        display: block;
        padding-right: var(--ddd-spacing-4);
        margin-left: var(--ddd-spacing-8);
        width: 75%;
        color: var(--ddd-theme-default-beaverBlue);
      }
      
    `];
  }

  // Lit render the HTML
  render() {
    return html`
<div class="wrapper">
  <div class="top-heading">${this.topHeading}</div>
  <div class="second-heading"><span>${this.subHeading}</span></div>
  <hr class="blue-line">
  <div class="content">
    <slot></slot>
  </div>
</div>`;
  }
}

globalThis.customElements.define(InstaBasicDescription.tag, InstaBasicDescription);