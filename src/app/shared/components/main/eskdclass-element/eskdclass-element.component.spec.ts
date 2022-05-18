import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ESKDClassElementComponent } from './eskdclass-element.component';

describe('ESKDClassElementComponent', () => {
  let component: ESKDClassElementComponent;
  let fixture: ComponentFixture<ESKDClassElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ESKDClassElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ESKDClassElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
