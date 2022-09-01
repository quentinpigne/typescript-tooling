import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableBodyComponent } from './table-body.component';

describe('TableBodyComponent', () => {
  let component: TableBodyComponent<Record<string, unknown>>;
  let fixture: ComponentFixture<TableBodyComponent<Record<string, unknown>>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableBodyComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableBodyComponent<Record<string, unknown>>);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
