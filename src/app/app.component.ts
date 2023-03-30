import { Component } from '@angular/core';
import { StreamService } from './services/stream/stream.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';

  constructor(private streamService: StreamService) {}
}
