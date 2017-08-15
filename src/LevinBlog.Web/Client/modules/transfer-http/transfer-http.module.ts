import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { TransferHttp } from './transfer-http';

@NgModule({
  providers: [
    TransferHttp
  ]
})
export class TransferHttpModule {}
