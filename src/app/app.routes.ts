import { Routes } from '@angular/router';
import { CurrentweatherComponent } from './currentweather/currentweather.component';

export const routes: Routes = [
    {path: '', component: CurrentweatherComponent},
    {path: 'current', component: CurrentweatherComponent}
];
