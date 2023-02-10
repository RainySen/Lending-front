import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Review, IdSprint } from 'app/core/models/review';
import { ReviewService } from '../services/review.service';
import swal from 'sweetalert2';
import { SprintServiceService } from 'app/modules/options/sprint/sprint-service.service';

@Component({
  selector: 'app-create-review',
  templateUrl: './create-review.component.html',
  styleUrls: ['./create-review.component.scss']
})
export class CreateReviewComponent implements OnInit {

  gridsize = 0;
  idProject = '';
  sprints: any;
  @Output() reviewSaved = new EventEmitter();
  constructor(private _formBuilder: FormBuilder, private reviewService: ReviewService,
    @Inject(MAT_DIALOG_DATA) public model: Review, private sprintServiceService: SprintServiceService,
    private router: Router,
    public matDialogRef: MatDialogRef<CreateReviewComponent>) {
      if (this.model !== null) {
        const setModel = {
          id: model.id,
          sprint: model.idSprint.id,
          observations: model.observations,
          date: new Date(model.date),
          levelSatisfaction: +model.levelSatisfaction,
          goalAccomplished: model.goalAccomplished
        };
        this.reviewForm.setValue(setModel);
        this.updateSetting(this.reviewForm.value.levelSatisfaction)
    }
    }

  reviewForm = this._formBuilder.group({
    id: [''],
    sprint: ['', Validators.required],
    observations: [''],
    date: ['', Validators.required],
    levelSatisfaction: ['', Validators.required],
    goalAccomplished: ['', Validators.required],
  });

  ngOnInit(): void {
    this.idProject = sessionStorage.getItem('idProject');
    this.sprintServiceService.getSprintsForReview(this.idProject).subscribe(
      res => {
        this.sprints = res;
      }
    )
  }

  save() {
    if (this.reviewForm.valid) {
      let review: Review = new Review();
      let idSprint: IdSprint = new IdSprint();
      review.date = this.reviewForm.value.date;
      review.goalAccomplished = this.reviewForm.value.goalAccomplished;
      review.idProject = this.idProject;
      review.idSprint = idSprint;
      review.idSprint.id = this.reviewForm.value.sprint;
      review.idSprint.projectId = this.idProject;
      review.inactive = false;
      review.levelSatisfaction = this.reviewForm.value.levelSatisfaction;
      review.observations = this.reviewForm.value.observations;
      this.saveReview(review);
    }
  }

  update() {
    if (this.reviewForm.valid) {
      let review: Review = new Review();
      let idSprint: IdSprint = new IdSprint();
      review.id = this.model.id;
      review.date = this.reviewForm.value.date;
      review.goalAccomplished = this.reviewForm.value.goalAccomplished;
      review.idProject = this.idProject;
      review.idSprint = idSprint;
      review.idSprint.id = this.reviewForm.value.sprint;
      review.idSprint.projectId = this.idProject;
      review.inactive = false;
      review.levelSatisfaction = this.reviewForm.value.levelSatisfaction;
      review.observations = this.reviewForm.value.observations;
      this.updateReview(review);
    }
  }

  updateReview(review: Review) {
    this.reviewService.updateReview(review).subscribe(
      (res) => {
          if (res) {
              this.showMessage(
                  'La review se actualizó correctamente!.',
                  'info'
              );
              this.matDialogRef.close();
          }
      },
      (error) => {
          this.showMessage(
              'Ocurrió un error, por favor intente de nuevo.' + ' '+ error.error,
              'error'
          );
      }
    );
  }

  saveReview(review: Review) {
    this.reviewService.saveReview(review).subscribe(
        (res) => {
            if (res) {
                this.showMessage(
                    'La review se creó correctamente!.',
                    'info'
                );
                this.matDialogRef.close();
            }
        },
        (error) => {
            this.showMessage(
                'Ocurrió un error, por favor intente de nuevo.'+ ' '+ error.error,
                'error'
            );
        }
    );
  }

  showMessage(text: string, icon: any) {
    swal.fire({
        text: text,
        icon: icon,
    }).then((result) => {});
  }

  cerrar() {
    this.matDialogRef.close();
  }

  updateSetting(value) {
    this.gridsize = value;
    this.reviewForm.get('levelSatisfaction').setValue(value);
  }

}
