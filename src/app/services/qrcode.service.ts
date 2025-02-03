import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface QRCode {
  id: number;
  type: string;
  qrData: string;
  createdAt: string;
  metadata: { key: string, value: string }[];
}

export interface QRCodeFilter {
  type?: string;
  startDate?: string;
  endDate?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page: number;
  pageSize: number;
}

@Injectable({
  providedIn: 'root'
})
export class QRCodeService {
  constructor(private http: HttpClient) { }

  getQRCodes(filter: QRCodeFilter): Observable<QRCode[]> {
    let params = new HttpParams()
      .set('page', filter.page)
      .set('pageSize', filter.pageSize);

    if (filter.type) params = params.set('type', filter.type);
    if (filter.startDate) params = params.set('startDate', filter.startDate);
    if (filter.endDate) params = params.set('endDate', filter.endDate);
    if (filter.sortBy) params = params.set('sortBy', filter.sortBy);
    if (filter.sortOrder) params = params.set('sortOrder', filter.sortOrder);

    return this.http.get<QRCode[]>(`${environment.url}/qrcodes`, { params });
  }
}
