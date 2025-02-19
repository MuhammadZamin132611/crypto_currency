import { Routes } from '@angular/router';
import { CoinListComponent } from './component/coin-list/coin-list.component';
import { CoinDetailsComponent } from './component/coin-details/coin-details.component';

export const routes: Routes = [
    { path: '', redirectTo: 'coin-list', pathMatch: 'full' },
    { path: 'coin-list', component: CoinListComponent },
    { path: 'coin-detail/:id', component: CoinDetailsComponent },
];
