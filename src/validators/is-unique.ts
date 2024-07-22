import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { PrismaService } from 'src/services/prisma/prisma.service';

type PropertyType = {
  entity: string;
  field?: string;
};

@ValidatorConstraint({ async: true, name: 'IsUnique' })
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  constructor(private readonly prismaService: PrismaService) {}

  async validate(value: any, args: ValidationArguments): Promise<boolean> {
    const { entity, field } = args.constraints[0] as PropertyType;

    return await this.prismaService[entity]
      .findFirst({ where: { [field ?? args.property]: value } })
      .then((result: any) => {
        if (result) return false;
        return true;
      });
  }

  defaultMessage(args: ValidationArguments): string {
    const { field } = args.constraints[0] as PropertyType;
    return `${[field ?? args.property]} already exists`;
  }
}

export function IsUnique(
  property: PropertyType,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property],
      validator: new IsUniqueConstraint(new PrismaService()),
    });
  };
}
