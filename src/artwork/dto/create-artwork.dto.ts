import { 
    IsNotEmpty,
    IsString,
    IsNumber,
    MaxLength,
    Min,
    IsOptional,
    IsBoolean
} from 'class-validator';

export class CreateArtworkDto {

    @IsString()
    @IsNotEmpty()
    @MaxLength(99)
    title: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    artist: string;

    @IsString()
    @IsNotEmpty()
    type: string;

    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    price: number;

    @IsBoolean()
    @IsOptional()
    availability?: boolean;
}
