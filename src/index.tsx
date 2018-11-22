// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';
//
// ReactDOM.render(<App />, document.getElementById('root'));
//
// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
import * as React from "react";
import { render } from "react-dom";
import { StyleSheet, css } from "aphrodite";
import { Layout, Button, Icon } from "antd";
import * as serviceWorker from './serviceWorker';
import "antd/dist/antd.css";
const { Header, Content, Footer } = Layout;
import './index.css';
import LinksList from "./Components/LinksList";

const styles = StyleSheet.create({
    headerArea: {
        color: "	#ffffff"
    },
    paragraphArea: {
        marginTop: "3%"
    },
    contentArea: {
        fontFamily: "sans-serif",
        textAlign: "center",
        width: "100%",
        height: "100%"
    }
});

const App = () => (
    <div className={css(styles.contentArea)}>
        <Layout>
            <Header>
                <h1 className={css(styles.headerArea)}>ConnecTouch Mobile</h1>
            </Header>
            <Content>
                <h2 className={css(styles.paragraphArea)}>
                    ConnecTouchのデモアプリです
                </h2>
                <LinksList defaultState={{isActivated: false, filter: ``, links: [``, ``] as Array<string>}}/>
            </Content>
            <Footer>
                <a href="https://github.com/Hykwtakumin/ReactLapTimer">view source</a>
            </Footer>
        </Layout>
    </div>
);

render(<App />, document.getElementById("root"));

serviceWorker.unregister();
