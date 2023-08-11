import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IQuestion } from '../../models/question';
import { IChoice } from '../../models/choice';

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
    @Input() currentChoices: IChoice[] = [];
    @Output() submitAnswers = new EventEmitter<string[]>();
    @Output() previousQuestion = new EventEmitter<void>();
    @Output() showTheAnswers = new EventEmitter<void>();
    @Output() shuffleChoices = new EventEmitter<void>();

    onShuffleChoices() {
        this.shuffleChoices.emit();
    }

    onShowTheAnswers() {
        this.showTheAnswers.emit();
    }

    onPreviousQuestion() {
        this.previousQuestion.emit();
    }

    onSubmitAnswers() {
        const selectedChoices = this.currentChoices.filter(c => c.isSelected).map(c => c.label);
        this.submitAnswers.emit(selectedChoices);
    }
}