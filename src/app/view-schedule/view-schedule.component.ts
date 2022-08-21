import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-view-schedule',
  templateUrl: './view-schedule.component.html',
  styleUrls: ['./view-schedule.component.css']
})
export class ViewScheduleComponent implements OnInit {


  events: any = [];
  

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    events: this.events
  };

 
  
  constructor(private _auth: AuthService) { }

  trainerData: any = { name: '', courses: '', ict_courses_data:[]};
  trainerEmail: string | null = localStorage.getItem('trainer_email');
  

  ngOnInit(): void {

    

    /* ------ Get trainer details from db */
    this._auth.trainerProfile(this.trainerEmail)
      .subscribe((data) => {
        // console.log(data);
        this.trainerData = data;
      })
    
    this.events = [
      {
        title: this.trainerData.ict_courses_data.batch_id,
        startdate: this.trainerData.ict_courses_data.start_date,
        enddate: this.trainerData.ict_courses_data.end_date
      }

    ]
  
  }

}
