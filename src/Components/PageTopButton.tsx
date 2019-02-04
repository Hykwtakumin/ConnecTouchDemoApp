import * as React from "react";
import { Button } from "antd";
import { StyleSheet, css } from "aphrodite";

interface Props {}

const styles = StyleSheet.create({
  btnContainer: {
    position: "fixed",
    width: "7.5vw",
    height: "7.5vh",
    left: "87.5vw",
    top: "87.5vh",
  },
});

export const PageTopButton: React.SFC<Props> = props => {
  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className={css(styles.btnContainer)}>
      <Button onClick={handleClick} type="primary" icon="arrow-up" />
    </div>
  );
};
