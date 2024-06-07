import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TooltipDirective } from './tooltip.directive';

describe('TooltipDirective', () => {
  let directive: TooltipDirective;
  let fixture: ComponentFixture<TooltipDirective>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TooltipDirective],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TooltipDirective);
    directive = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
