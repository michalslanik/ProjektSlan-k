import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { AboutAuthorPage } from './about-author.page';

describe('AboutAuthorPage', () => {
  let component: AboutAuthorPage;
  let fixture: ComponentFixture<AboutAuthorPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AboutAuthorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
