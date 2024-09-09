import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionExecutionComponent } from './reception-execution.component';

describe('ReceptionExecutionComponent', () => {
  let component: ReceptionExecutionComponent;
  let fixture: ComponentFixture<ReceptionExecutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceptionExecutionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceptionExecutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
