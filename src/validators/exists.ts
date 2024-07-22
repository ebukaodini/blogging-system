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
  transform?: (v: ValidationArguments['value']) => any;
};

@ValidatorConstraint({ async: true, name: 'Exists' })
export class ExistsConstraint implements ValidatorConstraintInterface {
  constructor(private readonly prismaService: PrismaService) {}

  async validate(value: any, args: ValidationArguments): Promise<boolean> {
    const { entity, field, transform } = args.constraints[0] as PropertyType;

    return await this.prismaService[entity]
      .findFirst({
        where: {
          [field ?? args.property]: transform ? transform(value) : value,
        },
      })
      .then((result: any) => {
        if (!result) return false;
        return true;
      });
  }

  defaultMessage(args: ValidationArguments): string {
    const { entity, field } = args.constraints[0] as PropertyType;
    return `${entity} ${[field ?? args.property]} does not exist`;
  }
}

export function Exists(
  property: PropertyType,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property],
      validator: new ExistsConstraint(new PrismaService()),
    });
  };
}
