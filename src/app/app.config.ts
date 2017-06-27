import {Injectable} from '@angular/core';


@Injectable()
export class AppConfig {

    public WEB_API_URL = `https://ye9wlphoi9.execute-api.us-west-2.amazonaws.com/api`;
    //public WEB_API_URL = `http://ALB-1-112567681.us-west-2.elb.amazonaws.com/api`;

    //public WEB_API_URL = `http://localhost:3020/api`;
   // public WEB_API_URL = 'http://54.201.251.133/api/hangman';


    public HANGMAN_STATE_IMG: string[] = [];

    constructor() {
        //const hangmanImg = 'http://d2pnnv6cod2xyw.cloudfront.net/hangman';
        const hangmanImg = 'https://s3-us-west-2.amazonaws.com/hangman.asset2/hangman';

        for (let i = 0; i < 7;) {
            this.HANGMAN_STATE_IMG[i] = hangmanImg + ++i + '.gif';
        }
    }
}
