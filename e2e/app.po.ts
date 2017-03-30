import { browser, element, by } from 'protractor';

export class D3Connect2NodesPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
