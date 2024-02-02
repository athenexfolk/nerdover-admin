import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonMainPageComponent } from './lesson-main-page.component';

describe('LessonMainPageComponent', () => {
  let component: LessonMainPageComponent;
  let fixture: ComponentFixture<LessonMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LessonMainPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LessonMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
