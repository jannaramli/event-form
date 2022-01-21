import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AddEvent } from '../interface/add-event';
import { eventModel } from '../model/event-model';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  eventFormInput: eventModel[] = JSON.parse(localStorage.getItem('addEvent') || '{}');
  eventFormModel = new BehaviorSubject(this.eventFormInput);
  
  constructor() {}

  saveAddEvent(newAddEvent: any){

    var eventFormModel: AddEvent = {
      eventId:newAddEvent.eventId,
      eventName:newAddEvent.eventName,
      dateStart:newAddEvent.dateStart,
      endDate:newAddEvent.endDate,
      startTime:newAddEvent.startTime,
      endTime:newAddEvent.endTime,
      kategori:newAddEvent.kategori,

      dateStartOnly:newAddEvent.dateStartOnly,
      dateEndOnly:newAddEvent.dateEndOnly
    };

    let eventObject = new eventModel( 
      eventFormModel,
    )
    
    this.eventFormInput.push(eventObject);
    localStorage.setItem('addEvent', JSON.stringify(this.eventFormInput));

    this.eventFormModel.next(this.eventFormInput);
  }

  getEvent(){
    return this.eventFormModel.asObservable()
  }
}
