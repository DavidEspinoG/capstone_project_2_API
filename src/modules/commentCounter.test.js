import commentCounter from './commentCounter.js';

describe('commentCounter', () => {
  test('the result of the counter should be 1', () => {
    document.body.innerHTML = `<ul id="reservations-list">
      <li></li>
    </ul>`;

    const list = document.querySelectorAll('#reservations-list > li');
    expect(commentCounter(list)).toBe(1);
  });

  test('the result of the counter should be 0', () => {
    document.body.innerHTML = `<ul id="reservations-list">
    </ul>`;

    const list = document.querySelectorAll('#reservations-list > li');
    expect(commentCounter(list)).toBe(0);
  });

  test('the result of the counter should be 4', () => {
    document.body.innerHTML = `<ul id="reservations-list">
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>`;

    const list = document.querySelectorAll('#reservations-list > li');
    expect(commentCounter(list)).toBe(4);
  });
});