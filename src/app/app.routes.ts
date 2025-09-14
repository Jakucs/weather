import { Routes } from '@angular/router';
import { CurrentweatherComponent } from './currentweather/currentweather.component';
import { DailyweatherComponent } from './dailyweather/dailyweather.component';
import { WeeklyweatherComponent } from './weeklyweather/weeklyweather.component';

export const routes: Routes = [
    {path: '', component: CurrentweatherComponent},
    {path: 'current', component: CurrentweatherComponent},
    {path: 'daily', component: DailyweatherComponent},
    {path: 'weekly', component: WeeklyweatherComponent}
];
