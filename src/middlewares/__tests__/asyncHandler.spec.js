import asyncHandler from '../asyncHandler';

describe('asyncHandler', () => {
  test('the callback should be called', async () => {
    const cb = jest.fn().mockImplementation(() => Promise.resolve());
    const response = await asyncHandler(cb);
    await response();

    expect(cb).toBeCalled();
  });
});
