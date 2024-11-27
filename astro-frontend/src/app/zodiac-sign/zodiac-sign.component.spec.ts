import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZodiacSignComponent } from './zodiac-sign.component';

describe('ZodiacSignComponent', () => {
  let component: ZodiacSignComponent;
  let fixture: ComponentFixture<ZodiacSignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZodiacSignComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ZodiacSignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
