import { Component } from '@angular/core';
import { TimerComponent } from "../../components/timer/timer.component";
@Component({
  selector: 'app-dashboard',
  imports: [TimerComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
