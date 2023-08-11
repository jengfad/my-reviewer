import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IQuestion } from '../../models/question';
import { IChoice } from '../../models/choice';
import { DataModalComponent } from '../modals/data-modal/data-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SimpleModalComponent } from '../modals/simple-modal/simple-modal.component';

@Component({
  selector: 'app-question-area',
  templateUrl: './question-area.component.html',
  styleUrls: ['./question-area.component.scss']
})
export class QuestionAreaComponent { 
    @Input() endOfExam = false;
    @Input() showAnswers = false;
    @Input() questionCtr = 0;
    @Input() totalQuestions = 0;
    @Input() currentQuestion: IQuestion | undefined = undefined;
    @Input() currentChoices: IChoice[] = [];
    @Output() submitAnswers = new EventEmitter<string[]>();
    @Output() previousQuestion = new EventEmitter<void>();
    @Output() toggleAnswerDisplay = new EventEmitter<boolean>();

    constructor(private modalService: NgbModal) {
        
    }

    onToggleAnswerDisplay(val: boolean) {
        this.toggleAnswerDisplay.emit(val);
    }

    onPreviousQuestion() {
        this.previousQuestion.emit();
    }

    onSubmitAnswers() {
        const selectedChoices = this.currentChoices.filter(c => c.isSelected).map(c => c.label);

        if (selectedChoices.length === 0) {
            const modalRef = this.modalService.open(SimpleModalComponent);
            modalRef.componentInstance.title = "Error";
            modalRef.componentInstance.content = "Please select at least 1 choice";
            return;
        }

        this.submitAnswers.emit(selectedChoices);
    }
}