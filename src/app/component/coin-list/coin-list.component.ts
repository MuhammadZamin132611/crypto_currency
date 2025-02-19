import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MaterialModule } from '../../material.module';
import { Router } from '@angular/router';
import { CurrencyService } from '../../service/currency.service';

@Component({
  selector: 'app-coin-list',
  imports: [UpperCasePipe, CurrencyPipe, MaterialModule],
  templateUrl: './coin-list.component.html',
  styleUrl: './coin-list.component.scss'
})
export class CoinListComponent implements OnInit {

  bannerData: any = [];
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['symbol', 'current_price', 'price_change_percentage_24h', 'market_cap'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  currency: string = 'INR';

  constructor(private api: ApiService, private router: Router, private currencySer: CurrencyService) { }

  ngOnInit(): void {
    this.getAllData();
    this.getBannerData();
    this.currencySer.getCurreny().subscribe({
      next: (res) => {
        this.currency = res;
        this.getAllData();
        this.getBannerData();
      }
    })
  }

  getBannerData() {
    this.api.getTrendingCurrency(this.currency).subscribe({
      next: (res) => {
        this.bannerData = res;
        console.log("getTrendingCurrency", res)
      }
    })
  }

  getAllData() {
    this.api.getCurrency(this.currency).subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log("getCurrency", res)
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  gotoDetails(row: any) {
    this.router.navigate(['coin-detail', row.id]);
  }


}
