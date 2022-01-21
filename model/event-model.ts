import { AddEvent } from "../interface/add-event";

export class eventModel {
    eventId!:number;
    eventName!:String;
    dateStart!:Date;
    endDate!:Date;
    startTime!:String;
    endTime!:String;
    kategori!:String;
    
    dateStartOnly!:Date;
    dateEndOnly!:Date;

    constructor(eventFormModel? : AddEvent){

        this.eventId= eventFormModel?.eventId ?? 0;
        this.eventName= eventFormModel?.eventName ?? '';
        this.dateStart= eventFormModel?.dateStart ?? new Date();
        this.endDate= eventFormModel?.endDate ?? new Date();
        this.startTime= eventFormModel?.startTime ?? '';
        this.endTime= eventFormModel?.endTime ?? '';
        this.kategori= eventFormModel?.kategori ?? '';
        
        this.dateStartOnly= eventFormModel?.dateStartOnly?? new Date();
        this.dateEndOnly= eventFormModel?.dateEndOnly?? new Date()   
    }
}