import {Component, ViewEncapsulation, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {Router} from '@angular/router';
import {RandomWordService} from './random-word.service';
import {GameState} from './hangman.model';
import {AppConfig} from "../app.config";
import {GameService, GameData} from "./game.service";

@Component({
    selector: 'repo-browser',
    templateUrl: './hangman.component.html',
    styleUrls: ['./hangman.component.css', './hangman.common.css'],
    encapsulation: ViewEncapsulation.Emulated,
    changeDetection: ChangeDetectionStrategy.Default
})
export class HangmanComponent {

    //Game info for UI
    private stringArr: string[];
    private state: GameState;
    private imgLocation: string;
    private imgLocationArr: string[];
    private background: string;
    private MAX_ATTEMPT = 6;
    private remainingAttempts: number;
    private matchArr: string[];
    private inputGameId: number;

    // Game info to persist
    private gameId: number;
    private randomWordArr: string[] = [];
    private selectedArr: string[] = [];


    constructor(private randomWordService: RandomWordService, private gameService: GameService, private config: AppConfig) {
        this.stringArr = Array.apply(null, {length: 26}).map((i, index) => String.fromCharCode(index + 65));
        this.imgLocationArr = config.HANGMAN_STATE_IMG;
        this.imgLocation = this.imgLocationArr[0];
    }

    private startNewGame(gametype: string) {
        this.randomWordService.getRandomWord(gametype).subscribe(
            (response) => {
                const randomWord = response.data[0];
                const randomWordArr = randomWord.toUpperCase().split('');
                this.gameId = Math.floor(Math.random() * 10000);
                this.setGameInfo(randomWordArr, []);
                this.setUiInfo();
            }
        );
    }

    private setUiInfo() {
        this.background = "my-background";
        this.remainingAttempts = this.MAX_ATTEMPT;
    }

    private setGameInfo(wordArr: string[], selectedArr?: string[]) {
        this.randomWordArr = wordArr;
        this.selectedArr = selectedArr;
        this.processGameState();
    }

    playGame(inputChar: string) {
        // Push selected char to list of selected guess
        this.selectedArr.push(inputChar);
        this.processGameState();
    }

    private getGame() {
        if (!!this.inputGameId) {
            this.gameService.getGame(this.inputGameId).subscribe(
                (response) => {
                    const selectedArr = response.data[0]['selectedArr'];
                    const randomWordArr = response.data[0]['randomWordArr'];
                    if (!!selectedArr && !!randomWordArr) {
                        this.gameId = this.inputGameId;
                        this.setUiInfo();
                        this.setGameInfo(randomWordArr, selectedArr);
                    }
                }
            );
        }
    }


    private processGameState() {
        // Persist game state
        const gameData: GameData = {
            selectedArr: this.selectedArr,
            randomWordArr: this.randomWordArr
        }
        if (!!this.gameId) {
            this.gameService.putGame(this.gameId, gameData).subscribe();
        }

        // Get arr of matching char
        this.matchArr = this.getMatchArr(this.selectedArr, this.randomWordArr);

        // Check if all of the guess are matching
        this.state = this.matchArr.filter((i) => i == undefined).length != 0 ? GameState.PROGRESS : GameState.COMPLETE;

        // If game is not completed than proceed
        if (this.state == GameState.PROGRESS) {

            // Get user's attempts
            this.remainingAttempts = this.MAX_ATTEMPT - this.selectedArr.length
                + this.matchArr.filter((i) => i != undefined)
                    .filter((i, idx, arr) => arr.indexOf(i) === idx).length;

            // Update hangman image
            this.imgLocation = this.imgLocationArr[6 - this.remainingAttempts];

            this.state = this.remainingAttempts < 1 ? GameState.TRYAGAIN : GameState.PROGRESS;
        }
    }


    private getMatchArr = (guessArr: string[], wordArr: string[]): string[] => {
        let matchArr: string[] = Array.apply(null, {length: wordArr.length});
        for (let i = 0; i < guessArr.length; i++) {
            for (let e = 0; e < wordArr.length; e++) {
                if (guessArr[i] === wordArr[e]) {
                    matchArr[e] = guessArr[i];
                }
            }
        }
        return matchArr;
    }

}

