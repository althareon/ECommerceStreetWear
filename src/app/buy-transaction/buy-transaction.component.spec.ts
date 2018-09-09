import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyTransactionComponent } from './buy-transaction.component';

describe('BuyTransactionComponent', () => {
  let component: BuyTransactionComponent;
  let fixture: ComponentFixture<BuyTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
