import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlEncComponent } from './control-enc.component';

describe('ControlEncComponent', () => {
  let component: ControlEncComponent;
  let fixture: ComponentFixture<ControlEncComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ControlEncComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ControlEncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
