import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCamionesComponent } from './admin-camiones.component';

describe('AdminCamionesComponent', () => {
  let component: AdminCamionesComponent;
  let fixture: ComponentFixture<AdminCamionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCamionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCamionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
