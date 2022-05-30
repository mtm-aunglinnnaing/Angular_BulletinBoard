import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncorrectDialogComponent } from './incorrect-dialog.component';

describe('IncorrectDialogComponent', () => {
  let component: IncorrectDialogComponent;
  let fixture: ComponentFixture<IncorrectDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncorrectDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncorrectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
