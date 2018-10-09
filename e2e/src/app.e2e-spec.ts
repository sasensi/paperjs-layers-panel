import { AppPage } from './app.po';
import { browser } from '../../node_modules/protractor';

browser.waitForAngularEnabled(false);

describe('workspace-project App', () =>
{
    let page: AppPage;

    beforeEach(() =>
    {
        page = new AppPage();
    });

    it('should display title', () =>
    {
        page.navigateTo();
        expect(page.getTitle()).toEqual('Paper.js layers panel');
    });
});
