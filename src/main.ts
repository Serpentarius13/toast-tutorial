import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import VueClickAway from "vue3-click-away";

import { createPinia } from "pinia";

const pinia = createPinia();

import { PiniaLogger } from "pinia-logger";

const app = createApp(App);

app.use(pinia);



pinia.use(
  PiniaLogger({
    expanded: true,
    disabled: true,
  })
);

app.use(VueClickAway);

app.mount("#app");
