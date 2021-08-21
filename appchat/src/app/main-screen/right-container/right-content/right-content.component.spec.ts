import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightContentComponent } from './right-content.component';

describe('RightContentComponent', () => {
  let component: RightContentComponent;
  let fixture: ComponentFixture<RightContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RightContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RightContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
