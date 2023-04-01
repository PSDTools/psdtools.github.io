import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("new-page")
export class AppSettings extends LitElement {
  static styles = [
    css`
      /* <CSS for your page goes here> */
    `,
  ];

  render() {
    return html` <app-header ?enableBack="${true}"></app-header>`;
  }
}
