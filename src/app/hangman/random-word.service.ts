import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {AppConfig} from "../app.config";

@Injectable()
export class RandomWordService {
  constructor(private http: Http, private config:AppConfig) {
  }

  getRandomWord(gameType:string) {
    const url = this.config.WEB_API_URL + '/v1/words/?gameType=' + gameType;
    return this.http.get(url)
      .map((res) => res.json());
  }

}
