import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountfloorsComponent } from './countfloors.component';

describe('CountfloorsComponent', () => {
  let component: CountfloorsComponent;
  let fixture: ComponentFixture<CountfloorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountfloorsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountfloorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
