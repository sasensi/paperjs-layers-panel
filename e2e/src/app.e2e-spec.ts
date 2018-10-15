import { AppPage } from './app.po';
import { browser } from '../../node_modules/protractor';

browser.waitForAngularEnabled(false);

describe('Panel', () =>
{
    let page: AppPage;

    beforeEach(() =>
    {
        page = new AppPage();
    });

    it('should display title', () =>
    {
        page.navigateTo();
        expect(page.getTitle()).toEqual('Layers panel');
    });
});
