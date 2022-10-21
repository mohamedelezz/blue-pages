import { ConflictException, forwardRef, Inject, Injectable, InternalServerErrorException, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/models/user.entity';
import { UpdateDirectoryDto } from './dto/updateDirectory.dto';
import { Repository } from 'typeorm';
import { DirectoryDto } from './dto/directory.dto';
import { Directory } from './directory.entity';
import { FilterDirectoryDto } from './dto/filter.dto';
import { CompaniesService } from 'src/companies/companies.service';
import { CitiesService } from 'src/cities/cities.service';
import { S3Service } from 'src/s3-service/s3-service.service';
import { AppModule } from 'src/app.module';


@Injectable()
export class DirectoryService {
    constructor(@InjectRepository(Directory)
    private readonly directoryRepository: Repository<Directory>,
        @Inject(forwardRef(() => CitiesService)) private readonly citiesService: CitiesService,
        private readonly s3Service: S3Service,

    ) { }


    async findAll(filterDirectoryDto: FilterDirectoryDto) {
        const { year, cityId } = filterDirectoryDto
        const query = this.directoryRepository.createQueryBuilder('directory')
        if (cityId) {
            query.andWhere('directory.cityId=:cityId', { cityId })
        }
        if (year) {
            query.andWhere('directory.year=:year', { year })
        }
        try {
            return query.getMany();
        } catch (e) {
            throw new NotFoundException('thare is no directory with error')
        }
    }

    async findOne(id: number) {
        try {
            const getDirectory = await this.directoryRepository.findOne(id);
            if (!getDirectory) {
                throw new NotFoundException("Directory Not found City")
            }
            return getDirectory
        } catch (e) {
            throw new NotFoundException('directory not found');
        }
    }

    async create(directoryDto: DirectoryDto): Promise<any> {
        const { pdf, year, cityId } = directoryDto
        const getCity = await this.citiesService.findOne(cityId)

        if (!getCity) {
            throw new NotFoundException("City Not found City")
        }
        const { Location, Key } = await this.s3Service.s3UploadFile(pdf)

        const directory = new Directory()
        directory.year = year
        directory.cityId = cityId
        directory.pdf = Location
        directory.pdf_key = Key

        try {
            return await this.directoryRepository.save(directory);
        } catch (e) {
            await this.s3Service.s3DeleteFile(Key)
            if (e.code === '23505') {
                throw new ConflictException('This City Already Exists');
            } else {
                throw new InternalServerErrorException('HTTP 500 Internal Server Error !!');
            }
        }

    }



    async update(updateDirectoryDto: UpdateDirectoryDto, id: number) {
        const { file, ...directoryData } = updateDirectoryDto
        const getCity =await this.citiesService.findOne(directoryData.cityId)
        if (!getCity) {
            throw new NotFoundException("can not update Directory because Not found City")
        }
        const getDirectory = await this.directoryRepository.findOne(id);

        if (!getDirectory) {
            throw new NotFoundException("can not update Directory because Not found City")
        }
        if (file) {
            await this.s3Service.s3Update( getDirectory.pdf_key,file)
        }

        try {

            const result = await this.directoryRepository.save({...getDirectory, ...directoryData });

           
                const gitCat = await this.directoryRepository.findOne(id);
                return gitCat;
        
        } catch (e) {
            throw new InternalServerErrorException('Directory not updated' + e);


        }
    }

    async delete(id: number) {
        const getDirectory = await this.directoryRepository.findOne(id);
        if (!getDirectory) {
            throw new NotFoundException("Directory Not deleted")
        }
        await this.s3Service.s3DeleteFile(getDirectory.pdf_key)
        const result = await this.directoryRepository.delete(id)
        if (result.affected === 0) { // affected === 0 means that no rows were found
            throw new NotFoundException('Directory can not deleted');
        } else {
            return true;
        }
    }

}
