import * as React from "react";
import { css, StyleSheet } from "aphrodite";
import { notification } from "antd";
import "antd/dist/antd.css";
import ReloadButton from "./ReloadButton";
import { Links } from "../types/link";
import "dotenv/config";

const fetchURL = process.env.FETCH_URL || "http://connectouch.org";

const styles = StyleSheet.create({
  container: {
    fontFamily: "sans-serif",
    width: "100vw",
    marginTop: "5%",
    marginBottom: "5%",
  },
});

interface defaultProps {
  defaultState: defaultState;
}

interface defaultState {
  isActivated: boolean; //mailアドレス or IDが登録されているか否か?
  filter: string; //フィルターとなる文字列
  links: Array<Links>; //linkが格納される配列
  limit: number;
}

class LinksList extends React.Component<defaultProps, defaultState> {
  constructor(props: defaultProps) {
    super(props);
    const { isActivated, filter, links } = props.defaultState;
    this.state = {
      isActivated: isActivated,
      filter: filter,
      links: links,
      limit: 10,
    };
  }
  componentDidMount() {
    setInterval(this.pollingLinks, 1000);
  }

  componentWillUnmount() {
    clearInterval();
  }

  //新旧linksの差分を求める関数
  //差があるモノは新着とする
  getLinksDiff = (oldLinks: Array<Links>, newLinks: Array<Links>) => {
    const oldIdArray = oldLinks.map(item => item._id.$oid);

    const isContained = (link: Links): boolean => {
      return oldIdArray.includes(link._id.$oid);
    };

    const diffLinks = newLinks.reduce((prev, curr) => {
      if (!isContained(curr)) {
        prev.push(curr);
      }
      return prev;
    }, []);

    console.log(`更新差分数 : ${diffLinks.length}`);
    if (diffLinks.length < 5) {
      diffLinks.forEach(link => {
        const parsedLink = link;
        const readerId = parsedLink.link[0] as string;
        const cardId = parsedLink.link[1] as string;
        notification.info({
          message: "Suicaがタッチされました!",
          description: `リーダー:${readerId},　カード:${cardId}`,
        });
      });
    }
  };

  limitIncr = () => {
    this.setState({ limit: this.state.limit + 10 });
  };

  pollingLinks = async () => {
    const currentLinks = this.state.links; //現在保持しているlinks
    // const clientRes = await client.get("http://connectouch.org/links/", {}); //毎秒取得するlinks

    const endPointUrl = `${fetchURL}/links?limit=${this.state.limit}`;
    const request = await fetch(endPointUrl);
    if (request.status == 200) {
      try {
        // const resJson = await clientRes.data;
        const loadedLinks = (await request.json()) as Array<Links>;
        //サーバーから新しく取得した関数
        // const loadedLinks = resJson as Array<Links>;
        //currentLinksとloadedLinksとの差分を取る
        this.getLinksDiff(currentLinks, loadedLinks);
        //新しいLinksを格納する
        this.setState({ links: loadedLinks });
      } catch (e) {
        console.error(`error : ${e}`);
      }
    } else {
      console.error("Something went wrong");
    }
  };

  render() {
    return (
      <div className={css(styles.container)}>
        <ReloadButton
          links={this.state.links}
          limitIncr={this.limitIncr}
          limit={this.state.limit}
        />
      </div>
    );
  }
}

export default LinksList;
