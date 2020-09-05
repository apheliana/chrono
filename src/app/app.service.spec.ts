import { HttpClientModule } from '@angular/common/http';
import { async, inject, TestBed } from '@angular/core/testing';
import { AppService } from './app.service';
import { ChronoList } from './models/chrono-list';
import { ChronoUser } from './models/chrono-user';

describe('AppService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [AppService],
    });
  }));

  // Sanity
  it('should create', inject([AppService], (service: AppService) => {
    expect(service).toBeDefined();
  }));

  it('should create a list with valid arguments', inject([AppService], (service: AppService) => {
    const user = new ChronoUser(0, 'username', 'email');
    service.createList(user, 'name').subscribe((list) => {
      expect(user.userLists.length).toEqual(1);
      expect(user.userLists[0]).toBe(list);
      expect(list.userId).toEqual(0);
      expect(list.name).toEqual('name');
      expect(list.description).toEqual(null);
    });
  }));

  it('should create an entry with valid arguments', inject([AppService], (service: AppService) => {
    const list = new ChronoList(0, 0, 'name', 'description');
    const entryDate = new Date();
    service.createEntry(list, 'entryTitle', entryDate).subscribe((entry) => {
      expect(list.listItems.length).toEqual(1);
      expect(list.listItems[0]).toBe(entry);
      expect(entry.listId).toEqual(0);
      expect(entry.entryTitle).toEqual('entryTitle');
      expect(entry.entryDate).toEqual(entryDate);
    });
  }));

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
