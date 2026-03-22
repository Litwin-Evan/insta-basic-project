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
            display: block;

        }
          img { 
            aspect-ratio: 1 / 1;
            height: 250px;
            border-radius: var(--ddd-border-radius);
          } 
      
    `];
  }

  // Lit render the HTML
  render() {
    return html`
            <img src = "${this.src}" alt = "${this.alt}" style="width: 100%; height: auto; border-radius: var(--ddd-border-radius);">
          
    `;
  }

async connectedCallback() {
    super.connectedCallback();
    await this.fetchFox();
  }

  async fetchFox() {
    const response = await fetch('https://randomfox.ca/floof/');
    const data = await response.json();
    this.src = data.image;
    this.alt = "A random fox";
    this.url = data.link;
    this.elementVisisble = true;
  }
}
globalThis.customElements.define(InstaBasicImage.tag, InstaBasicImage);