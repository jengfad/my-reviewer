import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IQuestion } from 'src/app/models/question';
import { DataModalComponent } from '../modals/data-modal/data-modal.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
    @Input() areChoicesShuffled = false;
    @Input() currentQuestions: IQuestion[] = [];
    @Output() shuffleChoices = new EventEmitter<void>();
    @Output() resetExam = new EventEmitter<void>();
    @Output() changeQuestionSet = new EventEmitter<string>();

    constructor(private modalService: NgbModal) { }

    ngOnInit() {
    }

    onShuffleChoices() {
        this.shuffleChoices.emit();
    }

    onResetExam() {
        this.resetExam.emit();
    }

    async openDataModal() {
        const config = {
            size: 'xl'
        }
        const modalRef = this.modalService.open(DataModalComponent, config);
        modalRef.componentInstance.jsonData = JSON.stringify(this.currentQuestions, undefined, 4);
        const result = await modalRef.result;
        if (result) {
            this.changeQuestionSet.emit(result);
        }
    }

}