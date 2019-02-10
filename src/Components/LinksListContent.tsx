import * as React from "react";
import { FC } from "react";
import { css, StyleSheet } from "aphrodite";
import { List, Avatar, Icon, Spin, Button } from "antd";
import { Links } from "../types/link";
import "moment/locale/ja";
import moment from "moment";

const {} = React;

const demo_icon =
  "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png";

const styles = StyleSheet.create({
  linkListArea: {
    width: "90vw",
    marginLeft: "auto",
    marginRight: "auto",
  },
  spinner: {
    position: "relative",
    top: "50%",
    left: "40vw",
    transform: "translataY(-50%)",
  },
  spinContainer: {
    height: "50vh;",
  },
  loadBtn: {
    display: "block",
    marginTop: "10%",
    marginRight: "auto",
    marginLeft: "auto",
  },
});

interface Props {
  links: Links[];
  fetchLimitNum: number;
  setLimit: () => void;
}

export const LinksListContent: FC<Props> = ({
  links,
  fetchLimitNum,
  setLimit,
}) => {
  const readable = (item: Links) => {
    const readerId = item.link[0];
    const cardId = item.link[1];
    const time = moment.unix(parseInt(item.time)).fromNow();
    return {
      cardId,
      readerId,
      time,
    };
  };

  const SpinnerElm = <Icon type="loading" spin style={{ fontSize: "20vw" }} />;

  return links.length === 0 ? (
    <div className={css(styles.spinContainer)}>
      <Spin className={css(styles.spinner)} indicator={SpinnerElm} />
    </div>
  ) : (
    <List
      className={css(styles.linkListArea)}
      itemLayout="vertical"
      dataSource={links}
      loadMore={
        <Button
          onClick={setLimit}
          className={css(styles.loadBtn)}
          loading={links.length != fetchLimitNum}
          size="large"
          shape="round"
        >
          Load more
        </Button>
      }
      renderItem={item => {
        const { cardId, readerId, time } = readable(item);
        return (
          <List.Item key={item.cardId}>
            <List.Item.Meta
              avatar={<Avatar src={demo_icon} />}
              title={<div>{cardId}</div>}
              description={
                <div>
                  {readerId} にタッチしました。
                  <span style={{ float: "right" }}>{time}</span>
                </div>
              }
            />
          </List.Item>
        );
      }}
    />
  );
};
