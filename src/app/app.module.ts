import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoursesComponent } from './courses-component/courses.component';
import { WebService } from './web.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home-component/home.component';
import { CourseComponent } from './course-component/course.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { WdQuestionComponentComponent } from './questions-components/wd-questions/wd-question-component/wd-question-component.component';
import { ChangeBgDirective } from './change-bg.directive';
import { AssessmentComponentComponent } from './assessment-component/assessment-component.component';
import { FdQuestionComponentComponent } from './questions-components/fd-questions/fd-question-component/fd-question-component.component';
import { DdQuestionComponentComponent } from './questions-components/dd-questions/dd-question-component/dd-question-component.component';
import { BdQuestionComponentComponent } from './questions-components/bd-questions/bd-question-component/bd-question-component.component';
import { LoginComponent } from './login/login.component';
import { NavComponent } from './nav-component/nav.component';
import { ChatsComponent } from './chats/chats.component';
import { StudentConnectComponent } from './studentconnect/studentconnect.component';
import { TranslateModule } from '@ngx-translate/core';
import { StreamChatModule, StreamAutocompleteTextareaModule } from 'stream-chat-angular';
import { NgSelectModule } from '@ng-select/ng-select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AuthGuard } from './guards/auth.guard';
import { WebDesignComponent } from './course-categories/web-design/web-design.component';
import { FrontendDevelopmentComponent } from './course-categories/Frontend-Development/frontend-development.component';
import { DatabaseDevelopmentComponent } from './course-categories/Database-Development/database-development.component';
import { BackendDevelopmentComponent } from './course-categories/Backend-Development/backend-development.component';
import { StudentsComponent } from './students/students.component';
import { StudentSectionComponentComponent } from './student-section-component/student-section-component.component';
import { MatSelectModule } from '@angular/material/select';
import { ChatbotComponent } from './chatbot/chatbot.component';

var routes: any = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'app',
    component: NavComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'courses',
        component: CoursesComponent,
      },
      {
        path: 'courses/:id',
        component: CourseComponent,
      },
      {
        path: 'assessment',
        component: AssessmentComponentComponent
      },
      {
        path: 'assessment/wd-questions',
        component: WdQuestionComponentComponent
      },
      {
        path: 'assessment/fd-questions',
        component: FdQuestionComponentComponent
      },
      {
        path: 'assessment/dd-questions',
        component: DdQuestionComponentComponent
      },
      {
        path: 'assessment/bd-questions',
        component: BdQuestionComponentComponent
      },
      {
        path: 'student-section',
        component: StudentSectionComponentComponent,
      },
      {
        path: 'student-connect',
        component: StudentConnectComponent,
      },
      {
        path: 'students',
        component: StudentsComponent,
      },
      {
        path: 'chats',
        component: ChatsComponent,
      },
      {
        path: 'web_design',
        component: WebDesignComponent
      },
      {
        path: 'frontend_development',
        component: FrontendDevelopmentComponent
      },
      {
        path: 'backend_development',
        component: BackendDevelopmentComponent
      },
      {
        path: 'database_development',
        component: DatabaseDevelopmentComponent
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      }
    ],
  },

  {
    path: '**',
    redirectTo: '/',
  },
];

@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    HomeComponent,
    CourseComponent,
    ChangeBgDirective,
    WdQuestionComponentComponent,
    AssessmentComponentComponent,
    FdQuestionComponentComponent,
    DdQuestionComponentComponent,
    BdQuestionComponentComponent,
    LoginComponent,
    NavComponent,
    ChatsComponent,
    StudentConnectComponent,
    WebDesignComponent,
    FrontendDevelopmentComponent,
    DatabaseDevelopmentComponent,
    BackendDevelopmentComponent,
    StudentsComponent,
    StudentSectionComponentComponent,
    ChatbotComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    AppRoutingModule,
    ReactiveFormsModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule,
    MatSelectModule,
    FormsModule,
    NgSelectModule,
    BrowserAnimationsModule,
    NgxSpinnerModule.forRoot({ type: 'ball-pulse' }),
    // Imports for Stream
    TranslateModule.forRoot(),
    StreamAutocompleteTextareaModule,
    StreamChatModule,
  ],
  providers: [WebService],
  bootstrap: [AppComponent]
})
export class AppModule { }
