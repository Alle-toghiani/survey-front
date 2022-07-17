import { TestBed } from '@angular/core/testing';

import { ResponseConfigInterceptor } from './response-config.interceptor';

describe('ResponseConfigInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ResponseConfigInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ResponseConfigInterceptor = TestBed.inject(ResponseConfigInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
