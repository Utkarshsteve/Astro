import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BirthChartComponent } from './birth-chart.component';

describe('BirthChartComponent', () => {
  let component: BirthChartComponent;
  let fixture: ComponentFixture<BirthChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BirthChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BirthChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
