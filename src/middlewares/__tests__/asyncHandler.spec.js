import asyncHandler from '../asyncHandler';

describe('asyncHandler', () => {
  test('should be called', async () => {
    const cb = jest.fn().mockImplementation(() => Promise.resolve());
    await asyncHandler(cb);

    expect(cb).toBeCalled();
  });
});
