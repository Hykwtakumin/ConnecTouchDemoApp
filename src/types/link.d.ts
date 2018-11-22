declare module '*/link' {
    interface link {
        _id :{
            $oid: string    //
        },
        time : string,  //UNIX timestamp
        url: string | undefined,    //related URL
        link: [
            string, //readerId
            string  //cardId
            ]
    }
    const value: link;
    export = value;
}

export interface links {
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