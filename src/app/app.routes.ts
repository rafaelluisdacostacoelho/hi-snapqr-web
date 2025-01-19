import { Routes } from '@angular/router';
import { PresentationComponent } from './presentation/presentation.component';
import { QrCodeGeneratorComponent } from './qr-code-generator/qr-code-generator.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { PacksComponent } from './packs/packs.component';
import { HelpComponent } from './help/help.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ContactComponent } from './contact/contact.component';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';

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
    path: "**", component: PresentationComponent
}];
