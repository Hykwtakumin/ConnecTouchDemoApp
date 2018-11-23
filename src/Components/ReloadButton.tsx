import * as React from "react";
import {css, StyleSheet} from "aphrodite";
import {Layout, List} from "antd";
import "antd/dist/antd.css";
import {Links} from "../types/link";
import 'moment/locale/ja'
import moment from "moment";

const {Content} = Layout;

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
    const { links } = props;

    //linkをヒューマンリーダブルな文字列に変換して表示する
    const readable = (item : Links) => {
        const readerId = item.link[0];
        const cardId = item.link[1];
        const time = moment.unix(parseInt(item.time)).fromNow();
        // const time = moment.unix(parseInt(item.time)).format("YYYY-MM-DD HH:mm") as string;
        return `${cardId}が${readerId}にタッチしました :${time}`
    };

    return (
        <div>
            <Content className={css(styles.linkListArea)}>
                <List
                    header={<div>Links</div>}
                    bordered
                    dataSource={links as Array<Links>}
                    renderItem={item => (
                        <List.Item>
                            Links{links.indexOf(item) + 1} :
                            {readable(item)}
                        </List.Item>
                    )}
                />
            </Content>
        </div>
    );
};

export default ReloadButton;
