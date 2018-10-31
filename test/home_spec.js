import "should";
import Welcome from "../src/page/Home";
import ReactDOM from "react-dom";
import React from "react";
import TestUtils from "react-addons-test-utils";
import configure from "../src/redux/store/store.js"; // store配置

let storeConfig = configure();

describe("HomePage", function() {
  const container = document.createElement("div");
  document.body.appendChild(container);
  afterEach(() => {
    ReactDOM.unmountComponentAtNode(container);
  });

  it("默认content", function() {
    let cp = ReactDOM.render(<Welcome store={storeConfig.store} />, container);
    let welcome = TestUtils.findRenderedComponentWithType(cp, Welcome);
    ReactDOM.findDOMNode(welcome).textContent.should.be.eql("测试");
  });

  it("传入 content", function() {
    let cp = ReactDOM.render(<Welcome content="充" store={storeConfig.store} />, container);
    let welcome = TestUtils.findRenderedComponentWithType(cp, Welcome);
    ReactDOM.findDOMNode(welcome).textContent.should.be.eql("充");
  });

});
