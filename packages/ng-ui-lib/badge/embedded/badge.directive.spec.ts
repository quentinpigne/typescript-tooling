import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgeDirective } from './badge.directive';

describe('BadgeDirective', () => {
  let directive: BadgeDirective;
  let fixture: ComponentFixture<BadgeDirective>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BadgeDirective],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BadgeDirective);
    directive = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
