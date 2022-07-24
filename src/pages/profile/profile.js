import profile from "./profile.hbs";
import photo from "./photo.hbs";
import HandleBars from "handlebars";
import state from "./state";
import "./profile.css";

HandleBars.registerPartial("photo", photo);

const component = {
  path: "/profile",
  template: profile,
  state: state,
};

export default component;
