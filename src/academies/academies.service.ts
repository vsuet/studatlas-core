import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Academy } from './models/academy.model';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AcademiesService {

  findById(id: string): any {
    return 1;
  }

  findAll(): any {
    return [1];
  }
}
