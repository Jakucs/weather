import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentweatherComponent } from './currentweather.component';

describe('CurrentweatherComponent', () => {
  let component: CurrentweatherComponent;
  let fixture: ComponentFixture<CurrentweatherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentweatherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentweatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
