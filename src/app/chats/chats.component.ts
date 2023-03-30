import { Component, OnInit } from '@angular/core';
import { StreamService } from '../services/stream/stream.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css'],
})
export class ChatsComponent implements OnInit {
  chatReady = this.streamService.isStreamReady();

  constructor(private streamService: StreamService) {}

  ngOnInit() {}
}
