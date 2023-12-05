import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEncomiendasComponent } from './admin-encomiendas.component';

describe('AdminEncomiendasComponent', () => {
  let component: AdminEncomiendasComponent;
  let fixture: ComponentFixture<AdminEncomiendasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEncomiendasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEncomiendasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
