import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
/**
 * `insta-basic-indicator`
 * 
 * @demo index.html
 * @element insta-basic-indicator
 */
export class InstaBasicIndicator extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "insta-basic-indicator";
  }

  constructor() {
    super();
        this.total = 0;
        this.currentIndex = 0;
        this.photos = [];
  }

  static get properties() {
    return {
      ...super.properties,
      total: { type: Number },
      currentIndex: { type: Number },
      photos: { type: Array },
    };
  }

  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
      }
      .dots {
        display: flex;
        gap: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-2) 10px;
        max-width: 4000px;
        margin: auto 0;
        overflow-x: auto;
        margin-top: var(--ddd-spacing-13);
        }

        
    .dot {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: var(--ddd-theme-default-skyBlue);
    opacity: 0.5;
    cursor: pointer;
    flex-shrink: 0;
    }
    .dot.active {
    opacity: 1;
    }
        `];
  }

  render() {
    let dots = [];
    for (let i = 0; i < this.total; i++) {
      dots.push(html`
      <img
        class="dot ${i === this.currentIndex ? 'active' : ''}"
        style="background-image: url(${this.photos[i]}); background-size: cover; background-position: center;"
        @click="${() => this._dotClicked(i)}">
        `);
    }
    return html`
      <div class="dots">
        ${dots}
      </div>`;
  }

  _dotClicked(index) {
    console.log("Dot clicked: ", index);
  
    this.dispatchEvent(new CustomEvent('dot-clicked',{ 
        detail: { index: index },
        bubbles: true,
        composed: true,
       }));
  }
}

globalThis.customElements.define(InstaBasicIndicator.tag, InstaBasicIndicator);