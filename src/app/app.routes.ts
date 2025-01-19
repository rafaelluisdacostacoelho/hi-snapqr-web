import { Routes } from '@angular/router';
import { PresentationComponent } from './presentation/presentation.component';
import { QrCodeGeneratorComponent } from './qr-code-generator/qr-code-generator.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { PacksComponent } from './packs/packs.component';
import { HelpComponent } from './help/help.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';

export const routes: Routes = [{
    path: "qr-code-generator", component: QrCodeGeneratorComponent
}, {
    path: "packs", component: PacksComponent
}, {
    path: "help", component: HelpComponent
}, {
    path: "sign-in", component: SignInComponent
},{
    path: "privacy-policy", component: PrivacyPolicyComponent
}, {
    path: "**", component: PresentationComponent
}];
