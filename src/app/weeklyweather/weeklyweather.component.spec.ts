import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyweatherComponent } from './weeklyweather.component';

describe('WeeklyweatherComponent', () => {
  let component: WeeklyweatherComponent;
  let fixture: ComponentFixture<WeeklyweatherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeeklyweatherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeeklyweatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
