'use strict';

import GoResultsHighlighter from '../src/lib/highlighter';
import { DEFAULT_SETTINGS } from '../src/lib/settings';

const EXAMPLE_TOURNAMENT =
    `<table>
        <tbody>
            <tr><td colspan="11">Example Tournament - After Round 3</td></tr>
            <tr><td>Place</td><td>Name</td><td>Club</td><td>Level</td><td>Score</td><td>1</td><td>2</td><td>3</td><td>Points</td><td>SOS</td><td>SOSOS</td></tr>
            <tr><td>1</td><td>Player 8</td><td>AAA</td><td>2 Kyu</td><td>28</td><td>6+</td><td>5+</td><td>2+</td><td>3</td><td>79</td><td>241</td></tr>
            <tr><td>2</td><td>Player 4</td><td>BBB</td><td>4 Kyu</td><td>27</td><td>8+</td><td>3+</td><td>1-</td><td>2</td><td>80</td><td>238</td></tr>
            <tr><td>3</td><td>Player 6</td><td>BBB</td><td>3 Kyu</td><td>27</td><td>4+</td><td>2-</td><td>7+</td><td>2</td><td>80</td><td>237</td></tr>
            <tr><td>4</td><td>Player 2</td><td>CCC</td><td>3 Kyu</td><td>27</td><td>3-</td><td>6+</td><td>5+</td><td>2</td><td>79</td><td>241</td></tr>
            <tr><td>5</td><td>Player 3</td><td>CCC</td><td>5 Kyu</td><td>26</td><td>7+</td><td>1-</td><td>4-</td><td>1</td><td>81</td><td>236</td></tr>
            <tr><td>6</td><td>Player 7</td><td>AAA</td><td>5 Kyu</td><td>26</td><td>1-</td><td>4-</td><td>8+</td><td>1</td><td>80</td><td>237</td></tr>
            <tr><td>7</td><td>Player 1</td><td>AAA</td><td>6 Kyu</td><td>26</td><td>5-</td><td>8+</td><td>3-</td><td>1</td><td>78</td><td>240</td></tr>
            <tr><td>8</td><td>Player 5</td><td>BBB</td><td>8 Kyu</td><td>25</td><td>2-</td><td>7-</td><td>6-</td><td>0</td><td>79</td><td>238</td></tr>
        </tbody>
    </table>`;

const EXAMPLE_TOURNAMENT_WITH_SETTINGS =
    `<table data-go-starting-row="2" data-go-hovering="false" data-go-place-col="1" data-go-rounds-cols="6,8">
        <tbody>
            <tr><td colspan="12">Example Tournament - After Round 3</td></tr>
            <tr><td>St. pos</td><td>Place</td><td>Name</td><td>Club</td><td>Level</td><td>Score</td><td>1</td><td>2</td><td>3</td><td>Points</td><td>SOS</td><td>SOSOS</td></tr>
            <tr><td>1</td><td>1</td><td>Player 8</td><td>AAA</td><td>2 Kyu</td><td>28</td><td>6+</td><td>5+</td><td>2+</td><td>3</td><td>79</td><td>241</td></tr>
            <tr><td>2</td><td>2</td><td>Player 4</td><td>BBB</td><td>4 Kyu</td><td>27</td><td>8+</td><td>3+</td><td>1-</td><td>2</td><td>80</td><td>238</td></tr>
            <tr><td>3</td><td>3</td><td>Player 6</td><td>BBB</td><td>3 Kyu</td><td>27</td><td>4+</td><td>2-</td><td>7+</td><td>2</td><td>80</td><td>237</td></tr>
            <tr><td>4</td><td>4</td><td>Player 2</td><td>CCC</td><td>3 Kyu</td><td>27</td><td>3-</td><td>6+</td><td>5+</td><td>2</td><td>79</td><td>241</td></tr>
            <tr><td>5</td><td>5</td><td>Player 3</td><td>CCC</td><td>5 Kyu</td><td>26</td><td>7+</td><td>1-</td><td>4-</td><td>1</td><td>81</td><td>236</td></tr>
            <tr><td>6</td><td>6</td><td>Player 7</td><td>AAA</td><td>5 Kyu</td><td>26</td><td>1-</td><td>4-</td><td>8+</td><td>1</td><td>80</td><td>237</td></tr>
            <tr><td>7</td><td>7</td><td>Player 1</td><td>AAA</td><td>6 Kyu</td><td>26</td><td>5-</td><td>8+</td><td>3-</td><td>1</td><td>78</td><td>240</td></tr>
            <tr><td>8</td><td>8</td><td>Player 5</td><td>BBB</td><td>8 Kyu</td><td>25</td><td>2-</td><td>7-</td><td>6-</td><td>0</td><td>79</td><td>238</td></tr>
        </tbody>
    </table>`;

const EXAMPLE_TOURNAMENT_WITH_ADDITIONAL_IDS_AND_CLASSES =
    `<table>
        <tbody>
            <tr id="row1"><td colspan="11">Example Tournament - After Round 3</td></tr>
            <tr id="row2"><td>Place</td><td>Name</td><td>Club</td><td>Level</td><td>Score</td><td>1</td><td>2</td><td>3</td><td>Points</td><td>SOS</td><td>SOSOS</td></tr>
            <tr id="row3"><td>1</td><td>Player 8</td><td>AAA</td><td>2 Kyu</td><td>28</td><td class="game1">6+</td><td class="game2">5+</td><td class="game3">2+</td><td>3</td><td>79</td><td>241</td></tr>
            <tr id="row4"><td>2</td><td>Player 4</td><td>BBB</td><td>4 Kyu</td><td>27</td><td class="game1">8+</td><td class="game2">3+</td><td class="game3">1-</td><td>2</td><td>80</td><td>238</td></tr>
            <tr id="row5"><td>3</td><td>Player 6</td><td>BBB</td><td>3 Kyu</td><td>27</td><td class="game1">4+</td><td class="game2">2-</td><td class="game3">7+</td><td>2</td><td>80</td><td>237</td></tr>
            <tr id="row6"><td>4</td><td>Player 2</td><td>CCC</td><td>3 Kyu</td><td>27</td><td class="game1">3-</td><td class="game2">6+</td><td class="game3">5+</td><td>2</td><td>79</td><td>241</td></tr>
            <tr id="row7"><td>5</td><td>Player 3</td><td>CCC</td><td>5 Kyu</td><td>26</td><td class="game1">7+</td><td class="game2">1-</td><td class="game3">4-</td><td>1</td><td>81</td><td>236</td></tr>
            <tr id="row8"><td>6</td><td>Player 7</td><td>AAA</td><td>5 Kyu</td><td>26</td><td class="game1">1-</td><td class="game2">4-</td><td class="game3">8+</td><td>1</td><td>80</td><td>237</td></tr>
            <tr id="row9"><td>7</td><td>Player 1</td><td>AAA</td><td>6 Kyu</td><td>26</td><td class="game1">5-</td><td class="game2">8+</td><td class="game3">3-</td><td>1</td><td>78</td><td>240</td></tr>
            <tr id="row10"><td>8</td><td>Player 5</td><td>BBB</td><td>8 Kyu</td><td>25</td><td class="game1">2-</td><td class="game2">7-</td><td class="game3">6-</td><td>0</td><td>79</td><td>238</td></tr>
        </tbody>
    </table>`;

describe('GoResultsHighlighter', () => {
    let placeholder;

    beforeAll(() => placeholder = document.createElement('div'));

    function createDom(dom) {
        placeholder.innerHTML = dom;
        return placeholder.firstChild;
    }

    describe('should be able to', () => {

        it('bind to table element with default settings', () => {
            let table = createDom('<table></table>');
            let highlighter = new GoResultsHighlighter(table);

            expect(highlighter.element).toBe(table);
            expect(table.goResultsHighlighter).toBe(highlighter);
            expect(table.className).toBe('go-results-table');
            expect(highlighter.settings).toEqual(DEFAULT_SETTINGS);
        });

        it('bind to pre element with replacing it with table', () => {
            let pre = createDom('<pre></pre>');
            let highlighter = new GoResultsHighlighter(pre);

            expect(highlighter.element).not.toBe(pre);
            expect(pre.goResultsHighlighter).not.toBeDefined();
            expect(pre.className).not.toBe('go-results-table');
            expect(placeholder.firstChild).not.toBe(pre);
            expect(placeholder.firstChild).toBe(highlighter.element);
        });

        it('handle clean results', () => {
            let table = createDom(EXAMPLE_TOURNAMENT);
            let highlighter = new GoResultsHighlighter(table);

            expect(highlighter.players.length).toBe(8);
            expect(highlighter.map[1].opponents).toEqual([2, 5, 6]);
            expect(highlighter.map[8].opponents).toEqual([2, 6, 7]);
        });

        it('handle clean results with settings', () => {
            let table = createDom(EXAMPLE_TOURNAMENT);
            let highlighter = new GoResultsHighlighter(table, {
                roundsColumns: '5,7'
            });

            expect(highlighter.players.length).toBe(8);
            expect(highlighter.map[1].opponents).toEqual([2, 6]);
            expect(highlighter.map[8].opponents).toEqual([2, 6]);
        });

        it('read settings from DOM', () => {
            let table = createDom(EXAMPLE_TOURNAMENT_WITH_SETTINGS);
            let highlighter = new GoResultsHighlighter(table);

            expect(highlighter.settings.hovering).toBe(false);
            expect(highlighter.settings.roundsColumns).toBe('6,8');
            expect(highlighter.settings.startingRow).toBe(2);
            expect(highlighter.settings.placeColumn).toBe(1);
            expect(highlighter.players.length).toBe(8);
            expect(highlighter.map[1].opponents).toEqual([2, 6]);
            expect(highlighter.map[8].opponents).toEqual([2, 6]);
        });

        it('override DOM settings', () => {
            let table = createDom(EXAMPLE_TOURNAMENT_WITH_SETTINGS);
            let highlighter = new GoResultsHighlighter(table, {
                startingRow: 0,
                roundsColumns: null,
                hovering: true
            });

            expect(highlighter.settings.hovering).toBe(true);
            expect(highlighter.settings.roundsColumns).toBe(null);
            expect(highlighter.settings.startingRow).toBe(0);
            expect(highlighter.settings.placeColumn).toBe(1);
            expect(highlighter.map[1].opponents).toEqual([2, 5, 6]);
            expect(highlighter.map[8].opponents).toEqual([2, 6, 7]);
        });

    });

    describe('should provide API able to', () => {
        let highlighter;
        let table;

        beforeEach(() => {
            table = createDom(EXAMPLE_TOURNAMENT);
            highlighter = new GoResultsHighlighter(table);
        });

        it('ensure no player is selected on start', () => {
            expect(table.querySelectorAll('.go-results-current').length).toBe(0);
            expect(table.querySelectorAll('.go-results-won').length).toBe(0);
            expect(table.querySelectorAll('.go-results-lost').length).toBe(0);
            expect(table.querySelectorAll('.go-results-game').length).toBe(0);
        });

        it('select player', () => {
            highlighter.selectPlayer(3);

            expect(table.querySelectorAll('.go-results-current').length).toBe(1);
            expect(table.querySelectorAll('.go-results-won').length).toBe(2);
            expect(table.querySelectorAll('.go-results-lost').length).toBe(1);

            expect(highlighter.map[3].row.classList.contains('go-results-current')).toBeTruthy();
            expect(highlighter.map[4].row.classList.contains('go-results-won')).toBeTruthy();
            expect(highlighter.map[7].row.classList.contains('go-results-won')).toBeTruthy();
            expect(highlighter.map[2].row.classList.contains('go-results-lost')).toBeTruthy();
        });

        it('deselect player', () => {
            highlighter.selectPlayer(3);
            highlighter.selectPlayer(-1);

            expect(table.querySelectorAll('.go-results-current').length).toBe(0);
            expect(table.querySelectorAll('.go-results-won').length).toBe(0);
            expect(table.querySelectorAll('.go-results-lost').length).toBe(0);
        });

        it('change selected player', () => {
            highlighter.selectPlayer(3);
            highlighter.selectPlayer(2);
            highlighter.selectPlayer(7);

            expect(table.querySelectorAll('.go-results-current').length).toBe(1);
            expect(table.querySelectorAll('.go-results-won').length).toBe(1);
            expect(table.querySelectorAll('.go-results-lost').length).toBe(2);

            expect(highlighter.map[7].row.classList.contains('go-results-current')).toBeTruthy();
            expect(highlighter.map[5].row.classList.contains('go-results-lost')).toBeTruthy();
            expect(highlighter.map[8].row.classList.contains('go-results-won')).toBeTruthy();
            expect(highlighter.map[3].row.classList.contains('go-results-lost')).toBeTruthy();
        });

        it('deselect player after many changes', () => {
            highlighter.selectPlayer(3);
            highlighter.selectPlayer(2);
            highlighter.selectPlayer(7);
            highlighter.selectPlayer(-1);

            expect(table.querySelectorAll('.go-results-current').length).toBe(0);
            expect(table.querySelectorAll('.go-results-won').length).toBe(0);
            expect(table.querySelectorAll('.go-results-lost').length).toBe(0);
        });

        it('select player and mark game with opponent', () => {
            highlighter.selectPlayer(3, 2);

            expect(table.querySelectorAll('.go-results-game').length).toBe(2);
        });

        it('deselect player with marked game', () => {
            highlighter.selectPlayer(3, 7);
            highlighter.selectPlayer(-1);

            expect(table.querySelectorAll('.go-results-game').length).toBe(0);
        });

        it('ensure all players are in proper order on start', () => {
            expect(highlighter.map[1].row.nextElementSibling).toBe(highlighter.map[2].row);
            expect(highlighter.map[2].row.nextElementSibling).toBe(highlighter.map[3].row);
            expect(highlighter.map[3].row.nextElementSibling).toBe(highlighter.map[4].row);
            expect(highlighter.map[4].row.nextElementSibling).toBe(highlighter.map[5].row);
            expect(highlighter.map[5].row.nextElementSibling).toBe(highlighter.map[6].row);
            expect(highlighter.map[6].row.nextElementSibling).toBe(highlighter.map[7].row);
            expect(highlighter.map[7].row.nextElementSibling).toBe(highlighter.map[8].row);
        });

        it('show player details', () => {
            highlighter.showDetails(3);

            expect(table.classList.contains('go-results-showing-details')).toBeTruthy();
            expect(table.querySelectorAll('.go-results-current').length).toBe(1);
            expect(table.querySelectorAll('.go-results-won').length).toBe(2);
            expect(table.querySelectorAll('.go-results-lost').length).toBe(1);
            expect(table.querySelectorAll('.go-results-game').length).toBe(3);

            expect(highlighter.map[3].row.classList.contains('go-results-current')).toBeTruthy();
            expect(highlighter.map[4].row.classList.contains('go-results-won')).toBeTruthy();
            expect(highlighter.map[7].row.classList.contains('go-results-won')).toBeTruthy();
            expect(highlighter.map[2].row.classList.contains('go-results-lost')).toBeTruthy();

            expect(highlighter.map[1].row.nextElementSibling).toBe(highlighter.map[2].row);
            expect(highlighter.map[2].row.nextElementSibling).toBe(highlighter.map[3].row);
            expect(highlighter.map[3].row.nextElementSibling).toBe(highlighter.map[4].row);
            expect(highlighter.map[4].row.nextElementSibling).toBe(highlighter.map[7].row);
            expect(highlighter.map[7].row.nextElementSibling).toBe(highlighter.map[5].row);
        });

        it('hide player details', () => {
            highlighter.showDetails(3);
            highlighter.showDetails(-1);

            expect(table.classList.contains('go-results-showing-details')).toBeFalsy();
            expect(table.querySelectorAll('.go-results-current').length).toBe(0);
            expect(table.querySelectorAll('.go-results-won').length).toBe(0);
            expect(table.querySelectorAll('.go-results-lost').length).toBe(0);
            expect(table.querySelectorAll('.go-results-game').length).toBe(0);
            expect(highlighter.map[1].row.nextElementSibling).toBe(highlighter.map[2].row);
            expect(highlighter.map[2].row.nextElementSibling).toBe(highlighter.map[3].row);
            expect(highlighter.map[3].row.nextElementSibling).toBe(highlighter.map[4].row);
            expect(highlighter.map[4].row.nextElementSibling).toBe(highlighter.map[5].row);
            expect(highlighter.map[5].row.nextElementSibling).toBe(highlighter.map[6].row);
            expect(highlighter.map[6].row.nextElementSibling).toBe(highlighter.map[7].row);
            expect(highlighter.map[7].row.nextElementSibling).toBe(highlighter.map[8].row);
        });

        it('change player details', () => {
            highlighter.showDetails(3);
            highlighter.showDetails(5);
            highlighter.showDetails(6);

            expect(highlighter.map[2].row.nextElementSibling).toBe(highlighter.map[3].row);
            expect(highlighter.map[3].row.nextElementSibling).toBe(highlighter.map[5].row);
            expect(highlighter.map[5].row.nextElementSibling).toBe(highlighter.map[1].row);
            expect(highlighter.map[1].row.nextElementSibling).toBe(highlighter.map[4].row);
            expect(highlighter.map[4].row.nextElementSibling).toBe(highlighter.map[6].row);
            expect(highlighter.map[6].row.nextElementSibling).toBe(highlighter.map[8].row);
            expect(highlighter.map[8].row.nextElementSibling).toBe(highlighter.map[7].row);
        });

        it('hide player details after changes', () => {
            highlighter.showDetails(3);
            highlighter.showDetails(5);
            highlighter.showDetails(6);
            highlighter.showDetails(-1);

            expect(table.classList.contains('go-results-showing-details')).toBeFalsy();
            expect(table.querySelectorAll('.go-results-current').length).toBe(0);
            expect(table.querySelectorAll('.go-results-won').length).toBe(0);
            expect(table.querySelectorAll('.go-results-lost').length).toBe(0);
            expect(table.querySelectorAll('.go-results-game').length).toBe(0);
            expect(highlighter.map[1].row.nextElementSibling).toBe(highlighter.map[2].row);
            expect(highlighter.map[2].row.nextElementSibling).toBe(highlighter.map[3].row);
            expect(highlighter.map[3].row.nextElementSibling).toBe(highlighter.map[4].row);
            expect(highlighter.map[4].row.nextElementSibling).toBe(highlighter.map[5].row);
            expect(highlighter.map[5].row.nextElementSibling).toBe(highlighter.map[6].row);
            expect(highlighter.map[6].row.nextElementSibling).toBe(highlighter.map[7].row);
            expect(highlighter.map[7].row.nextElementSibling).toBe(highlighter.map[8].row);
        });
    });

    describe('should support events', () => {
        let highlighter;
        let table;

        beforeEach(() => {
            table = createDom(EXAMPLE_TOURNAMENT_WITH_ADDITIONAL_IDS_AND_CLASSES);
            highlighter = new GoResultsHighlighter(table);

            spyOn(highlighter, 'selectPlayer').and.callThrough();
            spyOn(highlighter, 'showDetails').and.callThrough();
        });

        it('not mark any player when hovering non-player rows', () => {
            let event = new MouseEvent('mouseover', { bubbles: true });

            table.querySelector('#row2').firstChild.dispatchEvent(event);

            expect(highlighter.selectPlayer).toHaveBeenCalledWith(-1, null);
            expect(table.querySelectorAll('.go-results-current').length).toBe(0);
            expect(table.querySelectorAll('.go-results-won').length).toBe(0);
            expect(table.querySelectorAll('.go-results-lost').length).toBe(0);
            expect(table.querySelectorAll('.go-results-game').length).toBe(0);
        });

        it('mark player and opponents when hovering player rows', () => {
            let event = new MouseEvent('mouseover', { bubbles: true });

            table.querySelector('#row5').dispatchEvent(event);

            expect(highlighter.selectPlayer).toHaveBeenCalledWith(3, null);
            expect(table.querySelectorAll('.go-results-current').length).toBe(1);
            expect(table.querySelectorAll('.go-results-won').length).toBe(2);
            expect(table.querySelectorAll('.go-results-lost').length).toBe(1);
            expect(table.querySelectorAll('.go-results-game').length).toBe(0);
        });

        it('mark player, opponents and opponent\'s game when hovering game result in player row', () => {
            let event = new MouseEvent('mouseover', { bubbles: true });

            table.querySelector('#row5').querySelector('.game3').dispatchEvent(event);

            expect(highlighter.selectPlayer).toHaveBeenCalledWith(3, 7);
            expect(table.querySelectorAll('.go-results-current').length).toBe(1);
            expect(table.querySelectorAll('.go-results-won').length).toBe(2);
            expect(table.querySelectorAll('.go-results-lost').length).toBe(1);
            expect(table.querySelectorAll('.go-results-game').length).toBe(2);
        });

        it('not mark any player when hovering settings is disabled', () => {
            highlighter.settings.hovering = false;

            let event = new MouseEvent('mouseover', { bubbles: true });

            table.querySelector('#row5').querySelector('.game3').dispatchEvent(event);

            expect(highlighter.selectPlayer).not.toHaveBeenCalled();
        });

        it('mark last hovered player', () => {
            table.querySelector('#row3').dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
            table.querySelector('#row7').querySelector('.game1').dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
            table.querySelector('#row5').querySelector('.game3').dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
            table.querySelector('#row6').dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
            table.querySelector('#row8').dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));

            expect(highlighter.selectPlayer.calls.count()).toBe(5);
            expect(table.querySelectorAll('.go-results-current').length).toBe(1);
            expect(table.querySelectorAll('.go-results-won').length).toBe(1);
            expect(table.querySelectorAll('.go-results-lost').length).toBe(2);
            expect(table.querySelectorAll('.go-results-game').length).toBe(0);
        });

        it('unmark all players when hovering non-player rows', () => {
            table.querySelector('#row3').querySelector('.game1').dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
            table.querySelector('#row1').dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));

            expect(highlighter.selectPlayer.calls.count()).toBe(2);
            expect(table.querySelectorAll('.go-results-current').length).toBe(0);
            expect(table.querySelectorAll('.go-results-won').length).toBe(0);
            expect(table.querySelectorAll('.go-results-lost').length).toBe(0);
            expect(table.querySelectorAll('.go-results-game').length).toBe(0);
        });

        it('unmark players when not hovering table', () => {
            table.querySelector('#row5').querySelector('.game3').dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
            table.querySelector('#row5').dispatchEvent(new MouseEvent('mouseout', { bubbles: true, relatedTarget: table.querySelector('#row5') }));
            table.dispatchEvent(new MouseEvent('mouseout', { bubbles: true, relatedTarget: table.parentNode }));

            expect(highlighter.selectPlayer.calls.count()).toBe(2);
            expect(table.querySelectorAll('.go-results-current').length).toBe(0);
            expect(table.querySelectorAll('.go-results-won').length).toBe(0);
            expect(table.querySelectorAll('.go-results-lost').length).toBe(0);
            expect(table.querySelectorAll('.go-results-game').length).toBe(0);
        });

        it('do nothing when clicking non-player rows', () => {
            table.querySelector('#row1').dispatchEvent(new MouseEvent('click', { bubbles: true }));

            expect(highlighter.showDetails).toHaveBeenCalledWith(-1);
            expect(table.querySelectorAll('.go-results-current').length).toBe(0);
            expect(table.querySelectorAll('.go-results-won').length).toBe(0);
            expect(table.querySelectorAll('.go-results-lost').length).toBe(0);
            expect(table.querySelectorAll('.go-results-game').length).toBe(0);
        });

        it('show details when clicking player row', () => {
            table.querySelector('#row5').dispatchEvent(new MouseEvent('click', { bubbles: true }));

            expect(highlighter.showDetails).toHaveBeenCalledWith(3);
            expect(highlighter.showingDetails).toBeTruthy();
            expect(table.querySelectorAll('.go-results-current').length).toBe(1);
            expect(table.querySelectorAll('.go-results-won').length).toBe(2);
            expect(table.querySelectorAll('.go-results-lost').length).toBe(1);
            expect(table.querySelectorAll('.go-results-game').length).toBe(3);
        });

        it('do nothing when clicking is disabled', () => {
            highlighter.settings.clicking = false;

            table.querySelector('#row5').dispatchEvent(new MouseEvent('click', { bubbles: true }));

            expect(highlighter.showDetails).not.toHaveBeenCalled();
            expect(highlighter.showingDetails).toBeFalsy();
            expect(table.querySelectorAll('.go-results-current').length).toBe(0);
            expect(table.querySelectorAll('.go-results-won').length).toBe(0);
            expect(table.querySelectorAll('.go-results-lost').length).toBe(0);
            expect(table.querySelectorAll('.go-results-game').length).toBe(0);
        });

        it('hide details when clicking the same player when showing details', () => {
            table.querySelector('#row5').dispatchEvent(new MouseEvent('click', { bubbles: true }));
            table.querySelector('#row5').dispatchEvent(new MouseEvent('click', { bubbles: true }));

            expect(highlighter.showDetails.calls.count()).toBe(2);
            expect(highlighter.showingDetails).toBeFalsy();
        });

        it('hide details when clicking non-player rows when showing details', () => {
            table.querySelector('#row5').dispatchEvent(new MouseEvent('click', { bubbles: true }));
            table.querySelector('#row1').dispatchEvent(new MouseEvent('click', { bubbles: true }));

            expect(highlighter.showDetails.calls.count()).toBe(2);
            expect(highlighter.showingDetails).toBeFalsy();
        });

        it('disable hovering when showing details', () => {
            table.querySelector('#row5').dispatchEvent(new MouseEvent('click', { bubbles: true }));

            highlighter.selectPlayer.calls.reset();

            table.querySelector('#row3').querySelector('.game3').dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
            table.querySelector('#row7').dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));

            expect(highlighter.showDetails).toHaveBeenCalled();
            expect(highlighter.selectPlayer).not.toHaveBeenCalled();
            expect(highlighter.showingDetails).toBeTruthy();
        });

        it('show details of selected opponent', () => {
            table.querySelector('#row5').dispatchEvent(new MouseEvent('click', { bubbles: true }));
            table.querySelector('#row9').dispatchEvent(new MouseEvent('click', { bubbles: true }));

            expect(highlighter.showDetails.calls.count()).toBe(2);
            expect(highlighter.showingDetails).toBeTruthy();
            expect(table.querySelectorAll('.go-results-won').length).toBe(1);
            expect(table.querySelectorAll('.go-results-lost').length).toBe(2);
        });

        it('mark player selected without hovering when hiding details', () => {
            table.querySelector('#row5').dispatchEvent(new MouseEvent('click', { bubbles: true }));
            table.querySelector('#row10').querySelector('.game1').dispatchEvent(new MouseEvent('click', { bubbles: true }));

            expect(highlighter.showDetails.calls.count()).toBe(2);
            expect(highlighter.showingDetails).toBeFalsy();
            expect(table.querySelectorAll('.go-results-current').length).toBe(1);
            expect(table.querySelectorAll('.go-results-won').length).toBe(0);
            expect(table.querySelectorAll('.go-results-lost').length).toBe(3);
            expect(table.querySelectorAll('.go-results-game').length).toBe(0);
        });

        it('not mark any player when hiding details and hovering setting is disabled', () => {
            highlighter.settings.hovering = false;

            table.querySelector('#row5').dispatchEvent(new MouseEvent('click', { bubbles: true }));
            table.querySelector('#row10').querySelector('.game1').dispatchEvent(new MouseEvent('click', { bubbles: true }));

            expect(highlighter.showDetails.calls.count()).toBe(2);
            expect(highlighter.showingDetails).toBeFalsy();
            expect(table.querySelectorAll('.go-results-current').length).toBe(0);
            expect(table.querySelectorAll('.go-results-won').length).toBe(0);
            expect(table.querySelectorAll('.go-results-lost').length).toBe(0);
            expect(table.querySelectorAll('.go-results-game').length).toBe(0);
        });
    });
});