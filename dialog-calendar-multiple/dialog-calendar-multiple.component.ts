import { Component, OnInit} from '@angular/core';
import { MatDialogRef} from '@angular/material/dialog';
import { FormGroup,  Validators, FormBuilder, FormControl} from '@angular/forms';
import { category, timeStart, timeEnd } from '../inputSelect';
import { EventService } from '../service/event.service';
import { eventModel } from '../model/event-model';

@Component({
  selector: 'app-dialog-calendar-multiple',
  templateUrl: './dialog-calendar-multiple.component.html',
  styleUrls: ['./dialog-calendar-multiple.component.scss'],
})
export class DialogCalendarMultipleComponent implements OnInit {

  close:string='assets/images/icons8-close-24.png';
  showEventForm:boolean=false;
  showEmailForm:boolean=false;
  eventForm: FormGroup; 
  optionValue = '0';
  timeStartObj: any[] = [];
  timeEndObj: any[]= [];
  categoryObj: any[]= [];
  eventFormInput:any;

  constructor(public dialogRef: MatDialogRef<DialogCalendarMultipleComponent>,
              private fb:FormBuilder,
              public addNewEventService: EventService,
              ) {}

  ngOnInit(): void{this.createEventForm();
                   this.createEventForm();
                   this.timeStartObj = timeStart;  
                   this.timeEndObj = timeEnd;
                   this.categoryObj= category; 
                   this.getDateStart();
                   this.getDateEnd();

                   this.addNewEventService.getEvent().subscribe((eventFormInput: eventModel[]) => 
                   {this.eventFormInput=eventFormInput;});
                  }

  createEventForm(){
    this.eventForm= this.fb.group({
      eventId: JSON.parse(localStorage.getItem('addEventId') || '{}'),
      eventName: new FormControl ('',[Validators.required]),
      dateStart:new FormControl ('',[Validators.required]),
      endDate: new FormControl ('',[Validators.required]),
      startTime: new FormControl ('',[Validators.required]),
      endTime: new FormControl ('',[Validators.required]),
      kategori: new FormControl ('',[Validators.required]),

      dateStartOnly:[],
      dateEndOnly:[]
    });
  }
  get valueEventForm():any{return this.eventForm.controls;}

  closeDialog() {
    this.dialogRef.close(false);
  }

  toogleEvent(){
    this.showEventForm=!this.showEventForm;
  }

  toogleEmail(){
    this.showEmailForm=!this.showEmailForm;
  }
  
  public saveButton = (eventForm:any) =>{
    if(this.eventForm.valid){
      this.newEventInc(eventForm)
    }
  }
  newEventInc = (eventForm:any)=>{
    this.addNewEventService.saveAddEvent(eventForm)

    let eventId = JSON.parse(localStorage.getItem('addEventId') || '{}') +1;
    localStorage.setItem('addEventId',eventId.toString())
  }

  getDateStart(){
    let valueDateStart = this.eventForm.value.dateStart;
    let dStart = new Date( valueDateStart );

    let monthStart = (dStart.getMonth() + 1).toString().padStart(2, "0");
    let dayStart = (dStart.getDate()).toString().padStart(2, "0");
    let yearStart = (dStart.getFullYear())

    let dateStartOnly = yearStart + "-" + monthStart + "-" + dayStart
    this.eventForm.patchValue({dateStartOnly});
  }

  getDateEnd(){
    let valueDateEnd = this.eventForm.value.endDate;
    let dEnd = new Date( valueDateEnd );

    let monthEnd = (dEnd.getMonth() + 1).toString().padStart(2, "0");
    let dayEnd = (dEnd.getDate() + 1).toString().padStart(2, "0");
    let yearEnd = (dEnd.getFullYear())

    let dateEndOnly = yearEnd + "-" + monthEnd + "-" + dayEnd
    this.eventForm.patchValue({dateEndOnly});
  }

}
