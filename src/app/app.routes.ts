import { Routes } from '@angular/router';

import { SiteComponent } from './site/site.component';
import { QrCodeGeneratorComponent } from './site/components/qr-code-generator/qr-code-generator.component';
import { SignInComponent } from './site/components/sign-in/sign-in.component';
import { PacksComponent } from './site/components/packs/packs.component';
import { HelpComponent } from './site/components/help/help.component';
import { PrivacyPolicyComponent } from './site/components/privacy-policy/privacy-policy.component';
import { ContactComponent } from './site/components/contact/contact.component';
import { TermsOfServiceComponent } from './site/components/terms-of-service/terms-of-service.component';
import { RecoveryPasswordComponent } from './site/components/recovery-password/recovery-password.component';
import { RegisterComponent } from './site/components/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { AccountActivationComponent } from './site/components/account-activation/account-activation.component';
import { AccountActivatedComponent } from './site/components/account-activated/account-activated.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './site/components/home/home.component';
import { MainComponent } from './dashboard/components/main/main.component';
import { SettingsComponent } from './dashboard/components/settings/settings.component';

export const routes: Routes = [{
    path: '',
    component: SiteComponent,
    children: [
        { path: '', redirectTo: 'home', pathMatch: 'full' },
        { path: 'home', component: HomeComponent },
        { path: 'qr-code-generator', component: QrCodeGeneratorComponent },
        { path: 'packs', component: PacksComponent },
        { path: 'help', component: HelpComponent },
        { path: 'sign-in', component: SignInComponent },
        { path: 'privacy-policy', component: PrivacyPolicyComponent },
        { path: 'terms-of-service', component: TermsOfServiceComponent },
        { path: 'contact', component: ContactComponent },
        { path: 'recovery-password', component: RecoveryPasswordComponent },
        { path: 'register', component: RegisterComponent },
        { path: 'account-activation', component: AccountActivationComponent },
        { path: 'account-activated', component: AccountActivatedComponent }
    ]
}, {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
        { path: '', redirectTo: 'main', pathMatch: 'full' },
        { path: 'main', component: MainComponent },
        { path: 'settings', component: SettingsComponent },
    ]
}, { path: '**', redirectTo: '' }];
