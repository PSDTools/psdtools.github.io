import { LitElement, html, css, type TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("calculator")
export class AppSettings extends LitElement {
  static styles = [
    css`
      /* <CSS for your page goes here> */
    `,
  ];

  render(): TemplateResult {
    return html` <app-header ?enableBack="${true}"></app-header>`;
  }
}
