import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from './home/home.component';
import {RouterModule, Routes} from '@angular/router';
import {ProfessorComponent} from './professor/professor.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'professor', component: ProfessorComponent}/*,
  {path: '**', component: NotFoundComponent}
*/
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
  declarations: []
})
export class AppRoutingModule { }
