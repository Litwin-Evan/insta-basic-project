/**
 * Copyright 2026 Evan Litwin
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";


/**
 * `insta-basic-image`
 * 
 * @demo index.html
 * @element insta-basic-image
 */
export class InstaBasicImage extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "insta-basic-image";
  }

  constructor() {
    super();
    this.src = "";
    this.alt = "";
    this.url = "";
    this.elementVisisble = false; 

  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      src: { type: String },
      alt: { type: String },
      url: { type: String },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
        :host {
            display: flex;
            justify-content: center;


        }
          img { 
            aspect-ratio: 3 / 2;
            height: 300px;
            width: 350px;
            object-fit: cover;
            border: 2px solid var(--ddd-theme-default-potentialMidnight);
            border-radius: var(--ddd-radius-lg);
            
          } 
      
    `];
  }

  // Lit render the HTML
  render() {
    return html`
       <img src = "${this.src}" alt = "${this.alt}">
          
    `;
  }
}
globalThis.customElements.define(InstaBasicImage.tag, InstaBasicImage);