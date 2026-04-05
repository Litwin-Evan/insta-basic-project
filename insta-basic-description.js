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
    this.caption = "Caption";
    this.location = "Location";
    this.username = "Username";
    this.name = "Name";
    this.profilePhoto = "";
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      caption: { type: String, attribute: "caption" },
      location: { type: String, attribute: "location" },
      username: { type: String, attribute: "author-username" },
      name: { type: String, attribute: "author-name" },
      profilePhoto: { type: String, attribute: "profile-photo" },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        min-height: 200px;
      }
      .wrapper {
        display: flex;
        flex-direction: column;
        flex: 1;
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }
      
      .descritpion-row {
        display: flex;
        align-items: center;
        flex-direction: row;
        gap: var(--ddd-spacing-4);
        padding: var(--ddd-spacing-2) var(--ddd-spacing-4);

        }

      .caption-row {
        display: flex;
        align-items: center;
        flex-direction: row;
        gap: var(--ddd-spacing-4);
        padding: var(--ddd-spacing-2) var(--ddd-spacing-4);

      }

      .username {
        bottom: var(--ddd-spacing-0);
        right: var(--ddd-spacing-0);
        margin: var(--ddd-spacing-0);
      }
      .caption {
        font-size: var(--insta-basic-description-top-heading-font-size, var(--ddd-font-size-sS));
      }

      .location{
        font-size: var(--insta-basic-description-second-heading-font-size, var(--ddd-font-size-sS));
        text-transform: uppercase;
        }
      img {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        object-fit: cover;
        border: 2px solid var(--ddd-theme-default-potentialMidnight);
      }
      
    `];
  }

  // Lit render the HTML
  render() {
    return html`
<div class="wrapper">
  <div>
    <img src="${this.profilePhoto}" alt="${this.name}'s profile photo">
  </div>
  <div class="descritpion-row">
    <div class="name"><span>${this.name}</span></div>
    <div class="location"><span>${this.location}</span></div>
  </div>
  <div class="caption-row">
    <div class="username"><span>${this.username}</span></div>
    <div class="caption">${this.caption}</div>
    
  </div>
</div>`;
  }
}

globalThis.customElements.define(InstaBasicDescription.tag, InstaBasicDescription);