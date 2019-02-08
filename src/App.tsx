import * as React from "react";
import { css, StyleSheet } from "aphrodite";
import { Layout, BackTop } from "antd";
import PullRefresh from "react-pullrefresh";
import "./App.css";
import { LinksListWrapper } from "./Components/LinksListWrapper";

const { Header, Content } = Layout;

const styles = StyleSheet.create({
  headerArea: {
    width: "100vw",
    height: "10vh",
  },
  headerTxt: {
    color: "#ffffff",
    textAlign: "center",
    position: "relative",
    top: "50%",
    transform: "translateY(-50%)",
  },
  contentArea: {
    fontFamily: "sans-serif",
    width: "100vw",
    height: "100vh",
  },
});

export const App = () => (
  <PullRefresh onRefresh={() => window.location.reload()}>
    <div className={css(styles.contentArea)}>
      <Layout>
        <Header className={css(styles.headerArea)}>
          <h2 className={css(styles.headerTxt)}>ConnecTouch Mobile</h2>
        </Header>
        <Content>
          <LinksListWrapper />
        </Content>
        <BackTop />
      </Layout>
    </div>
  </PullRefresh>
);
