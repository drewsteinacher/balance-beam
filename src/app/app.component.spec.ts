import { AppComponent } from './app.component';

interface TestContext {
  component: AppComponent;
}

describe('AppComponent', () => {
  beforeEach(function (this: TestContext) {
    this.component = new AppComponent();
  });

  it('should create the app', function (this: TestContext) {
    expect(this.component).toBeTruthy();
  });
});
