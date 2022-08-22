import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import {defineFullCalendarElement} from '@fullcalendar/web-component';
import { AuthService } from '../auth.service';
import dayGridPlugin from '@fullcalendar/daygrid';

defineFullCalendarElement();

@Component({
  selector: 'app-view-schedule',
  templateUrl: './view-schedule.component.html',
  styleUrls: ['./view-schedule.component.css']
})
export class ViewScheduleComponent implements OnInit {


  events: any = {};
  

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    events: this.events,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek,dayGridDay'
    }

  };

 
  
  constructor(private _auth: AuthService) { }

  trainerCourse: any = { ict_courses_data:[]};
  trainerEmail: string | null = localStorage.getItem('trainer_email');

  ngOnInit(): void {

    /* ------ Get trainer details from db */
    this._auth.trainerProfile(this.trainerEmail)
      .subscribe((data:any) => {
        this.trainerCourse = data;      
        
        for(let i = 0; i<this.trainerCourse.ict_courses_data.length;i++){
          const randomColor = Math.floor(Math.random()*16777215).toString(16);
          this.calendarOptions.events = [        
                {
                  title: this.trainerCourse.ict_courses_data[i].course_id,                   
                  start: this.trainerCourse.ict_courses_data[i].start_date,
                  end: this.trainerCourse.ict_courses_data[i].end_date,
                  color: "#"+randomColor,
                  description: this.trainerCourse.ict_courses_data[i].batch_id,
                }
          ];
        }

        });

        
        
    }
   
 

}
