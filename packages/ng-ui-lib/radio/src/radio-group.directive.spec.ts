import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioGroupDirective } from './radio-group.directive';

describe('RadioGroupDirective', () => {
  let component: RadioGroupDirective;
  let fixture: ComponentFixture<RadioGroupDirective>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadioGroupDirective],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioGroupDirective);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
