import "should";
import ReactDOM from "react-dom";
import React from "react";
import { TestRouter } from "../src/router/router.js";
import StoreProvider from "../src/provider/StoreProvider";
import PrefixProvider from "../src/provider/PrefixProvider";
import TranslationProvider from "../src/provider/TranslationProvider";
import HomePage from "../src/page/index.js";

describe("test home page", function () {
  const container = document.createElement("div");
  document.body.appendChild(container);
  afterEach(() => {
    ReactDOM.unmountComponentAtNode(container);
  });

  ReactDOM.render(
    <StoreProvider>
      <TranslationProvider>
        <PrefixProvider>
          <TestRouter>
            <HomePage />
          </TestRouter>
        </PrefixProvider>
      </TranslationProvider>
    </StoreProvider>,
    container
  );
});
