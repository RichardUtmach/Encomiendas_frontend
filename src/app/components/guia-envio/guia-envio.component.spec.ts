import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuiaEnvioComponent } from './guia-envio.component';

describe('GuiaEnvioComponent', () => {
  let component: GuiaEnvioComponent;
  let fixture: ComponentFixture<GuiaEnvioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuiaEnvioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuiaEnvioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
