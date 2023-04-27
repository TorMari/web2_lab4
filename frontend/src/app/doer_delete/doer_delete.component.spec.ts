import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoerDeleteComponent } from './doer_delete.component';

describe('DoerDeleteComponent', () => {
  let component: DoerDeleteComponent;
  let fixture: ComponentFixture<DoerDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DoerDeleteComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DoerDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
