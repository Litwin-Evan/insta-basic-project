/**
 * Copyright 2026 Evan Litwin
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `insta-basic-like`
 * 
 * @demo index.html
 * @element insta-basic-like
 */
export class InstaBasicLike extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "insta-basic-like";
  }
constructor() {
    super();
    this.liked = false;
    this.likeCount = 0;
    this.index = 0;

  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      liked: {type: Boolean},
      likeCount: {type: Number},
      index: {type: Number},
    };
  }
toggleLike() {
    this.liked = !this.liked;
    this.likeCount += this.liked ? 1 : -1;
    this.saveToStorage();

}

saveToStorage() {
  localStorage.setItem(`like-${this.index}`, JSON.stringify({
    liked: this.liked,
    likeCount: this.likeCount
  }));
}

loadFromStorage() {
  const stored = localStorage.getItem(`like-${this.index}`);
  if (stored) {
    const data = JSON.parse(stored);
    this.liked = data.liked ?? false;
    this.likeCount = data.likeCount ?? 0;
  } else {
    this.liked = false;
    this.likeCount = 0;
  }

}

connectedCallback(){
  super.connectedCallback();
}

updated(changedProperties) {
  if(changedProperties.has(`index`)) {
    this.liked = false;
    this.Count = 0;
    this.loadFromStorage();
  }
}
  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
      }
      .heart-btn {
        width: 40px;
        height: 40px;
        border-radius: var(--ddd-radius-circle);
        border: 1px solid var(--ddd-theme-default-potentialMidnight);
        cursor: pointer;
        transition: transform 0.1s ease;
        margin-left: var(--ddd-spacing-30);
      }

      .heart-btn:hover {
        transform: scale(1.1);

      }

      .heart-btn.liked {
        background-color: var(--ddd-theme-default-original87Pink);

      }

      .heart-btn:not(.liked) {
        background-color: var(--ddd-theme-default-white);
  
      }
    `];
  }

  // Lit render the HTML
  render() {
    return html`
   <button class="heart-btn ${this.liked ? 'liked' : ''}" @click="${this.toggleLike}">
    </button>
    <span>${this.likeCount}</span>
    `;
    }

  

}

globalThis.customElements.define(InstaBasicLike.tag, InstaBasicLike);