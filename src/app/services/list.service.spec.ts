import { ListService } from './list.service';

describe('ListService', () => {
  let service: ListService;

  beforeEach(() => {
    service = new ListService();
    service.lists = [];
  });

  // Sanity
  it('should create', () => {
    expect(service).toBeDefined();
    expect(service.lists.length).toEqual(0);
  });

  describe('createList tests', () => {
    // name parameter
    it('should create a list with a valid name', () => {
      service.createList('list name');

      expect(service.lists.length).toEqual(1);

      const list = service.lists[0];
      expect(list.name).toEqual('list name');
    });

    it('should fail if name is empty string, empty space or null', () => {
      expect(() => service.createList('')).toThrowError('Invalid argument');
      expect(() => service.createList(' ')).toThrowError('Invalid argument');
      expect(() => service.createList(null)).toThrowError('Invalid argument');
      expect(service.lists.length).toEqual(0);
    });

    it('should trim name', () => {
      service.createList(' name ');

      const list = service.lists[0];
      expect(list.name).toEqual('name');
    });

    // description parameter
    it('should create a list even if description is null', () => {
      service.createList('name');

      expect(service.lists.length).toEqual(1);
      const list = service.lists[0];
      expect(list.description).toEqual(null);
    });

    it('should make description null if it is empty string', () => {
      service.createList('name', '');

      const list = service.lists[0];
      expect(list.description).toEqual(null);
    });

    it('should make description null if it is empty space', () => {
      service.createList('name', ' ');

      const list = service.lists[0];
      expect(list.description).toEqual(null);
    });

    it('should trim description', () => {
      service.createList('name', ' desc ');

      const list = service.lists[0];
      expect(list.description).toEqual('desc');
    });
  });

  describe('createEntry tests', () => {
    // TODO
  });

  describe('getListById tests', () => {
    // TODO
  });
});
