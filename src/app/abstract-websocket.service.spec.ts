import { TestBed } from '@angular/core/testing';

import { AbstractWebsocketService } from './abstract-websocket.service';

describe('AbstractWebsocketService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AbstractWebsocketService = TestBed.get(AbstractWebsocketService);
    expect(service).toBeTruthy();
  });
});
