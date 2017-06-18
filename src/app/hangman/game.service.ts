import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {AppConfig} from "../app.config";

@Injectable()
export class GameService {
    constructor(private http: Http, private config: AppConfig) {
    }

    getGame(gameId: number) {
        const url = this.config.WEB_API_URL + '/v1/games/' + gameId;
        return this.http.get(url)
            .map((res) => res.json());
    }

    // It's put because of passed gameId
    putGame(gameId: number, gameData: GameData) {
        const url = this.config.WEB_API_URL + '/v1/games/' + gameId;
        return this.http.put(url, gameData);
    }

}

export type GameData = {
    selectedArr?: string[],
    randomWordArr?: string[]
}
