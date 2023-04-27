import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoerListComponent } from './doer_list.component';

describe('DoerListComponent', () => {
  let component: DoerListComponent;
  let fixture: ComponentFixture<DoerListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DoerListComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DoerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
