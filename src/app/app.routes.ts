import { Routes } from '@angular/router';

import { PresentationComponent } from './components/presentation/presentation.component';
import { QrCodeGeneratorComponent } from './components/qr-code-generator/qr-code-generator.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { PacksComponent } from './components/packs/packs.component';
import { HelpComponent } from './components/help/help.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { ContactComponent } from './components/contact/contact.component';
import { TermsOfServiceComponent } from './components/terms-of-service/terms-of-service.component';
import { RecoveryPasswordComponent } from './components/recovery-password/recovery-password.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [{
    path: "qr-code-generator", component: QrCodeGeneratorComponent
}, {
    path: "packs", component: PacksComponent
}, {
    path: "help", component: HelpComponent
}, {
    path: "sign-in", component: SignInComponent
}, {
    path: "privacy-policy", component: PrivacyPolicyComponent
}, {
    path: "terms-of-service", component: TermsOfServiceComponent
}, {
    path: "contact", component: ContactComponent
}, {
    path: "recovery-password", component: RecoveryPasswordComponent
}, {
    path: "register", component: RegisterComponent
}, {
    path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]
}, {
    path: "**", component: PresentationComponent
}];
