import { Component, OnInit } from '@angular/core';
import { WebService } from '../web.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from './../services/auth.service';
import { ChannelService, ChatClientService } from 'stream-chat-angular';
import { take } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { StreamService } from '../services/stream.service';

@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css']
})

export class CourseComponent implements OnInit {
    stream_channel_id: any;
    joinedChat = false;
    loading = true;

    course_list: any = [];
    course_list_stream_channel: any = [];
    reviews: any = [];
    courseForm: any;
    courseForm2: any;
    reviewForm: any;
    voteForm: any;
    currentReviewID: any;
    currentCourseID: any;
    funny: number = 0;
    useful: number = 0;
    cool: number = 0;
    hide: boolean = false;
    activatedRoute: any;

    constructor(private webService: WebService,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        public authService: AuthService,
        private snackBar: MatSnackBar,

        private chatService: ChatClientService,
        private channelService: ChannelService,
        private spinner: NgxSpinnerService,
        private streamService: StreamService) { }

    ngOnInit(): void {

        this.course_list_stream_channel = this.webService.getCourse(
            this.route.snapshot.params['id']).subscribe((res: any) => {
                this.stream_channel_id = res[0].stream_channel_id;
                console.log(this.stream_channel_id);
            });

        this.course_list = this.webService.getCourse(
            this.route.snapshot.params['id']);

        console.log(this.course_list);

        this.streamService.isStreamReady().subscribe((ready: boolean) => {
            if (ready) {
                this.loadChat();
            }
        });

        this.reviewForm = this.formBuilder.group({
            name: ['', Validators.required],
            review: ['', Validators.required],
            stars: 5
        });

        this.courseForm2 = this.formBuilder.group({
            course_title: ['', Validators.required],
            course_category: ['', Validators.required],
            course_image: ['', Validators.required],
            course_description: ['', Validators.required],
            course_difficulty: ['', Validators.required],
            lecturer_name: ['', Validators.required],
            release_year: ['', Validators.required]
        });

        this.reviews = this.webService.getReviews(
            this.route.snapshot.params['id']);
    }

    //------------------------------------------------------------------------------------------------------

    loadChat() {
        this.channelService.channels$.subscribe((channels) => {
            if (!channels) return;

            const filtered = channels.filter(
                (channel) => channel.id == this.stream_channel_id
            );

            if (filtered.length) {
                // User is already member
                console.log('user has this channel!');
                const toJoin = filtered[0];

                this.channelService.setAsActiveChannel(toJoin);
                this.joinedChat = true;
                this.loading = false;
            } else {
                this.loading = false;
            }
        });
    }

    async joinClassChat() {
        this.spinner.show();

        const channel = await this.chatService.chatClient.getChannelById(
            'messaging',
            this.stream_channel_id,
            {}
        );

        await channel.addMembers([this.authService.getCurrentUserId()]);

        this.spinner.hide();
        this.loadChat();
    }

    leaveClassChat() {
        this.channelService.activeChannel$.pipe(take(1)).subscribe((channel) => {
            console.log('leaving channel...', channel);
            if (channel) {
                channel.removeMembers([this.authService.getCurrentUserId()]);
                this.joinedChat = false;
            }
        });
    }

    //------------------------------------------------------------------------------------------------------

    onSubmit(course: any) {
        let review_count = course.review_count;
        ++review_count;
        console.log(review_count);

        this.courseForm = this.formBuilder.group({
            review_count: [review_count]
        });

        this.webService.postReview(this.reviewForm.value).subscribe((response: any) => {
            this.reviewForm.reset();
            this.reviews = this.webService.getReviews(
                this.route.snapshot.params['id']);
            this.openSnackBar("Review for " + course.course_title + " has been successfully posted!");

            this.webService.updateReviewCount(this.courseForm.value).subscribe((response: any) => {
                this.course_list = this.webService.getCourse(
                    this.route.snapshot.params['id']);
            });
        });
    }

    onDeleteReview(rid: any, course: any) {
        let review_count = course.review_count;
        if (review_count > 0)
            --review_count
        console.log(review_count);

        this.courseForm = this.formBuilder.group({
            review_count: [review_count]
        });

        this.webService.deleteReview(rid).subscribe((response: any) => {
            this.reviews = this.webService.getReviews(
                this.route.snapshot.params['id']);
            this.openSnackBar("Review for " + course.course_title + " has been successfully deleted!");

            this.webService.updateReviewCount(this.courseForm.value).subscribe((response: any) => {
                this.course_list = this.webService.getCourse(
                    this.route.snapshot.params['id']);
            });
        });
    }

    onEditReview(review: any) {
        console.log(review);
        this.reviewForm = this.formBuilder.group({
            name: [review.name, Validators.required],
            review: [review.text, Validators.required],
            stars: [review.stars],
        });

        this.currentReviewID = review._id;
    }

    onEditCourse(course: any) {
        console.log(course);
        this.courseForm2 = this.formBuilder.group({
            course_title: [course.course_title, Validators.required],
            course_category: [course.course_category, Validators.required],
            course_image: [course.course_image, Validators.required],
            course_description: [course.course_description, Validators.required],
            course_difficulty: [course.course_difficulty, Validators.required],
            lecturer_name: [course.lecturer_name, Validators.required],
            release_year: [course.release_year, Validators.required]
        });

        this.currentCourseID = course._id;
        console.log(this.courseForm2.value);
    }

    saveReview() {
        this.webService.updateReview(this.currentReviewID, this.reviewForm.value).subscribe((response: any) => {
            this.reviewForm.reset();
            this.reviews = this.webService.getReviews(
                this.route.snapshot.params['id']);
        });
    }

    saveCourse(course: any) {
        this.webService.updateCourse(this.currentCourseID, this.courseForm2.value).subscribe((response: any) => {
            this.courseForm2.reset();
            this.course_list = this.webService.getCourse(
                this.route.snapshot.params['id']);
            this.openSnackBar(course.course_title + " has been successfully edited!");
        });
    }

    onUpdateFunny(review: any) {

        this.funny = review.funny;
        ++this.funny;
        console.log(this.funny);
        this.currentReviewID = review._id;

        this.voteForm = this.formBuilder.group({
            funny: [this.funny]
        });

        this.webService.updateFunny(this.currentReviewID, this.voteForm.value).subscribe((response: any) => {
            this.hide = true;
            this.reviews = this.webService.getReviews(
                this.route.snapshot.params['id']);
        });
    }

    onUpdateUseful(review: any) {

        this.useful = review.useful;
        ++this.useful;
        console.log(this.useful);
        this.currentReviewID = review._id;

        this.voteForm = this.formBuilder.group({
            useful: [this.useful]
        });

        this.webService.updateUseful(this.currentReviewID, this.voteForm.value).subscribe((response: any) => {
            this.hide = true;
            this.reviews = this.webService.getReviews(
                this.route.snapshot.params['id']);
        });
    }

    onUpdateCool(review: any) {

        this.cool = review.cool;
        ++this.cool;
        console.log(this.cool);
        this.currentReviewID = review._id;

        this.voteForm = this.formBuilder.group({
            cool: [this.cool]
        });

        this.webService.updateCool(this.currentReviewID, this.voteForm.value).subscribe((response: any) => {
            this.hide = true;
            this.reviews = this.webService.getReviews(
                this.route.snapshot.params['id']);
        });
    }

    isInvalid(control: any) {
        return this.reviewForm.controls[control].invalid && this.reviewForm.controls[control].touched;
    }

    isUntouched() {
        return this.reviewForm.controls.name.pristine || this.reviewForm.controls.review.pristine;
    }

    isIncomplete() {
        return this.isInvalid('name') ||
            this.isInvalid('review') ||
            this.isUntouched();
    }

    onDeleteCourse(course: any) {
        this.webService.deleteCourse(course._id).subscribe((response: any) => {
            this.course_list = this.webService.getCourse(
                this.route.snapshot.params['id']);
            this.openSnackBar(course.course_title + " has been successfully deleted!");
        });
    }

    isUntouched2() {
        return this.courseForm.controls.course_title.pristine ||
            this.courseForm.controls.course_category.pristine ||
            this.courseForm.controls.course_image.pristine ||
            this.courseForm.controls.course_description.pristine ||
            this.courseForm.controls.course_difficulty.pristine ||
            this.courseForm.controls.lecturer_name.pristine ||
            this.courseForm.controls.release_year.pristine;
    }

    isIncomplete2() {
        return this.isInvalid('course_title') ||
            this.isInvalid('course_category') ||
            this.isInvalid('course_image') ||
            this.isInvalid('course_description') ||
            this.isInvalid('course_difficulty') ||
            this.isInvalid('lecturer_name') ||
            this.isInvalid('release_year') ||
            this.isUntouched();
    }

    openSnackBar(message: string, action?: string) {
        this.snackBar.open(message, action, { duration: 5 * 1000 });
    }
}
