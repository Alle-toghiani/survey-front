import { TestBed } from '@angular/core/testing';

import { ResponseNotificationInterceptor } from './response-notification.interceptor';

describe('ResponseNotificationInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ResponseNotificationInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ResponseNotificationInterceptor = TestBed.inject(ResponseNotificationInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
