import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoerAddComponent } from './doer_add.component';

describe('DoerAddComponent', () => {
  let component: DoerAddComponent;
  let fixture: ComponentFixture<DoerAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DoerAddComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DoerAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
