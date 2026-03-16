import { html, fixture, expect } from '@open-wc/testing';
import "../insta-basic-project.js";

describe("InstaBasicProject test", () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <insta-basic-project
        title="title"
      ></insta-basic-project>
    `);
  });

  it("basic will it blend", async () => {
    expect(element).to.exist;
  });

  it("passes the a11y audit", async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
