import { D3Connect2NodesPage } from './app.po';

describe('d3-connect2-nodes App', () => {
  let page: D3Connect2NodesPage;

  beforeEach(() => {
    page = new D3Connect2NodesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
