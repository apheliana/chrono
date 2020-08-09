import { ChronoList } from './chrono-list';

describe('ChronoList', () => {
  it('should fail if id is null or undefined', () => {
    expect(() => new ChronoList(null, 0, 'name')).toThrowError('Invalid argument');
    expect(() => new ChronoList(undefined, 0, 'name')).toThrowError('Invalid argument');
  });

  it('should fail if name is empty string, empty space, null or undefined', () => {
    expect(() => new ChronoList(0, 0, '')).toThrowError('Invalid argument');
    expect(() => new ChronoList(0, 0, ' ')).toThrowError('Invalid argument');
    expect(() => new ChronoList(0, 0, null)).toThrowError('Invalid argument');
    expect(() => new ChronoList(0, 0, undefined)).toThrowError('Invalid argument');
  });

  it('should create a list with a valid constructor', () => {
    const list = new ChronoList(0, 0, 'name');

    expect(list.id).toEqual(0);
    expect(list.name).toEqual('name');
    expect(list.description).toEqual(null);
  });

  it('should trim name', () => {
    const list = new ChronoList(0, 0, ' name ');

    expect(list.name).toEqual('name');
  });

  it('should make description null if it is empty string', () => {
    const list = new ChronoList(0, 0, 'name', '');

    expect(list.description).toEqual(null);
  });

  it('should make description null if it is empty space', () => {
    const list = new ChronoList(0, 0, 'name', ' ');

    expect(list.description).toEqual(null);
  });

  it('should trim description', () => {
    const list = new ChronoList(0, 0, 'name', ' desc ');

    expect(list.description).toEqual('desc');
  });
});
