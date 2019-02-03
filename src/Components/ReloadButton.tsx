import * as React from "react";
import { css, StyleSheet } from "aphrodite";
import { List, Avatar, Skeleton } from "antd";
import "antd/dist/antd.css";
import { Links } from "../types/link";
import "moment/locale/ja";
import moment from "moment";

const demo_icon =
  "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png";

const styles = StyleSheet.create({
  linkListArea: {
    width: "90vw",
    marginLeft: "auto",
    marginRight: "auto",
  },
});

interface Props {
  links: Links[];
}

const ReloadButton: React.SFC<Props> = props => {
  const { links } = props;

  //linkをヒューマンリーダブルな文字列に変換して表示する
  const readable = (item: Links) => {
    const readerId = item.link[0];
    const cardId = item.link[1];
    const time = moment.unix(parseInt(item.time)).fromNow();
    // const time = moment.unix(parseInt(item.time)).format("YYYY-MM-DD HH:mm") as string;
    // return `${cardId}が${readerId}にタッチしました :${time}`;
    return {
      cardId,
      readerId,
      time,
    };
  };

  return (
    <List
      className={css(styles.linkListArea)}
      itemLayout="vertical"
      dataSource={links}
      renderItem={item => {
        const { cardId, readerId, time } = readable(item);
        return (
          <List.Item key={item.cardId}>
            <Skeleton loading={links.length === 0} active avatar>
              <List.Item.Meta
                avatar={<Avatar src={demo_icon} />}
                title={<div>{cardId}</div>}
                description={
                  <div>
                    {readerId}にタッチ
                    <span style={{ float: "right" }}>{time}</span>
                  </div>
                }
              />
            </Skeleton>
          </List.Item>
        );
      }}
    />
  );
};

export default ReloadButton;
