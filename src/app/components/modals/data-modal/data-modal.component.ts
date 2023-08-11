import { Component, OnInit, NgZone } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-data-modal',
  templateUrl: './data-modal.component.html',
  styleUrls: ['./data-modal.component.scss']
})
export class DataModalComponent implements OnInit {

  jsonData = '';

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }
  
  save() {
    this.activeModal.close(this.jsonData);
  }

  close() {
    this.activeModal.close(null);
  }

}