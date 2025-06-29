import * as a11yAddonAnnotations from "@storybook/addon-a11y/preview";
import { setProjectAnnotations } from "@storybook/sveltekit";

import * as previewAnnotations from "./preview.ts";

setProjectAnnotations([a11yAddonAnnotations, previewAnnotations]);
