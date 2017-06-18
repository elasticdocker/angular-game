import {Routes} from '@angular/router';
import {HangmanComponent} from './hangman/hangman.component';

export const RouterConfig: Routes = [
    {path: '', redirectTo: 'hangman', pathMatch: 'full'},
    {path: 'hangman', component: HangmanComponent}
];

