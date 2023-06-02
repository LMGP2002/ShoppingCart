import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportepedidosComponent } from './reportepedidos.component';

describe('ReportepedidosComponent', () => {
  let component: ReportepedidosComponent;
  let fixture: ComponentFixture<ReportepedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportepedidosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportepedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
