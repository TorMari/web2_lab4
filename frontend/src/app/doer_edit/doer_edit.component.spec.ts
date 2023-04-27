import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoerEditComponent } from './doer_edit.component';

describe('DoerEditComponent', () => {
  let component: DoerEditComponent;
  let fixture: ComponentFixture<DoerEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DoerEditComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DoerEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
