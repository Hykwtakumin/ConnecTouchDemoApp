import * as React from "react";
import { render } from "react-dom";
import { StyleSheet, css } from "aphrodite";
import { Layout, Button, Icon, List, message, notification } from "antd";
import "antd/dist/antd.css";
import ReloadButton from "./ReloadButton";
import {client} from "../Utils/Client";
import moment from "moment";
import {Links} from "../types/link";
const { Content, Footer } = Layout;


const styles = StyleSheet.create({
    container: {
        fontFamily: "sans-serif",
        alignSelf: "center",
        textAlign: "center"
    },
    timerArea: {
        fontSize: "3rem"
    },
    controlerArea: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        listStyleType: "none",
        marginBottom: "3%"
    },
    linkListArea: {
        width: "80%",
        alignSelf: "center",
        textAlign: "center"
    }
});

interface defaultProps {
    defaultState: defaultState;
}

interface defaultState {
    isActivated: boolean; //mailアドレス or IDが登録されているか否か?
    filter: string; //フィルターとなる文字列
    links: Array<Links>; //linkが格納される配列
}

class LinksList extends React.Component<defaultProps, defaultState> {
    constructor(props: defaultProps) {
        super(props);
        const { isActivated, filter,  links } = props.defaultState;
        this.state = {
            isActivated: isActivated,
            filter: filter,
            links: links
        };
    }
    componentDidMount() {
        setInterval(this.pollingLinks, 1000);
    };

    componentWillUnmount() {
        clearInterval();
    }

    //新旧linksの差分を求める関数
    //差があるモノは新着とする
    getLinksDiff = (oldLinks :Array<Links>, newLinks :Array<Links>) => {

        const oldIdArray = oldLinks.map(item => item._id.$oid);

        const isContained = (link :Links): boolean => {
            return oldIdArray.includes(link._id.$oid);
        };

        const diffLinks = newLinks.reduce((prev, curr) => {
            if (!isContained(curr)) {
                prev.push(curr)
            }
            return prev
        }, []);

        console.log(`更新差分数 : ${diffLinks.length}`);
        if (diffLinks.length < 5) {
            diffLinks.forEach(link => {
                const parsedLink = link;
                const readerId = parsedLink.link[0] as string;
                const cardId = parsedLink.link[1] as string;
                notification.info({
                    message: "Suicaがタッチされました!",
                    description: `リーダー:${readerId},　カード:${cardId}`
                });
            });
        }
    };

    pollingLinks = async () => {
        const currentLinks = this.state.links; //現在保持しているlinks
        // const clientRes = await client.get("http://connectouch.org/links/", {}); //毎秒取得するlinks

        const endPointUrl = `http://192.168.0.200/links?limit=10`;
        const request = await fetch(endPointUrl);
        if (request.status == 200) {
            try {
                // const resJson = await clientRes.data;
                const loadedLinks = await request.json() as Array<Links>;
                //サーバーから新しく取得した関数
                // const loadedLinks = resJson as Array<Links>;
                //currentLinksとloadedLinksとの差分を取る
                this.getLinksDiff(currentLinks, loadedLinks);
                //新しいLinksを格納する
                this.setState({ links: loadedLinks })
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
                <Layout>
                    <Content className={css(styles.linkListArea)}>
                        <ReloadButton
                            links={this.state.links}
                        />
                    </Content>
                </Layout>
            </div>
        );
    }

}

export default LinksList;