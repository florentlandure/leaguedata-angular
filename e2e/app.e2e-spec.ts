import { LeagueDataPage } from './app.po';

describe('league-data App', () => {
  let page: LeagueDataPage;

  beforeEach(() => {
    page = new LeagueDataPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
