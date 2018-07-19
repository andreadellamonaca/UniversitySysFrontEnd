import { NgModule } from '@angular/core';
import {HomeComponent} from './home/home.component';
import {RouterModule, Routes} from '@angular/router';
import {ProfessorComponent} from './professor/professor.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {TeachingsComponent} from './professor/teachings/teachings.component';
import {ReportsComponent} from './professor/reports/reports.component';
import {TeachingDetailComponent} from './professor/teaching-detail/teaching-detail.component';
import {ReportDetailComponent} from './professor/report-detail/report-detail.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'professor', component: ProfessorComponent},
  {path: 'professor/teachings', component: TeachingsComponent},
  {path: 'professor/teachings/:name', component: TeachingDetailComponent},
  {path: 'professor/reports', component: ReportsComponent},
  {path: 'professor/reports/:id', component: ReportDetailComponent},
  {path: '**', component: NotFoundComponent}

];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
  declarations: []
})
export class AppRoutingModule { }
