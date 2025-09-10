import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { VictimsModule } from './victims/victims.module';
import { StatsModule } from './stats/stats.module';
import { PublicModule } from './public/public.module';
import { PrismaModule } from './prisma/prisma.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModule.forRoot([{
      ttl: 60,      // ventana de tiempo (segundos)
      limit: 10,    // máximo de requests por ventana
    }]),
    AuthModule,
    UsersModule,
    VictimsModule,
    StatsModule,
    PublicModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}