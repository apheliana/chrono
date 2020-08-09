import { AppService } from './app.service';
import { ChronoList } from './models/chrono-list';
import { ChronoUser } from './models/chrono-user';

describe('AppService', () => {
  let service: AppService;

  beforeEach(() => {
    service = new AppService();
    const user = new ChronoUser(0, '', '');
    service.users.push(user);
  });

  // Sanity
  it('should create', () => {
    expect(service).toBeDefined();
  });

  it('should create a list with valid arguments', () => {
    const user = service.users[0];
    service.createList(user, 'name').subscribe((list) => {
      expect(user.userLists.length).toEqual(1);
      expect(user.userLists[0]).toBe(list);
      expect(list.userId).toEqual(0);
      expect(list.name).toEqual('name');
      expect(list.description).toEqual(null);
    });
  });

  it('should create an entry with valid arguments', () => {
    const list = new ChronoList(0, 0, 'name', 'description');
    const entryDate = new Date();
    service.createEntry(list, 'entryTitle', entryDate).subscribe((entry) => {
      expect(list.listItems.length).toEqual(1);
      expect(list.listItems[0]).toBe(entry);
      expect(entry.listId).toEqual(0);
      expect(entry.entryTitle).toEqual('entryTitle');
      expect(entry.entryDate).toEqual(entryDate);
    });
  });

  // TODO Replace these tests with "getByUserName"?
  // describe('getListById tests', () => {
  //   it('should return the right list', () => {
  //     service.createList(0, 'name', 'desc').subscribe((list) => {
  //       expect(service.getListById(0, list.id)).toEqual(list);
  //     });
  //   });

  //   it('should fail if list-id can not be found', () => {
  //     service.createList(0, 'name', 'desc').subscribe(() => {
  //       expect(() => service.getListById(0, 1)).toThrowError(`No list found by listId: 1`);
  //     });
  //   });
  // });
});
