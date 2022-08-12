import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CalendarOptions } from '@fullcalendar/angular';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

 constructor(){}

 ngOnInit(): void {
   
 }
 calendarOptions: CalendarOptions = {

  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay'
  },

  initialView: 'dayGridMonth',
  weekends: true,
  editable: true,
  selectable: true,
  selectMirror: true,
  dayMaxEvents: true,
  dateClick: this.handleDateClick.bind(this),
  events: [
    { title: 'FSD', 
      startRecur:'2022-08-01', endRecur:'2023-01-31',
      daysOfWeek: [ '1' ],
      startTime: '18:00:00', endTime: '20:00:00' ,
      color: 'blue'},
    { title: 'CSA',  startRecur:'2022-08-01', endRecur:'2023-03-1',
    daysOfWeek: [ '6' ],
    startTime: '10:00:00', endTime: '12:00:00' ,
    color: 'red' },
    { title: 'event 2', date: '2019-04-02' }
  ]
};

handleDateClick(arg) {
  alert('date click! ' + arg.dateStr)
}





}
