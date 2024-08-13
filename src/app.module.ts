import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BasicReportsModule } from './basic-reports/basic-reports.module';
import { PdfMakeModule } from './pdf-make/pdf-make.module';

@Module({
  imports: [BasicReportsModule, PdfMakeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
