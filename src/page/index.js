import React, { PureComponent } from "react";
import LayoutIndex from "../layouts";

class HomePage extends PureComponent {
  render() {
    return (
      <LayoutIndex>
        <div style={{ width: 300, margin: "0 auto", marginTop: "200px", fontSize: 30, textAlign: "center" }}>
          Hello Reactrc
        </div>
      </LayoutIndex>
    );
  }
}

export default HomePage;
