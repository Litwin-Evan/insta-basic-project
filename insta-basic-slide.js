/**
 * Copyright 2026 Evan Litwin
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";


/**
 * `insta-basic-slide`
 * 
 * @demo index.html
 * @element insta-basic-slide
 */
export class InstaBasicSlide extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "insta-basic-slide";
  }

  constructor() {
    super();
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
        :host {
            display: block;

        }
        .slide {
            padding: var(--ddd-spacing-4);
        }
    `];
  }

  // Lit render the HTML
  render() {
    return html`
        <div class = "slide">
          <slot></slot>
        </div>
    `;
  }
}

globalThis.customElements.define(InstaBasicSlide.tag, InstaBasicSlide);