import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (existing) throw new ConflictException('Email already registered');

    const hash = await bcrypt.hash(dto.password, 12);

    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: hash,
        role: dto.role,
      },
    });

    return { message: 'User registered', user: { id: user.id, email: user.email, role: user.role } };
  }

  async login(dto: LoginDto, res: Response) {
  const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
  if (!user) throw new UnauthorizedException('Invalid credentials');

  const valid = await bcrypt.compare(dto.password, user.password);
  if (!valid) throw new UnauthorizedException('Invalid credentials');

  const payload = { sub: user.id, role: user.role };
  const token = await this.jwtService.signAsync(payload);

  // Guardar token en cookie segura
  res.cookie('access_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // en prod solo por HTTPS
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60, // 1 hora
  });

  // 🔹 Aquí devolvemos también el rol y el id
  return res.json({
    message: 'Login successful',
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    accessToken: token, // opcional si también quieres consumirlo en frontend
  });
}
}