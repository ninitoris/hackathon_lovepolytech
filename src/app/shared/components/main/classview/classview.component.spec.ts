import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassviewComponent } from './classview.component';

describe('ClassviewComponent', () => {
  let component: ClassviewComponent;
  let fixture: ComponentFixture<ClassviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
