import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendGifComponent } from './send-gif.component';

describe('SendGifComponent', () => {
  let component: SendGifComponent;
  let fixture: ComponentFixture<SendGifComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendGifComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendGifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
