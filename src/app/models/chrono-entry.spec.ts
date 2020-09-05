import { ChronoEntry } from './chrono-entry';

describe('ChronoEntry', () => {
  it('should fail if id is null or undefined', () => {
    expect(() => new ChronoEntry(null, 0, 'entryTitle', new Date())).toThrowError('Invalid argument');
    expect(() => new ChronoEntry(undefined, 0, 'entryTitle', new Date())).toThrowError('Invalid argument');
  });

  it('should fail if listId is null or undefined', () => {
    expect(() => new ChronoEntry(0, null, 'entryTitle', new Date())).toThrowError('Invalid argument');
    expect(() => new ChronoEntry(0, undefined, 'entryTitle', new Date())).toThrowError('Invalid argument');
  });

  it('should fail if entryTitle is empty string, empty space, null or undefined', () => {
    expect(() => new ChronoEntry(0, 0, null, new Date())).toThrowError('Invalid argument');
    expect(() => new ChronoEntry(0, 0, undefined, new Date())).toThrowError('Invalid argument');
    expect(() => new ChronoEntry(0, 0, '', new Date())).toThrowError('Invalid argument');
    expect(() => new ChronoEntry(0, 0, ' ', new Date())).toThrowError('Invalid argument');
  });

  it('should fail if entryDate is null, undefined or in the future', () => {
    // TODO Enable this after jsonData approach
    // expect(() => new ChronoEntry(0, 0, 'entryTitle', null)).toThrowError('Invalid argument');
    // expect(() => new ChronoEntry(0, 0, 'entryTitle', undefined)).toThrowError('Invalid argument');
    const entryDate = new Date(new Date().setDate(new Date().getDate() + 1));
    expect(() => new ChronoEntry(0, 0, 'entryTitle', entryDate)).toThrowError('Invalid argument');
  });

  it('should create an entry with a valid constructor', () => {
    const entryDate = new Date();
    const list = new ChronoEntry(0, 0, 'entryTitle', entryDate);

    expect(list.id).toEqual(0);
    expect(list.listId).toEqual(0);
    expect(list.entryTitle).toEqual('entryTitle');
    expect(list.entryDate).toEqual(entryDate);
  });

  it('should trim entryTitle', () => {
    const list = new ChronoEntry(0, 0, ' entryTitle ', new Date());

    expect(list.entryTitle).toEqual('entryTitle');
  });
});
