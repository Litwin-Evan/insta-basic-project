/**
 * Copyright 2026 Evan Litwin
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `insta-basic-arrows`
 * 
 * @demo index.html
 * @element insta-basic-arrows
 */
export class InstaBasicArrows extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "insta-basic-arrows";
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
      .prev {
        position: absolute;
        left: -20px;
        top: 45%;
      }
      .next {
        position: absolute;
        right: -30px;
        top: 45%;
      }
      button {
        background-color: white;
        color: var(--ddd-theme-default-link);
        border-color: var(--ddd-theme-default-potential0);
        border-width: 10px;
        border: solid;
        padding: var(--ddd-spacing-2) var(--ddd-spacing-4);
        cursor: pointer;
        font-size: var(--ddd-font-size-s);
        border-radius: 50%;
      }
      
      button:hover {
        opacity: 0.5;
      }
    `];
  }

  // Lit render the HTML
  render() {
    return html`
    <div class="wrapper">
        <button class="prev" @click=${() => this.dispatchEvent(new CustomEvent('prev-clicked', {bubbles: true, composed: true }))}><</button>
        <button class="next" @click=${() => this.dispatchEvent(new CustomEvent('next-clicked', {bubbles: true, composed: true}))}>></button>
    </div>
    `;
  }

}

globalThis.customElements.define(InstaBasicArrows.tag, InstaBasicArrows);