import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { JobBoardComponent } from './job-board/job-board.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'lifeline';
}
