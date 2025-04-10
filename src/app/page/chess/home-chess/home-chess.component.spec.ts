import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeChessComponent } from './home-chess.component';

describe('HomeChessComponent', () => {
  let component: HomeChessComponent;
  let fixture: ComponentFixture<HomeChessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeChessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeChessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
