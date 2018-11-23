export type Links = {
    _id :{
        $oid: string    //mongoのID
    },
    time : string,  //UNIXタイムスタンプ
    url: string | undefined,    //Url
    link: [
        string, //0番目の要素がreaderID
        string  //1番目の要素がcardId
        ]
}