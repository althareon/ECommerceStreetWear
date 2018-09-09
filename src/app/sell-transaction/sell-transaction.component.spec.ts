import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellTransactionComponent } from './sell-transaction.component';

describe('SellTransactionComponent', () => {
  let component: SellTransactionComponent;
  let fixture: ComponentFixture<SellTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
