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
light

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
_share() {
  if (navigator.share) {
    navigator.share({
    title: "Check out this post!",
    url: window.location.href,
  });
  } else {
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert("Link copied to clipboard!");
    });
  }
}

connectedCallback(){
  super.connectedCallback();
}

updated(changedProperties) {
  if(changedProperties.has(`index`)) {
    this.liked = false;
    this.likeCount = 0;
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
        background: none;
        border: none;
        cursor: pointer;
        transition: transform 0.2s ease;
        margin-left: var(--ddd-spacing-30);
        font-size: var(--ddd-font-size-l);
      }
      .share-btn {
        background: none;
        border: none;
        cursor: pointer;
        font-size: var(--ddd-font-size-l);
        transition: transform 0.2s ease;
        color: var(--ddd-theme-default-black);
      }
      .share-btn:hover {
        transform: scale(1.2);
      }

      .heart-btn:hover {
        transform: scale(1.2);

      }

      .heart-btn.liked {
        color: var(--ddd-theme-default-original87Pink);

      }

      .heart-btn:not(.liked) {
        color: var(--ddd-theme-default-black);
  
      }
    `];
  }

  // Lit render the HTML
  render() {
    const label = this.likeCount === 1 ? 'Like' : 'Likes';
    return html`
   <button class="heart-btn ${this.liked ? 'liked' : ''}" @click="${this.toggleLike}">
    ${this.liked ? '\u2661' : '\u2661'}
    </button>
    <span>${this.likeCount} ${label}</span>
    <button class="share-btn" @click="${this._share}"> &#x2197;
    </button>
    `;
    }

  

}

globalThis.customElements.define(InstaBasicLike.tag, InstaBasicLike);