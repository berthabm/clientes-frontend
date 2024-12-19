import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ClientService } from './client.service';
import { Client } from '../model/client';
import { Page } from '../model/page';

describe('ClientService', () => {
  let service: ClientService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ClientService],
    });

    service = TestBed.inject(ClientService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get clients for Linq', () => {
    const mockClients: Client[] = [
      { id: 1, name: 'John', phone: '12345', country: 'USA' },
      { id: 2, name: 'Jane', phone: '67890', country: 'Canada' },
    ];

    const page: Page = { PageNumber: 1, PageSize: 10 };

    service.getClientsLinq(page).subscribe((clients) => {
      expect(clients.length).toBe(2);
      expect(clients).toEqual(mockClients);
    });

    const req = httpMock.expectOne(
      `http://localhost:5191/api/Client/client-linq?pageNumber=1&pageSize=10`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockClients); 
  });

  it('should get clients for SP', () => {
    const mockClients: Client[] = [
      { id: 1, name: 'Alice', phone: '54321', country: 'UK' },
      { id: 2, name: 'Bob', phone: '98765', country: 'Australia' },
    ];

    const page: Page = { PageNumber: 1, PageSize: 10 };

    service.getClientsSP(page).subscribe((clients) => {
      expect(clients.length).toBe(2);
      expect(clients).toEqual(mockClients);
    });

    const req = httpMock.expectOne(
      `http://localhost:5191/api/Client/client-sp?pageNumber=1&pageSize=10`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockClients); 
  });
});
