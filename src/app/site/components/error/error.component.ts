import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error',
  imports: [],
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss'
})
export class ErrorComponent {
  errorMessage: string | null = null;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.errorMessage = this.route.snapshot.queryParamMap.get('message');
  }
}
