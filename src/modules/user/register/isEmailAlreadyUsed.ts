import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
  } from 'class-validator';
import User from '../../../models/UserModel'
  
  @ValidatorConstraint({ async: true })
  export class IsEmailAlreadyExistConstraint implements ValidatorConstraintInterface {
    async validate(email: string) {
      const user = await User.findOne({ email });
        if (user)
            return false;
        return true;
    }
  }
  
  export function IsEmailAlreadyExist(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [],
        validator: IsEmailAlreadyExistConstraint,
      });
    };
  }