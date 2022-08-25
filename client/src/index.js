import React from "react";
import { hydrate, render } from "react-dom";
import "./index.css";
import Routess from "./Routes";

const rootElement = document.getElementById("root");
if (rootElement.hasChildNodes()) {
  hydrate(<Routess />, rootElement);
} else {
  render(<Routess />, rootElement);
}
