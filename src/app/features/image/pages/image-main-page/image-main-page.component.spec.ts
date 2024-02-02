import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageMainPageComponent } from './image-main-page.component';

describe('ImageMainPageComponent', () => {
  let component: ImageMainPageComponent;
  let fixture: ComponentFixture<ImageMainPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageMainPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImageMainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
