import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './/app-routing.module';
import { ProfessorComponent } from './professor/professor.component';
import {UserService} from './services/user.service';
import {HttpClientModule} from '@angular/common/http';
import { NotFoundComponent } from './not-found/not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TeachingsComponent } from './professor/teachings/teachings.component';
import { ReportsComponent } from './professor/reports/reports.component';
import { ProfnavbarComponent } from './professor/profnavbar/profnavbar.component';
import { TeachingDetailComponent } from './professor/teaching-detail/teaching-detail.component';
import {TeachingService} from './services/teaching.service';
import { FormsModule } from '@angular/forms';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RatingComponent } from './professor/rating/rating.component';
import { SecretaryComponent } from './secretary/secretary.component';
import { SecrnavbarComponent } from './secretary/secrnavbar/secrnavbar.component';
import { AddelementComponent } from './secretary/addelement/addelement.component';
import { NewstudycourseComponent } from './secretary/addelement/newstudycourse/newstudycourse.component';
import { UserComponent } from './secretary/addelement/user/user.component';
import { TeachingComponent } from './secretary/addelement/teaching/teaching.component';
import { ClassroomComponent } from './secretary/addelement/classroom/classroom.component';
import { ExamComponent } from './secretary/addelement/exam/exam.component';
import { LectureComponent } from './secretary/addelement/lecture/lecture.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfessorComponent,
    NotFoundComponent,
    TeachingsComponent,
    ReportsComponent,
    ProfnavbarComponent,
    TeachingDetailComponent,
    RatingComponent,
    SecretaryComponent,
    SecrnavbarComponent,
    AddelementComponent,
    NewstudycourseComponent,
    UserComponent,
    TeachingComponent,
    ClassroomComponent,
    ExamComponent,
    LectureComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    NgbModule.forRoot()
  ],
  providers: [UserService, TeachingService, NgbRatingConfig],
  bootstrap: [AppComponent]
})
export class AppModule { }
