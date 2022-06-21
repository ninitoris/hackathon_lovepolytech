import { TestBed } from '@angular/core/testing';

import { HeaderLoginService } from './header-login.service';

describe('HeaderLoginService', () => {
  let service: HeaderLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeaderLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
