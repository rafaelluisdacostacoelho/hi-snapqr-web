import { Routes } from '@angular/router';

import { SiteComponent } from './site/site.component';
import { SignInComponent } from './site/components/sign-in/sign-in.component';
import { PackagesComponent } from './site/components/packages/packages.component';
import { HelpComponent } from './site/components/help/help.component';
import { PrivacyPolicyComponent } from './site/components/privacy-policy/privacy-policy.component';
import { ContactComponent } from './site/components/contact/contact.component';
import { TermsOfServiceComponent } from './site/components/terms-of-service/terms-of-service.component';
import { RegisterComponent } from './site/components/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { AccountActivationComponent } from './site/components/account-activation/account-activation.component';
import { AccountActivatedComponent } from './site/components/account-activated/account-activated.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './site/components/home/home.component';
import { MainComponent } from './dashboard/components/main/main.component';
import { SettingsComponent } from './dashboard/components/settings/settings.component';
import { ResetPasswordComponent } from './site/components/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './site/components/forgot-password/forgot-password.component';
import { ErrorComponent } from './site/components/error/error.component';
import { CheckoutSuccessComponent } from './site/components/checkout-success/checkout-success.component';
import { CheckoutCancelComponent } from './site/components/checkout-cancel/checkout-cancel.component';
import { ServicesComponent } from './site/components/services/services.component';
import { QrCodeGeneratorComponent } from './dashboard/components/qr-code-generator/qr-code-generator.component';
import { PasswordChangedComponent } from './site/components/password-changed/password-changed.component';

export const routes: Routes = [{
    path: '',
    component: SiteComponent,
    children: [
        { path: '', redirectTo: 'home', pathMatch: 'full' },
        { path: 'home', component: HomeComponent },
        { path: 'services', component: ServicesComponent },
        { path: 'packages', component: PackagesComponent },
        { path: 'help', component: HelpComponent },
        { path: 'sign-in', component: SignInComponent },
        { path: 'privacy-policy', component: PrivacyPolicyComponent },
        { path: 'terms-of-service', component: TermsOfServiceComponent },
        { path: 'contact', component: ContactComponent },
        { path: 'forgot-password', component: ForgotPasswordComponent },
        { path: 'reset-password', component: ResetPasswordComponent },
        { path: 'register', component: RegisterComponent },
        { path: 'account-activation', component: AccountActivationComponent },
        { path: 'account-activated', component: AccountActivatedComponent },
        { path: 'error', component: ErrorComponent },
        { path: 'checkout-success', component: CheckoutSuccessComponent },
        { path: 'checkout-cancel', component: CheckoutCancelComponent },
        { path: 'password-changed', component: PasswordChangedComponent },
    ]
}, {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
        { path: '', redirectTo: 'main', pathMatch: 'full' },
        { path: 'main', component: MainComponent },
        { path: 'qr-code-generator', component: QrCodeGeneratorComponent },
        { path: 'settings', component: SettingsComponent },
    ]
}, { path: '**', redirectTo: '' }];
