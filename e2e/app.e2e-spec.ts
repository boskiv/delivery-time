import { DeliveryPage } from './app.po';

describe('delivery App', function() {
  let page: DeliveryPage;

  beforeEach(() => {
    page = new DeliveryPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
