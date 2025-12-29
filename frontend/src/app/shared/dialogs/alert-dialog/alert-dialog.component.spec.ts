import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlertDialogComponent } from './alert-dialog.component';
import { AlertDialogData } from '../../../services/dialog.service';

describe('AlertDialogComponent', () => {
  let component: AlertDialogComponent;
  let fixture: ComponentFixture<AlertDialogComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<AlertDialogComponent>>;

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      declarations: [AlertDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            title: 'Test Title',
            message: 'Test Message',
            type: 'info'
          } as AlertDialogData
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AlertDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close dialog when onClose is called', () => {
    component.onClose();
    expect(mockDialogRef.close).toHaveBeenCalledWith(true);
  });

  it('should return correct icon for success type', () => {
    component.data.type = 'success';
    expect(component.getIcon()).toBe('check_circle');
  });

  it('should return correct icon for error type', () => {
    component.data.type = 'error';
    expect(component.getIcon()).toBe('error');
  });

  it('should return correct icon for warning type', () => {
    component.data.type = 'warning';
    expect(component.getIcon()).toBe('warning');
  });

  it('should return correct icon for info type', () => {
    component.data.type = 'info';
    expect(component.getIcon()).toBe('info');
  });
});

