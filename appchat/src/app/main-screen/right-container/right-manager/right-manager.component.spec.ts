import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightManagerComponent } from './right-manager.component';

describe('RightManagerComponent', () => {
  let component: RightManagerComponent;
  let fixture: ComponentFixture<RightManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RightManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RightManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
