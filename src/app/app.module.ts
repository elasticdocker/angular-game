import {NgModule} from '@angular/core'
import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {MdGridListModule, MdButtonModule, MdCardModule, MdCoreModule, MdInputModule, MdRippleModule, MdChipsModule } from '@angular/material'
import 'hammerjs';
import {RouterConfig} from './app.routes';
import {AppComponent} from './app.component';
import {RandomWordService} from './hangman/random-word.service';
import {GameService} from './hangman/game.service'
import {HangmanComponent} from './hangman/hangman.component';
import {AppConfig} from "./app.config";

@NgModule({
    declarations: [
        AppComponent,
        HangmanComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        MdCoreModule,
        HttpModule,
        MdRippleModule,
        MdChipsModule,
       // MdInputModule,
        MdGridListModule,
        MdButtonModule,
        MdCardModule,
        HttpModule,
        RouterModule.forRoot(RouterConfig, {useHash: true})
    ],
    providers: [
        RandomWordService, GameService, AppConfig
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}
