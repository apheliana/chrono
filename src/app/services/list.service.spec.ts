import { ChronoList } from '../components/list/chrono-list';
import { ListService } from './list.service';

describe('ListService', () => {
  let service: ListService;

  beforeEach(() => {
    service = new ListService();
  });

  // Sanity
  it('should create', () => {
    expect(service).toBeDefined();
    expect(service.lists.length).toEqual(0);
  });

  it('should create a list with valid arguments', () => {
    service.createList('name').subscribe((list) => {
      expect(service.lists.length).toEqual(1);
      expect(service.lists[0]).toBe(list);
      expect(list.id).toEqual(0);
      expect(list.name).toEqual('name');
      expect(list.description).toEqual(null);
    });
  });

  it('should create an entry with valid arguments', () => {
    const list = new ChronoList(0, 'name', 'description');
    const entryDate = new Date();
    service.createEntry(list, 'entryTitle', entryDate).subscribe((entry) => {
      expect(list.listItems.length).toEqual(1);
      expect(list.listItems[0]).toBe(entry);
      expect(entry.id).toEqual(0);
      expect(entry.listId).toEqual(0);
      expect(entry.entryTitle).toEqual('entryTitle');
      expect(entry.entryDate).toEqual(entryDate);
    });
  });

  describe('getListById tests', () => {
    it('should return the right list', () => {
      service.createList('name', 'desc').subscribe((list) => {
        expect(service.getListById(0)).toEqual(list);
      });
    });

    it('should fail if list-id can not be found', () => {
      service.createList('name', 'desc').subscribe(() => {
        expect(() => service.getListById(1)).toThrowError(`No list found by listId: 1`);
      });
    });
  });
});
