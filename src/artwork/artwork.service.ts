import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtworkDto } from './dto/create-artwork.dto';
import { UpdateArtworkDto } from './dto/update-artwork.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Artwork } from './entities/artwork.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArtworkService {
  constructor(
    @InjectRepository(Artwork)
    private readonly artworkRepository: Repository<Artwork>,
  ) {}

  async create(createArtworkDto: CreateArtworkDto): Promise<Artwork> {
    const artwork = this.artworkRepository.create(createArtworkDto);
    return await this.artworkRepository.save(artwork);
  }

  async findAll(): Promise<Artwork[]> {
    return await this.artworkRepository.find();
  }

  async findOne(id: string): Promise<Artwork> {
    const artwork = await this.artworkRepository.findOne({ where: { id } });
    if (!artwork) {
      throw new NotFoundException(`Artwork with ID ${id} is not found`);
    }
    return artwork;
  }

  async update(id: string, updateArtworkDto: UpdateArtworkDto): Promise<Artwork> {
    await this.findOne(id);
    await this.artworkRepository.update(id, updateArtworkDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const result = await this.artworkRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Artwork with ID ${id} is not found`);
    }
  }
}
