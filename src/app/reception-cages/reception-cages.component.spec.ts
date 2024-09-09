import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceptionCagesComponent } from './reception-cages.component';

describe('ReceptionCagesComponent', () => {
  let component: ReceptionCagesComponent;
  let fixture: ComponentFixture<ReceptionCagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceptionCagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceptionCagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
