import * as React from "react";
import { render } from "react-dom";
import { StyleSheet, css } from "aphrodite";
import { Layout, Button, Icon, List, Modal } from "antd";
import "antd/dist/antd.css";
const { Content, Footer } = Layout;
import { client } from "../Utils/Client";
import axios from "axios";

const styles = StyleSheet.create({
    btn: {
        textAlign: "center"
    },
    linkListArea: {
        width: "80%",
        alignSelf: "center",
        textAlign: "center"
    }
});

const ReloadButton = props => {
    const { links, loadLinks } = props;

    return (
        <div>
            <Button
                className={css(styles.btn)}
                type="primary"
                icon="redo"
                size="large"
                onClick={loadLinks}
            >
                タッチ情報を読み込む
            </Button>

            <Content className={css(styles.linkListArea)}>
                <List
                    header={<div>Laps</div>}
                    bordered
                    dataSource={links as Array<string>}
                    renderItem={item => (
                        <List.Item>
                            {/* ラップタイム追加ボタンを押した段階での秒数 */}
                            Links{links.indexOf(item) + 1} :
                            {item}
                        </List.Item>
                    )}
                />
            </Content>
        </div>
    );
};

export default ReloadButton;
