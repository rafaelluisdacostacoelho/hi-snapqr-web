import { EventEmitter } from "@angular/core";

export interface QRCodeGenerator {
    qrCodeGenerated: EventEmitter<string>;
}