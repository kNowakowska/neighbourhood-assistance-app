import React from "react";
import AppBar from "../AppBar";

export default function withNavBar(Component) {
  class WithNavBar extends React.PureComponent {
    render() {
      return (
        <>
          <AppBar />
          <Component {...this.props} />
        </>
      );
    }
  }

  return WithNavBar;
}
