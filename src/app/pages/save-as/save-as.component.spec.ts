import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveASComponent } from './save-as.component';

describe('SaveASComponent', () => {
  let component: SaveASComponent;
  let fixture: ComponentFixture<SaveASComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveASComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveASComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
