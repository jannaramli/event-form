import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, FullCalendarComponent, EventInput} from '@fullcalendar/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogCalendarMultipleComponent } from '../dialog-calendar-multiple/dialog-calendar-multiple.component';
import { DialogCalendarUsernameComponent } from '../dialog-calendar-username/dialog-calendar-username.component';

@Component({
  selector: 'app-manage-calendar',
  templateUrl: './manage-calendar.component.html',
  styleUrls: ['./manage-calendar.component.scss']
})
export class ManageCalendarComponent implements OnInit {

  INITIAL_EVENTS: EventInput[] = [] 
  todayu = new Date();
  yearToday = this.todayu.getFullYear();
  yearMonth = this.todayu.getMonth()+1;
  existBirth:boolean;

  constructor(public rout:Router, 
              public routNoevent:Router,
              public dialogEvent:MatDialog, 
              public route: ActivatedRoute,
              public dialogUsername:MatDialog) {} 

  @ViewChild('calendarBirth', { static: true }) calendarBirth: FullCalendarComponent; 

  ngOnInit(): void {
  this.displayBirthInDay();
  }

  checkIfEventExist(currentEvent:any, existEventsList:any) {
    const existBirth = existEventsList.some(function (existEventItem: any) {
    return (existEventItem.id === currentEvent.id)&&(existEventItem.title === currentEvent.title) && (existEventItem.date === currentEvent.date);
    });
    return existBirth; //return true
  }

  eventBirth(){
    const namapemohon=JSON.parse(localStorage.getItem('Users') || '{}');
    console.log(namapemohon);

    for(let i=0; i<namapemohon.length; i++) {

      type EventObject = {
       id:any;
       groupId:any;
       title: string;
       date: any;
      };
      
      const eventObject: EventObject = {
        id:(namapemohon[i].kad),
        groupId: '1',
        title:(namapemohon[i].name),
        date:(this.yearToday + "-" + namapemohon[i].month + "-" + namapemohon[i].day), 
      };

      const isExist = this.checkIfEventExist(eventObject, this.INITIAL_EVENTS);
      if(!isExist && namapemohon[i].kad != 0) {   
        this.INITIAL_EVENTS.push(
        {
          id:(namapemohon[i].kad),
          groupId: '1',
          title: (namapemohon[i].name ),
          date: (this.yearToday + "-" + namapemohon[i].month + "-" + namapemohon[i].day), 
        });
        
        this.calendarBirth.getApi().addEvent(eventObject);
      };
    } //end for loop
  } 

  displayBirthInDay(){
    const namapemohon=JSON.parse(localStorage.getItem('Users') || '{}')
    console.log(namapemohon);

    for(let i=0; i<namapemohon.length; i++){ 
      if(namapemohon[i].kad != 0){
        this.INITIAL_EVENTS.push({
            id:(namapemohon[i].kad),
            groupId: '1',
            title: (namapemohon[i].name),
            date: (this.yearToday + "-" + namapemohon[i].month + "-" + namapemohon[i].day), 
        });
      };
    }//end forloop

    //display event in calendar (from local addevent)
    const eventArray=JSON.parse(localStorage.getItem('addEvent') || '{}');
    console.log(eventArray);
    for(let i=0; i<eventArray.length; i++){ 
      this.INITIAL_EVENTS.push({

        title: (eventArray[i].eventName + " : " + eventArray[i].startTime.viewValueStart + "-" + eventArray[i].endTime.viewValueEnd),
        start: (eventArray[i].dateStartOnly),
        end: (eventArray[i].dateEndOnly),
        color: 'purple', 
        groupId: '2',
      });
    };//end forloop addevent
  }

  calendarOptions: CalendarOptions = {
    contentHeight: 700,
    dayMaxEvents: true, 
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this),
    eventClick:this.handleEventClick.bind(this),
    initialEvents:this.INITIAL_EVENTS,
 
    views: {
      dayGridDay:{buttonText:'today is your birthday!'}
    }, 

    headerToolbar:{
      left: 'prevYear,prev,next,nextYear today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek,dayGridDay', 
    }, 
  
    customButtons:{
      prev:{
        click:()=>{
          this.calendarBirth.getApi().prev();
          this.yearToday=this.calendarBirth.getApi().currentData.currentDate.getFullYear();
          this.yearMonth=this.calendarBirth.getApi().currentData.currentDate.getMonth()+1;

          this.eventBirth();
        },
      },
      next:{
        click:()=>{
          this.calendarBirth.getApi().next();
          this.yearToday=this.calendarBirth.getApi().currentData.currentDate.getFullYear();
          this.yearMonth=this.calendarBirth.getApi().currentData.currentDate.getMonth()+1;

          this.eventBirth();
        },
      },
      today:{
        text:'today',
        click:()=>{
          this.calendarBirth.getApi().today();
          this.yearToday=this.calendarBirth.getApi().currentData.currentDate.getFullYear();
          this.yearMonth=this.calendarBirth.getApi().currentData.currentDate.getMonth()+1;
              
          console.log(this.yearToday);
        },
      },
      prevYear: {
        click:()=>{
          this.calendarBirth.getApi().prevYear();
          this.yearToday=this.calendarBirth.getApi().currentData.currentDate.getFullYear();

          this.eventBirth();
        },
      },
      nextYear: {
        click:()=>{
          this.calendarBirth.getApi().nextYear();
          this.yearToday=this.calendarBirth.getApi().currentData.currentDate.getFullYear()

          this.eventBirth();
        },
      },
    },//end custom button
  };//end calendar template

  //function klik date 
  handleDateClick(){
    let typeDate = 0

    let dialogRef=this.dialogEvent.open(DialogCalendarMultipleComponent,
      {
        width: '100%',
        height: 'auto',
        panelClass: 'fullscreen-dialog',
        backdropClass: 'dialog-container',
        disableClose: true, 
        maxHeight: '80vh'
      });
  };

  //function event click
  handleEventClick(){
    let dialogRef=this.dialogUsername.open(DialogCalendarUsernameComponent,
      {
        width: '100%',
        height: 'auto',
        panelClass: 'fullscreen-dialog',
        backdropClass: 'dialog-container',
        disableClose: true, 
        maxHeight: '80vh'
      });
  }

}
