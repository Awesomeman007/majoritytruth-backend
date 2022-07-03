import { forwardRef, Module } from "@nestjs/common";
import { AuthService } from './auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { UserGuard } from './jwt.guard';

@Module({
    imports: [
        ConfigModule,
        forwardRef(() => UserModule),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET_KEY'),
                signOptions: {expiresIn: '30d'},
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [AuthService, JwtStrategy, UserGuard],
    exports: [AuthService, UserGuard],
})

export class AuthModule {}