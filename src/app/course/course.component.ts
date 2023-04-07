import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course/course.service';
import { ReviewService } from 'src/app/services/review/review.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../services/auth/auth.service';
import { ChannelService, ChatClientService } from 'stream-chat-angular';
import { take } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { StreamService } from '../services/stream/stream.service';
import { AuthService as env } from '@auth0/auth0-angular';

@Component({
    selector: 'app-course',
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
    reviewCountForm: any;
    courseForm: any;
    reviewForm: any;
    voteForm: any;
    currentReviewID: any;
    currentCourseID: any;
    like: number = 0;
    dislike: number = 0;
    hide: boolean = false;
    hideButton: boolean = true;
    activatedRoute: any;
    fontSize = 14;
    fontSize2 = 14;
    fontSize3 = 14;

    hideTranscriptFeature1: boolean = true;
    hideTranscriptFeature2: boolean = true;
    hideTranscriptFeature3: boolean = true;

    constructor(private courseService: CourseService,
        private reviewService: ReviewService,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        public auth: AuthService,
        private snackBar: MatSnackBar,
        public authService: env,

        private chatService: ChatClientService,
        private channelService: ChannelService,
        private spinner: NgxSpinnerService,
        private streamService: StreamService) { }

    ngOnInit(): void {

        this.course_list_stream_channel = this.courseService.getCourse(
            this.route.snapshot.params['id']).subscribe((res: any) => {
                this.stream_channel_id = res[0].stream_channel_id;
                console.log(this.stream_channel_id);
            });

        this.course_list = this.courseService.getCourse(
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

        this.courseForm = this.formBuilder.group({
            course_title: ['', Validators.required],
            course_category: ['', Validators.required],
            course_image: ['', Validators.required],
            course_description: ['', Validators.required],
            course_difficulty: ['', Validators.required],
            lecturer_name: ['', Validators.required],
            release_year: ['', Validators.required]
        });

        this.reviews = this.reviewService.getReviews(
            this.route.snapshot.params['id']);

        this.hideTranscriptFeature1 = true;
        this.hideTranscriptFeature2 = true;
        this.hideTranscriptFeature3 = true;
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

        await channel.addMembers([this.auth.getCurrentUserId()]);

        this.spinner.hide();
        this.loadChat();
    }

    leaveClassChat() {
        this.channelService.activeChannel$.pipe(take(1)).subscribe((channel) => {
            console.log('leaving channel...', channel);
            if (channel) {
                channel.removeMembers([this.auth.getCurrentUserId()]);
                this.joinedChat = false;
            }
        });
    }

    //------------------------------------------------------------------------------------------------------

    onSubmit(course: any) {
        
        let review_count = course.review_count;
        ++review_count;
        console.log(review_count);

        this.reviewCountForm = this.formBuilder.group({
            review_count: [review_count]
        });

        this.reviewService.postReview(this.reviewForm.value, course._id).subscribe((response: any) => {
            this.reviewForm.reset();
            this.reviews = this.reviewService.getReviews(
                this.route.snapshot.params['id']);
            this.openSnackBar("Review for " + course.course_title + " has been successfully posted!");

            this.courseService.updateReviewCount(this.reviewCountForm.value).subscribe((response: any) => {
                this.course_list = this.courseService.getCourse(
                    this.route.snapshot.params['id']);
            });
        });
    }

    onDeleteReview(rid: any, course: any) {
        let review_count = course.review_count;
        if (review_count > 0)
            --review_count
        console.log(review_count);

        this.reviewCountForm = this.formBuilder.group({
            review_count: [review_count]
        });

        this.reviewService.deleteReview(rid, course._id).subscribe((response: any) => {
            this.reviews = this.reviewService.getReviews(
                this.route.snapshot.params['id']);
            this.openSnackBar("Review for " + course.course_title + " has been successfully deleted!");

            this.courseService.updateReviewCount(this.reviewCountForm.value).subscribe((response: any) => {
                this.course_list = this.courseService.getCourse(
                    this.route.snapshot.params['id']);
            });
        });
    }

    onEditReview(review: any) {
        this.hideButton = false;
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
        this.courseForm = this.formBuilder.group({
            course_title: [course.course_title, Validators.required],
            course_category: [course.course_category, Validators.required],
            course_image: [course.course_image, Validators.required],
            course_description: [course.course_description, Validators.required],
            course_difficulty: [course.course_difficulty, Validators.required],
            lecturer_name: [course.lecturer_name, Validators.required],
            release_year: [course.release_year, Validators.required]
        });

        this.currentCourseID = course._id;
        console.log(this.courseForm.value);
    }

    saveReview() {
        this.reviewService.updateReview(this.currentReviewID, this.reviewForm.value).subscribe((response: any) => {
            this.reviewForm.reset();
            this.hideButton = true;
            this.reviews = this.reviewService.getReviews(
                this.route.snapshot.params['id']);
        });
    }

    saveCourse(course: any) {
        this.courseService.updateCourse(this.currentCourseID, this.courseForm.value).subscribe((response: any) => {
            this.courseForm.reset();
            this.course_list = this.courseService.getCourse(
                this.route.snapshot.params['id']);
            this.openSnackBar(course.course_title + " has been successfully edited!");
        });
    }

    onUpdateLike(review: any) {

        this.like = review.like;
        ++this.like;
        console.log(this.like);
        this.currentReviewID = review._id;

        this.voteForm = this.formBuilder.group({
            like: [this.like]
        });

        this.reviewService.updateLike(this.currentReviewID, this.voteForm.value).subscribe((response: any) => {
            this.hide = true;
            this.reviews = this.reviewService.getReviews(
                this.route.snapshot.params['id']);
        });
    }

    onUpdateDislike(review: any) {

        this.dislike = review.dislike;
        ++this.dislike;
        console.log(this.dislike);
        this.currentReviewID = review._id;

        this.voteForm = this.formBuilder.group({
            dislike: [this.dislike]
        });

        this.reviewService.updateDislike(this.currentReviewID, this.voteForm.value).subscribe((response: any) => {
            this.hide = true;
            this.reviews = this.reviewService.getReviews(
                this.route.snapshot.params['id']);
        });
    }

    onDeleteCourse(course: any) {
        this.courseService.deleteCourse(course._id).subscribe((response: any) => {
            this.course_list = this.courseService.getCourse(
                this.route.snapshot.params['id']);
            this.openSnackBar(course.course_title + " has been successfully deleted!");
        });
    }

    // Review Form Validation

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

    // Course Form Validation

    isInvalidCourse(control: any) {
        return this.courseForm.controls[control].invalid && this.courseForm.controls[control].touched;
    }

    isUntouched2() {
        return this.courseForm.controls.course_title.pristine;
    }

    isIncomplete2() {
        return this.isInvalidCourse('course_title') ||
            this.isUntouched2();
    }

    openSnackBar(message: string, action?: string) {
        this.snackBar.open(message, action, { duration: 5 * 1000 });
    }

    showTranscript1() {
        this.hideTranscriptFeature1 = false;
    }

    hideTranscript1() {
        this.hideTranscriptFeature1 = true;
    }

    showTranscript2() {
        this.hideTranscriptFeature2 = false;
    }

    hideTranscript2() {
        this.hideTranscriptFeature2 = true;
    }

    showTranscript3() {
        this.hideTranscriptFeature3 = false;
    }

    hideTranscript3() {
        this.hideTranscriptFeature3 = true;
    }
}

