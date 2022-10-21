import { CompaniesService } from 'src/companies/companies.service';
import { OffersService } from './../offers/offers.service';
import { GetUsersFilterDto } from './dto/get-users-filter.dto';
import { updateUserDto } from './dto/update-user.dto';
import { createUserDto } from './dto/create-user.dto';
import { Roles } from './../auth/roles.enum';
import { Repository } from 'typeorm';
import { User } from './../auth/models/user.entity';
import { Injectable, NotFoundException, ConflictException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
	constructor(@InjectRepository(User) private readonly userRepository: Repository<User>,
		// private readonly companiesService: CompaniesService,
		// private readonly offersService: OffersService,
	) { }
	async findAll(filterDto: GetUsersFilterDto) {
		const { role: filterRole } = filterDto;

		const query = this.userRepository.createQueryBuilder('user');
		if (filterRole) {
			query.andWhere('user.role=:filterRole', { filterRole });
		}
		query.andWhere(
			'user.role != :role',
			{ role: Roles.ADMIN },
		);
		try {
			return await query.getMany();
		} catch (e) {
			throw new NotFoundException('No user found');
		}
	}

	async findOne(id: number) {
		const user = await this.userRepository.findOne(id);
		if (!user) {
			throw new NotFoundException("user not found")
		}
		return user;
	}

	async create(createUserDto: createUserDto): Promise<User> {
		const { name, email, password, role } = createUserDto;
		let user;
		if (role) {
			if (role === Roles.ADMIN) throw new UnauthorizedException('You cannot create admins')
			user = this.userRepository.create({ name, email, password, role })
		} else {
			user = this.userRepository.create({ name, email, password })
		}
		try {
			await this.userRepository.save(user);
		} catch (err) {
			if (err.code === '23505') {
				throw new ConflictException('Name or Email Already Exists');
			} else {
				throw new InternalServerErrorException('HTTP 500 Internal Server Error !!');
			}
		}
		return user;
	}


	async update(updateUserDto: updateUserDto, id: number) {
		const user = await this.userRepository.findOne(id);
		if (user?.role && user?.role === Roles.ADMIN) {
			throw new UnauthorizedException('You don\'t have permission to perform this action')
		}
		const result = await this.userRepository.update({ id }, { ...updateUserDto });
		if (result.affected === 0) { // affected === 0 means that no rows were found
			throw new NotFoundException('User was not updated successfully');
		} else {
			return user;
		}
	}

	async delete(id: number) {
		const user = await this.userRepository.findOne(id);
		if (user.role === Roles.ADMIN) {
			throw new UnauthorizedException('You don\'t have permission to perform this action')
		}
		const result = await this.userRepository.delete(id)
		if (result.affected === 0) { // affected === 0 means that no rows were found
			throw new NotFoundException('user was not deleted successfully');
		} else {
			return true;
		}
	}


	

}
