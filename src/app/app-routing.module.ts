import { NgModule } from '@angular/core';
import {HomeComponent} from './home/home.component';
import {RouterModule, Routes} from '@angular/router';
import {ProfessorComponent} from './professor/professor.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {TeachingsComponent} from './professor/teachings/teachings.component';
import {ReportsComponent} from './professor/reports/reports.component';
import {TeachingDetailComponent} from './professor/teaching-detail/teaching-detail.component';
import {RatingComponent} from './professor/rating/rating.component';
import {SecretaryComponent} from './secretary/secretary.component';
import {AddelementComponent} from './secretary/addelement/addelement.component';
import {NewstudycourseComponent} from './secretary/addelement/newstudycourse/newstudycourse.component';
import {UserComponent} from './secretary/addelement/user/user.component';
import {TeachingComponent} from './secretary/addelement/teaching/teaching.component';
import {ClassroomComponent} from './secretary/addelement/classroom/classroom.component';
import {ExamComponent} from './secretary/addelement/exam/exam.component';
import {LectureComponent} from './secretary/addelement/lecture/lecture.component';
import {CalendarComponent} from './secretary/addelement/calendar/calendar.component';
import {ReportmanagerComponent} from './secretary/reportmanager/reportmanager.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'professor', component: ProfessorComponent},
  {path: 'professor/teachings', component: TeachingsComponent},
  {path: 'professor/teachings/:idTeaching', component: TeachingDetailComponent},
  {path: 'professor/teachings/:idTeaching/:id/ratinglist', component: RatingComponent},
  {path: 'professor/reports', component: ReportsComponent},
  {path: 'secretary', component: SecretaryComponent},
  {path: 'secretary/newelem', component: AddelementComponent},
  {path: 'secretary/reports', component: ReportmanagerComponent},
  {path: 'secretary/newelem/calendar', component: CalendarComponent},
  {path: 'secretary/newelem/studycourse', component: NewstudycourseComponent},
  {path: 'secretary/newelem/user', component: UserComponent},
  {path: 'secretary/newelem/teaching', component: TeachingComponent},
  {path: 'secretary/newelem/classroom', component: ClassroomComponent},
  {path: 'secretary/newelem/exam', component: ExamComponent},
  {path: 'secretary/newelem/lecture', component: LectureComponent},
  {path: '**', component: NotFoundComponent}

];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
  declarations: []
})
export class AppRoutingModule { }
