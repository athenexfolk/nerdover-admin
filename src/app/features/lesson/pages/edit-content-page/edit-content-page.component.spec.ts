import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditContentPageComponent } from './edit-content-page.component';

describe('EditContentPageComponent', () => {
  let component: EditContentPageComponent;
  let fixture: ComponentFixture<EditContentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditContentPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditContentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
