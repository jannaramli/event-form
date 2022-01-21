import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCalendarMultipleComponent } from './dialog-calendar-multiple.component';

describe('DialogCalendarMultipleComponent', () => {
  let component: DialogCalendarMultipleComponent;
  let fixture: ComponentFixture<DialogCalendarMultipleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCalendarMultipleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCalendarMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
