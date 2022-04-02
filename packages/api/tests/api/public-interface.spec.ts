import * as bullBoard from '@ay-bull-board/api';

describe('lib public interface', () => {
  it('should save the interface', () => {
    expect(bullBoard).toMatchInlineSnapshot(`
      Object {
        "createBullBoard": [Function],
      }
    `);
  });
});
