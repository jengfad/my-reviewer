import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IQuestion } from '../../models/question';
import { IChoice } from '../../models/choice';
import { DataModalComponent } from '../data-modal/data-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-question-area',
  templateUrl: './question-area.component.html',
  styleUrls: ['./question-area.component.scss']
})
export class QuestionAreaComponent { 
    @Input() endOfExam = false;
    @Input() showAnswers = false;
    @Input() areChoicesShuffled = false;
    @Input() questionCtr = 0;
    @Input() totalQuestions = 0;
    @Input() currentQuestion: IQuestion | undefined = undefined;
    @Input() currentQuestions: IQuestion[] = [];
    @Input() currentChoices: IChoice[] = [];
    @Output() submitAnswers = new EventEmitter<string[]>();
    @Output() previousQuestion = new EventEmitter<void>();
    @Output() toggleAnswerDisplay = new EventEmitter<boolean>();
    @Output() shuffleChoices = new EventEmitter<void>();

    constructor(private modalService: NgbModal) {
        
    }

    onShuffleChoices() {
        this.shuffleChoices.emit();
    }

    onToggleAnswerDisplay(val: boolean) {
        this.toggleAnswerDisplay.emit(val);
    }

    onPreviousQuestion() {
        this.previousQuestion.emit();
    }

    onSubmitAnswers() {
        const selectedChoices = this.currentChoices.filter(c => c.isSelected).map(c => c.label);
        this.submitAnswers.emit(selectedChoices);
    }

    openDataModal() {
        const modalRef = this.modalService.open(DataModalComponent);
        modalRef.componentInstance.jsonData = JSON.stringify(this.currentQuestions);
    }
}