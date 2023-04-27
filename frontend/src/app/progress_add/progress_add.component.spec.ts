import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressAddComponent } from './progress_add.component';

describe('ProgressAddComponent', () => {
  let component: ProgressAddComponent;
  let fixture: ComponentFixture<ProgressAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProgressAddComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProgressAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
