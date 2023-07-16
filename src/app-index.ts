import {
  type CSSResult,
  LitElement,
  css,
  html,
  type TemplateResult,
} from "lit";
import { customElement } from "lit/decorators.js";
import { Router } from "@vaadin/router";

import "./pages/app-home";
import "./components/header";
import "./styles/global.css";

declare global {
  interface Document {
    startViewTransition: () => Promise<void>;
  }
}

const BASE_URL: string =
  import.meta.env.BASE_URL.length > 2
    ? import.meta.env.BASE_URL.slice(1, -1)
    : import.meta.env.BASE_URL;

@customElement("app-index")
export class AppIndex extends LitElement {
  static get styles(): CSSResult[] {
    return [
      css`
        main {
          padding-left: 16px;
          padding-right: 16px;
          padding-bottom: 16px;
        }

        #routerOutlet > * {
          width: 97.5% !important;
        }
      `,
    ];
  }

  constructor() {
    super();
  }

  firstUpdated(): void {
    // this method is a lifecycle event in lit
    // for more info check out the lit docs https://lit.dev/docs/components/lifecycle/

    // For more info on using the @vaadin/router check here https://vaadin.com/router
    const router = new Router(this.shadowRoot?.querySelector("#routerOutlet"));
    router
      .setRoutes([
        // temporarily cast to any because of a Type bug with the router
        {
          path: BASE_URL,
          animate: true,
          children: [
            { path: "/", component: "app-home" },
            {
              path: "about",
              component: "app-about",
              action: async () => {
                /*
                Use the View Transitions API to provide animated page transitions!
                The code below should be added to any additional pages you add
                to this router config object.

                For more info on the View Transitions API, including how to customize your transitions
                check out the docs here: https://developer.chrome.com/docs/web-platform/view-transitions/

                This API is currently supported in Edge 111+ and Chrome 111+
              */
                if (Object.hasOwn(document, "startViewTransition")) {
                  await document.startViewTransition();
                }

                await import("./pages/app-about/app-about.js");
              },
            },
            { path: "/calculator", component: "calculator" },
          ],
        } as never,
      ])
      .catch(() => {
        // no-op catch to prevent unhandled promise rejection
      });
  }

  render(): TemplateResult<1> {
    return html`
      <div>
        <main>
          <div id="routerOutlet"></div>
        </main>
      </div>
    `;
  }
}
