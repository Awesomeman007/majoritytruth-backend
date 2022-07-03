import { ExecutionContext, Injectable, PayloadTooLargeException, UnauthorizedException } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport";
import { InjectRepository } from '@nestjs/typeorm'
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {}

@Injectable()
export class UserGuard extends AuthGuard("jwt") {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {
        super()
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const valid = await super.canActivate(context)
        if(!valid) throw new UnauthorizedException()

        const payload: {userId: number} = context.switchToHttp().getRequest().user
        // const payload: {role: Role, uid: number} = context.switchToHttp().getRequest().user
        // if (!["Elderly", "Caretaker"].includes(payload.role)) throw new ForbiddenException()
    
        const user = await this.userRepository.findOne({where: {userId: payload.userId}})
        if (!user) throw new UnauthorizedException()
        return true
    }
}