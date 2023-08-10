import { Component } from '@angular/core';
import * as jsonData from '../data/az-300.json';
import { IQuestion } from '../models/question';
import { IChoice } from '../models/choice';

@Component({
  selector: 'home',
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

  score = 0;
  questionCtr = 0;
  ogList: IQuestion[] = [];
  totalQuestions = 0;

  currentQuestions: IQuestion[] = [];
  currentChoices: IChoice[] = [];

  endOfExam = false;

  wrongItems: IQuestion[] = [];

  ngOnInit() {
    this.initializeQuestions();
    this.getNextQuestion();
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
    if (this.currentQuestions.length === 0){
      this.endOfExam = true;
      return;
    };

    this.showAnswers = false;
    this.currentQuestion = this.currentQuestions.pop();
    this.questionCtr++;

    this.setCurrentChoices();
  }

  setCurrentChoices() {
    this.currentChoices = this.areChoicesShuffled 
                            ? this.shuffle(this.currentQuestion?.choices)
                            : this.currentQuestion?.choices;
  }

  showTheAnswers() {
    this.showAnswers = true;
  }

  submitAnswers() {
    const selected = this.currentChoices.filter(x => x.isSelected).map(x => x.id);
    const correct = this.currentChoices.filter(x => x.isCorrect).map(x => x.id);
    const isUserCorrect = JSON.stringify(selected.sort()) === JSON.stringify(correct.sort());

    if (isUserCorrect) {
      this.score++;
    } else {
      if (this.currentQuestion) {
        let wrong = {
          question: this.currentQuestion.question.replace(/<br><br>/gi, "\n"),
          choices: this.currentChoices
        };
        this.wrongItems.push(wrong);
      }
    }
    this.getNextQuestion();
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
