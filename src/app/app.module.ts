import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoursesComponent } from './courses/courses.component';
import { WebService } from './web.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CourseComponent } from './course/course.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ChangeBgDirective } from './change-bg.directive';
import { LoginComponent } from './login/login.component';
import { ChatsComponent } from './chats/chats.component';
import { StudentConnectComponent } from './student-connect/student-connect.component';
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
import { MatSelectModule } from '@angular/material/select';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { InstructorComponent } from './instructor/instructor.component';
import { AuthModule } from '@auth0/auth0-angular';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { AssessmentComponent } from './assessment/assessment.component';
import { NavigationComponent } from './navigation/navigation.component';
import { StudentSectionComponent } from './student-section/student-section.component';
import { WdQuestionsComponent } from './questions-components/wd-questions/wd-questions/wd-questions.component';
import { FdQuestionsComponent } from './questions-components/fd-questions/fd-questions/fd-questions.component';
import { DdQuestionsComponent } from './questions-components/dd-questions/dd-questions/dd-questions.component';
import { BdQuestionsComponent } from './questions-components/bd-questions/bd-questions/bd-questions.component';
import { StudentComponent } from './student/student.component';

var routes: any = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'app',
    component: NavigationComponent,
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
        component: AssessmentComponent
      },
      {
        path: 'assessment/wd-questions',
        component: WdQuestionsComponent
      },
      {
        path: 'assessment/fd-questions',
        component: FdQuestionsComponent
      },
      {
        path: 'assessment/dd-questions',
        component: DdQuestionsComponent
      },
      {
        path: 'assessment/bd-questions',
        component: BdQuestionsComponent
      },
      {
        path: 'student-section',
        component: StudentSectionComponent,
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
        path: 'web-design',
        component: WebDesignComponent
      },
      {
        path: 'frontend-development',
        component: FrontendDevelopmentComponent
      },
      {
        path: 'backend-development',
        component: BackendDevelopmentComponent
      },
      {
        path: 'database-development',
        component: DatabaseDevelopmentComponent
      },
      {
        path: 'instructor',
        component: InstructorComponent
      },
      {
        path: 'students/:id',
        component: StudentComponent,
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
    LoginComponent,
    ChatsComponent,
    StudentConnectComponent,
    WebDesignComponent,
    FrontendDevelopmentComponent,
    DatabaseDevelopmentComponent,
    BackendDevelopmentComponent,
    StudentsComponent,
    ChatbotComponent,
    InstructorComponent,
    AssessmentComponent,
    NavigationComponent,
    StudentSectionComponent,
    WdQuestionsComponent,
    FdQuestionsComponent,
    DdQuestionsComponent,
    BdQuestionsComponent,
    StudentComponent
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
    MatTabsModule,
    MatDialogModule,
    NgxSpinnerModule.forRoot({ type: 'ball-pulse' }),
    // Imports for Stream
    TranslateModule.forRoot(),
    StreamAutocompleteTextareaModule,
    StreamChatModule,
    // Auth0 for become an instructor
    AuthModule.forRoot( {
      domain:'dev-2hct0ry2urm4oaqi.uk.auth0.com',
      clientId: 'dUkamag8r5jxRG5pyXXWAiUM8T7lbtNc'
      })
  ],
  providers: [WebService],
  bootstrap: [AppComponent]
})
export class AppModule { }
