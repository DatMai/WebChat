import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightTypingComponent } from './right-typing.component';

describe('RightTypingComponent', () => {
  let component: RightTypingComponent;
  let fixture: ComponentFixture<RightTypingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RightTypingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RightTypingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
