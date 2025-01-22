import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { QRCodeService } from '../../services/qrcode.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  imports: [FormsModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  userProfile: any = {};  // Dados do perfil do usuário
  qrCodes: string[] = []; // Lista de QR codes criados
  packages: any[] = [];   // Dados de pacotes comprados
  remainingPulse: number = 0; // Pulsos restantes para gerar QR Code
  selectedFilter: string = ''; // Filtro selecionado para QR Code

  constructor(
    private authService: AuthService,
    private qrCodeService: QRCodeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadUserProfile();
    this.loadQRCodeData();
    this.loadPackagesData();
  }

  // Carregar dados do perfil do usuário
  loadUserProfile() {
    // Simulação de dados do perfil
    this.userProfile = {
      name: 'João Silva',
      email: 'joao.silva@email.com',
      avatarUrl: 'https://via.placeholder.com/150' // Exemplo de URL de avatar
    };
  }

  // Carregar QR Codes gerados
  loadQRCodeData() {
    // Simulação de QR Codes criados
    this.qrCodes = this.qrCodeService.getCreatedQRs();
    this.remainingPulse = this.qrCodeService.getRemainingPulse();
  }

  // Carregar pacotes comprados
  loadPackagesData() {
    // Simulação de pacotes comprados
    this.packages = [
      { name: 'Pacote Básico', purchasedOn: '2025-01-01', qrLimit: 100 },
      { name: 'Pacote Premium', purchasedOn: '2025-01-15', qrLimit: 500 }
    ];
  }

  // Aplicar filtro de tipos de QR Code
  applyQRCodeFilter() {
    this.qrCodes = this.qrCodeService.getQRsByType(this.selectedFilter);
  }
}
