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
  }

  static get properties() {
    return {
      ...super.properties,
      total: { type: Number },
      currentIndex: { type: Number },
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
        margin-left: var(--ddd-spacing-30);
        gap: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-2);
        }
    .dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: var(--ddd-theme-default-skyBlue);
    opacity: 0.4;
    cursor: pointer;
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
      <span 
        class="dot ${i === this.currentIndex ? 'active' : ''}"
        @click="${() => this._dotClicked(i)}">
    </span>
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