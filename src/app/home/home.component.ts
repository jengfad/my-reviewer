import { Component } from '@angular/core';
import * as jsonData from '../data/az-300.json';
import { IQuestion } from '../models/question';
import { IChoice } from '../models/choice';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  areQuestionsShuffled = true;
  firstQuestion = 1;
  endQuestion = 0;

  areChoicesShuffled = true;
  
  currentQuestion: IQuestion | undefined = undefined;
  showAnswers = false;

  questionCtr = 0;
  ogList: IQuestion[] = [];
  totalQuestions = 0;

  currentQuestions: IQuestion[] = [];
  currentChoices: IChoice[] = [];

  endOfExam = false;

  ngOnInit() {
    this.initializeQuestions();
    this.currentQuestion = this.currentQuestions[this.questionCtr];
    this.setCurrentChoices();
  }

  private initializeQuestions() {
    this.ogList = JSON.parse(JSON.stringify(jsonData))['default'];

    this.totalQuestions = this.ogList.length;
    this.endQuestion = this.ogList.length;
    
    this.currentQuestions = this.areQuestionsShuffled 
                              ? this.shuffle(this.ogList.reverse())
                              : this.ogList.reverse();
  }

  shuffleChoices() {
    this.setCurrentChoices();
  }

  getNextQuestion() {
    if (this.currentQuestions.length - 1 === this.questionCtr){
      this.endOfExam = true;
      return;
    };

    this.showAnswers = false;
    this.questionCtr = this.questionCtr + 1;
    this.currentQuestion = this.currentQuestions[this.questionCtr];

    this.setCurrentChoices();
  }

  getPreviousQuestion() {
    if (this.questionCtr === 0) return;
    this.questionCtr = this.questionCtr - 1;
    this.currentQuestion = this.currentQuestions[this.questionCtr];
    this.setCurrentChoices();
    this.endOfExam = false;
  }

  setCurrentChoices() {
    this.currentChoices = this.areChoicesShuffled 
                            ? this.shuffle(this.currentQuestion?.choices)
                            : this.currentQuestion?.choices;
  }

  toggleAnswerDisplay(val: boolean) {
    this.showAnswers = val;
  }

  submitAnswers(selectedChoices: string[]) {
    this.updateAnsweredQuestions(selectedChoices);
    this.getNextQuestion();
  }

  updateAnsweredQuestions(selectedChoices: string[]) {
    if (this.currentQuestion) {
      this.currentQuestion.choices.forEach(choice => {
        choice.isSelected = selectedChoices.some(label => label === choice.label);
      });
    }
  }

  private shuffle(input: any) {
    let array = JSON.parse(JSON.stringify(input));
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
