import { Component, Input, SimpleChanges } from '@angular/core';
import { IQuestion } from '../../models/question';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent {
    @Input() currentQuestions: IQuestion[] = [];
    wrongItems: IQuestion[] = [];
    score = 0;
    totalQuestions = 0;

    ngOnChanges(changes: SimpleChanges) {
      if (changes['currentQuestions']) {
        this.getResults();
      }
    }

    getResults() {
      this.totalQuestions = this.currentQuestions.length;
      this.currentQuestions.forEach(q => {
        const selected = q.choices.filter(x => x.isSelected).map(x => x.id);
        const correct = q.choices.filter(x => x.isCorrect).map(x => x.id);
        const isUserCorrect = JSON.stringify(selected.sort()) === JSON.stringify(correct.sort());

        if (!isUserCorrect) {
          this.wrongItems.push(q);
        }
      });
      this.score = this.totalQuestions - this.wrongItems.length;
    }
}