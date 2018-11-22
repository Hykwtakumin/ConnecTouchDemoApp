import * as React from "react";
import { render } from "react-dom";
import { StyleSheet, css } from "aphrodite";
import { Layout, Button, Icon, List, message } from "antd";
import "antd/dist/antd.css";
import ReloadButton from "./ReloadButton";
import {client} from "../Utils/Client";
import moment from "moment";
// import links from "../types/link"
const { Content, Footer } = Layout;


const styles = StyleSheet.create({
    container: {
        fontFamily: "sans-serif",
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
        width: "60%",
        alignSelf: "center",
        textAlign: "center"
    }
});

//ConnecTouchのLinks
interface links {
    _id :{
        $oid: string
    },
    time : string,
    url: string | undefined,
    link: [
        string,
        string
        ]
}

interface defaultProps {
    defaultState: defaultState;
}

interface defaultState {
    isActivated: boolean; //mailアドレス or IDが登録されているか否か?
    filter: string; //フィルターとなる文字列
    links: Array<string>; //ラップタイムが格納される配列
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

    //ボタンを押すとhttp://connectouch.org/linksからlinkを取得してくる
    loadLinks = async () => {
        const clientRes = await client.get("links?limit=1000", {});
        if (clientRes.status == 200) {
            try {
                const resJson = await clientRes.data;
                console.dir(resJson);
                const loadedLinks = resJson.map(item => {
                    const parsedLink = item as links;
                    const id = parsedLink._id.$oid as string;
                    const time = moment.unix(parseInt(parsedLink.time)).format("YYYY-MM-DD HH:mm") as string;
                    const url = parsedLink.url as string;
                    const readerId = parsedLink.link[0] as string;
                    const cardId = parsedLink.link[1] as string;

                    return `id:${id}, time:${time}, url:${url}, readerId:${readerId}, cardId:${cardId}`;
                    // return JSON.stringify(item);
                });
                this.setState({ links: loadedLinks })
            } catch (e) {
                message.error(`error : ${e}`);
                console.dir(e);
            }
        } else {
            message.error("Something went wrong");
        }
    };

    render() {
        return (
            <div className={css(styles.container)}>
                <ReloadButton
                    links={this.state.links}
                    loadLinks={this.loadLinks}
                />
            </div>
        );
    }

}

export default LinksList;