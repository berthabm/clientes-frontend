import { Component } from '@angular/core';
import { Page } from './model/page';
import { Client } from './model/client';
import { ClientService } from './services/client.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { PhonePipe } from './pipes/phone.pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PhonePipe, HttpClientModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  clientsLinq: Client[] = [];
  clientsSP: Client[] = [];

  pageLinq: Page = {
    PageNumber: 1,
    PageSize: 10
  };

  pageSP: Page = {
    PageNumber: 1,
    PageSize: 10
  };

  totalClientsLinq: number = 0;
  totalClientsSP: number = 0;

  constructor(private readonly clientService: ClientService) { }

  ngOnInit(): void {
    this.loadClientsLinq();
    this.loadClientsSP();
  }

  loadClientsLinq(): void {
    this.clientService.getClientsLinq(this.pageLinq).subscribe((data) => {
      this.clientsLinq = data;
      this.totalClientsLinq = data[0].totalCount;
    });
  }

  loadClientsSP(): void {
    this.clientService.getClientsSP(this.pageSP).subscribe((data) => {
      this.clientsSP = data;
      this.totalClientsSP = data[0].totalCount;
    });
  }

  onPageChangeLinq(pageNumber: number): void {
    this.pageLinq.PageNumber = pageNumber;
    this.loadClientsLinq();
  }

  onPageChangeSP(pageNumber: number): void {
    this.pageSP.PageNumber = pageNumber;
    this.loadClientsSP(); 
  }
}
