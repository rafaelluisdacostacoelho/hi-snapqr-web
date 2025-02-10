export enum QRCodeTypeEnum {
  Pix = 1 << 0,
  Bitcoin = 1 << 1,
  BitcoinLightning = 1 << 2,
  Url = 1 << 3,
  Todos = Pix | Bitcoin | BitcoinLightning | Url
}