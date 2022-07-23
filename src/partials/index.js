import handleBars from "handlebars";
import input from "./PInput/input.js";
import button from "./Button/button.js";

export default (() => {
  handleBars.registerPartial("input", input);
  handleBars.registerPartial("button", button);
})();
